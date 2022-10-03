import {Box,Flex,Image,Text,SkeletonCircle,SkeletonText } from '@chakra-ui/react'
import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Navbar from '../Components/Navbar';
import { getDataFromWish } from '../Redux/AppRedux/action';
import Styles from '../Styles/Cart.module.css'
import DeleteWish from './DeleteWish';
const Wishlist = () => {
    const dispatch = useDispatch();
    const wish = useSelector((store)=>store.AppRedux.wish);
    const isLoading = useSelector((store)=>store.AppRedux.isLoading)
console.log("wish",wish)
    useEffect(()=>{
        dispatch(getDataFromWish())
    },[dispatch]);
  return (
   <>
   {isLoading ?  <Box padding='6' boxShadow='lg' bg='white'>
                    <SkeletonCircle size='10' />
                    <SkeletonText mt='2' noOfLines={30} spacing='4' />
                  </Box>
                  :
   <>
     <Box>
    <Navbar/>
    <Text fontWeight='extrabold' fontSize='35px'>Your Wishlist</Text>
   </Box>
   <Box className={Styles.wish}>
     {wish.length>0 && wish.map((items)=>{
            return <div key={items.id} className={Styles.innerBox}>
              <DeleteWish  {...items}/>
               <Image src={items.img} alt="" className={Styles.img}/>
               <Text>{items.name}</Text>
               <Text>₹ {items.price}</Text>
               <Flex justifyContent='space-between' w='90%' m='auto'> 
                <Text>{items.offer}%</Text>
                <Text>{items.star}⭐</Text>
               </Flex>
            </div>
        })
     }
   </Box>
   </>
}
   </>
  )
}

export default Wishlist