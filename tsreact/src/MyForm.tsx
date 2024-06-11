import React, { useState } from "react";

type MyFormProps={
    onSubmit : (form : {name : string,
                        description:string}) => void;
} /* MyFOrmProps라는 타입을 정의할 건데 이건
onSibmit을 둘러 싼 것이고, onSUbmit은
name과 description으로 이루어진 객체인 (form) => void*/

function MyForm({onSubmit} : MyFormProps) { /* 그냥 그대로 크게보면 됨됨 */

    const [form, setForm]=useState({
        name:'',
        description:''
    });

    const {name, description} = form;
    
    const onChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name, value} = e.target;
        setForm({
            ...form,
            [name] : value
        });
    };

    const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        onSubmit(form);
        setForm({
            name:'',
            description:'',
        }); //form을 보낸 이후 form을 초기화
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="name" value={name} onChange={onChange}/>
            <input name="description" value={description} onChange={onChange}/>
            <button type="submit">등록</button>
        </form>
    );
}

export default MyForm;