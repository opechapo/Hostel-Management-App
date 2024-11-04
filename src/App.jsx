import { Route, Routes } from 'react-router-dom'
import "./App.css";
import Header from "./Component/Header/Header";
import AdminReg from "./Component/Register/AdminReg";
import StudentReg from "./Component/Register/StudentReg";
import Login from './Component/Register/Login';
import Layout from './Component/Layout/Layout';

function App() {
  const renderRoute = () => (
    <Routes>
      <Route path='/' element={<AdminReg />}/>
      
      <Route path='/login' element={<Login />}/>
      <Route path='/studentreg' element={
        <Layout>
          <StudentReg/>
        </Layout>
        }/>
    
    </Routes>

  )
  return <> {renderRoute()} </>
;
}

export default App;
