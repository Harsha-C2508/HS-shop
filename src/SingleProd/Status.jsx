import React, { useState } from 'react';
import {
  Badge,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { MdEdit, MdCheckCircle } from 'react-icons/md';
import {
  editStatusHome,
  editStatusShop,
  getCustomerDataAddress,
  getCustomerDataAddressOnline,
} from '../Redux/AppRedux/action';
import { useDispatch } from 'react-redux';

const STATUS_OPTIONS = [
  { value: 'Ordered', color: 'blue', label: 'Ordered' },
  { value: 'Processing', color: 'orange', label: 'Processing' },
  { value: 'Shipped', color: 'purple', label: 'Shipped' },
  { value: 'Out for Delivery', color: 'cyan', label: 'Out for Delivery' },
  { value: 'Delivered', color: 'green', label: 'Delivered' },
  { value: 'Cancelled', color: 'red', label: 'Cancelled' },
  { value: 'Returned', color: 'gray', label: 'Returned' },
];

export const getStatusColor = (status) => {
  const found = STATUS_OPTIONS.find(
    (s) => s.value.toLowerCase() === (status || '').toLowerCase()
  );
  return found?.color || 'gray';
};

const Status = ({ orderId, status, type = 'home' }) => {
  const [selected, setSelected] = useState(status || 'Ordered');
  const [saving, setSaving] = useState(false);
  const dispatch = useDispatch();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleUpdate = async () => {
    setSaving(true);
    try {
      if (type === 'shop') {
        await editStatusShop({ Sstatus: selected, orderId, dispatch });
        dispatch(getCustomerDataAddress());
      } else {
        await editStatusHome({ status: selected, orderId, dispatch });
        dispatch(getCustomerDataAddressOnline());
      }
      toast({ title: 'Status updated', status: 'success', duration: 2000 });
      onClose();
    } catch {
      toast({ title: 'Failed to update', status: 'error', duration: 3000 });
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Button
        size="xs"
        variant="ghost"
        colorScheme="blue"
        leftIcon={<Icon as={MdEdit} boxSize={3} />}
        onClick={onOpen}
        fontWeight="500"
        rounded="md"
        _hover={{ bg: 'blue.50' }}
      >
        Update
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered size="sm" motionPreset="slideInBottom">
        <ModalOverlay bg="blackAlpha.500" backdropFilter="blur(4px)" />
        <ModalContent rounded="2xl" mx={4}>
          <ModalHeader pb={1}>
            <HStack spacing={3}>
              <Flex w="36px" h="36px" rounded="lg" bg="blue.50" align="center" justify="center">
                <Icon as={MdCheckCircle} color="blue.500" boxSize={5} />
              </Flex>
              <VStack spacing={0} align="start">
                <Heading size="sm">Update Order Status</Heading>
                <Text fontSize="xs" color="gray.500" fontWeight="normal">
                  Order #{orderId?.slice(-6).toUpperCase()}
                </Text>
              </VStack>
            </HStack>
          </ModalHeader>
          <ModalCloseButton top={4} right={4} />

          <Divider />

          <ModalBody py={5}>
            <VStack spacing={4} align="stretch">
              <Flex justify="space-between" align="center">
                <Text fontSize="sm" color="gray.600">Current Status</Text>
                <Badge colorScheme={getStatusColor(status)} rounded="full" px={3} py={1} fontSize="xs">
                  {status || 'Ordered'}
                </Badge>
              </Flex>

              <Select
                value={selected}
                onChange={(e) => setSelected(e.target.value)}
                rounded="lg"
                bg="gray.50"
                size="md"
                _focus={{ bg: 'white', borderColor: 'blue.400' }}
              >
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </Select>

              {selected !== status && (
                <Flex
                  bg="blue.50"
                  p={3}
                  rounded="lg"
                  align="center"
                  gap={2}
                >
                  <Icon as={MdCheckCircle} color="blue.400" boxSize={4} />
                  <Text fontSize="xs" color="blue.700">
                    Status will change from <b>{status}</b> to <b>{selected}</b>
                  </Text>
                </Flex>
              )}
            </VStack>
          </ModalBody>

          <Divider />

          <ModalFooter gap={3}>
            <Button variant="ghost" onClick={onClose} rounded="lg" size="sm">Cancel</Button>
            <Button
              colorScheme="blue"
              onClick={handleUpdate}
              isLoading={saving}
              loadingText="Updating..."
              rounded="lg"
              size="sm"
              px={5}
              isDisabled={selected === status}
            >
              Update Status
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Status;
