import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getMensData } from '../Redux/AppRedux/action';

const MensDetails = () => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const mens = useSelector((store)=>store.AppRedux.mens)
  
  const [currProd,setCurrProd] = useState({})

  useEffect(()=>{
    if(mens.length === 0){
      dispatch(getMensData())
    }
  },[dispatch,mens.length])

  useEffect(()=>{
    if(id){
      const product = mens.find((items) => items.id === id);

      product && setCurrProd(product);
      
    }
  },[id,mens])
  return (
    <div>
      <h1>{currProd.name}</h1>
    </div>
  )
}

export default MensDetails