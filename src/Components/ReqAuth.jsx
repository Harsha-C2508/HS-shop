//Create the HOC for protected Routes
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ReqAuth = ({children}) => {
    const location = useLocation();
    const auth = useSelector((store )=> store.AuthRedux.isAuth)

    if(!auth){
      return <Navigate to='/login' state={{from:location}} replace/>
    }
  return children
};

export default ReqAuth;
