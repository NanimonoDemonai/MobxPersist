import { configure, flow, observable } from "mobx";
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
  @observable todoList: TodoListStore | null = null;
  @observable saveName: string | null = null;
  @observable status: TodoListHydratorStatus = TodoListHydratorStatus.init;

  hydrate = flow(this.hydrateGen);

  private *hydrateGen(saveName: string) {
    this.saveName = saveName;
    this.todoList = null;
    this.status = TodoListHydratorStatus.loading;

    const newTodoList = new TodoListStore();

    localForage.config({
      driver: localForage.LOCALSTORAGE,
      name: "TodoApp",
      version: 1.0,
      storeName: "keyvaluepairs",
      description: "TODOアプリのデータ"
    });

    const hydrate = Persist.create({
      storage: localForage
    });

    yield hydrate<TodoListStore>(saveName, newTodoList);

    this.todoList = newTodoList;
    this.status = TodoListHydratorStatus.loaded;
  }
}
