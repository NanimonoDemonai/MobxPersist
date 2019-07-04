import { FC, useContext } from "react";
import { TodoListContext } from "../context";
import { Observer } from "mobx-react-lite";
import { Todo } from "./Todo";

export const TodoList: FC = () => {
  const todoList = useContext(TodoListContext);
  return (
    <>
      {todoList && (
        <Observer>
          {() => (
            <>
              {todoList.todoList.map(e => (
                <Todo key={e.id} todo={e} />
              ))}
            </>
          )}
        </Observer>
      )}
    </>
  );
};
