import { LayoutRouteProps, Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './Components/Layout'
import LoginPage from './pages/LoginPage'
import MyReportPage from './pages/MyReportPage'
import CSVUploadPage from './pages/CSVUploadPage'
import NewReportPage from './pages/NewReportPage'
import AdminDashboard from './pages/AdminDashboard'
import AdminREpotrsPage from './pages/AdminREpotrsPage'
import AgentDashboard from './pages/AgentDashboard'
import Home from './pages/Home'

function App() {
 

  return (
    <>
       <Layout>
      <Routes>
       
        <Route path='/' element={<Home/>}></Route>
        <Route path='/LoginPage' element={<LoginPage/>}></Route>
        <Route path='/MyReportsPage' element={<MyReportPage/>}></Route>
        <Route path='/CSVUploadPage' element={<CSVUploadPage/>}></Route>
        <Route path='/NewReportsPage' element={<NewReportPage/>}></Route>
        <Route path='/AdminDashboard' element={<AdminDashboard/>}></Route>   
        <Route path='/adminReportsPage' element={<AdminREpotrsPage/>}></Route>
        <Route path='/agentDashboard' element={<AgentDashboard/>}></Route>
               
      </Routes>
    </Layout>
    </>
  )
}

export default App
