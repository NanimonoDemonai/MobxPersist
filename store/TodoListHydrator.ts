import { configure, flow, observable } from "mobx";
import * as Persist from "mobx-persist";
import { TodoListStore } from "./TodoList";

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

  hydrate = flow(function* hydrate(this: TodoListHydrator, saveName: string) {
    this.saveName = saveName;
    this.todoList = null;
    this.status = TodoListHydratorStatus.loading;
    const newTodoList = new TodoListStore();
    const hydrate = Persist.create({
      storage: localStorage
    });
    yield hydrate<TodoListStore>(saveName, newTodoList);
    this.todoList = newTodoList;
    this.status = TodoListHydratorStatus.loaded;
  }).bind(this);
}
