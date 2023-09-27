import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';

function App() {
  return (
    <>
      <Routes>
        <Route exact path='/' element={<HomePage />} />
        <Route path='/Login' element={<Login/>} />
        {/* Add more routes as needed */}
      </Routes>
    </>
  );
}

export default App;
