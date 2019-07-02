import {FC, useState} from "react";
import {TodoListHydrator, TodoListHydratorStatus} from "../store/TodoListHydrator";
import {Observer} from "mobx-react-lite";

export const TodoListShifter: FC<{ hydrator: TodoListHydrator }> = props => {
    const [text, setText] = useState<string>("");
    return (
        <>
            <input type="text"
                   value={text}
                   onChange={event1 => {
                       setText(event1.target.value)
                   }}
            />
            <Observer>{() =>
                <button onClick={() => {
                    setText("");
                    props.hydrator.hydrate(text);
                }}
                        disabled={props.hydrator.status == TodoListHydratorStatus.loading}>
                    shift
                </button>
            }</Observer>
        </>

    )
};