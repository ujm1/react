import { useOutletContext } from "react-router-dom";

interface IFollowersContext {
    nameOfMyUser : string;
}

function Followers() {

    const {nameOfMyUser}=useOutletContext<IFollowersContext>(); 

    return <h1>{nameOfMyUser}의 Followers</h1>
};

export default Followers;