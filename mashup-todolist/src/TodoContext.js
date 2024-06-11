import React, { createContext, useContext, useReducer, useRef } from "react";
import styled from "styled-components";

const initialTodos=[
    {
        id:1, text:'프로젝트 생성하기', done:true   
    },
    {
        id:2, text:'컴포넌트 스타일링하기', done:true   
    },
    {
        id:3, text:'Context 만들기', done:false   
    },
    {
        id:4, text:'기능 구현하기', done:false   
    },

];

function todoReducer(state, action) {
    switch(action.type) {
        case 'CREATE' : return state.concat(action.todo);
        case 'TOGGLE' : return state.map(todo=>
            todo.id===action.id?{...todo, done: !todo.done} : todo
        );
        case 'REMOVE' : return state.filter(todo=>todo.id!=action.id);
    default : throw new Error(`Unhandled action type: ${action.type}`);
    }
}

/* 컨텍스트 쪼개서 사용 : state와 dispatch로 */
const TodoStateContext=createContext();
const TodoDispatchContext=createContext();
const TodoNextIdContext=createContext();

/* App.js에 하나로 먹이기 위해 그냥 이거 하나 크게 만들고, 그 안에 세부적으로 지정 */
export function TodoProvider({children}) {
    const [state, dispatch] = useReducer(todoReducer, initialTodos);
    const nextId=useRef(5);

    return (
        <TodoStateContext.Provider value={state}>
        <TodoDispatchContext.Provider value={dispatch}>
        <TodoNextIdContext.Provider value={nextId}>
        {children}
        </TodoNextIdContext.Provider>
        </TodoDispatchContext.Provider>
        </TodoStateContext.Provider>
    )
}

/* 이렇게 해주면 다른 컴포넌트에서 const stsate=useContext(TodoStateContext) 로 사용가능 */

/* 아니면 이렇게 커스텀훅 만들어서 사용, 여기선 이걸 채택 */
export function useTodoState() { /* TodoList에서 사용 : TodoList 안의 각각의 TodoItem에 */
    const context=useContext(TodoStateContext);
    if(!context) {
        throw new Error('Cannot find TodoProvider');
    }
    return context;
}

export function useTodoDispatch() { /* TodoItem에서 쓰는 기능들에 : 기능에 대한 dispatch(reducer)는 여기서 정했고 */
    const context=useContext(TodoStateContext);
    if(!context) {
        throw new Error(`Cannot find TodoProvider`);
    }
    return context;
}

export function useTodoNextId() {
    const context=useContext(TodoStateContext);
    if(!context) {
        throw new Error(`Cannot find TodoProvider`);
    }return context;
}
/* 이렇게 하면 다른 컴포넌트에서 state=useTodoState() 이렇게 사용 가능. 뭐 크게 다를것도 없지만 */