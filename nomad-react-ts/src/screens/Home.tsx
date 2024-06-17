import { Link, useSearchParams } from "react-router-dom";
import { users } from "../db";

function Home() {
    const [readSearchParams, setSearchParams] = useSearchParams();
    //이건 검색에 대한 다양한 기능을 제공. 가령...
    console.log(readSearchParams.get("geo")); //이렇게 하면, 검색(주소창)에서 get=111 뭐 이런 식으로
    //검색한게 뭔지 알려준다던가.
    setTimeout(()=>{setSearchParams({
        day:'today', tomorrow:"123"
    })}, 3000); //페이지에서 3초 후에 /?day=today&tomorrow=123 으로 이동시킴
    return (
        <>
            <h1>Users</h1>
            <ul>
                {users.map((user)=>(
                <li key={user.id}>
                    <Link to={`/users/${user.id}`}>{user.name} </Link>
                </li>
                ))}
            </ul>
        </>
    );
}

export default Home;