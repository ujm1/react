import React from "react";

function User({user}) {
    return (
        <>
            <div>
                <b>{user.username}</b> <span>({user.email})</span>

            </div>
        </>
    )
}

function UserList() {

    const users=[
        {
            id:1, username:'velopert', email:'public.velopert@gmail.com'
        },
        {
            id:2, username:'tester', email:'tester@gmail.com'
        },
        {
            id:3, username:'liz', email:'liz@gmail.com'
        }
    ];

    return (
        <>
        <User user={users[0]}/> {/* 자동적으로 users 배열의 하나하나를 
        (prop처럼) user로 인식해, user[0]하면 배열의 첫번째 객체를 인식하고, 
        그래서 user.username 같은것들이 먹는 것 */}
        <User user={users[1]}/>
        {/* 이렇게 해도 되지만 번거로우므로.. map을 사용하면 */}
        <br></br>
        {users.map(user=>(<User user={user} key={user.id}/>))}
        {/* 배열에 map 먹여서 안의 user 하나하나를 저 함수에 먹이는 셈 */}
        {/* 배열은 고유 key 값을 넣어주는 것이 좋다. */}
        </>
    )

}

export {UserList};