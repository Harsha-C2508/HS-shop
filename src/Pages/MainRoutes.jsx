import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Payment from '../Checkout/Payment';
import Tankyou from '../Checkout/Tankyou';
import ReqAuth from '../Components/ReqAuth';
import ReqAdmin from '../Components/ReqAdmin';
import StoreLayout from '../Components/StoreLayout';
import ProductDetail from '../Components/ProductDetail';
import ProductListing from '../Components/ProductListing';
import Wishlist from '../WishList/Wishlist';
import Admin from './Admin';
import Cart from './Cart';
import Home from './Home';
import Login from './Login';
import Myorders from './Myorders';
import PersonalDetails from './PersonalDetails';
import Profile from './Profile';
import SigIn from './SigIn';

const MainRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <StoreLayout>
            <Home />
          </StoreLayout>
        }
      />
      <Route
        path="/home/:id"
        element={
          <StoreLayout>
            <ProductDetail category="home" />
          </StoreLayout>
        }
      />

      <Route
        path="/mens"
        element={
          <StoreLayout>
            <ProductListing category="mens" />
          </StoreLayout>
        }
      />
      <Route
        path="/mens/:id"
        element={
          <StoreLayout>
            <ProductDetail category="mens" />
          </StoreLayout>
        }
      />

      <Route
        path="/womens"
        element={
          <StoreLayout>
            <ProductListing category="womens" />
          </StoreLayout>
        }
      />
      <Route
        path="/womens/:id"
        element={
          <StoreLayout>
            <ProductDetail category="womens" />
          </StoreLayout>
        }
      />

      <Route
        path="/paintings"
        element={
          <StoreLayout>
            <ProductListing category="painting" />
          </StoreLayout>
        }
      />
      <Route
        path="/paintings/:id"
        element={
          <StoreLayout>
            <ProductDetail category="painting" />
          </StoreLayout>
        }
      />

      <Route
        path="/accessories"
        element={
          <StoreLayout>
            <ProductListing category="accessories" />
          </StoreLayout>
        }
      />
      <Route
        path="/accessories/:id"
        element={
          <StoreLayout>
            <ProductDetail category="accessories" />
          </StoreLayout>
        }
      />

      <Route
        path="/footwear"
        element={
          <StoreLayout>
            <ProductListing category="footwear" />
          </StoreLayout>
        }
      />
      <Route
        path="/footwear/:id"
        element={
          <StoreLayout>
            <ProductDetail category="footwear" />
          </StoreLayout>
        }
      />

      <Route
        path="/homeDecor"
        element={
          <StoreLayout>
            <ProductListing category="homeDecor" />
          </StoreLayout>
        }
      />
      <Route
        path="/homeDecor/:id"
        element={
          <StoreLayout>
            <ProductDetail category="homeDecor" />
          </StoreLayout>
        }
      />

      <Route path="/login" element={<Login />} />
      <Route path="/sigIn" element={<SigIn />} />

      <Route path="/admin" element={<ReqAdmin><Admin /></ReqAdmin>} />
      <Route path="/edit/:id" element={<Navigate to="/admin" replace />} />
      <Route path="/addnew" element={<Navigate to="/admin" replace />} />
      <Route path="/customer" element={<ReqAdmin><PersonalDetails /></ReqAdmin>} />

      <Route
        path="/myOrders"
        element={
          <StoreLayout>
            <ReqAuth><Myorders /></ReqAuth>
          </StoreLayout>
        }
      />
      <Route
        path="/cart"
        element={
          <StoreLayout>
            <Cart />
          </StoreLayout>
        }
      />
      <Route path="/payment" element={<ReqAuth><Payment /></ReqAuth>} />
      <Route
        path="/thankyou"
        element={
          <StoreLayout>
            <Tankyou />
          </StoreLayout>
        }
      />
      <Route
        path="/wish"
        element={
          <StoreLayout>
            <ReqAuth>
              <Wishlist />
            </ReqAuth>
          </StoreLayout>
        }
      />
      <Route
        path="/profile"
        element={
          <StoreLayout>
            <ReqAuth>
              <Profile />
            </ReqAuth>
          </StoreLayout>
        }
      />
    </Routes>
  );
};

export default MainRoutes;
