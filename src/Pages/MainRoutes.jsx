import React from 'react'
import {Routes,Route} from "react-router-dom"
import ReqAdmin from '../Components/ReqAdmin';
import ReqAuth from '../Components/ReqAuth';
import Addnew from '../SingleProd/Addnew';
import Editpage from '../SingleProd/EditPage';
import MensDetails from '../SingleProd/MensDetails';
import Admin from './Admin';
import Home from './Home';
import Login from './Login';
import Mens from './Mens';
import Paintings from './Paintings';
import SigIn from './SigIn';
import Womens from './Womens';
const MainRoutes = () => {
  return (
        <Routes>
            <Route path='/' element={ <Home/> }/>
            <Route path='/mens' element={ <ReqAuth> <Mens/> </ReqAuth> }/>
            <Route path='/mens/:id' element={ <MensDetails/> }/>
            <Route path='/womens' element={ <ReqAuth><Womens/></ReqAuth> }/>
            <Route path='/paintings' element={ <ReqAuth><Paintings/></ReqAuth> }/>
            <Route path='/login' element={ <Login/> }/>
            <Route path='/sigIn' element={ <SigIn/> }/>
            <Route path='/admin' element={ <ReqAdmin> <Admin/> </ReqAdmin>}/>
            <Route path='/edit/:id' element={ <Editpage/> }/>
            <Route path='/addnew' element={ <Addnew/> }/>
        </Routes>
  )
}

export default MainRoutes