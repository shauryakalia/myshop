import { Routes, Route } from 'react-router-dom';
import Home from './components/routes/home/home.component';
import Navbar from './components/routes/navbar/navbar.component';

const App = () => {

  return (
    <Routes>
      <Route path='/' element={ <Navbar /> }>
        <Route index element={<Home />}/>
      </Route>
    </Routes>
  );
}

export default App;
