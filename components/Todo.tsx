import { TodoStore } from "../store/TodoList";
import { FC } from "react";
import { Remover } from "./Remover";

export const Todo: FC<{ todo: TodoStore }> = props => (
  <li>
    {props.todo.todo}：<DateView date={props.todo.date} />
    <span className={"serial"}>{props.todo.id}</span>
    <Remover todo={props.todo} />
    {/* language=CSS*/}
    <style jsx>{`
      .serial {
        font-size: 0.5em;
        color: #bbb;
      }
    `}</style>
  </li>
);

export const DateView: FC<{ date: Date }> = props => (
  <>
    <span className={"time"}>
      {props.date.getFullYear()}年{props.date.getMonth()}月{props.date.getDay()}
      日{props.date.getHours()}時{props.date.getMinutes()}分
      {props.date.getSeconds()}秒
    </span>
    {/* language=CSS*/}
    <style jsx>{`
      .time {
      }
    `}</style>
  </>
);
