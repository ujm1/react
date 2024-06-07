import React
, { useRef,
useState } from "react";

 function InputSample() {

    const [text, setText]=useState('');

    const onChange=(e)=>{
        setText(e.target.value);
    /* input의 value를 text라고 정의, 
    그래서 이벤트가 발생했을 때 input의 value를 text로 set한 것 */
    }

    const onReset=()=>{
        setText(''); //text를 초기화한다는 것
    }



    return (
        <div>
            <input onChange={onChange} value={text}/>

            <button onClick={onReset}>초기화</button>
            <div>
                <b>값: {text}</b>
            {/* 이렇듯 state 및 지역변수(const로 정한) 는
            인자와 다르게 App에서 재료로 소환하지 않는다는 점에서 props와 다름  
            즉 내부에서 사용하려고 있는 것*/}
            </div>

        </div>
    )
 }

 function InputSample2(){

    const [input, setInput] =useState({
        name:'', nickname:'' //input이라는 객체의 초기값 지정
    });

    const {name, nickname}=input; //input 정의(객체)

    const onChange=(e)=>{ 
    const {value, name} = e.target; //추출
    setInput({...input, [name]:value}) //객체 수정이므로 
    //input[name]=value; 이런 식으로 직접 하지 말고 복사
    //다시 말해 이름에선 input의 name이 value가 되는 거고
    //닉네임input에선 input의 name이 nickname이므로 input[nickname]이 value가 되는 셈
    }

    const onReset=()=>{
        setInput({name:'', nickname:''})
    }

    return (
        <>
        <div>
            <input name="name" placeholder="이름" onChange={onChange} value={name}/>
            <input name="nickname" placeholder="닉네임" onChange={onChange} value={nickname}/>
            <button onClick={onReset}>초기화</button>
            <div>
                <b>값:</b> {name} ({nickname})
            </div>
        </div>
        </>
    );
 }

 function InputSample3() {

    const [input, setInput]=useState({name:'', nickname:''})

    const nameInput=useRef(); //특정 dom 선택에 사용
    
    const {name, nickname}=input;

    const onChange=(e)=>{
        const {value, name}=e.target;
        setInput({...input, [name]:value})
    }

    const onReset=()=>{setInput({name:'', nickname:''});
    nameInput.current.focus();
    }

    return (
        <>
         <div>
      <input
        name="name"
        placeholder="이름"
        onChange={onChange}
        value={name}
        ref={nameInput} //여기서 선택하려는 Dom인 Ref 객체를 설정해주었기에, 
        //리셋 버튼 누르면 이 Ref에 포커스가 가는 것
        //위에 Ref 안쓴 InputSample2의 경우 초기화 버튼 눌러도 
        //이름으로 자동 포커스가 가지 않음
      />
      <input
        name="nickname"
        placeholder="닉네임"
        onChange={onChange}
        value={nickname}
      />
      <button onClick={onReset}>초기화</button>
      <div>
        <b>값: </b>
        {name} ({nickname})
      </div>
    </div>
        </>
    )
 }

 export {InputSample, InputSample2, InputSample3};