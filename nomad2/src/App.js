import styled, { keyframes } from "styled-components";
 
  function App() {

    const Title=styled.h1`
      color: ${(props)=>props.theme.textColor}; //theme에 접근 가능
    `;
    
    const Wrapper=styled.div`
    display:flex;
    height: 100vh;
    width:100vw;
    justify-content: center;
    align-items: center;
    background-color: ${props=>props.theme.backgroundColor};
    `;

    return (
      <>
      <Wrapper>
          <Title>smile</Title>   
      </Wrapper>
      </>
      );

  };


export default App;
