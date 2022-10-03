import { Box, Button, Divider, Heading, Image, List, 
  ListItem, SimpleGrid, Stack, Text,Flex } from '@chakra-ui/react';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { MdLocalShipping } from 'react-icons/md';
import { getDataDetailsPaint,addCart,getDataFromCart,addWish,getDataFromWish } from '../Redux/AppRedux/action';
import Styles from '../Styles/PaintingDetails.module.css'
import Navbar from '../Components/Navbar';
const PaintingDetails = () => {
  const dispatch = useDispatch();
  const  paintDetails = useSelector((store)=>store.AppRedux.paintDetails)
  const navigate = useNavigate(); 
  const params = useParams()
  const [id, setId] = useState("")

  useEffect(()=>{
    dispatch(getDataDetailsPaint(params.id))
  },[dispatch,params.id])

  useEffect(()=>{
      if(params){ 
        dispatch(getDataDetailsPaint(params.id))
      }
    },[params,dispatch,navigate])


  useEffect(()=>{
    if(id){
      dispatch(addCart(id))
      navigate("/cart")
    }
  },[id,dispatch,navigate])

    useEffect(()=>{
      dispatch(getDataFromCart())
      
    })

  const handleClick=()=>{
    setId(paintDetails)
    alert("Item added to cart")
  }

  useEffect(()=>{
    if(id){
      dispatch(addWish(id))
      navigate("/wish")
    }
  },[id,dispatch,navigate])

    useEffect(()=>{
      dispatch(getDataFromWish())
      
    })
    const handleClick1=()=>{
      setId(paintDetails)
      alert("Item added to WishList")
    }
  return (
    <>
    <Navbar/>
    <Box w='85%' m='auto' className={Styles.container} key={paintDetails.id}>
    <Box p='20px'>
      <Image src={ paintDetails.img} alt="img" className={Styles.img}/>
    </Box>

    <Box className={Styles.innerContainer}>
      <Heading mt='15px'>{ paintDetails.name}</Heading>
      <Heading as='h6' size='md'>Amout: ₹ { paintDetails.price}</Heading>
      <Text className={Styles.topOne}  fontSize={'xl'} fontFamily="sans-serif"
                fontWeight={'300'}>{ paintDetails.des}</Text>

      <Text  fontSize={'lg'} className={Styles.top}>This product is returnable within <b style={{color:"red"}}>10 days</b> of delivery</Text>

      <Divider className={Styles.topOne}/>

      <Box className={Styles.top}>
              <Text
                fontSize={{ base: '16px', lg: '18px' }}
             
                fontWeight={'500'}
                textTransform={'uppercase'}
                mb={'4'}>
                Features
              </Text>

              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                <List spacing={2}>
                  <ListItem>Product</ListItem>
                  <ListItem>Offer</ListItem>{' '}
                  <ListItem>Stars</ListItem>{' '}
                </List>
                <List spacing={2}>
                  <ListItem>{ paintDetails.cat}</ListItem>
                  <ListItem>{ paintDetails.offer} %</ListItem>
                  <ListItem>{ paintDetails.star}</ListItem>
                </List>
              </SimpleGrid>
            </Box>

            <Divider mt='10px'/>

            <Box mt='20px'>
              <Text
                fontSize={{ base: '16px', lg: '18px' }}
               
                fontWeight={'500'}
                textTransform={'uppercase'}
                mb={'4'}>
                More Details
              </Text>
              <List>
              <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                   Manufacture : 
                  </Text>{' '}
                  Lifestyle Int Pvt Ltd, 77 Degree Town Centre, Building No. 3, West Wing, Off HAL Airport Road, Yamlur, Bangalore-560037
                </ListItem>

                <ListItem mt='10px'>
                  <Text as={'span'} fontWeight={'bold'}>
                  Country : 
                  </Text>{' '}
                  India
                </ListItem>
              </List>

              <Flex gap='20px'>
             <Button
            rounded={'none'}
            w={'full'}
            mt={8}
            size={'lg'}
            py={'7'}
            borderRadius='5px'
            className={Styles.top}
            textTransform={'uppercase'}
            _hover={{
              transform: 'translateY(2px)',
              boxShadow: 'lg',
            }} 
            onClick={handleClick1}>
            Add to ❤️
          </Button>
          <Button
            rounded={'none'}
            w={'full'}
            mt={8}
            size={'lg'}
            py={'7'}
            className={Styles.top}
            textTransform={'uppercase'}
            _hover={{
              transform: 'translateY(2px)',
              boxShadow: 'lg',
            }} 
            onClick={handleClick}>
            Add to cart
          </Button>
             </Flex>

          <Stack direction="row" alignItems="center" justifyContent={'center'} className={Styles.top}>
            <MdLocalShipping />
            <Text>2-3 business days delivery</Text>
          </Stack>
            </Box>
    </Box>
 </Box>
 </>
  )
}

export default PaintingDetails