import {TodoStore} from "../store/TodoList";
import {FC} from "react";
import {Remover} from "./Remover";

export const Todo: FC<{ todo: TodoStore; }> = props => (
    <li>
        {props.todo.todo}<Remover todo={props.todo}/>
    </li>
);