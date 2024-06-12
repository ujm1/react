import styles from "./App.module.css";
import { useEffect, useState } from "react";


function App() {

  const [toDo, setTodo]=useState("");

  const [toDos, setTodos]=useState([]); //문자열 todo를 담는 배열
  
  const onChange= (event)=> setTodo(event.target.value); /* 변화에 대한 */

  const onSubmit= (event) => { /* 변화한걸 보내는데에 대한 */
    event.preventDefault(); /* html에서 제공하는 form 이동 막음 */

    if(toDo==='') {return;} /* 만약 비어있으면 무시 */
    /* 비어있지 않을 때는 */
    //todo를 toDos에 넣어주면 됨..
    setTodos((current)=>[...current, toDo]);     
    /* 현재 배열을 가져와, 그걸 쪼개 요소 하나 하나 넣고, 그 뒤에 toDo를 넣은 새로운 배열 [ ] 로 Todos를 세팅하는 것 */

    setTodo(''); /* 다시 비워줌 */
  };
  console.log(toDos);


  return ( 
    <>  
    <h1>my Todos {toDos.length}</h1>
    <form onSubmit={onSubmit}>
      <input type="text" placeholder="Write" value={toDo} onChange={onChange}></input>
      <button>Add to Do</button> {/* 따로 설정해주지 않아도 form 안에 있는 버튼이기에 클릭시 자동으로 form의 onSubmit으로 감 */}
    </form>
    </>
  );
}

export default App;
