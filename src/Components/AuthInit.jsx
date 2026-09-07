import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { restoreSession } from '../Redux/AuthRedux/action';

const AuthInit = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(restoreSession());
  }, [dispatch]);

  return children;
};

export default AuthInit;
