import {FC, useContext, useState} from "react";
import {TodoListContext} from "../context";
import {TodoStore} from "../store/TodoList";

export const TodoListAdder: FC = () => {
    const todoList = useContext(TodoListContext);
    const [text, setText] = useState<string>("");
    return (
        <>
            {
                todoList &&
                <>
                    <input type="text"
                           value={text}
                           onChange={event1 => {
                               setText(event1.target.value)
                           }}
                    />
                    <button onClick={() => {
                        todoList.addTodo(new TodoStore(text));
                        setText("");

                    }}>
                        たす
                    </button>
                </>
            }
        </>
    )
};