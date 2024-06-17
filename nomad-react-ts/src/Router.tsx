import {createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import About from "./screens/About";
import Home from "./screens/Home";
import NotFound from "./screens/NotFound";
import User from "./screens/users/User";
import Followers from "./screens/users/Followers";


const router = createBrowserRouter(
    [
        {
            path:"/",
            element:<Root/>, /* App을 바꾼 것. 전체적인... */
            /* 헤더도 Root에 넣음 */
            children: [
                {
                    path: "",
                    element : <Home/>, //Root에서 oulet을 통해 최초로 노출되는
                    //즉 주소로 localhost:3000/
                },
                {
                    path: "about", //주소로 localhost:3000/about
                    element: <About/>,
                },
                {
                    path: "users/:userId", //동적이동, 이렇게 페이지 안의 페이지를 
                    //따로 빼지 않고 한번에 작성 가능
                    element: <User/>, //User에서 useParams로 받고 있음 .
                    /* Home에서 user.id를 key로 보냈기 때문, 이걸 여기선 userId로 받은 것 */

                    children: [
                        {
                            path:"followers", //users/:usrId/followers
                            element: <Followers/>
                        },
                    ],
                },
                //만약 users 페이지를 보여주고, 또 그 페이지 안에서 다른 페이지로 이동시키는 그런 식으로 구현하려했다면
                // {path : "users", element, children: [{path:":userId", element:<User/> }]}...
                //이렇게 해야했겠으나, 그게 아니니 지금은 이정도로만..
            ],
            errorElement:<NotFound/>,
        },
        
    ]
);

function Router() {
    return (
        <>

        </>
    )

};

export default router;