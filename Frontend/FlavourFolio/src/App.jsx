import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Restaurant from './pages/Restaurant';
import '@radix-ui/themes/styles.css';

function App() {
  return (
    <>
      <Routes>
        <Route exact path='/' element={<HomePage />} />
        <Route path='/Login' element={<Login/>} />
        <Route path='/restaurant/:restaurant_name' element={<Restaurant/>} />
      </Routes>
    </>
  );
}

export default App;
