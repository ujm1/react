import React from "react";
import { MdDelete, MdDone } from "react-icons/md";
import styled, { css } from "styled-components";
import { useTodoDispatch } from "../TodoContext";

const Remove=styled.div`
 display: flex;
  align-items: center;
  justify-content: center;
  color: #dee2e6;
  font-size: 24px;
  cursor: pointer;
  &:hover {
    color: #ff6b6b;
  }
  display: none;
`;

const TodoItemBlock= styled.div`
  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
  &:hover {
    ${Remove} {
      display: initial;
    }
  }
`;

const CheckCircle=styled.div`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  border: 1px solid #ced4da;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
  ${props =>
    props.done &&
    css`
      border: 1px solid #38d9a9;
      color: #38d9a9;
    `}
`;

const Text=styled.div`
flex: 1;
  font-size: 21px;
  color: #495057;
  ${props =>
    props.done &&
    css`
      color: #ced4da;
    `}
`;


function TodoItem({id, done, text}) { /* 리스트에서 아이템 사용,
                                        text와 done을 가져옴 */

    const dispatch=useTodoDispatch();
    const onToggle=()=>dispatch({type:'TOGGLE', id}); 
    /* 실질적으로 reducer에서 지정한 action 수행 */
    const onRemove=()=>dispatch({type:'REMOVE', id});

    return (
        <TodoItemBlock> {/* 리스트블락 안엔 각각 아이템블락으로 이루어져있음 */}
            <CheckCircle done={done} onClick={onToggle}>
              {done&&<MdDone/>}
            </CheckCircle>
            <Text done={done}>{text}</Text>
            <Remove onClick={onRemove}>
                <MdDelete/>
            </Remove>
        </TodoItemBlock>
    )
}

/* export default TodoItem; */
export default React.memo(TodoItem);
/* 다른 항목이 업데이트 될 때, 불필요한 렌더링 방지 */