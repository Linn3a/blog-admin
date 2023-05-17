import { useState } from 'react'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import axios from 'axios'
import Layout from "/src/components/Layout/Layout"
import User from "/src/page/User/User"
import Category from '/src/page/Category/Category';
import Comment from '/src/page/Comment/Comment';``
import TagManagement from './page/Tag/TagManagement';
import Login from './page/Login/Login';
import Passage from './page/Passage/Passage';

const queryClient = new QueryClient();
function App() {
  const [isLogin,setIslogin] = useState(false);
  const [isRoot,setIsRoot] = useState(false);
  let Token = localStorage.getItem("ACCESS_TOKEN");
  console.log(Token);
  
  if(Token != undefined && Token != null ){
    axios.post('autologin',{Token})
    .then(res => {
      if(res.data.state.ok) {
        setIslogin(true)
        // if(res.data.data == 1) 
        console.log(res.data.data);
        if(res.data.data.id == 1)
        {
          setIsRoot(true)
        } 
      else setIslogin(false)
    }})  
  }

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/login" element={<Login />} /> */}
          <Route
            path="/"
            element={
              // !localStorage.getItem("sid") ? (
              //   <Navigate
              //     to={"/login?redirect=" + location.pathname}
              //     replace={true}
              //   />
              // ) 
              isLogin?
              <Layout />:
              
                <Login setIslogin={setIslogin} />
              
            }
          >
            <Route path="/user" element={<User />} />
            <Route path="/category" element={<Category />} />
            <Route path="/tag"   element={<TagManagement/> } />
          <Route path='/passage' element={<Passage/>} />
              <Route path='/passage/:id' element={<Comment />}/>
          </Route> 
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </BrowserRouter>
      </QueryClientProvider>
  )
}

export default App
