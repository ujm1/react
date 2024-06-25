import styled from "styled-components";
import DragabbleCard from "./DragabbleCard";
import { Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { ITodo, todoState } from "./atoms";
import { useSetRecoilState } from "recoil";

const Wrapper = styled.div`
  padding: 20px 10px; //좌우
  padding-top: 30px;
  background-color: ${(props) => props.theme.boardColor}; //theme.ts에서..
  border-radius: 5px;
  min-height: 200px;
`;

const Form = styled.div`
  width  : 100px;
`;

interface IBoardProps {
  todos: ITodo[]; //todoState
  boardId: string;
}

interface IForm {
    todo : string;
}

function Board({ todos, boardId }: IBoardProps) {
    //todos를 만질 꺼니까(추가할 꺼니까) todos를 가져온다
        const setTodos=useSetRecoilState(todoState); //atom을 set하기 위해..
      const {register, setValue, handleSubmit} = useForm<IForm>();
      const onValid = ({todo}: IForm) => { //유효성 성공시 동작시킬 함수
        const newTodo={ //추가되는 todo. atoms의 interface와 동일
            id: Date.now(),
            text: todo,
        };
        setTodos((todos)=>{
            return { //todos가 새로운 객체가 되는데 그게 뭐냐면..
                ...todos, //기존거 그대로에 + 
                [boardId] : [...todos[boardId], newTodo], //해당 boardId : [기존 boardId의 배열 + 위에서 방금 만든 새 배열.] 
                
                //newTodo를 앞에 두면, 새로작성한게 위로 옴
            }
        });
        setValue("todo",""); //성공후 초기화
      };
      return (
    <>
    <Form onSubmit={handleSubmit(onValid)}>
        <input {...register("todo", {required:true})} //useForm 제공기능 추가
        type="text" placeholder={`${boardId}에 할일 추가`}/>
    </Form>
      <Droppable droppableId={boardId}>
        {(magic) => (
          <Wrapper ref={magic.innerRef} {...magic.droppableProps}>
            {todos.map((todo, index) => (
              <DragabbleCard key={todo.id} index={index} 
              todoId={todo.id} todoText={todo.text} />
            ))}
            {magic.placeholder} {/* 벗어나도 리스트 크기 유지되게 */}
          </Wrapper>
        )}
      </Droppable>
    </>
  );
}

export default Board;
