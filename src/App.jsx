// import { Route, Routes } from 'react-router-dom'
import './App.css'
import AdminReg from './Component/Register/AdminReg'
import StudentReg from './Component/Register/StudentReg'

function App() {
  // const renderRoute = () => {
  //   <Routes>
  //     <Route path='/' element={<AdminReg/>}>
  //     </Route>
  //   </Routes>

  // }
  return (
    <>
     {/* <AdminReg/> */}

     <StudentReg/>
    </>
  )
}

export default App