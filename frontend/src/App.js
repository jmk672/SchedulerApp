import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Instructor from './pages/Instructor';
import Admin from './pages/Admin';
import '../src/bootstrap-5.2.2-dist/css/bootstrap.css'
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import { PrivateRoute } from './auth/PrivateRoute';
import NavBar from './components/NavBar';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* <NavBar/> I think I want context */}
          <div id="body">
            <Routes>
              <Route path="/admin" element={
                <PrivateRoute redirectTo="/login">
                  <Admin />
                </PrivateRoute>} />
              <Route path="/" element={
                <PrivateRoute redirectTo='/login'>
                  <Instructor/>
                </PrivateRoute>} />
              <Route path="/login" element={<Login/>} />
              <Route path="*" element={<NotFound/>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
    
  );
}


export default App;
