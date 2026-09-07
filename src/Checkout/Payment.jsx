import {
  Alert,
  AlertIcon,
  Badge,
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Radio,
  RadioGroup,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react';
import {
  MdArrowBack,
  MdPayment,
  MdLocalShipping,
  MdShield,
  MdLoop,
  MdCheck,
  MdLocalOffer,
} from 'react-icons/md';
import { useCallback, useEffect, useReducer, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createCheckoutSession, getDataFromCart } from '../Redux/AppRedux/action';
import { resolveImageUrl } from '../api/client';
import client from '../api/client';
import axios from 'axios';

const initialAddress = {
  name: '',
  mobile: '',
  pincode: '',
  city: '',
  state: '',
  buildingNo: '',
  street: '',
  landmark: '',
};

const addressReducer = (state, action) => {
  if (action.type === 'reset') return initialAddress;
  if (action.type === 'load') return { ...initialAddress, ...action.value };
  return { ...state, [action.field]: action.value };
};

const StepIndicator = ({ current }) => {
  const steps = ['Address', 'Payment', 'Summary'];
  return (
    <HStack spacing={0} w="full" mb={6}>
      {steps.map((step, i) => (
        <Flex key={step} flex="1" align="center">
          <Flex
            w="28px"
            h="28px"
            rounded="full"
            bg={i <= current ? 'blue.500' : 'gray.200'}
            color={i <= current ? 'white' : 'gray.500'}
            align="center"
            justify="center"
            fontSize="sm"
            fontWeight="bold"
            flexShrink={0}
          >
            {i < current ? <Icon as={MdCheck} boxSize={4} /> : i + 1}
          </Flex>
          <Text
            fontSize="xs"
            fontWeight={i === current ? '700' : '500'}
            color={i <= current ? 'blue.600' : 'gray.400'}
            ml={1.5}
            display={{ base: 'none', sm: 'block' }}
          >
            {step}
          </Text>
          {i < steps.length - 1 && (
            <Box flex="1" h="2px" bg={i < current ? 'blue.500' : 'gray.200'} mx={2} />
          )}
        </Flex>
      ))}
    </HStack>
  );
};

function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (document.getElementById('razorpay-script')) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.id = 'razorpay-script';
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

const Payment = () => {
  const cart = useSelector((store) => store.AppRedux.cart) || [];
  const coupon = useSelector((store) => store.AppRedux.coupon);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [address, setAddress] = useReducer(addressReducer, initialAddress);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('online');
  const [saveAddress, setSaveAddress] = useState(true);

  const [pinLoading, setPinLoading] = useState(false);
  const [pinError, setPinError] = useState('');

  const lookupPincode = useCallback(async (pin) => {
    if (pin.length !== 6) return;
    setPinLoading(true);
    setPinError('');
    try {
      const { data } = await axios.get(`https://api.postalpincode.in/pincode/${pin}`);
      if (data?.[0]?.Status === 'Success' && data[0].PostOffice?.length > 0) {
        const po = data[0].PostOffice[0];
        setAddress({ field: 'city', value: po.District });
        setAddress({ field: 'state', value: po.State });
      } else {
        setPinError('Invalid pincode');
      }
    } catch {
      setPinError('Could not fetch pincode details');
    } finally {
      setPinLoading(false);
    }
  }, []);

  const subtotal = cart.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 1), 0);
  const onlineDiscount = paymentMethod === 'online' ? Math.min(Math.round(subtotal * 0.02), 100) : 0;
  const couponDiscount = coupon?.discount || 0;
  const grandTotal = Math.max(subtotal - onlineDiscount - couponDiscount, 0);

  // Fetch cart + pre-fill saved default address
  useEffect(() => {
    dispatch(getDataFromCart());

    client.get('/auth/me').then((res) => {
      const addrs = res.data?.user?.addresses || [];
      const def = addrs.find((a) => a.isDefault) || addrs[0];
      if (def) {
        setAddress({ type: 'load', value: def });
      }
    }).catch(() => {});
  }, [dispatch]);

  const isAddressValid = () =>
    address.name && address.mobile?.length >= 10 && address.pincode?.length === 6 && address.city && address.state;

  const handleContinueToPayment = async () => {
    if (!isAddressValid()) {
      setError('Please fill all required address fields (Name, Mobile, Pincode, City, State).');
      return;
    }
    setError('');

    if (saveAddress) {
      try {
        await client.put('/auth/address', {
          name: address.name,
          mobile: address.mobile,
          pincode: address.pincode,
          city: address.city,
          state: address.state,
          buildingNo: address.buildingNo,
          street: address.street,
          landmark: address.landmark,
        });
      } catch {
        // non-blocking — address still works for this order even if save fails
      }
    }

    setStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const shippingPayload = {
    name: address.name,
    mobile: address.mobile,
    pincode: address.pincode,
    city: address.city,
    state: address.state,
    buildingNo: address.buildingNo,
    street: address.street,
    landmark: address.landmark,
  };

  const handleCodOrder = async () => {
    setIsSubmitting(true);
    setError('');
    try {
      await dispatch(
        createCheckoutSession({
          deliveryType: 'home',
          paymentMethod: 'cod',
          shipping: shippingPayload,
          couponCode: coupon?.code || '',
        })
      );
      await dispatch(getDataFromCart());
      navigate('/thankyou');
    } catch (err) {
      setError(err.response?.data?.message || 'Order failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRazorpayOrder = async () => {
    setIsSubmitting(true);
    setError('');
    try {
      const loaded = await loadRazorpayScript();
      if (!loaded) {
        setError('Failed to load payment gateway. Please check your internet connection.');
        setIsSubmitting(false);
        return;
      }

      const { data } = await client.post('/payments/create-razorpay-order', {
        deliveryType: 'home',
        shipping: shippingPayload,
        couponCode: coupon?.code || '',
      });

      const options = {
        key: data.razorpayKeyId,
        amount: data.amount,
        currency: data.currency,
        name: "Harsha's Collection",
        description: `Order #${data.orderId.slice(-6).toUpperCase()}`,
        order_id: data.razorpayOrderId,
        handler: async (response) => {
          try {
            await client.post('/payments/verify-razorpay', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderId: data.orderId,
            });
            await dispatch(getDataFromCart());
            navigate('/thankyou');
          } catch {
            setError('Payment verification failed. Please contact support.');
            setIsSubmitting(false);
          }
        },
        prefill: {
          name: address.name,
          contact: address.mobile,
        },
        theme: { color: '#3182CE' },
        modal: {
          ondismiss: () => {
            setError('Payment was cancelled. Your order is saved — you can retry.');
            setIsSubmitting(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', (resp) => {
        setError(`Payment failed: ${resp.error.description || 'Unknown error'}. Please try again.`);
        setIsSubmitting(false);
      });
      rzp.open();
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to initiate payment. Please try again.';
      setError(msg);
      setIsSubmitting(false);
    }
  };

  const handlePlaceOrder = () => {
    if (paymentMethod === 'cod') {
      handleCodOrder();
    } else {
      handleRazorpayOrder();
    }
  };

  return (
    <Container maxW="1100px" py={6} px={{ base: 3, md: 6 }}>
      {/* Back + Step Indicator */}
      <Flex align="center" mb={4} cursor="pointer" onClick={() => (step > 0 ? setStep(step - 1) : navigate('/cart'))} color="blue.500" _hover={{ color: 'blue.700' }}>
        <Icon as={MdArrowBack} mr={1} />
        <Text fontSize="sm" fontWeight="600">{step > 0 ? 'Back to Address' : 'Back to Cart'}</Text>
      </Flex>
      <StepIndicator current={step} />

      {error && (
        <Alert status="error" mb={4} rounded="md">
          <AlertIcon />
          {error}
        </Alert>
      )}

      <Grid templateColumns={{ base: '1fr', md: '3fr 2fr' }} gap={6}>
        {/* ─── LEFT PANEL ─── */}
        <GridItem>
          {step === 0 && (
            <Box bg="white" border="1px" borderColor="gray.200" rounded="lg" p={6}>
              <Heading size="md" mb={5}>Delivery Address</Heading>
              <VStack spacing={4}>
                <Input
                  placeholder="Full Name *"
                  value={address.name}
                  onChange={(e) => setAddress({ field: 'name', value: e.target.value })}
                />
                <InputGroup>
                  <InputLeftElement pointerEvents="none" color="gray.400" fontSize="sm">+91</InputLeftElement>
                  <Input
                    type="tel"
                    placeholder="Mobile Number *"
                    pl="42px"
                    maxLength={10}
                    value={address.mobile}
                    onChange={(e) => setAddress({ field: 'mobile', value: e.target.value.replace(/\D/g, '') })}
                  />
                </InputGroup>
                <SimpleGrid columns={2} spacing={3} w="full">
                  <Box>
                    <InputGroup>
                      <Input
                        placeholder="Pincode *"
                        maxLength={6}
                        value={address.pincode}
                        borderColor={pinError ? 'red.300' : undefined}
                        onChange={(e) => {
                          const pin = e.target.value.replace(/\D/g, '');
                          setAddress({ field: 'pincode', value: pin });
                          setPinError('');
                          if (pin.length === 6) lookupPincode(pin);
                        }}
                      />
                      {pinLoading && (
                        <InputLeftElement pointerEvents="none" right={0} left="auto" w="40px">
                          <Text fontSize="xs" color="blue.500">...</Text>
                        </InputLeftElement>
                      )}
                    </InputGroup>
                    {pinError && <Text fontSize="xs" color="red.500" mt={1}>{pinError}</Text>}
                  </Box>
                  <Input
                    placeholder="City *"
                    value={address.city}
                    onChange={(e) => setAddress({ field: 'city', value: e.target.value })}
                    bg={address.city && pinLoading === false ? 'green.50' : undefined}
                  />
                </SimpleGrid>
                <Input
                  placeholder="State *"
                  value={address.state}
                  onChange={(e) => setAddress({ field: 'state', value: e.target.value })}
                  bg={address.state && pinLoading === false ? 'green.50' : undefined}
                />
                <Input
                  placeholder="Building / House No."
                  value={address.buildingNo}
                  onChange={(e) => setAddress({ field: 'buildingNo', value: e.target.value })}
                />
                <Input
                  placeholder="Street / Area"
                  value={address.street}
                  onChange={(e) => setAddress({ field: 'street', value: e.target.value })}
                />
                <Input
                  placeholder="Landmark (optional)"
                  value={address.landmark}
                  onChange={(e) => setAddress({ field: 'landmark', value: e.target.value })}
                />

                <Checkbox
                  isChecked={saveAddress}
                  onChange={(e) => setSaveAddress(e.target.checked)}
                  colorScheme="blue"
                  size="sm"
                  alignSelf="flex-start"
                >
                  Save this address as default for future orders
                </Checkbox>
              </VStack>
              <Button
                colorScheme="blue"
                size="lg"
                w="full"
                mt={6}
                onClick={handleContinueToPayment}
                _hover={{ transform: 'translateY(-1px)', shadow: 'lg' }}
                transition="all 0.2s"
              >
                Continue to Payment
              </Button>
            </Box>
          )}

          {step === 1 && (
            <Box>
              {/* Address summary card */}
              <Box
                bgGradient="linear(to-r, green.50, teal.50)"
                border="1px"
                borderColor="green.200"
                rounded="xl"
                p={4}
                mb={5}
                position="relative"
                overflow="hidden"
              >
                <Box position="absolute" top="-10px" right="-10px" w="60px" h="60px" bg="green.100" rounded="full" opacity={0.5} />
                <Flex justify="space-between" align="center">
                  <HStack spacing={2}>
                    <Flex w="24px" h="24px" rounded="full" bg="green.500" align="center" justify="center">
                      <Icon as={MdCheck} color="white" boxSize={3.5} />
                    </Flex>
                    <Text fontWeight="700" fontSize="sm" color="gray.800">Delivering to {address.name}</Text>
                  </HStack>
                  <Button size="xs" variant="ghost" colorScheme="teal" onClick={() => setStep(0)} fontWeight="600">
                    Change
                  </Button>
                </Flex>
                <Text fontSize="xs" color="gray.600" mt={1.5} pl={8}>
                  {[address.buildingNo, address.street, address.city, address.state, address.pincode].filter(Boolean).join(', ')}
                </Text>
                <Text fontSize="xs" color="gray.500" pl={8}>+91 {address.mobile}</Text>
              </Box>

              {/* Payment methods */}
              <Box bg="white" rounded="xl" overflow="hidden" shadow="sm" border="1px" borderColor="gray.100">
                <Box px={6} py={5} bgGradient="linear(to-r, gray.50, white)">
                  <Heading size="md" color="gray.800" letterSpacing="-0.01em">Payment</Heading>
                  <Text fontSize="xs" color="gray.500" mt={0.5}>All transactions are secure and encrypted</Text>
                </Box>

                <RadioGroup value={paymentMethod} onChange={setPaymentMethod}>
                  <VStack spacing={0} align="stretch">
                    {/* Pay Online */}
                    <Box
                      px={6}
                      py={5}
                      cursor="pointer"
                      bg={paymentMethod === 'online' ? 'white' : 'white'}
                      borderLeft={paymentMethod === 'online' ? '3px solid' : '3px solid transparent'}
                      borderLeftColor={paymentMethod === 'online' ? 'blue.500' : 'transparent'}
                      borderBottom="1px"
                      borderBottomColor="gray.100"
                      _hover={{ bg: 'gray.50' }}
                      onClick={() => setPaymentMethod('online')}
                      transition="all 0.15s"
                    >
                      <Flex align="center" justify="space-between">
                        <HStack spacing={3}>
                          <Radio value="online" colorScheme="blue" size="lg" />
                          <Flex
                            w="40px"
                            h="40px"
                            rounded="lg"
                            bg="blue.50"
                            align="center"
                            justify="center"
                          >
                            <Icon as={MdPayment} color="blue.500" boxSize={5} />
                          </Flex>
                          <Box>
                            <Text fontWeight="700" fontSize="md" color="gray.800">Pay Online</Text>
                            <Text fontSize="xs" color="gray.500" mt={0.5}>
                              UPI, Cards, Net Banking, Wallets
                            </Text>
                          </Box>
                        </HStack>
                        {onlineDiscount > 0 && (
                          <Badge
                            bgGradient="linear(to-r, green.400, green.500)"
                            color="white"
                            fontSize="xs"
                            px={3}
                            py={1}
                            rounded="full"
                            fontWeight="700"
                          >
                            SAVE {'\u20B9'}{onlineDiscount}
                          </Badge>
                        )}
                      </Flex>

                      {paymentMethod === 'online' && (
                        <Box mt={4} ml={14}>
                          <Box bg="blue.50" rounded="lg" p={3} mb={3}>
                            <HStack spacing={2}>
                              <Icon as={MdShield} color="blue.500" boxSize={4} />
                              <Text fontSize="xs" color="blue.700" fontWeight="500">
                                Secured by Razorpay — choose your preferred method on the next screen
                              </Text>
                            </HStack>
                          </Box>
                          <Flex gap={2} flexWrap="wrap">
                            {[
                              { label: 'UPI', color: 'purple' },
                              { label: 'Visa', color: 'blue' },
                              { label: 'Mastercard', color: 'orange' },
                              { label: 'RuPay', color: 'green' },
                              { label: 'Net Banking', color: 'teal' },
                              { label: 'Wallets', color: 'pink' },
                            ].map(({ label, color }) => (
                              <Badge
                                key={label}
                                bg={`${color}.50`}
                                color={`${color}.700`}
                                fontSize="10px"
                                px={2.5}
                                py={1}
                                rounded="md"
                                fontWeight="600"
                                border="1px"
                                borderColor={`${color}.100`}
                              >
                                {label}
                              </Badge>
                            ))}
                          </Flex>
                        </Box>
                      )}
                    </Box>

                    {/* Cash on Delivery */}
                    <Box
                      px={6}
                      py={5}
                      cursor="pointer"
                      borderLeft={paymentMethod === 'cod' ? '3px solid' : '3px solid transparent'}
                      borderLeftColor={paymentMethod === 'cod' ? 'orange.400' : 'transparent'}
                      _hover={{ bg: 'gray.50' }}
                      onClick={() => setPaymentMethod('cod')}
                      transition="all 0.15s"
                    >
                      <HStack spacing={3}>
                        <Radio value="cod" colorScheme="orange" size="lg" />
                        <Flex
                          w="40px"
                          h="40px"
                          rounded="lg"
                          bg="orange.50"
                          align="center"
                          justify="center"
                        >
                          <Icon as={MdLocalShipping} color="orange.500" boxSize={5} />
                        </Flex>
                        <Box flex="1">
                          <Text fontWeight="700" fontSize="md" color="gray.800">Cash on Delivery</Text>
                          <Text fontSize="xs" color="gray.500" mt={0.5}>Pay when your order arrives</Text>
                        </Box>
                      </HStack>
                      {paymentMethod === 'cod' && onlineDiscount > 0 && (
                        <Box mt={3} ml={14}>
                          <Box bg="orange.50" rounded="lg" p={2.5}>
                            <Text fontSize="xs" color="orange.700" fontWeight="600">
                              Switch to Pay Online and save {'\u20B9'}{onlineDiscount}!
                            </Text>
                          </Box>
                        </Box>
                      )}
                    </Box>
                  </VStack>
                </RadioGroup>

                {/* Place Order Button */}
                <Box px={6} py={5} bg="gray.50" borderTop="1px" borderColor="gray.100">
                  {onlineDiscount > 0 && paymentMethod === 'online' && (
                    <Flex justify="center" mb={3}>
                      <HStack spacing={1.5} bg="green.50" px={3} py={1.5} rounded="full">
                        <Icon as={MdLocalOffer} color="green.500" boxSize={3.5} />
                        <Text fontSize="xs" fontWeight="600" color="green.700">
                          Online discount of {'\u20B9'}{onlineDiscount} applied
                        </Text>
                      </HStack>
                    </Flex>
                  )}
                  <Button
                    w="full"
                    h="52px"
                    bgGradient={paymentMethod === 'cod' ? 'linear(to-r, orange.400, orange.500)' : 'linear(to-r, blue.500, blue.600)'}
                    color="white"
                    fontSize="md"
                    fontWeight="700"
                    rounded="xl"
                    onClick={handlePlaceOrder}
                    isLoading={isSubmitting}
                    loadingText="Processing..."
                    _hover={{
                      bgGradient: paymentMethod === 'cod' ? 'linear(to-r, orange.500, orange.600)' : 'linear(to-r, blue.600, blue.700)',
                      transform: 'translateY(-2px)',
                      shadow: 'lg',
                    }}
                    _active={{ transform: 'translateY(0)' }}
                    transition="all 0.2s"
                    shadow="md"
                  >
                    {paymentMethod === 'cod'
                      ? `Place Order \u2022 \u20B9${grandTotal.toLocaleString('en-IN')}`
                      : `Pay \u20B9${grandTotal.toLocaleString('en-IN')}`}
                  </Button>
                  <Flex justify="center" mt={3} gap={4}>
                    <HStack spacing={1}>
                      <Icon as={MdShield} color="gray.400" boxSize={3} />
                      <Text fontSize="10px" color="gray.400" fontWeight="500">Secure Payment</Text>
                    </HStack>
                    <HStack spacing={1}>
                      <Icon as={MdLoop} color="gray.400" boxSize={3} />
                      <Text fontSize="10px" color="gray.400" fontWeight="500">Easy Returns</Text>
                    </HStack>
                  </Flex>
                </Box>
              </Box>
            </Box>
          )}
        </GridItem>

        {/* ─── RIGHT — Order Summary ─── */}
        <GridItem>
          <Box position={{ md: 'sticky' }} top="80px">
            <Box bg="white" border="1px" borderColor="gray.200" rounded="lg" overflow="hidden">
              <Box px={5} py={4} borderBottom="1px" borderColor="gray.100">
                <Heading size="sm">Order Summary ({cart.length} item{cart.length !== 1 ? 's' : ''})</Heading>
              </Box>

              {/* Cart items */}
              <Box maxH="280px" overflowY="auto" px={5} py={3}>
                <VStack spacing={3} divider={<Divider />}>
                  {cart.map((item) => {
                    const itemId = item._id || item.id;
                    return (
                      <HStack key={itemId} w="full" spacing={3} align="start">
                        <Image
                          src={resolveImageUrl(item.img || `/api/images/${item.legacyId || itemId}.jpg`)}
                          alt={item.name}
                          w="50px"
                          h="60px"
                          objectFit="cover"
                          rounded="md"
                          bg="gray.100"
                        />
                        <Box flex="1">
                          <Text fontSize="sm" fontWeight="500" noOfLines={1}>{item.name}</Text>
                          <Text fontSize="xs" color="gray.500">Qty: {item.quantity || 1}</Text>
                        </Box>
                        <Text fontSize="sm" fontWeight="600">₹{(item.price * (item.quantity || 1)).toLocaleString('en-IN')}</Text>
                      </HStack>
                    );
                  })}
                </VStack>
              </Box>

              <Divider />

              {/* Price breakdown */}
              <VStack px={5} py={4} spacing={2} align="stretch" fontSize="sm">
                <Flex justify="space-between">
                  <Text color="gray.600">Subtotal</Text>
                  <Text>₹{subtotal.toLocaleString('en-IN')}</Text>
                </Flex>
                <Flex justify="space-between">
                  <Text color="gray.600">Shipping</Text>
                  <Text color="green.500" fontWeight="600">FREE</Text>
                </Flex>
                {onlineDiscount > 0 && (
                  <Flex justify="space-between">
                    <Text color="green.600">Online payment discount</Text>
                    <Text color="green.600" fontWeight="600">{'\u2212'}{'\u20B9'}{onlineDiscount}</Text>
                  </Flex>
                )}
                {couponDiscount > 0 && (
                  <Flex justify="space-between">
                    <Text color="green.600">Coupon ({coupon?.code})</Text>
                    <Text color="green.600" fontWeight="600">{'\u2212'}{'\u20B9'}{couponDiscount}</Text>
                  </Flex>
                )}
                <Divider />
                <Flex justify="space-between" fontWeight="bold" fontSize="md">
                  <Text>Total</Text>
                  <Text color="blue.600">₹{grandTotal.toLocaleString('en-IN')}</Text>
                </Flex>
                {onlineDiscount > 0 && (
                  <Text fontSize="xs" color="green.600" textAlign="right">
                    You save ₹{(onlineDiscount + couponDiscount).toLocaleString('en-IN')} on this order
                  </Text>
                )}
              </VStack>
            </Box>

            {/* Trust badges */}
            <SimpleGrid columns={3} spacing={3} mt={4}>
              <VStack spacing={1} p={3} bg="white" border="1px" borderColor="gray.200" rounded="lg" textAlign="center">
                <Icon as={MdShield} color="green.500" boxSize={5} />
                <Text fontSize="10px" fontWeight="600" color="gray.600">Safe & Secure</Text>
              </VStack>
              <VStack spacing={1} p={3} bg="white" border="1px" borderColor="gray.200" rounded="lg" textAlign="center">
                <Icon as={MdLoop} color="blue.500" boxSize={5} />
                <Text fontSize="10px" fontWeight="600" color="gray.600">Easy Returns</Text>
              </VStack>
              <VStack spacing={1} p={3} bg="white" border="1px" borderColor="gray.200" rounded="lg" textAlign="center">
                <Icon as={MdLocalShipping} color="orange.500" boxSize={5} />
                <Text fontSize="10px" fontWeight="600" color="gray.600">Free Shipping</Text>
              </VStack>
            </SimpleGrid>
          </Box>
        </GridItem>
      </Grid>
    </Container>
  );
};

export default Payment;
