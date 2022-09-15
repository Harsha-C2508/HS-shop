import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ReqAdmin = ({children}) => {
    const location = useLocation();
    const auth = useSelector((store )=> store.AuthRedux.isAuth)

    if(!auth){
      return <Navigate to='/sigIn' state={{from:location}} replace/>
    }
  return children
};

export default ReqAdmin;