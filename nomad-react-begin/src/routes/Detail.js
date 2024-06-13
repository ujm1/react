import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Detail() {

    const x=useParams();  //App에서 라우팅시 보낼 인자를 말함
    //즉 여기서 x는 {id : 19191} 이런 값이 됨

    //구조 분해 하면
    const {id}=useParams();
    //이러면 id 콘솔 찍으면 19191 바로 나오는 셈이고.

    const getMovie= async() => {
        const json = await (
            await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
        ).json();
        const movies=json.data.movie;
        console.log(movies);
    }; 

    useEffect(()=>{
        getMovie();
    },[]);

    return (
        <>
        detail~~~~
        </>
    );
}

export default Detail;