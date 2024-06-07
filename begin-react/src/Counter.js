import React, { useState } from "react";

function Counter() {
    const [num, setNum]=useState(0);

    const onIncrease=()=>{
        /*  setNum(num+1) */
        setNum(num=>num+1); //이렇게 쓰는게 더 일반적

    }

    const onDecrease=()=>{
        /*  setNum(num-1); */
        setNum(num=>num-1);


    }

    return <>
    <h1>
        {num}
    </h1>

    <button onClick={onIncrease}>+1</button>

    <button onClick={onDecrease}>-1</button>

    </>
}

export default Counter;