import { persist } from "mobx-persist";
import {
  action,
  computed,
  configure,
  IObservableArray,
  observable
} from "mobx";
import { TodoStore } from "./Todo";

configure({ enforceActions: "observed" });

export class TodoListStore {
  @persist(`list`, TodoStore)
  @observable
  _todoList: IObservableArray<TodoStore>;
  @observable saveName: string | null = null;

  constructor(todoList: TodoStore[] = []) {
    this._todoList = todoList as IObservableArray<TodoStore>;
    this.addTodo(new TodoStore("初めてのTODO"));
  }

  @action.bound
  addTodo(todo: TodoStore) {
    this._todoList.push(todo);
  }

  @action.bound
  removeTodo(children: TodoStore) {
    this._todoList.remove(children);
  }

  @computed
  get todoList(): ReadonlyArray<TodoStore> {
    return this._todoList;
  }
}
