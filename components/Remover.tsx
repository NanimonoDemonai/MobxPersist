import { TodoStore } from "../store/TodoList";
import { FC, useContext } from "react";
import { TodoListContext } from "../context";

export const Remover: FC<{ todo: TodoStore }> = props => {
  const todoList = useContext(TodoListContext);
  return (
    <>
      {todoList != null && (
        <button
          onClick={() => {
            todoList.removeTodo(props.todo);
          }}
        >
          削除
        </button>
      )}
    </>
  );
};
