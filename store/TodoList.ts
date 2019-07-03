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
  _todolist: IObservableArray<TodoStore>;

  @observable saveName: string | null = null;

  constructor(todolist: TodoStore[] = []) {
    this._todolist = todolist as IObservableArray<TodoStore>;
    this.addTodo(new TodoStore("初めてのTODO"));
  }

  @action.bound
  addTodo(todo: TodoStore) {
    this._todolist.push(todo);
  }

  @action.bound
  removeTodo(children: TodoStore) {
    this._todolist.remove(children);
  }

  @computed
  get todolist(): ReadonlyArray<TodoStore> {
    return this._todolist;
  }
}
