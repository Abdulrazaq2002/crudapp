import Home from "./page/home";
import PostMsg from "./page/post.msg";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./page/header";
import Search from "./page/search";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/postquotes' element={<PostMsg />} />
        <Route path='/search' element={<Search />} />
      </Routes>
    </Router>
  );
}

export default App;
