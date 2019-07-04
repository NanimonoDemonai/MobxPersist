import { computed, configure, flow, observable } from "mobx";
import * as Persist from "mobx-persist";
import { TodoListStore } from "./TodoList";
import localForage from "localforage";

configure({ enforceActions: "observed" });

export enum TodoListHydratorStatus {
  init = "init",
  loading = "loading",
  loaded = "loaded"
}

export class TodoListHydrator {
  @observable private _todoList: TodoListStore | null = null;
  @observable private _saveName: string | null = null;
  @observable private _status: TodoListHydratorStatus =
    TodoListHydratorStatus.init;
  private _hydrator: ReturnType<typeof Persist.create> | null = null;

  @computed
  get todoList(): TodoListStore | null {
    return this._todoList;
  }

  @computed
  get saveName(): string | null {
    return this._saveName;
  }

  @computed
  get status(): TodoListHydratorStatus {
    return this._status;
  }

  private get hydrator(): ReturnType<typeof Persist.create> {
    if (this._hydrator == null) {
      localForage.config({
        driver: localForage.LOCALSTORAGE,
        name: "TodoApp"
      });

      this._hydrator = Persist.create({
        storage: localForage
      });

      return this._hydrator;
    }
    return this._hydrator;
  }

  readonly hydrate = flow(this.hydrateGenerator);

  private *hydrateGenerator(saveName: string) {
    this._saveName = saveName;
    this._todoList = null;
    this._status = TodoListHydratorStatus.loading;

    const newTodoList = new TodoListStore();

    yield this.hydrator<TodoListStore>(saveName, newTodoList);

    this._todoList = newTodoList;
    this._status = TodoListHydratorStatus.loaded;
  }
}
