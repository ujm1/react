import React, { useRef, useReducer, useMemo, useCallback } from 'react';
import UserListTwo from './UserList2';
import CreateUser from './CreateUser';
import useInputs from './hooks/useInputs';

function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는중...');
  return users.filter(user => user.active).length;
}

const initialState = {
  users: [
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com',
      active: true
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com',
      active: false
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com',
      active: false
    }
  ]
};

function reducer(state, action) {
  switch (action.type) {
    /* 컨텍스트 : dispatch에 먹였으므로 이 case(type)을 사용할 수 있다. 
    user.id만 있으면 */
    case 'CREATE_USER':
      return {
        users: state.users.concat(action.user)
      };
    case 'TOGGLE_USER':
      return {
        users: state.users.map(user =>
          user.id === action.id ? { ...user, active: !user.active } : user
        )
      };
    case 'REMOVE_USER':
      return {
        users: state.users.filter(user => user.id !== action.id)
      };
    default:
      return state;
  }
}

/* context로 내보낼 UserDispatch 변수 선언, 이제 사용할 것 */
export const UserDispatch=React.createContext(null); 

function App2() {
  const [{ username, email }, onChange, reset] = useInputs({
    username: '', /* 이 2개가 */
    email: '' /* initialForm으로 들어감 */
    /* onChange, reset은 useInputs에서 정의한 콜백이고.. */
  });
  const [state, dispatch] = useReducer(reducer, initialState);
  const nextId = useRef(4);

  const { users } = state;

  const onCreate = useCallback(() => {
    dispatch({
      type: 'CREATE_USER',
      user: {
        id: nextId.current,
        username,
        email
      }
    });
    reset(); /* input 값 초기화 */
    nextId.current += 1;
  }, [username, email, reset]);

/* 전달할 필요 없으니 onToggle과 onRemove 지움 */

  const count = useMemo(() => countActiveUsers(users), [users]);
  return (
    /* 전역 UserDispatch 사용. 그냥 리듀서에 먹인다 */
    <UserDispatch.Provider value={dispatch}>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserListTwo users={users} 
      /* 여기서도 onToggle onRemove 이제 안쓸거니 지움. */
      /* onToggle={onToggle} onRemove={onRemove} */ />
      <div>활성사용자 수 : {count}</div>
    </UserDispatch.Provider>
  );
}

export default App2;