import {useForm} from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, todoState } from "./atoms";

export interface IForm { //form 서식에서 입력하는 것들. 입력의 value의 이름을 todo로 했을 뿐
    todo : string;
}

function CreateTodo() {

    const setTodos=useSetRecoilState(todoState);

    const category=useRecoilValue(categoryState);

    const {register, handleSubmit, setValue}=useForm<IForm>();

    const handleValid = ({todo}:IForm) => { //입력값 받아서..
        setTodos((oldTodos)=>[{text:todo, id:Date.now(), category: category}, ...oldTodos]); 
        //기존 배열에, 새로운 todo를 더해 새로운 배열을 만들어 이를 todos라 함
        //마지막으로 넣은게 0으로 간다. 
        setValue("todo", ""); //input의 value인 todo를 초기화
    };

return (
    <>
    <form onSubmit={handleSubmit(handleValid)}>
            <input {...register("todo", {
                required:"must write",

            })} placeholder="write..." />
            <button>Click</button>
        </form>
    </>
);
}

export default CreateTodo;