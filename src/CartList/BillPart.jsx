import { Button, Flex, Heading, Input, Stack, Text, useToast } from '@chakra-ui/react';
import { FaArrowRight } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Styles from './billPart.module.css';
import { validateCoupon } from '../Redux/AppRedux/action';

const BillPart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const cart = useSelector((store) => store.AppRedux.cart) || [];
  const coupon = useSelector((store) => store.AppRedux.coupon);
  const [code, setCode] = useState('');

  const itemCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  const discount = coupon?.discount || 0;
  const total = subtotal - discount;

  const applyCoupon = () => {
    if (!code.trim()) return;
    dispatch(validateCoupon(code, subtotal))
      .then((data) => {
        toast({ title: `Coupon applied! Saved ₹${data.discount}`, status: 'success' });
      })
      .catch((e) => {
        toast({ title: e.response?.data?.message || 'Invalid coupon', status: 'error' });
      });
  };

  const handleCheckOut = () => {
    navigate('/payment');
  };

  return (
    <div className={Styles.billBox}>
      <Stack spacing="6" borderWidth="1px" rounded="lg" padding="8" width="full">
        <Heading size="md">Order Summary</Heading>

        <Flex gap={2}>
          <Input
            placeholder="Coupon code"
            size="sm"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
          />
          <Button size="sm" colorScheme="teal" onClick={applyCoupon}>
            Apply
          </Button>
        </Flex>
        {coupon && (
          <Text fontSize="sm" color="green.600">
            {coupon.code} applied (−₹{coupon.discount})
          </Text>
        )}

        <Stack spacing="4">
          <Flex justify="space-between">
            <Text fontWeight="semibold">Items</Text>
            <Text fontWeight="bold">{itemCount}</Text>
          </Flex>
          <Flex justify="space-between">
            <Text fontWeight="semibold">Subtotal</Text>
            <Text fontWeight="bold">₹ {subtotal}</Text>
          </Flex>
          {discount > 0 && (
            <Flex justify="space-between" color="green.600">
              <Text fontWeight="semibold">Discount</Text>
              <Text fontWeight="bold">− ₹ {discount}</Text>
            </Flex>
          )}
          <Flex justify="space-between">
            <Text fontWeight="semibold">Shipping</Text>
            <Text color="green.500">Free</Text>
          </Flex>
          <Flex justify="space-between" fontSize="lg">
            <Text fontWeight="bold">Total</Text>
            <Text fontWeight="extrabold">₹ {total}</Text>
          </Flex>
        </Stack>

        <Button colorScheme="blue" size="lg" onClick={handleCheckOut} rightIcon={<FaArrowRight />}>
          Checkout
        </Button>
        <Text fontSize="xs" color="gray.500" textAlign="center">
          Try: WELCOME10, FLAT200, HSVIP15
        </Text>
      </Stack>
    </div>
  );
};

export default BillPart;
