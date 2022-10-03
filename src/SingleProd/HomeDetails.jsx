import { Box,Button, Divider, Flex, Heading, Image, List, 
  ListItem, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { addCart, addWish, getDataDetailshome, getDataFromCart, getDataFromWish} from '../Redux/AppRedux/action';
import Styles from '../Styles/HomeDetails.module.css'
import { MdLocalShipping } from 'react-icons/md';
import Navbar from '../Components/Navbar';

const HomeDetails = () => {
    const navigate = useNavigate()
    const homeDetails = useSelector((store)=>store.AppRedux.homeDetails)
    const dispatch = useDispatch()
    const params = useParams()
    const [id, setId] = useState("")

    useEffect(()=>{
      dispatch(getDataDetailshome(params.id))
    },[dispatch,params.id])

    useEffect(()=>{
        if(params){ 
          dispatch(getDataDetailshome(params.id))
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
      setId(homeDetails)
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
        setId(homeDetails)
      }
  return (
    <>
    <Navbar/>
    <Box w='85%' m='auto' className={Styles.container} key={homeDetails.id}>
    <Box p='20px'>
      <Image src={homeDetails.img} alt="img" className={Styles.img}/>
    </Box>

    <Box className={Styles.innerContainer}>
      <Heading mt='15px'>{homeDetails.name}</Heading>
      <Heading as='h6' size='md'>Amout: ₹ {homeDetails.price}</Heading>
      <Text className={Styles.topOne}  fontSize={'xl'} fontFamily="sans-serif"
                fontWeight={'300'}>{homeDetails.dis}</Text>

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
                  <ListItem>{homeDetails.cat}</ListItem>
                  <ListItem>{homeDetails.offer} %</ListItem>
                  <ListItem>{homeDetails.star}</ListItem>
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
 </>
  )
}

export default HomeDetails