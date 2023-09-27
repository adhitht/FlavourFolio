import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';

function App() {
  return (
    <>
      <Routes>
        <Route exact path='/' element={<HomePage />} />
        <Route path='/somepath' element={<></>} />
        {/* Add more routes as needed */}
      </Routes>
    </>
  );
}

export default App;
