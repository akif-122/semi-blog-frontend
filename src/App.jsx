import Header from "./components/Header"
import { Routes, Route } from "react-router-dom"
import Blog from "./pages/Blog"
import Login from "./pages/Login"
import Register from "./pages/Register"
import UserBlog from "./pages/UserBlog"
import CreateBlog from "./pages/CreateBlog"
import EditBlog from "./pages/editBlog"
function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Blog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user-blog" element={<UserBlog />} />
        <Route path="/create-blog" element={<CreateBlog />} />
        <Route path="/edit-blog/:id" element={<EditBlog />} />
      </Routes>
    </>
  )
}

export default App
