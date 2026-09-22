import { CloseButton } from '@chakra-ui/react'
import React from 'react'
import { useDispatch} from 'react-redux'
import { deleteWish} from '../Redux/AppRedux/action'

const DeleteWish = (items) => {
    const dispatch = useDispatch()

  return (
         <CloseButton onClick={() => dispatch(deleteWish(items.id))}  />
  )
}

export default DeleteWish
