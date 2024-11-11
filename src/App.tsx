import './App.css';
import { Users } from './users/Users';
import { Home } from './home/Home';
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import { UserDetails } from './userDetails/UserDetails';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/users' element={<Users />} />
          <Route path='users/:id' element={<UserDetails />} />
          <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
