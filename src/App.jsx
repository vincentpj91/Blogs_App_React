import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Posts from "./routes/Posts";
import PostDetails from "./routes/PostDetail";
import "antd/dist/antd.min.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Posts />} />
          <Route exact path=":postId" element={<PostDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
