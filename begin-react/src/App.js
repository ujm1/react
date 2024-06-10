import React from "react";

import {Hello,HelloTwo} from "./Hello";
/* 이렇게 하나의 파일에서 여러개 끌어올땐 중괄호에 넣어야하는듯 */

import './App.css';
import Wrapper from "./Wrapper";
import Counter from "./Counter";
import {InputSample, InputSample2, InputSample3} from "./InputSample";
import {UserList, UserListTwo} from "./UserList";

function App() {

  /* 이 안에서 쓸 변수 */
  const name='react';

  const style={
    backgroundColor:'black',
    color:'aqua',
    fontSize:24,
    padding:'1rem'
  }

  /* 배열 useRef에서 사용 */
  const usersTwo=[
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com'
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com'
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com'
    }
  ]

  return (
    <>
      <Hello/>
      <div style={style}>
      {name}
      {/* 위에서 설정한 변수 사용 */}
      </div>

      {/* App.css에서 지정 */}
      <div className="gray-box">{name}</div> 
      {/* 이 방식 더 많이 사용 */}

      <Hello  //열리는 태그 안에선 주석 이렇게 사용 가능
      /> {/* 어쨌든 재료 안주면 props 없이 기본적으로 출력되고... */}

      <Hello name="react" color="red"/>
      {/* props로 보냄. props로 보내지 않은 위의 기본 Hello는 기본값이 지정 */}

      <Wrapper>
        {/* wrapper 안에서 Hello를 넣었ㅇ드나, Hello가 보여지지 않으므로
        안에 내용물 보여지게 하기 위해서는 Wrapper({children}) 사용해야함 */}
        <Hello name="react" color="red"/>
        <Hello color/>

      </Wrapper>

      <HelloTwo name="react" color="red"/>
      {/* isSpecial을 쓰지 않았으므로 그건 없는 취급, 즉 *이 표시되지 않음 */}
      <HelloTwo name="react" color="red" isSpecial/>
      {/*{true} 이렇게 props 이름만 쓰고 값 설정 생략하면 true로 간주.
      그래서 *이 표시됨 */}
      <Hello color="blue"/>

      {/* State 쓰기 */}
      <Counter/>

      <InputSample/>

      <InputSample2/>

      {/* Ref */}
      <InputSample3/>

      {/* 배열 */}
      <UserList/>

        <div>다음</div>

      <UserListTwo users={usersTwo}/>



    </>
  );
}

export default App;