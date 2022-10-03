import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const AlertBox = ({addHandler}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    const navigate = useNavigate()

  const handleBack = ()=>{
    navigate("/cart")
  }

  return (
    <>
      <Button onClick={onOpen} w='500px'>
      Pay Now
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Pay For the Product
            </AlertDialogHeader>

            <AlertDialogBody>
                Your Product will be delivered to the given address within 10 days
            </AlertDialogBody>

            <AlertDialogFooter>
            <Button colorScheme='red' onClick={handleBack} ml={3}>
              Back to cart
            </Button>
              <Button colorScheme='blue' onClick={addHandler} ml={3}>
              Ok
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

export default AlertBox