import { FC } from "react";
import { Remover } from "./Remover";
import { TodoStore } from "../store/Todo";
import { Observer } from "mobx-react-lite";

export const Todo: FC<{ todo: TodoStore }> = props => (
  <>
    <li>
      <span onClick={props.todo.switchTodo}>
        <Observer>
          {() => (
            <span className={`${props.todo.finished && "finished"}`}>
              {props.todo.todo}：<DateView date={props.todo.date} />
            </span>
          )}
        </Observer>
      </span>
      <span className={"serial"}>{props.todo.id}</span>
      <Remover todo={props.todo} />
    </li>

    {/* language=CSS*/}
    <style jsx>{`
      .finished {
        text-decoration: line-through;
      }

      .serial {
        margin-left: 1em;
        font-size: 0.5em;
        color: #bbb;
      }
    `}</style>
  </>
);

export const DateView: FC<{ date: Date }> = props => (
  <>
    <span className={"time"}>
      <span>{props.date.getFullYear()}年</span>

      <span>{props.date.getMonth()}月</span>

      <span>{props.date.getDay()}日</span>

      <span>{props.date.getHours()}時</span>

      <span>{props.date.getMinutes()}分</span>

      <span>{props.date.getSeconds()}秒</span>
    </span>
    {/* language=CSS*/}
    <style jsx>{`
      .time {
        color: #bbb;
      }
    `}</style>
  </>
);
