import { useState } from "react";
import { useForm } from "react-hook-form";

interface IForm {
    todo : string;
    todo2 : string;
    email : string;
    todo4? : string;

}

function ToDoList() {
    const {register, handleSubmit, formState:{errors}}=useForm<IForm>({
        defaultValues : {email : "@naver.com"},
    }); 
    const onValid=(data:IForm)=>{
        console.log(data);
    };
    console.log(errors);
    
    return (
    <>
        <form
        style={{display:"flex", flexDirection:"column"}} 
        onSubmit={handleSubmit(onValid)}>
            <input placeholder="필수입력" {...register("todo", {required:true,})}/> 
            <span>{errors?.todo?.message as string}</span> {/* 안나옴 : message 설정 안했으니까 */}
            <input placeholder="10자 이상 입력" {...register("todo2", {
                required:"Password가 필요합니다", minLength:{ //type:minLength
                    value:5,
                    message:"5자 이상을 입력해주세요",
                }
                })}/> 
            <span>{errors?.todo2?.message as string}</span>
            <input placeholder="이메일을 입력해주세요" {...register("email",{
                required:"필수입력", /* 이 자체가 메시지이므로, 아무것도 입력 안했을땐 이게 보임 */
                pattern: {
                    value : /^[A-Za-z0-9._%+-]+@naver\.com$/,
                    message : "naver 이메일만 가능", /* 뭔가를 입력했을땐 이게 오류메시지가 되고 */
                }
            })}/> 
            <span>{errors?.email?.message as string}</span> {/* 이러면 위 이메일의 오류메시지가 바로 출력, 즉시 변경.. */}
            <input placeholder="write a to do" {...register("todo4")}/> 
            <button>Add</button>
           

        </form>
    </>);
}

export default ToDoList;