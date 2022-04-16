import { Routes, Route } from 'react-router-dom';
import Home from './routes/home/home.component';
import Navbar from './routes/navbar/navbar.component';
import Login from './routes/login/login.component';

const App = () => {

  return (
    <Routes>
      <Route path='/' element={ <Navbar /> }>
        <Route index element={<Home />}/>
        <Route path='/login' element={<Login />}/>
      </Route>
    </Routes>
  );
}

export default App;
