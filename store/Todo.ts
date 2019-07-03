import { persist } from "mobx-persist";
import { autorun, computed, observable } from "mobx";
import uuid from "uuid";

export class TodoStore {
  @persist @observable todo: string;
  @persist @observable finish: boolean;
  @persist _date: string;
  readonly id: string;

  constructor(todo: string) {
    this.todo = todo;
    this._date = new Date().toString();
    this.finish = false;
    this.id = uuid.v4();

    console.log(JSON.stringify(this));
    autorun(() => console.log(`todo:SetTo:${this.todo}`));
  }

  @computed get date() {
    return new Date(this._date);
  }
}
