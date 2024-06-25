import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div`
  background-color: ${(props) => props.theme.cardColor};
  border-radius: 5px;
  padding: 10px 10px;
  margin-bottom: 5px;
`;

interface IDragabbleCardProps {
    todoId : number;
    todoText: string;
    index : number;
}

function DragabbleCard({todoId, todoText, index}:IDragabbleCardProps) {

    return (
        <>
        <Draggable draggableId={todoId+""} index={index}> 
                      {(magic) => (
                        <Card
                          ref={magic.innerRef}
                          {...magic.draggableProps}
                          {...magic.dragHandleProps}
                        >
                          {/* 이 dragHandleProps 가 붙어있는 <> 만 드래그가 가능 */}
                          {todoText}
                        </Card>
                      )}
                    </Draggable>
        </>
    );
};

/* export default DragabbleCard; */
export default React.memo(DragabbleCard);