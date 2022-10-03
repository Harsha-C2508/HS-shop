import React,{ useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    Select,
    Input
  } from '@chakra-ui/react'
  import { useNavigate, useParams } from 'react-router-dom';
  import { editStatusHome, getCustomerDataAddressOnline} from '../Redux/AppRedux/action';
import { useDispatch } from 'react-redux';
const Status = ({status}) => {
    const [statuss,setStatuss] = useState("")
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();
    const { isOpen, onOpen, onClose } = useDisclosure()
    
    const handleChange=()=>{
        editStatusHome({
          status:statuss,
          params,
          dispatch
        })
        getCustomerDataAddressOnline(dispatch);
        navigate('/customer')
      }
  return (
    <>
      <Button onClick={onOpen}>-</Button>

        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>Change the status</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {/* <Select placeholder='Ordered' onChange={(e)=> setStatuss(e.target.value) }>
                <option value='shipped'>Shipped</option>
                <option value='7days'>7 more days to deliver</option>
                <option value='7days'>5 more days to deliver</option>
                <option value='3days'>3 more days to deliver</option>
                <option value='iday'>1 more day to deliver</option>
                <option value="delivered ">Delivered</option>
              </Select> */}

              <Input type='text' placeholder='Ordered' onChange={(e)=>setStatuss(e.target.value)}/>
            </ModalBody>

            <ModalFooter>
            <Button variant='ghost' onClick={handleChange}>Update</Button>
            </ModalFooter>
        </ModalContent>
        </Modal>
    </>
  )
}

export default Status