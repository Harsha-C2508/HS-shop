import {
    Container,
    SimpleGrid,
    Flex,
    Text,
    Stack,
    StackDivider,
    useColorModeValue,
    List,
    ListItem,
    Button,
    Input,
    RadioGroup,
    Radio,
    Tab,
    Tabs,
    TabList,
    TabPanels,
    TabPanel
  } from '@chakra-ui/react';
import { useEffect, useReducer, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { customerDataAddress, customerDataAddressOnline, getCustomerDataAddress, getCustomerDataAddressOnline } from '../Redux/AppRedux/action';
import AlertBox from '../SingleProd/AlertBox';
import AlertBoxs from '../SingleProd/AlertBoxs';



const initial1 = {
    name: "",
    mobile: "",
    pincode:"",
    city: "",
    state: "",
    buldingNo: "",
    street: "",
    landMark: "",
    cardType: "",
    cardNumber: "",
    cardName: "",
    status: "Odered"
}

const initial2 = {
  Sname: "",
  Smobile: 0,
  Spincode:"",
  Scity: "",
  Sstate: "",
  ScardType: "",
  ScardNumber: "",
  ScardName: "",
  Sstatus:"odered"
}
const reducerFun =(state,action)=>{
  switch(action.type){
    case "name":
      return {
        ...state,
        name: action.payload
      }
    case "mobile":
      return {
        ...state,
        mobile: action.payload
      }
    case "pincode":
      return {
        ...state,
        pincode: action.payload
      }
    case "city":
      return {
        ...state,
        city: action.payload
      }  
    case "state":
      return {
        ...state,
        state: action.payload
      }
    case "buldingNo":
      return {
        ...state,
        buldingNo: action.payload
      } 
    case "street":
      return {
        ...state,
        street: action.payload
      }
    case "landMark":
      return {
        ...state,
        landMark: action.payload
      }  
    case "cardType":
      return {
        ...state,
        cardType: action.payload
      }  
    case "cardNumber":
      return {
        ...state,
        cardNumber: action.payload
      }  
    case "cardName":
      return {
        ...state,
        cardName: action.payload
      }
    case "status":
        return {
          ...state,
          status: action.payload
        }
     default:
      return state 
   }
  }

const reducerFunction =(state,action)=>{
    switch(action.type){
      case "Sname":
        return {
          ...state,
          Sname: action.payload
        }
      case "Smobile":
        return {
          ...state,
          Smobile: action.payload
        }
      case "Spincode":
        return {
          ...state,
          Spincode: action.payload
        }
      case "Scity":
        return {
          ...state,
          Scity: action.payload
        }  
      case "Sstate":
        return {
          ...state,
          Sstate: action.payload
        }
      case "ScardType":
        return {
          ...state,
          ScardType: action.payload
        }  
      case "ScardNumber":
        return {
          ...state,
          ScardNumber: action.payload
        }  
      case "ScardName":
        return {
          ...state,
          ScardName: action.payload
        }
      case "Sstatus":
        return {
          ...state,
          Sstatus: action.payload
        }
       default:
        return state 
     }
    }

const Payment = () => {
      const cart = useSelector((store)=>store.AppRedux.cart)
      const navigate = useNavigate();
      const dispatch = useDispatch();
      const [onlineUser,setOnlineUser] = useReducer(
        reducerFun,
        initial1
      )

      const [shopUser,setShopUser] = useReducer(
        reducerFunction,
        initial2
      )

      let Tsum =  cart.reduce((accumulator, current) => accumulator + current.price, 0)
      const [total, setTotal] = useState(Tsum)
     
      useEffect(()=>{
        if(total){
          setTotal(Tsum)
        }
      },[total,Tsum])

      const addHandler= ()=>{
        if(JSON.stringify(onlineUser)!== JSON.stringify(initial1)){
          dispatch( customerDataAddressOnline(onlineUser))
          .then(()=> dispatch(getCustomerDataAddressOnline()))
          .then(()=>{
            navigate("/thankyou")
            window.location.reload()
          });
        }
      }

      const addHandlers= ()=>{
        if(JSON.stringify(shopUser)!== JSON.stringify(initial2)){
          dispatch( customerDataAddress(shopUser))
          .then(()=> dispatch(getCustomerDataAddress()))
          .then(()=>{
            navigate("/thankyou")
            window.location.reload();
          });
        }
      }

      const goBack=()=>{
          navigate('/cart')
      }

    return (
      <Container maxW={'8xl'} py={12}>
          <Text textAlign='left' textDecoration='underline' onClick={goBack} cursor='pointer' color='blue'>{`<`} Go Back</Text>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          <Stack spacing={4}>
            <Text
              fontWeight={600}
              fontSize={'2xl'}
              p={2}
              alignSelf={'flex-start'}
              rounded={'md'}>
            Select a shipping method
            </Text>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>

                    <Tabs w='500px'>
                            <TabList>
                                <Tab> <List spacing={2}>
                                    <Button><ListItem>Home Delivery</ListItem></Button>
                                    </List>
                                </Tab>

                                <Tab> <List spacing={2}>
                                    <Button><ListItem>Collect from shop</ListItem></Button>
                                    </List>
                                </Tab>
                            </TabList>

                            <TabPanels>
                                <TabPanel>
                                      <Stack
                                            width='95%'
                                            spacing={4}
                                            divider={
                                                <StackDivider
                                                borderColor={useColorModeValue('gray.100', 'gray.700')}
                                                />
                                            }>
                                            <Text fontWeight={600} fontSize={25}>Add your shipping address</Text>
                                        
                                            <Input 
                                              type='text'
                                              placeholder='Enter your full Name' 
                                              value={onlineUser.name} 
                                              onChange={(e)=>setOnlineUser({type:"name",payload: e.target.value})}
                                              />

                                            <Input
                                              type='tel'
                                              placeholder='Mobile Number' 
                                              value={onlineUser.mobile}
                                              onChange={(e)=>setOnlineUser({type:"mobile",payload: e.target.value})} 
                                              />

                                            <Input 
                                              placeholder='Pincode' 
                                              type='text'
                                              value={onlineUser.pincode}
                                              onChange={(e)=>setOnlineUser({type:"pincode",payload: e.target.value})} 
                                              />

                                            <Input 
                                              placeholder='City'
                                              type='text'
                                              value={onlineUser.city}
                                              onChange={(e)=>setOnlineUser({type:"city",payload: e.target.value})} 
                                             />

                                            <Input 
                                              placeholder='State'
                                              type='text'
                                              value={onlineUser.state}
                                              onChange={(e)=>setOnlineUser({type:"state",payload: e.target.value})} 
                                             />

                                            <Input 
                                              placeholder='Building name or number' 
                                              type='text'
                                              value={onlineUser.buldingNo}
                                              onChange={(e)=>setOnlineUser({type:"buldingNo",payload: e.target.value})} 
                                            />

                                            <Input 
                                              placeholder='Street name or number'
                                              type='text'
                                              value={onlineUser.street}
                                              onChange={(e)=>setOnlineUser({type:"street",payload: e.target.value})} 
                                            />

                                            <Input 
                                              placeholder='Landmark' 
                                              type='text'
                                              value={onlineUser.landMark}
                                              onChange={(e)=>setOnlineUser({type:"landMark",payload: e.target.value})} 
                                            />

                                            </Stack>
                                            <Stack
                                            spacing={4}
                                            divider={
                                                <StackDivider
                                                borderColor={useColorModeValue('gray.100', 'gray.700')}
                                                />
                                            }>
                                            <Text fontWeight={600} fontSize={25}>Select a payment method</Text>
                                            <RadioGroup  >
                                        <Stack direction='row' 
                                              value={onlineUser.cardType}
                                              onChange={(e)=>setOnlineUser({type:"cardType",payload: e.target.value})} 
                                        >
                                        <Radio value='Credit'>Credit</Radio>
                                        <Radio value='Debit'>Debit</Radio>
                                        
                                        </Stack>
                                        </RadioGroup>
                                
                                            <Input 
                                              placeholder='Card Number' 
                                              type='text'
                                              value={onlineUser.cardNumber}
                                              onChange={(e)=>setOnlineUser({type:"cardNumber",payload: e.target.value})} 
                                            />
                                            <Input 
                                              placeholder='Name on Card'  
                                              type='text'
                                              value={onlineUser.cardName}
                                              onChange={(e)=>setOnlineUser({type:"cardName",payload: e.target.value})} 
                                            />
                                            <Button onClick={addHandler}>Pay Now</Button>
                                            {/* <AlertBox addHandler={addHandler}/> */}
                                            </Stack>
                                </TabPanel>

                                <TabPanel>
                                      <Stack
                                            width='95%'
                                            spacing={4}
                                            divider={
                                                <StackDivider
                                                borderColor={useColorModeValue('gray.100', 'gray.700')}
                                                />
                                            }>
                                            <Text fontWeight={600} fontSize={25}>Add the city Address</Text>
   
                                            <Input 
                                              placeholder='Full Name' 
                                              type='text'
                                              value={shopUser.Sname}
                                              onChange={(e)=>setShopUser({type:"Sname",payload: e.target.value})} 
                                               />
                                            <Input 
                                              placeholder='Mobile Number'  
                                              type='number'
                                              value={shopUser.Smobile}
                                              onChange={(e)=>setShopUser({type:"Smobile",payload: e.target.value})} 
                                              />
                                            <Input 
                                              placeholder='Pincode' 
                                              type='text'
                                              value={shopUser.Spincode}
                                              onChange={(e)=>setShopUser({type:"Spincode",payload: e.target.value})} 
                                              />

                                            <Input
                                              placeholder='City'
                                              type='text'
                                              value={shopUser.Scity}
                                              onChange={(e)=>setShopUser({type:"Scity",payload: e.target.value})}  
                                              />
                                            <Input 
                                              placeholder='State' 
                                              type='text'
                                              value={shopUser.Sstate}
                                              onChange={(e)=>setShopUser({type:"Sstate",payload: e.target.value})}/>
                                            </Stack>
                                            <Stack
                                            spacing={4}
                                            divider={
                                                <StackDivider
                                                borderColor={useColorModeValue('gray.100', 'gray.700')}
                                                />
                                            }>
                                            <Text fontWeight={600} fontSize={25}>Select a payment method</Text>
                                            <RadioGroup  >
                                        <Stack direction='row'  
                                              value={shopUser.ScardType}
                                              onChange={(e)=>setShopUser({type:"ScardType",payload: e.target.value})}
                                              >
                                        <Radio value='Credit'>Credit</Radio>
                                        <Radio value='Debit'>Debit</Radio>
                                        
                                        </Stack>
                                        </RadioGroup>
                                
                                            <Input 
                                              placeholder='Card Number'  
                                              type='text'
                                              value={shopUser.ScardNumber}
                                              onChange={(e)=>setShopUser({type:"ScardNumber",payload: e.target.value})}
                                              />
                                            <Input 
                                              placeholder='Name on the Card' 
                                              type='text'
                                              value={shopUser.ScardName}
                                              onChange={(e)=>setShopUser({type:"ScardName",payload: e.target.value})} />
                                            {/* <Input  type="date" /> */}
                                            {/* <AlertBoxs addHandlers={addHandlers}/> */}

                                            <Button onClick={addHandlers}>Pay Now</Button>
                                            </Stack>
                                </TabPanel>
                            </TabPanels>
                    </Tabs>
                  </SimpleGrid>
          </Stack>
          
          <Flex>
          <Stack
              spacing={4}
              marginLeft="160px"
              divider={
                <StackDivider
                  borderColor={useColorModeValue('gray.100', 'gray.700')}
                />
              }>
              <Text fontWeight={600} fontSize={25}>Payment summery</Text>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                    <List spacing={2}>
                    <ListItem>Sub Total</ListItem>
                    <ListItem>Standard Ground Shipping</ListItem>
                    <ListItem>Grand Total</ListItem>
                    </List>
                    <List spacing={2}>
                    <ListItem>₹ {total}</ListItem>
                    <ListItem>Free</ListItem>
                    <ListItem>₹ {total}</ListItem>
                    </List>
                  </SimpleGrid>
              
            </Stack>
            
          </Flex>
         
          
        </SimpleGrid>
      </Container>
  )
}

export default Payment