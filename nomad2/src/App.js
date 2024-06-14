import styled from "styled-components";
 
  function App() {
    
    const Father=styled.div`
      display: flex; //div붙여줌
      `;

      const Box=styled.div`
      background-color: ${(props)=>props.bgcolor};
      width:100px;
      height:100px;
      `;

      const Circle=styled(Box)` //Box 그대로 복사, 동적설정한 prop 포함..
      border-radius:50px;
      `;

      const Text =styled.span`
      color: white;
      `;

    return (
      <>
      <Father>
        <Box bgcolor="Teal"> 
          <Text>Hello</Text>
        </Box>
        <Circle bgcolor="Orange"/>
      </Father>
      </>
      );

  };


export default App;
