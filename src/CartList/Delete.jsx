import { CloseButton } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch} from 'react-redux'
import { deleteCart} from '../Redux/AppRedux/action'

const Delete = (items) => {
    const [id, setId] = useState("")
    const dispatch = useDispatch()

useEffect(()=>{
  if(id){
    dispatch(deleteCart(id))
    window.location.reload();
  }
 
},[id,dispatch])

  return (

         <CloseButton onClick={()=>setId(items.id)}  />

  )
}

export default Delete