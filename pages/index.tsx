import {TodoListHydrator} from "../store/TodoListHydrator";
import {useEffect} from "react";
import {Observer} from "mobx-react-lite";
import {TodoListView} from "../components/TodoListView";
import {TodoListAdder} from "../components/TodoListAdder";
import {TodoListContext} from "../context"
import {TodoListShifter} from "../components/TodoListShifter";

const store = new TodoListHydrator();
export default () => {
    useEffect(() => {
        store.hydrate("Todo");
    }, []);
    return (
        <>
            <Observer>{() =>
                <TodoListContext.Provider value={store.todoList}>
                    <p>{store.saveName}:{store.status}</p>
                    <TodoListShifter hydrator={store}/>
                    <hr/>
                    <TodoListView/>
                    <TodoListAdder/>
                </TodoListContext.Provider>
            }</Observer>
        </>
    );
};