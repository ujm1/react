
import React, { useEffect, useState } from "react";
import axios from "axios";


function Users() {
    const [users, setUsers]=useState(null);
    const [loading, setLoading]=useState(false);
    const [error, setError] = useState(null);

    const fetchUsers= async() => {
        try {
            setError(null); //초기화
            setUsers(null); //초기화

            setLoading(true); /* 이것도 그냥 기본값 true로 지정한 것 */

            const response= await axios.get(
                'https://jsonplaceholder.typicode.com/users'
            );
            setUsers(response.data);

        } catch(e) {
            setError(e);
        }
        
        setLoading(false); /* 비동기로 받아오고 나서 로딩을 false로 만드는 */
        /* 로딩이 끝났으므로.. */
    };

    useEffect( () => { /* 첫 마운트  */
        fetchUsers();
        }, []

    ); /* useEffect 끝 */

    if(loading) return <div>로딩중...</div>;

    if(error) return <div>에러가 발생했습니다</div>;
    /* https://jsonplaceholder.typicode.com/users/showmeerror 를 넣었을 떄  */

    if(!users) return null;
    /* users가 없을때 null */
    /* 정상적으로 받아오면, users가 존재하므로, null이 뜨지 않음  */

    return (
        <>
        <ul>
            {users.map(user=>(
                <li key={user.id}>
                    {user.username} ({user.name})
                </li>
            ))}
        </ul>
        <button onClick={fetchUsers}>다시 불러오기</button>
        </>
        )
    }

export default Users;
/* 결과적으로 로딩 끝나고 response의 data를 받아 users라고 정하고, 
이후 user로 쪼개 해당 name과 username을 뿌려줌 */