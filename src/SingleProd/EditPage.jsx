import { Input, Text,
         Box,Button,
         Heading,Flex,
         AlertDialogContent,AlertDialogOverlay,
         AlertDialogHeader, useDisclosure,
        AlertDialog,AlertDialogBody,
        AlertDialogFooter } from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import AdminNav from "../Components/AdminNav";
import { editProdData, getDataAtAdminPage } from "../Redux/AppRedux/action";

const Editpage = ({offer,price,star,img}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    const [offers, setOffers] = useState("")
    const [prices,setPrices] = useState("")
    const [stars,setStar] = useState("")
    const [image,setImage] = useState("")
    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    // const data2 = useSelector((store)=>store.AppRedux.home);


  const handleClick = ()=>{
    editProdData({
      offer:offers,
      price:prices,
      star:stars,
      img:image,
      params,
      dispatch
    })

    getDataAtAdminPage(dispatch);
      navigate('/')
  }
  return (
    <>
    <AdminNav/>
    <Box style={{ width: "30%", margin: "auto", fontSize: "20px" }}>
      <Heading as='h3' size='lg'>Editing page</Heading>
      <Flex>
        <Text style={{width:"50%"}}>Image : </Text>
        <Input  type="text" placeholder='edit the image' onChange={(e)=>setImage(e.target.value)}/>
      </Flex>

      <Flex>
        <Text style={{width:"50%"}}>Price : </Text>
        <Input  type="number" placeholder='edit the price' onChange={(e)=> setPrices(e.target.value) }/>
      </Flex>

      <Flex>
        <Text style={{width:"50%"}}> Offer: </Text>
        <Input  type="number" placeholder='edit the Offer' onChange={(e)=> setOffers(e.target.value) }/>
      </Flex>
      <Flex>
        <Text style={{width:"50%"}}>Stars : </Text>
        <Input  type="number" placeholder='edit the stars' onChange={(e)=> setStar(e.target.value) }/>
      </Flex>
      <Box style={{ textAlign: "right", padding: "5px 0" }}>
      <Button colorScheme='blue' onClick={onOpen}>
        Update
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
             Update
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You want to update the information .
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={handleClick} ml={3}>
               yes,Sure
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      </Box>
    </Box>
  </>
  );
};

export default Editpage;