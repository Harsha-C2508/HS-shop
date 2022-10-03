import { Box, Flex, Image, Select, Text,Link, useColorModeValue as mode, Divider, Button, SkeletonText,SkeletonCircle } from '@chakra-ui/react';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDataFromCart } from '../Redux/AppRedux/action';
import Delete from '../CartList/Delete';
import BillPart from '../CartList/BillPart';
import { useNavigate } from 'react-router-dom';
import Styles from '../Styles/Cart.module.css' 
import Navbar from '../Components/Navbar';

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((store)=>store.AppRedux.cart)||[];
  const isLoading = useSelector((store)=>store.AppRedux.isLoading)
  const navigate = useNavigate()
  useEffect(()=>{
    dispatch(getDataFromCart())
  },[dispatch])

const handleClick=()=>{
    navigate("/")
}
  return (
    <>
    {isLoading ?  <Box padding='6' boxShadow='lg' bg='white'>
                    <SkeletonCircle size='10' />
                    <SkeletonText mt='2' noOfLines={30} spacing='4' />
                  </Box>
                  :
     <div>

       <Navbar/>
      {cart.length > 0 ? <Box w='97%' m='auto' gap='10px' className={Styles.box}>:
      <Box padding='20px' w='70%' className={Styles.items}>
      { cart.length > 0 && cart.map((items)=>{
          return <div key={items.id}>
          <Flex key={items.id} gap='30px' mt='20px' justifyContent='space-between'>
            <Image src={items.img} alt={items.name} height='260px' borderRadius='10px' width='250px'/>
                <Box width='20%'>
                  <Text fontWeight='bold' mt='35px'>{items.name}</Text>
                  <Text>₹{items.price}</Text>
                </Box>
                <Box>
                <Select placeholder='1' width='150%' color='black' mt='30px'>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option value='5'>5</option>
                  <option value='6'>6</option>
                  <option value='7'>7</option>
                  <option value='8'>8</option>
                  <option value='9'>9</option>
                </Select>
                </Box>

              <Delete key={items.id} {...items} />
          </Flex>
          <Divider mt="20px"/>
          </div>
        })
      }
    </Box>

      <Box width='30%'>
        <BillPart/>
        <Flex ml='80px'> 
        <p style={{fontWeight:"bold"}}>or</p>
              <Link color={mode('blue.500', 'blue.200')} onClick={handleClick} ml='10px' fontWeight='bold'>Continue shopping</Link>
        </Flex>
      </Box>
    </Box> :
     <Box style={{width:'30%',margin:"auto",marginTop:"40px"}}>
      <img src='https://constant.myntassets.com/checkout/assets/img/empty-bag.webp' alt='cartBag'/>
      <Box>
        <Text fontWeight='700' fontSize='20px'>Your cart is empty</Text>
      </Box>
      <Box mt='20px'>
        <Button onClick={()=>{navigate("/")}} bg='white' border='2px solid red'>View Products</Button>
      </Box>
     </Box>
     }
     </div>
    }
    
    </>
  )
}

export default Cart