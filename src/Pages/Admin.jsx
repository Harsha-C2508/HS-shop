import { Box,Td,Tr,Th,TableCaption,TableContainer,Table,Thead,Tbody, Button } from '@chakra-ui/react'
import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getDataAtAdminPage } from '../Redux/AppRedux/action';
import {Link, useNavigate} from "react-router-dom"
import AdminNav from '../Components/AdminNav';
const Admin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const adminProd = useSelector((store)=>store.AppRedux.adminProd)
  useEffect(()=>{
    dispatch(getDataAtAdminPage())
  },[dispatch])

  const gotoNew=()=>{
      navigate("/addnew")
  }
  return (
    <>
    <AdminNav/>
    <Box>
        <Box>
          <Button onClick={gotoNew}>Add New Product</Button>
        </Box>
          <TableContainer>
                  <Table colorScheme='teal'>
                      <TableCaption>Available Products</TableCaption>
                      <Thead>
                      <Tr>
                          <Th>Id</Th>
                          <Th>Image</Th>
                          <Th>Category</Th>
                          <Th isNumeric>Price</Th>
                          <Th>Offer</Th>
                          <Th>Star</Th>
                          <Th>Total Count</Th>
                          <Th>Edit</Th>
                      </Tr>
                      </Thead>
                      <Tbody>
                      {adminProd.map((item)=>{
                          return(
                              <Tr key={item.id}>
                                  <Td>{item.id}</Td>
                                  <Td><img src={item.img} alt="img" style={{height:"80px"}}/></Td>
                                  <Td>{item.cat}</Td>
                                  <Td isNumeric>{item.price}</Td>
                                  <Td>{item.offer}</Td>
                                  <Td>{item.star}</Td>
                                  <Td>{item.tc}</Td>
                                  <Td><Link to={`/edit/${item.id}`}><Button>Edit</Button></Link></Td>
                          </Tr>
                          )
                      })}
                      </Tbody>
                  </Table>
          </TableContainer>
      </Box>
</>
  )
}

export default Admin