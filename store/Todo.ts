import { persist } from "mobx-persist";
import { action, computed, configure, observable } from "mobx";
import uuid from "uuid";

configure({ enforceActions: "observed" });

export class TodoStore {
  @persist @observable todo: string;
  @persist @observable finished: boolean;
  @persist private readonly _date: string;
  readonly id: string;

  constructor(todo: string) {
    this.todo = todo;
    this._date = new Date().toString();
    this.finished = false;
    this.id = uuid.v4();
  }

  @computed get date() {
    return new Date(this._date);
  }

  @action.bound switchTodo() {
    this.finished = !this.finished;
  }
}
