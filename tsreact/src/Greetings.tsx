import React from "react";

type GreetingsProps= {
    name:string;
    mark:string;
    opt?:string;
    onClick:(name:string)=>void;
}

function Greetings({name,mark,opt, onClick} : GreetingsProps) {
    
    const handleClick=()=>onClick(name);
    
    return (
        <div>
            Hello, {name} {mark}
            {opt&&<p>{opt}</p>}
        
            <div>
                <button onClick={handleClick}>Click Me</button>
            </div>
        </div>
        
    )

};

Greetings.defaultProps={
    mark:'!'
}


export default Greetings;