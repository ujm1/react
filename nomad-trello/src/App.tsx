import React from "react";
import { DragDropContext, Draggable, DropResult, Droppable } from "react-beautiful-dnd";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { todoState } from "./atoms";
import DragabbleCard from "./DragabbleCard";

const Wrapper = styled.div`
  display: flex;
  max-width: 480px;
  width: 100%;
  margin: 0 auto; //가운데
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(1, 1fr); //뭐 3개의 board를 만든다 그런거같은데
`;

const Board = styled.div`
  padding: 20px 10px; //좌우
  padding-top: 30px;
  background-color: ${(props) => props.theme.boardColor}; //theme.ts에서..
  border-radius: 5px;
  min-height: 200px;
`;




function App() {
  const [todos,setTodos]= useRecoilState(todoState);
  const onDragEnd = ({draggableId, destination, source}: DropResult) => { 
    //destination은 내가 드래그로 옮긴 위치, source는 기존 위치를 의미
    if(!destination) return; //자리 이동 안할때(같은위치) 
    setTodos((oldTodos)=>{
      const copyTodos=[...oldTodos]; //요소(내용물을) 언팩하고 다시 배열에 담음(재포장, 즉 복사)
      copyTodos.splice(source.index,1); //원래 위치 없앰
      copyTodos.splice(destination?.index,0, draggableId); //이 draggableId는, Draggable 객체,
      //즉 사용자가 드래그하는 객체의 draggableId인 todo 객체를 의미한다. 
      return copyTodos;
    });

  };
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <Boards>
            <Droppable droppableId="one">
              {(magic) => (
                <Board ref={magic.innerRef} {...magic.droppableProps}>
                  {todos.map((todo, index) => (
                    <DragabbleCard todo={todo} index={index} key={todo}/>
                  ))}
                  {magic.placeholder} {/* 벗어나도 리스트 크기 유지되게 */}
                </Board>
              )}
            </Droppable>
          </Boards>
        </Wrapper>
      </DragDropContext>
    </>
  );
}

export default App;
