import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './layouts/home/index';

import ProductsModule from './layouts/products/index';
import { ProductProvider } from './context/ProductContext'

import UsersModule from './layouts/users/index'; 
import { UserProvider } from './context/UserContext'

import { AuthProvider } from './context/AuthContext';
import LoginForm from './layouts/auth/LoginForm';
import RegisterForm from './layouts/auth/RegisterForm';

import './App.css';

function App() {
  return (
    <Router>
        <AuthProvider>
          <Fragment>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path='/inicio-sesion' element={<LoginForm/>}/>
              <Route path='/registro' element={<RegisterForm/>}/>
              <Route
                path="/productos/*"
                element={
                  <ProductProvider>
                    <ProductsModule />
                  </ProductProvider>
                }
              />
              <Route
                path="/usuarios/*"
                element={
                  <UserProvider>
                    <UsersModule />
                  </UserProvider>
                }
              />
            </Routes>
          </Fragment>
        </AuthProvider>
      </Router>
  );
}

export default App;