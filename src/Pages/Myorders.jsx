import { Box, Flex, Image, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from '../Components/Navbar';
import { getCustomerDataAddress, getCustomerDataAddressOnline, getDataFromCart } from '../Redux/AppRedux/action';

const Myorders = () => {
  const dispatch = useDispatch();
  const shopCust = useSelector((store)=>store.AppRedux.shopCust)
  const deliveryCust = useSelector((store)=>store.AppRedux.deliveryCust)
  const cart = useSelector((store)=>store.AppRedux.cart)

  useEffect(()=>{
    dispatch(getCustomerDataAddress())
  },[dispatch])

  useEffect(()=>{
    dispatch(getCustomerDataAddressOnline())
  },[dispatch])

  useEffect(()=>{
    dispatch(getDataFromCart())
  },[dispatch])
  return (
    <Box>
      <Navbar/>
     <Box w='90%' margin='auto'>
     {
      shopCust.map((item)=>{
        return <Flex key={item.no} justifyContent='space-between'>
          <Box>
            <Image src={item.img} style={{height:"300px",width:'250px'}}/>
          </Box>
                  <Box mt='30px'>
                    <Text>{item.name}</Text>
                    <Text>₹{item.price}</Text>
                    <Text>{item.cat}</Text>
                  </Box>
                  <Box mt='30px'>
                    <Text>Your Order will delivered to Given Address</Text>
                    <Text>To : {item.Sname}</Text>
                    <Text>City : {item.Scity}</Text>
                    <Text>State : {item.Sstate}</Text>
                    <Text>Pincode : {item.pincode}</Text>
                    <Text>Contact : {item.Smobile}</Text>
                  </Box>
                  <Box mt='30px'>
                    <Text>Status: {item.Sstatus}</Text>
                  </Box>
        </Flex>
      })
     }

     </Box>
     {/* <Box style={{marginTop:"20px"}} w='90%' margin='auto'>
     {
      deliveryCust.map((items)=>{
        return <Flex key={items.no} justifyContent='space-between'>
                  <Box>
                    <Image src={items.img} alt="" height='300px' w='250px'/>
                  </Box>
                  <Box mt='30px'>
                    <Text>{items.name}</Text>
                    <Text>₹{items.price}</Text>
                    <Text>{items.cat}</Text>
                  </Box>
                  <Box mt='30px'>
                    <Text>Your Order will delivered to Given Address</Text>
                    <Text>To : {items.cusname}</Text>
                    <Text>House No : {items.buldingNo}</Text>
                    <Text>Landmark : {items.landMark}</Text>
                    <Text>Stree : {items.street}</Text>
                    <Text>City : {items.city}</Text>
                    <Text>State : {items.state}</Text>
                    <Text>Pincode : {items.pincode}</Text>
                    <Text>Contact : {items.mobile}</Text>
                  </Box>
                  <Box mt='30px'>
                    <Text>Status: {items.status}</Text>
                  </Box>
               </Flex>
      })
     }
     </Box> */}

     <Box style={{marginTop:"20px"}} w='90%' margin='auto'>
      <Flex>
      {cart.length>0 && cart.map((item)=>{
        return <Flex>
                  <Box>
                    <Image src={item.img} alt="" height='300px' w='250px'/>
                  </Box>
                  <Box mt='40px'>
                    <Text>{item.name}</Text>
                    <Text>₹{item.price}</Text>
                    <Text>{item.cat}</Text>
                  </Box>

        </Flex>
      })}
      {
        deliveryCust.map((items)=>{
          return <Flex key={items.no} justifyContent='space-between'>
                    <Box mt='30px'>
                      <Text>Your Order will delivered to Given Address</Text>
                      <Text>To : {items.cusname}</Text>
                      <Text>House No : {items.buldingNo}</Text>
                      <Text>Landmark : {items.landMark}</Text>
                      <Text>Stree : {items.street}</Text>
                      <Text>City : {items.city}</Text>
                      <Text>State : {items.state}</Text>
                      <Text>Pincode : {items.pincode}</Text>
                      <Text>Contact : {items.mobile}</Text>
                    </Box>
                    <Box mt='30px'>
                      <Text>Status: {items.status}</Text>
                    </Box>
                 </Flex>
        })
      }
      </Flex>
     </Box>
    </Box>
  )
}

export default Myorders