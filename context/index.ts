import { createContext } from "react";
import { TodoListStore } from "../store/TodoList";

export const TodoListContext = createContext<TodoListStore | null>(null);
