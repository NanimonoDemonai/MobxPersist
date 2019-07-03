import { persist } from "mobx-persist";
import {
  action,
  autorun,
  computed,
  configure,
  IObservableArray,
  observable
} from "mobx";
import uuid from "uuid";

configure({ enforceActions: "observed" });

export class TodoStore {
  @persist @observable todo: string;
  @persist _date: string;
  readonly id: string;

  constructor(todo: string) {
    this.todo = todo;
    this._date = new Date().toString();
    this.id = uuid.v4();
    console.log(JSON.stringify(this));
    autorun(() => console.log(`todo:SetTo:${this.todo}`));
  }

  @computed get date() {
    return new Date(this._date);
  }
}

export class TodoListStore {
  @persist(`list`, TodoStore) @observable _todolist: IObservableArray<
    TodoStore
  >;
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
