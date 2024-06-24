import { useSetRecoilState } from "recoil";
import { ITodo, todoState } from "./atoms";
import { Categories } from "./atoms";

function Todo({text, category, id} : ITodo) {
    
    const setTodos=useSetRecoilState(todoState); //밖에서 선언한 atom 가져옴
    
    const onClick= (event:React.MouseEvent<HTMLButtonElement>) => {
        const {
            currentTarget : {name},
        } = event;

        setTodos((oldTodos)=>{
            const targetIndex = oldTodos.findIndex(todo=>todo.id===id);

            const newTodo={text, id, category:name as any}; 
            
            return [...oldTodos.slice(0,targetIndex), newTodo, ...oldTodos.slice(targetIndex+1)];
        });
        
    };
    return (
    <>
        <li>
        <span>{text} </span>
        {category !==Categories.TO_DO && <button name={Categories.TO_DO+""} onClick={onClick}>To Do</button>} 
        {/* name이 string 이어야 하는데 Enum이 가리키는 값이 숫자이므로 에러발생 : 단순하게 문자열로 전환   */}
        {category !== Categories.DOING && <button name={Categories.DOING+""} onClick={onClick}>Doing</button>}
        {category !== Categories.DONE && <button name={Categories.DONE+""} onClick={onClick}>Done</button>}
        </li>
    </>
    );
}

export default Todo;