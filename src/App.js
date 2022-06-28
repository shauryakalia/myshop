import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {onAuthStateChangedListener, createUserDocumentFromAuth} from './utils/firebase/firebase.utils';
import Home from './routes/home/home.component';
import Navbar from './routes/navbar/navbar.component';
import Authentication from './routes/authentication/authentication.component';
import Shop from './routes/shop/shop.component';
import Checkout from './routes/checkout/checkout.component';

import { setCurrentUser } from './store/user/user.action';


const App = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      dispatch(setCurrentUser(user));
      if (user) {
        createUserDocumentFromAuth(user);
      }
    });

    // this will run when component unmounts
    return unsubscribe;
  }, []);

  return (
    <Routes>
      <Route path='/' element={<Navbar />}>
        <Route index element={<Home />} />
        <Route path='login' element={<Authentication />} />
        <Route path='shop/*' element={<Shop />} />
        <Route path='checkout' element={<Checkout />} />
      </Route>
    </Routes>
  );
}

export default App;
