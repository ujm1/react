import React from 'react';
import './App.css';
import Greetings from './Greetings';
import Counter from './Counter';
import MyForm from './MyForm';

function App() {

  const onSubmit=(form:{
    name:string; description:string}) => {
    console.log(form);
  }; //form이란걸 정의할건데 form은 name과 
  //description으로 이루어진 객체

  return (
    <>
    <MyForm onSubmit={onSubmit} />
    </>
  );
}

export default App;
