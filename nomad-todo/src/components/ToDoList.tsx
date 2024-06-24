
import { Categories, categoryState, todoSelector, todoState } from "./atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import CreateTodo from "./CreateToDo";
import Todo from "./Todo";





function ToDoList() {         
    
    const todos=useRecoilValue(todoSelector); 

    const [category, setCategory] = useRecoilState(categoryState);


    const onInput = (event:React.FormEvent<HTMLSelectElement>) => {
       setCategory(event.currentTarget.value as any);
    };

    return (
    <><h1>To Dos... </h1> 
    <hr/>
        <select value={category} onInput={onInput}>
            <option value={Categories.TO_DO}>To Do</option>
            <option value={Categories.DOING}>Doing</option>
            <option value={Categories.DONE}>Done</option>
        </select>
        <CreateTodo/> {/* form 관련 분리 */}
        {todos?.map((todo)=>(
            <Todo key={todo.id} {...todo}/>
        ))}
    </>);
}

export default ToDoList;