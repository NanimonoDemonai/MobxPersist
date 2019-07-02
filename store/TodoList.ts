import {persist} from "mobx-persist";
import {computed, IObservableArray, observable} from "mobx";

export class TodoStore {
    @persist @observable todo: string;

    constructor(todo: string) {
        this.todo = todo;
    }
}

export class TodoListStore {
    @persist(`list`, TodoStore) @observable _todolist: IObservableArray<TodoStore>;
    @observable saveName: string | null = null;


    constructor(todolist: TodoStore[] = []) {
        this._todolist = observable(todolist);
        this.addTodo(new TodoStore("初めてのTODO"));
    }

    addTodo(todo: TodoStore) {
        this._todolist.push(todo);
    }

    removeTodo(children: TodoStore) {
        this._todolist.remove(children);
    }

    @computed
    get todolist(): ReadonlyArray<TodoStore> {
        return this._todolist
    }
}