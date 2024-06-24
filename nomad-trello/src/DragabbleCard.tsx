import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div`
  background-color: ${(props) => props.theme.cardColor};
  border-radius: 5px;
  padding: 10px 10px;
  margin-bottom: 5px;
`;

interface IDragabbleCardProps {
    todo : string;
    index : number;
}

function DragabbleCard({todo, index}:IDragabbleCardProps) {

    return (
        <>
        <Draggable key={todo} draggableId={todo} index={index}> 
                      {(magic) => (
                        <Card
                          ref={magic.innerRef}
                          {...magic.draggableProps}
                          {...magic.dragHandleProps}
                        >
                          {/* 이 dragHandleProps 가 붙어있는 <> 만 드래그가 가능 */}
                          {todo}
                        </Card>
                      )}
                    </Draggable>
        </>
    );
};

export default DragabbleCard;