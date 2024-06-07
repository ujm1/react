import React from "react";

import {Hello,HelloTwo} from "./Hello";
/* 이렇게 하나의 파일에서 여러개 끌어올땐 중괄호에 넣어야하는듯 */

import './App.css';
import Wrapper from "./Wrapper";
import Counter from "./Counter";
import {InputSample, InputSample2, InputSample3} from "./InputSample";
import {UserList} from "./UserList";

function App() {
  const name='react';

  const style={
    backgroundColor:'black',
    color:'aqua',
    fontSize:24,
    padding:'1rem'
  }

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
      </div>

      <div className="gray-box">{name}</div> 
      {/* 이 방식 더 많이 사용 */}
      {/* 아울러 주석도 이렇게 감싸줘야함 */}

      <Hello  //열리는 태그 안에선 주석 이렇게 사용 가능
      /> {/* 어쨌든 재료 안주면 props 없이 기본적으로 출력되고... */}

      <Hello name="react" color="red"/>

      <Wrapper>
        {/* wrapper 안에서 Hello를 넣었ㅇ드나, Hello가 보여지지 않으므로
        안에 내용물 보여지게 하기 위해서는 Wrapper({children}) 사용해야함 */}
        <Hello name="react" color="red"/>
        <Hello color/>

      </Wrapper>

      <HelloTwo name="react" color="red"/>
      <HelloTwo name="react" color="red" isSpecial
      //={true} 이렇게 props 이름만 쓰고 값 설정 생략하면 true로 간주.
      />
      <Hello color="blue"/>

      <Counter/>

      <InputSample/>

      <InputSample2/>

      <InputSample3/>

      <UserList/>

        <div>다음</div>


    </>
  );
}

export default App;