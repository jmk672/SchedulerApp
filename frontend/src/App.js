import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Instructor from './pages/Instructor';
import Admin from './pages/Admin';
import '../src/bootstrap-5.2.2-dist/css/bootstrap.css'
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import NavBar from './components/NavBar';
import { AuthProvider } from './auth/AuthProvider';
import AdminNav from './components/AdminNav';
import InstructorNav from './components/InstructorNav';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <AuthProvider>
          <NavBar/>
            <div className="row">
              <div className="col-md-3 col-lg-2 p-0 ps-2 border min-vh-100 ">
                <Routes>
                  <Route path='/admin/*' element={ <AdminNav /> } />
                  <Route path='/instructor/*' element={ <InstructorNav /> } />
                  <Route path='*' element={<div/>}/>
                </Routes>
              </div>
              <div className="col-md-9 col-lg-10 border-top">
                <Routes>
                  <Route path="/admin/home" element={ <Admin />} />
                  <Route path="/admin/addUser" element={ <h1>Add user</h1>} />
                  <Route path="/admin/addExam" element={ <h1>Add new exam</h1>} />
                  <Route path="/admin/schedule" element={ <h1>Schedule makeup</h1>} />
                  <Route path="/instructor/home" element={ <Instructor/>} />
                  <Route path="/login" element={<Login/>} />
                  <Route exact path="/" element={<Login/>} />
                  <Route path="/404/" element={<NotFound/>} />
                  <Route path="*" element={<Navigate to="/404"/>} />
                </Routes>
              </div>
            </div>
        </AuthProvider>
      </div>
    </BrowserRouter>
    
  );
}


export default App;
