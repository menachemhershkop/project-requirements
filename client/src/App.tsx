import {  Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './Components/Layout'
import LoginPage from './pages/LoginPage'
import MyReportPage from './pages/MyReportsPage'
import CSVUploadPage from './pages/CSVUploadPage'
import NewReportPage from './pages/NewReportPage'
import AdminDashboard from './pages/AdminDashboard'
import AdminRepotrsPage from './pages/AdminRepotrsPage'
import AgentDashboard from './pages/AgentDashboard'
import Home from './pages/Home'
import AdminUsersPage from './pages/AdminUsersPage'

function App() {
 

  return (
    <>
    <>
      <Routes>
       <Route path='/' element={<Layout/>}>
        <Route index element={<Home/>}></Route>
        <Route path='/LoginPage' element={<LoginPage/>}></Route>
        <Route path='/MyReportsPage' element={<MyReportPage/>}></Route>
        <Route path='/CSVUploadPage' element={<CSVUploadPage/>}></Route>
        <Route path='/NewReportPage' element={<NewReportPage/>}></Route>
        <Route path='/AdminDashboard' element={<AdminDashboard/>}></Route>   
        <Route path='/AdminUsersPage' element={<AdminUsersPage/>}></Route>       
        <Route path='/adminReportsPage' element={<AdminRepotrsPage/>}></Route>
        <Route path='/agentDashboard' element={<AgentDashboard/>}></Route>
        </Route>
      </Routes>
    </>
    
    </>
  )
}

export default App
