import { DefaultTheme } from "styled-components"; //styled.d.ts의 인터페이스 가져옴

export const lightTheme:DefaultTheme= { //타입(인터페이스) 는 export한걸 
    //import 해왔으므로 여기서 지정해주지 않았다
    bgColor :  "white",
    textColor: "black",
    btnColor: "tomato"
};

export const darkTheme : DefaultTheme = {
    bgColor : "black", 
    textColor : "white",
    btnColor : "teal"
};