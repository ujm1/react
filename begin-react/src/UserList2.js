import React, { useContext } from "react";
import { UserDispatch } from "./App2";

const User=React.memo(
    function User({ user}) {

    const dispatch=useContext(UserDispatch); 

  return (
    <>
      <div>
        <b
          style={{
            cursor: "pointer",
            color: user.active ? "green" : "black",
          }}
          onClick={() => dispatch({type:'TOGGLE_USER', id: user.id})}
        >
          {user.username}
        </b>
        <span>({user.email})</span>
        <button onClick={() => dispatch({type:'REMOVE_USER', id:user.id})
      }>삭제</button>
        {/* 등록과 달리 유저 하나하나마다 삭제버튼 부여해야 하므로 유저리스트에 추가한다. */}
      </div>
    </>
  );
});

function UserList({ users, onRemove, onToggle }) {
  /* 이 users는 App.js에서 users로 보낸,
App.js에서 usersTwo로 준 배열이 되고 */

  return (
    <>
      {users.map((user /* 배열 안 각각의 객체이며, */) => (
        <User
          user={user} /* 이건 위에서의 User user */
          key={user.id}
        />
      ))}
    </>
  );
}

export default React.memo(UserList);
