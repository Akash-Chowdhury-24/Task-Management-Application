import AuthPage from './pages/auth'
import TaskPage from './pages/task'
import ScrumBoardPage from './pages/srumboard'
import { Navigate, Route, Routes } from 'react-router-dom'

import CommonLayout from './components/commonlayout'
import PriorityScrumBoard from './pages/priorityScrumBoard'
import StatusScrumBoard from './pages/statusScrumBoard'
import BackgroundAnimation from './components/backgroundAnimation'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PageNotFound from './components/pageNotFound'
import { useContext } from 'react'
import { TaskManagmentContext } from './context/taskManagementContext'

function App() {

  const{user} = useContext(TaskManagmentContext);
  return (
    <>
      <BackgroundAnimation />
      <Routes>
        <Route path="/" element={user ? <Navigate to="/task/list" /> : <Navigate to="/auth" />} />

        <Route path="*" element={<PageNotFound />} />
        <Route path="/auth" element={<AuthPage />} />

        {/* here we a creating a common layout which will appear on both the scrumboard and task list page so that we dont need to make the same thing again and again in all the pages 
      so here the CommonLayout is the parent component and the path /task/list will show the commonLayout and the taskpage and the path /task/scrumboard will show the commonLayout and the srumboard page andthe path /task will just show the commonlayout (on how this children and parent relation is executing see the component CommonLayout ) */}
        <Route path="/task" element={<CommonLayout />} >
          <Route path="list" element={<TaskPage />} />
          <Route path='scrumBoard' element={<ScrumBoardPage />}>
            <Route path='status' element={<StatusScrumBoard />} />
            <Route path='priority' element={<PriorityScrumBoard />} />
          </Route>
        </Route>
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
