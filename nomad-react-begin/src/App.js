import { BrowserRouter as Router, 
  Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Detail from "./routes/Detail";

function App() {
  
  return (
    <Router> {/* 브라우저라우터. hashRouter의 경우 주소 뒤에 #가 붙는 정도의 차이.. */}
      <Routes> {/* switch 대체 */}
        <Route path="/" element={<Home/>} /> 
        <Route path="/movie/:id" /* 동적 경로 생성을 위해 id 추가*/
        element={<Detail/>} />
      </Routes>
    </Router>
  )
}

export default App;
