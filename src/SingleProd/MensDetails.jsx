import { Box, Button, Divider, Heading, Image, List, 
  ListItem, SimpleGrid, Stack, Text,Flex } from '@chakra-ui/react';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { addCart, getDataDetailsMens, getDataFromCart,addWish,getDataFromWish } from '../Redux/AppRedux/action';
import Styles from '../Styles/Mensdetails.module.css'
import { MdLocalShipping } from 'react-icons/md';

const MensDetails = () => {
  const dispatch = useDispatch();
  const  mensDetails = useSelector((store)=>store.AppRedux.mensDetails)
  const navigate = useNavigate(); 
  const params = useParams()
  const [id, setId] = useState("")

  useEffect(()=>{
    dispatch(getDataDetailsMens(params.id))
  },[dispatch,params.id])

  useEffect(()=>{
      if(params){ 
        dispatch(getDataDetailsMens(params.id))
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
    setId(mensDetails)
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
      setId(mensDetails)
      alert("Item added to WishList")
    }
  return (
   <Box w='85%' m='auto' className={Styles.container} key={mensDetails.id}>
      <Box p='20px'>
        <Image src={ mensDetails.img} alt="img" className={Styles.img}/>
      </Box>

      <Box className={Styles.innerContainer}>
        <Heading mt='15px'>{ mensDetails.name}</Heading>
        <Heading as='h6' size='md'>Amout: ₹ { mensDetails.price}</Heading>
        <Text className={Styles.topOne}  fontSize={'xl'} fontFamily="sans-serif"
                  fontWeight={'300'}>Update your casual look with this casual { mensDetails.dis} designed with a solid surface.</Text>

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
                    <ListItem>{ mensDetails.dis}</ListItem>
                    <ListItem>{ mensDetails.offer} %</ListItem>
                    <ListItem>{ mensDetails.star}</ListItem>
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

                  <ListItem>
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
  )
}

export default MensDetails