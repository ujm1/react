import { Link, Outlet, useParams } from "react-router-dom";
import { users } from "../../db";

function User() {
    const {userId}= useParams(); //Router에서 /:userId로 보낸 것

    return (
        <>
        <h2>
        UserId {userId} is named {users[Number(userId)-1].name}
        </h2>
        <hr/>
        <Link to="followers">See followers</Link> {/* 이렇게 해야 users/1/followers
        이렇게 정상적으로 이동함. 만약 /followers라고 하면, /는 절대 경로이므로 /followers로 이동 */}
        <Outlet  /* User의 child를 render하게됨. child 지정은 router에서 하고.. */
        context={{nameOfMyUser:  users[Number(userId)-1].name}}/> 
        {/* params 보낸 것과 마찬가지이나 outlet에서 보내는 방법 */}
        </> 
    )
};

export default User;