import {observable} from "mobx";
import * as Persist from "mobx-persist";
import {TodoListStore} from "./TodoList";

export enum TodoListHydratorStatus {
    init = "init",
    loading = "loading",
    loaded = "loaded"
}

export class TodoListHydrator {
    @observable todoList: TodoListStore | null = null;
    @observable saveName: string | null = null;
    @observable status: TodoListHydratorStatus = TodoListHydratorStatus.init;

    async hydrate(saveName: string) {
        this.saveName = saveName;
        this.todoList = null;
        this.status = TodoListHydratorStatus.loading;
        const newTodoList = new TodoListStore();
        const hydrate = Persist.create({
            storage: localStorage
        });
        await hydrate<TodoListStore>(saveName, newTodoList);
        this.todoList = newTodoList;
        this.status = TodoListHydratorStatus.loaded;
    }
}