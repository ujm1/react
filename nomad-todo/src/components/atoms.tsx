import { atom, selector } from "recoil";

export enum Categories {
    "TO_DO", //이름은 임의로 지은 거고, 실제 코드에서의 값은 0
    "DOING", //1
    "DONE", //2. 다시 말해 이를 참조하는 곳에서 Categories.DONE 이라고 쓰는 것과 2 라고 쓰는 것은 동일
    //그러므로 이를 숫자가 아닌 String으로 바꾸고 싶다면, "DONE" = "DONE" 이런 식으로 해주면 됨
}


export interface ITodo { //todo의 타입
    text : string;
    id : number;
    category : Categories; //string에서도 이것만 받겠다고 제한.
}

export const todoState = atom<ITodo[]>({ //todo들의 배열을 atom으로. 즉 전역 스테이트로 하겠다. todos
    key: "todo",
    default : [], //배열
});

export const categoryState = atom<Categories>({
    key:"category",
    default: Categories.TO_DO,
});

export  const todoSelector=selector({
    key : "todoSelector",
    get: ({get}) => {
        const todos = get(todoState);
        const category = get(categoryState);
        return todos.filter((todo)=>todo.category === category); //카테고리가 같은 todo만...
    } 
});

