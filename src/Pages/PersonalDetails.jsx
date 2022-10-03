import { Button, 
         List, 
         ListItem, 
         Stack, 
         StackDivider, 
         Tab, 
         Table, 
         TableContainer, 
         TabList, 
         TabPanel, 
         TabPanels, 
         Tabs,
         Text,
         Thead,
         Tr,
         Th,
         useColorModeValue, 
         Tbody,
         Td} from '@chakra-ui/react';
import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import AdminNav from '../Components/AdminNav'
import { getCustomerDataAddress, getCustomerDataAddressOnline } from '../Redux/AppRedux/action';
import Status from '../SingleProd/Status';

const PersonalDetails = () => {
  const dispatch = useDispatch();
  const shopCust = useSelector((store)=>store.AppRedux.shopCust)
  const deliveryCust = useSelector((store)=>store.AppRedux.deliveryCust)

console.log("shopdetails",shopCust)
console.log('deliveryDetails',deliveryCust)
  useEffect(()=>{
    dispatch(getCustomerDataAddress())
  },[dispatch])

  useEffect(()=>{
    dispatch(getCustomerDataAddressOnline())
  },[dispatch])
  return (
    <div>
        <AdminNav/>
       <Tabs w='78%'>
                            <TabList gap='600px'>
                                <Tab> <List spacing={2}>
                                    <Button><ListItem>Home Delivery</ListItem></Button>
                                   
                                    </List>
                                </Tab>

                                <Tab> <List spacing={2}>
                                    <Button><ListItem>Collecting from shop</ListItem></Button>
                                    </List>
                                </Tab>
                            </TabList>

                            <TabPanels>
                                <TabPanel>
                                      <Stack
                                            width='98%'
                                            spacing={4}
                                            divider={
                                                <StackDivider
                                                borderColor={useColorModeValue('gray.100', 'gray.700')}
                                                />
                                            }>
                                            <Text fontWeight={600} fontSize={25}>Add your shipping address</Text>
                                            <TableContainer>
                                                  <Table>
                                                     <Thead>
                                                       <Tr>
                                                        <Th>No</Th>
                                                         <Th>Name</Th>
                                                         <Th>Mobile</Th>
                                                         <Th>Pincode</Th>
                                                         <Th>City</Th>
                                                         <Th>State</Th>
                                                         <Th>Street</Th>
                                                         <Th>Status</Th>
                                                       </Tr>
                                                     </Thead>

                                                     <Tbody>
                                                     {deliveryCust.map((user)=>{
                                                      return ( 
                                                            <Tr key={user.no}>
                                                              <Td>{user.no}</Td>
                                                              <Td>{user.cusname}</Td>
                                                              <Td>{user.mobile}</Td>
                                                              <Td>{user.pincode}</Td>
                                                              <Td>{user.city}</Td>
                                                              <Td>{user.state}</Td>
                                                              <Td>{user.street}</Td>
                                                              <Td>{user.status}<Status/> </Td>
                                                            </Tr>
                                                      )
                                                     })}
                                                     </Tbody>
                                                  </Table>
                                              </TableContainer>
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
                                            <Text fontWeight={600} fontSize={25}>Details of custoers</Text>
                                              <TableContainer>
                                                  <Table>
                                                     <Thead>
                                                       <Tr>
                                                        <Th>No</Th>
                                                         <Th>Name</Th>
                                                         <Th>Mobile</Th>
                                                         <Th>Pincode</Th>
                                                         <Th>City</Th>
                                                         <Th>State</Th>
                                                         <Th>Status</Th>
                                                       </Tr>
                                                     </Thead>

                                                     <Tbody>
                                                     {shopCust.map((user)=>{
                                                      return ( 
                                                            <Tr key={user.no}>
                                                              <Td>{user.no}</Td>
                                                              <Td>{user.Sname}</Td>
                                                              <Td>{user.Smobile}</Td>
                                                              <Td>{user.Spincode}</Td>
                                                              <Td>{user.Scity}</Td>
                                                              <Td>{user.Sstate}</Td>
                                                              <Td>{user.Sstatus}</Td>
                                                            </Tr>
                                                      )
                                                     })}
                                                     </Tbody>
                                                  </Table>
                                              </TableContainer>
                                      </Stack>
                                </TabPanel>
                            </TabPanels>
                    </Tabs>
    </div>
  )
}

export default PersonalDetails