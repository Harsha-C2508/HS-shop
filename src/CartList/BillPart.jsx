import {
    Button,
    Flex,
    Heading,
    Stack,
    Text,
  } from '@chakra-ui/react'
    import { FaArrowRight } from 'react-icons/fa'
    import { useSelector } from 'react-redux'
    import { useNavigate } from 'react-router-dom'
    import Styles from './billPart.module.css'
import React from 'react'

const BillPart = () => {

    const navigate = useNavigate()
    const cart = useSelector((store)=>store.AppRedux.cart)
    let Tsum =  cart.reduce((accumulator, current) => accumulator + current.price, 0)
    const [total, setTotal] = React.useState(Tsum)
     React.useEffect(()=>{
       if(Tsum){
         setTotal(Tsum)
       }
     },[total,Tsum])


     const handleCheckOut = ()=>{
       navigate("/payment")
       alert("Product is Checking out")
     }
  return (
    <div className={Styles.billBox}>
         <Stack spacing="8" borderWidth="1px" rounded="lg" padding="8" width="full">
         <Heading size="md">Order Summary</Heading>
  
         <Stack spacing="6">
         <Flex justify="space-between">
             <Text fontSize="lg" fontWeight="semibold">
               Sub Total
             </Text>
             <Text fontSize="xl" fontWeight="extrabold">
             ₹ {total}
             </Text>
           </Flex>
           <Flex justify="space-between">
             <Text fontSize="lg" fontWeight="semibold">
               Number of items
             </Text>
             <Text fontSize="xl" fontWeight="extrabold">
               {cart.length}
             </Text>
           </Flex>
           <Flex justify="space-between">
             <Text fontSize="lg" fontWeight="semibold">
               Total
             </Text>
             <Text fontSize="xl" fontWeight="extrabold">
             ₹ {total}
             </Text>
           </Flex>
         </Stack>
         <Button colorScheme="blue" size="lg" fontSize="md" onClick={handleCheckOut} rightIcon={<FaArrowRight />}>
           Checkout
         </Button>
         </Stack>
    </div>
  )
}

export default BillPart