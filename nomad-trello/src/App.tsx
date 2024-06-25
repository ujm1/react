import React from "react";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { todoState } from "./atoms";
import DragabbleCard from "./DragabbleCard";
import Board from "./Board";

const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  margin: 0 auto; //가운데
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr); //뭐 3개의 board를 만든다 그런거같은데
`;

function App() {
  const [todos, setTodos] = useRecoilState(todoState);
  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    if (!destination) return; 
    if(destination.droppableId===source.droppableId) { 
      setTodos((oldTodos)=>{
        const copyTodos=[...oldTodos[source.droppableId]]; //동일
        const taskObj=copyTodos[source.index]; //객체...
        
        //아래는 동일
        copyTodos.splice(source.index, 1);
        copyTodos.splice(destination?.index, 0, taskObj); //draggableId 지우고 taskObj 넣음
        return {...oldTodos, //기존거 그대로에
          [source.droppableId] : copyTodos, //boardId 부분만 변경
        };
      });
    }
    if(destination.droppableId!==source.droppableId) { 
      setTodos((oldTodos)=>{  //이해하기 어려우면 oldBoards로 이해.
        const copyTodos=[...oldTodos[source.droppableId]]; //기존 배열들(todos 자체) 복사
        const taskObj=copyTodos[source.index];
        const copyTodos2=[...oldTodos[destination.droppableId]]; //옮길곳의 todos
        copyTodos.splice(source.index, 1); //동일. 기존의 todos의 인덱스에서 하나를 없앤다
        copyTodos2.splice(destination?.index, 0, taskObj); //2로 ..
        //의미는 동일. 옮기려는 todos의 인덱스, 0개 삭제, todo 추가.
        
        return {
          ...oldTodos, //마찬가지로 기존꺼 그대로 쓰는데..
          [source.droppableId] : copyTodos, //옮기려는 droppableId (=boardId) 변경
          [destination.droppableId] : copyTodos2, //옮겨지는 boardId 의 배열 변경
        };
      });
    }
  };
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <Boards>
            {Object.keys(todos).map((boardId) => (
              <Board boardId={boardId} key={boardId} todos={todos[boardId]} />
            ))}
          </Boards>
        </Wrapper>
      </DragDropContext>
    </>
  );
}

export default App;
