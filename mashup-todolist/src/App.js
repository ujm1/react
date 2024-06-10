import React from "react";
import {createGlobalStyle} from 'styled-components';
import TodoTemplate from "./components/TodoTemplate";
import TodoHead from "./components/TodoHead";
import TodoList from "./components/TodoList";
import TodoCreate from "./components/TodoCreate";


const GlobalStyle=createGlobalStyle`
  body {
    background: #e9ecef; /* 회색 배경, 전역에서 사용할 것이므로 그냥 App.js에 때려박음 */
  }
`;

function App() {
  return (
    <>
      <GlobalStyle/> {/* 회색배경 전역 */}
      <TodoTemplate>
        <TodoHead/>
        <TodoList/>
        <TodoCreate/>
      </TodoTemplate>
    </>
  );
}

export default App;
