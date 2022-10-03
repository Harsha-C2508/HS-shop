import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ReqAdmin = ({children}) => {
    const location = useLocation();
    const authen = useSelector((store )=> store.AuthRedux.isAuthen)
    console.log('admin',authen)
    if(!authen){
      return <Navigate to='/login' state={{from:location}} replace/>
    }
  return children
};

export default ReqAdmin;