import { useState } from 'react'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from "/src/components/Layout/Layout.tsx"
import User from "/src/page/user/User.tsx"
import './App.css'

const queryClient = new QueryClient();
function App() {


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
              // ) : 
              (
                <Layout />
              )
            }
          >
            <Route path="/user" element={<User />} />
            {/* <Route path="/oi-contest" element={<OIContestList />} />
            <Route path="/oi-contest/:_id" element={<OIContestManagement />} />
            <Route path="/video" element={<VideoList />} />
            <Route path="/chapter" element={<ChapterList />} />
            <Route path="/chapter/:cid" element={<ChapterManagement />} />
            <Route path="/problemlist" element={<ProblemlistList />} />
            <Route
              path="/problemlist/:plid"
              element={<ProblemListManagement />}
            />
            <Route path="/level" element={<LevelList />} />
            <Route path="/level/:_id" element={<LevelManagement />} />
            <Route path="/stage" element={<StageList />} />
          <Route path="/stage/:_id" element={<StageManagement />} />*/}
          </Route> 
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </BrowserRouter>
      </QueryClientProvider>
  )
}

export default App
