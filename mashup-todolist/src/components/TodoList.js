import React from "react";

import styled from "styled-components";
import TodoItem from "./TodoItem";
import { useTodoState } from "../TodoContext";

const TodoListBlock=styled.div`
 flex: 1;
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto;
`;

function TodoList() {

    const todos=useTodoState();
    /* state를 대충 공유 개체 정도로 이해하면 되나? */

    return (
    <>
    <TodoListBlock>
        {/* <TodoItem text="프로젝트 생성하기" done={true}/>
        <TodoItem text="컴포넌트 스타일링하기" done={true}/>
        <TodoItem text="Context 만들기" done={false}/>
        <TodoItem text="기능 구현하기" done={false}/> */}
        {todos.map(todo=>(
            <TodoItem key="todo.id" id={todo.id} 
            text={todo.text} done={todo.done} />
        ))}
    </TodoListBlock>
    </>
    )
}

export default TodoList;