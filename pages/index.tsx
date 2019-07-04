import { TodoListHydrator } from "../store/TodoListHydrator";
import { useEffect } from "react";
import { Observer } from "mobx-react-lite";
import { TodoListAdder } from "../components/TodoListAdder";
import { TodoListContext } from "../context";
import { TodoListShifter } from "../components/TodoListShifter";
import { TodoList } from "../components/TodoList";

const store = new TodoListHydrator();

export default () => {
  useEffect(() => {
    store.hydrate("Todo");
  }, []);
  return (
    <>
      <h1>TODOリスト</h1>
      <Observer>
        {() => (
          <TodoListContext.Provider value={store.todoList}>
            <p>
              {store.saveName}:{store.status}
            </p>
            <TodoListShifter hydrator={store} />

            <hr />

            <TodoList />
            <TodoListAdder />
          </TodoListContext.Provider>
        )}
      </Observer>
    </>
  );
};
