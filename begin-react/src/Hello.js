import React from "react";

function Hello(props) {
    return (
        <>
        <div>안녕하세요 {props.name}</div>
        {/* App.js에서 재료로 name 설정 */}

        <div style={{color:props.color}}>재료</div>

        </>
    )
}

Hello.defaultProps= {
    name:'기본프롭'
} /* 재료로 prop 안먹였을 때 */

 

function HelloTwo({color, name, isSpecial}) {
    return <>
    <div style={{color}}>구조분해 {name} 
    {isSpecial? <b>*</b> : null}</div>
    {/* 또는 
    {isSpecial && <b>*</b> } 
    */}
    </>
} 

export {Hello, HelloTwo};
