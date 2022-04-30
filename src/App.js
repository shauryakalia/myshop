import { Routes, Route } from 'react-router-dom';
import Home from './routes/home/home.component';
import Navbar from './routes/navbar/navbar.component';
import Authentication from './routes/authentication/authentication.component';
import Shop from './routes/shop/shop.component';

const App = () => {

  return (
    <Routes>
      <Route path='/' element={ <Navbar /> }>
        <Route index element={<Home />}/>
        <Route path='/login' element={<Authentication />}/>
        <Route path='/shop' element={<Shop />}/>
      </Route>
    </Routes>
  );
}

export default App;
