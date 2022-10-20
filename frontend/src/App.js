import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Instructor from './pages/Instructor';
import Admin from './pages/Admin';
import '../src/bootstrap-5.2.2-dist/css/bootstrap.css'
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import NavBar from './components/NavBar';
import { AuthProvider } from './auth/AuthProvider';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <AuthProvider>
          <NavBar/>
          <div id="body">
            <Routes>
              <Route path="/admin" element={ <Admin />} />
              <Route path="/" element={ <Instructor/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="*" element={<NotFound/>} />
            </Routes>
          </div>
        </AuthProvider>
      </div>
    </BrowserRouter>
    
  );
}


export default App;
