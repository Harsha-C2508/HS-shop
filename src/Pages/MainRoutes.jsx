import React from 'react'
import {Routes,Route} from "react-router-dom"
import Payment from '../Checkout/Payment';
import Tankyou from '../Checkout/Tankyou';
import ReqAuth from '../Components/ReqAuth';
import Addnew from '../SingleProd/Addnew';
import Editpage from '../SingleProd/EditPage';
import HomeDetails from '../SingleProd/HomeDetails';
import MensDetails from '../SingleProd/MensDetails';
import PaintingDetails from '../SingleProd/PaintingDetails';
import WomensDetails from '../SingleProd/WomensDetails';
import Wishlist from '../WishList/Wishlist';
import Admin from './Admin';
import Cart from './Cart';
import Home from './Home';
import Login from './Login';
import Mens from './Mens';
import Myorders from './Myorders';
import Paintings from './Paintings';
import PersonalDetails from './PersonalDetails';
import SigIn from './SigIn';
import Womens from './Womens';

const MainRoutes = () => {
  return (
        <Routes>
            <Route path='/' element={ <Home/> }/>
            <Route path='/home/:id' element={ <HomeDetails/> }/>

            <Route path='/mens' element={  <Mens/> }/>
            <Route path='/mens/:id' element={ <MensDetails/> }/>

            <Route path='/womens' element={ <Womens/> }/>
            <Route path='/womens/:id' element={ <WomensDetails/> }/>

            <Route path='/paintings' element={ <Paintings/> }/>
            <Route path='/paintings/:id' element={ <PaintingDetails/> }/>

            <Route path='/login' element={ <Login/> }/>
            <Route path='/sigIn' element={ <SigIn/> }/>

            <Route path='/admin' element={ <Admin/> }/>
            <Route path='/edit/:id' element={ <Editpage/> }/>
            <Route path='/addnew' element={ <Addnew/> }/>
            <Route path='/customer' element={ <PersonalDetails/> }/>

            <Route path='/myOrders' element={ <Myorders/> }/>
            <Route path='/cart' element={ <Cart/> }/>
            <Route path='/payment' element={<ReqAuth><Payment/></ReqAuth> }/>
            <Route path='/thankyou' element={ <Tankyou/> }/>

            <Route path='/wish' element={ <Wishlist/> }/>
        </Routes>
  )
}

export default MainRoutes