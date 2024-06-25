import { atom, selector } from "recoil";

export interface ITodo {
    id : number;
    text: string;
}

interface IToDoState {
    [key: string] : ITodo[]; // 우측에 놓이던 배열을 id : text의 객체로 재변경
}

//todos는 string : array 꼴의 객체. key는 string. array 또한 string의 배열.
export const todoState=atom<IToDoState>({ 
    key:"todo", //atom에서 쓰는, atom을 정의하는 식별자(아이덴티티, 정체성)
    //리액트에서 관리할 떄 쓰는 거지, 개발자가 꺼내 쓸 일은 많지 않아. 

    default: { //초기 설정. (기본 메뉴)
        to_do : [],
        doing:[],
        done:[],
    },
});