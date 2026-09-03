import { CloseButton } from '@chakra-ui/react';
import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteCart } from '../Redux/AppRedux/action';

const Delete = ({ id }) => {
  const dispatch = useDispatch();

  return <CloseButton aria-label="Remove item" onClick={() => dispatch(deleteCart(id))} />;
};

export default Delete;
