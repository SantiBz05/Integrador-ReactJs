import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './layouts/home/index';

import ProductsModule from './layouts/products/index';
import { ProductProvider } from './context/ProductContext'

import UsersModule from './layouts/users/index'; 
import { UserProvider } from './context/UserContext'

import './App.css';

function App() {
  return (
    <Router>
      <Fragment>
        <Routes>
          <Route path="/" element={<Home />} />
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
    </Router>
  );
}

export default App;