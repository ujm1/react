import { Outlet } from "react-router-dom";
import Header from "./components/Header";



function Root() {

 

  return (
    <>
    root <Header/>
      <Outlet/>
    </>
    );

}

export default Root;
