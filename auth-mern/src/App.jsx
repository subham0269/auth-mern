import { Route, Routes } from 'react-router-dom'
import Login from './Pages/Auth/Login'
import Signup from './Pages/Auth/Signup'

function App() {

  return (
    <>
      {/* <Login/> */}
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
      </Routes>
    </>
  )
}

export default App
