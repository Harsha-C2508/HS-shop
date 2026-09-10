import React, { useEffect, useState } from 'react';
import {
  Badge,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  Image,
  List,
  ListIcon,
  ListItem,
  SimpleGrid,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Tr,
  useToast,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import {
  MdCheckCircle,
  MdLocalShipping,
  MdStar,
  MdStarHalf,
  MdStarOutline,
  MdShield,
  MdLoop,
  MdVerified,
  MdStorefront,
} from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, Link as RouterLink } from 'react-router-dom';
import Navbar from './Navbar';
import ReviewsSection from './ReviewsSection';
import RecentlyViewed from './RecentlyViewed';
import { LoadingState, ErrorState } from './LoadingState';
import { addRecentlyViewed } from '../hooks/useRecentlyViewed';
import { CATEGORY_CONFIG } from '../config/catalog';
import { resolveImageUrl } from '../api/client';
import {
  addCart,
  addWish,
  getDataFromCart,
  getDataFromWish,
  getProductById,
} from '../Redux/AppRedux/action';

const StarRating = ({ rating, count }) => {
  const stars = [];
  const full = Math.floor(rating);
  const half = rating - full >= 0.3;
  for (let i = 0; i < full; i++) stars.push(<Icon key={`f${i}`} as={MdStar} color="orange.400" />);
  if (half) stars.push(<Icon key="h" as={MdStarHalf} color="orange.400" />);
  while (stars.length < 5) stars.push(<Icon key={`e${stars.length}`} as={MdStarOutline} color="gray.300" />);
  return (
    <HStack spacing={0}>
      {stars}
      {count !== undefined && (
        <Text fontSize="sm" color="gray.500" ml={2}>
          ({count} ratings)
        </Text>
      )}
    </HStack>
  );
};

const ProductDetail = ({ category = 'home' }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const { isAuth } = useSelector((store) => store.AuthRedux);
  const product = useSelector((store) => store.AppRedux.productDetail);
  const isLoading = useSelector((store) => store.AppRedux.isLoading);
  const [error, setError] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [pincode, setPincode] = useState('');
  const [pincodeMsg, setPincodeMsg] = useState('');
  const config = CATEGORY_CONFIG[category] || CATEGORY_CONFIG.home;

  useEffect(() => {
    setError(false);
    setSelectedSize(null);
    setSelectedColor(null);
    dispatch(getProductById(id, category))
      .then((data) => {
        if (data) {
          addRecentlyViewed({ ...data, category, basePath: config.basePath });
          if (data.colors?.length > 0) setSelectedColor(data.colors[0].name);
          if (data.sizes?.length > 0) setSelectedSize(data.sizes[Math.min(2, data.sizes.length - 1)]);
        }
      })
      .catch(() => setError(true));
  }, [dispatch, id, category, config.basePath]);

  useEffect(() => {
    if (isAuth) dispatch(getDataFromCart());
  }, [dispatch, isAuth]);

  const requireAuth = () => {
    if (!isAuth) {
      navigate('/login', { state: { from: { pathname: `${config.basePath}/${id}` } } });
      return false;
    }
    return true;
  };

  const handleAddCart = () => {
    if (!requireAuth()) return;
    if (product.sizes?.length > 0 && !selectedSize) {
      toast({ title: 'Please select a size', status: 'warning', duration: 2000 });
      return;
    }
    dispatch(addCart({ ...product, selectedSize, selectedColor })).then(() => {
      dispatch(getDataFromCart());
      toast({ title: 'Added to cart!', status: 'success', duration: 2000 });
    });
  };

  const handleBuyNow = () => {
    if (!requireAuth()) return;
    if (product.sizes?.length > 0 && !selectedSize) {
      toast({ title: 'Please select a size', status: 'warning', duration: 2000 });
      return;
    }
    dispatch(addCart({ ...product, selectedSize, selectedColor })).then(() => {
      dispatch(getDataFromCart());
      navigate('/cart');
    });
  };

  const handleAddWish = () => {
    if (!requireAuth()) return;
    dispatch(addWish(product)).then(() => {
      dispatch(getDataFromWish());
      toast({ title: 'Added to wishlist ♥', status: 'success', duration: 2000 });
    });
  };

  const handlePincode = () => {
    if (!pincode || pincode.length !== 6) {
      setPincodeMsg('Enter a valid 6-digit pincode');
      return;
    }
    setPincodeMsg('Delivery by ' + new Date(Date.now() + 3 * 86400000).toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' }) + ' | Free');
  };

  if (isLoading && !product?.name) {
    return (
      <>
        <Navbar />
        <LoadingState />
      </>
    );
  }

  if (error || !product?.name) {
    return (
      <>
        <Navbar />
        <ErrorState message="Product not found." onRetry={() => dispatch(getProductById(id, category))} />
      </>
    );
  }

  const discounted = Math.round(product.price * (1 - (product.offer || 0) / 100));
  const savings = product.price - discounted;
  const hasSpecs = product.specs && Object.keys(product.specs).length > 0;

  return (
    <>
      <Navbar />

      {/* Breadcrumb */}
      <Box bg="gray.50" py={2} px={{ base: 4, md: '8%' }} borderBottom="1px" borderColor="gray.100">
        <Breadcrumb fontSize="sm" color="gray.500" separator="›">
          <BreadcrumbItem>
            <BreadcrumbLink as={RouterLink} to="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink as={RouterLink} to={config.basePath}>{config.label}</BreadcrumbLink>
          </BreadcrumbItem>
          {product.cat && product.cat !== config.label && (
            <BreadcrumbItem>
              <BreadcrumbLink>{product.cat}</BreadcrumbLink>
            </BreadcrumbItem>
          )}
          <BreadcrumbItem isCurrentPage>
            <Text color="gray.700" noOfLines={1} maxW="300px">{product.name}</Text>
          </BreadcrumbItem>
        </Breadcrumb>
      </Box>

      <Box maxW="1200px" mx="auto" px={{ base: 4, md: 6 }} py={6}>
        <Grid templateColumns={{ base: '1fr', md: '5fr 7fr' }} gap={8}>

          {/* LEFT — Image Section */}
          <GridItem>
            <Box position="sticky" top="80px">
              <Box
                border="1px"
                borderColor="gray.200"
                rounded="lg"
                p={4}
                bg="white"
                textAlign="center"
                position="relative"
                overflow="hidden"
              >
                <Image
                  src={resolveImageUrl(product.img)}
                  alt={product.name}
                  maxH="420px"
                  mx="auto"
                  objectFit="contain"
                  rounded="md"
                  fallbackSrc={resolveImageUrl(`/api/images/${product.id || id}.jpg`)}
                />
                {/* Selected color indicator on image */}
                {selectedColor && (
                  <Flex
                    position="absolute"
                    bottom={3}
                    left={3}
                    align="center"
                    gap={2}
                    bg="whiteAlpha.900"
                    backdropFilter="blur(4px)"
                    px={3}
                    py={1.5}
                    rounded="full"
                    shadow="sm"
                    border="1px solid"
                    borderColor="gray.200"
                  >
                    <Box
                      w="14px"
                      h="14px"
                      rounded="full"
                      bg={product.colors?.find((c) => c.name === selectedColor)?.hex || 'gray.300'}
                      border="1px solid"
                      borderColor="gray.300"
                    />
                    <Text fontSize="xs" fontWeight="600" color="gray.700">
                      {selectedColor}
                    </Text>
                  </Flex>
                )}
              </Box>
              {/* Action buttons (Flipkart-style — bottom of image on desktop) */}
              <Flex gap={3} mt={4}>
                <Button
                  flex="1"
                  size="lg"
                  colorScheme="orange"
                  leftIcon={<span>🛒</span>}
                  onClick={handleAddCart}
                  _hover={{ transform: 'translateY(-1px)', shadow: 'lg' }}
                  transition="all 0.2s"
                >
                  Add to Cart
                </Button>
                <Button
                  flex="1"
                  size="lg"
                  colorScheme="blue"
                  leftIcon={<span>⚡</span>}
                  onClick={handleBuyNow}
                  _hover={{ transform: 'translateY(-1px)', shadow: 'lg' }}
                  transition="all 0.2s"
                >
                  Buy Now
                </Button>
              </Flex>
            </Box>
          </GridItem>

          {/* RIGHT — Details Section */}
          <GridItem>
            <VStack align="stretch" spacing={4}>

              {/* Brand & Title */}
              {product.brand && (
                <Text fontSize="sm" color="gray.500" fontWeight="medium" letterSpacing="wide">
                  {product.brand}
                </Text>
              )}
              <Heading size="lg" fontWeight="semibold" lineHeight="1.3">
                {product.name}
              </Heading>

              {/* Rating Badge */}
              <HStack spacing={3}>
                <Badge
                  colorScheme={product.star >= 4 ? 'green' : product.star >= 3 ? 'yellow' : 'red'}
                  px={2}
                  py={0.5}
                  rounded="sm"
                  fontSize="sm"
                  fontWeight="bold"
                >
                  {product.star} ★
                </Badge>
                <StarRating rating={product.star} />
                <Text fontSize="sm" color="blue.500" fontWeight="medium">
                  {Math.floor(Math.random() * 800 + 200)} ratings
                </Text>
              </HStack>

              <Badge colorScheme="green" w="fit-content" px={2} py={0.5} fontSize="xs">
                Assured Quality
              </Badge>

              <Divider />

              {/* Price Section */}
              <Box>
                <HStack align="baseline" spacing={3}>
                  <Heading size="xl" fontWeight="bold">
                    ₹{discounted.toLocaleString('en-IN')}
                  </Heading>
                  {product.offer > 0 && (
                    <>
                      <Text as="s" fontSize="lg" color="gray.400">
                        ₹{product.price.toLocaleString('en-IN')}
                      </Text>
                      <Text color="green.500" fontWeight="bold" fontSize="lg">
                        {product.offer}% off
                      </Text>
                    </>
                  )}
                </HStack>
                {savings > 0 && (
                  <Text fontSize="sm" color="green.600" mt={1}>
                    You save ₹{savings.toLocaleString('en-IN')} on this order
                  </Text>
                )}
                <Text fontSize="xs" color="gray.400" mt={1}>
                  inclusive of all taxes
                </Text>
              </Box>

              {/* EMI note */}
              {discounted > 1000 && (
                <Text fontSize="sm" color="gray.600">
                  EMI from ₹{Math.ceil(discounted / 6).toLocaleString('en-IN')}/month.{' '}
                  <Text as="span" color="blue.500" cursor="pointer">View Plans</Text>
                </Text>
              )}

              <Divider />

              {/* Colors */}
              {product.colors?.length > 0 && (
                <Box>
                  <Text fontWeight="semibold" mb={2}>
                    Color: <Text as="span" fontWeight="normal">{selectedColor}</Text>
                  </Text>
                  <Wrap spacing={2}>
                    {product.colors.map((c) => (
                      <WrapItem key={c.name}>
                        <Box
                          as="button"
                          w="36px"
                          h="36px"
                          rounded="full"
                          bg={c.hex}
                          border="3px solid"
                          borderColor={selectedColor === c.name ? 'blue.500' : 'gray.200'}
                          onClick={() => setSelectedColor(c.name)}
                          title={c.name}
                          _hover={{ borderColor: 'blue.300' }}
                          transition="all 0.15s"
                          shadow={selectedColor === c.name ? 'md' : 'none'}
                        />
                      </WrapItem>
                    ))}
                  </Wrap>
                </Box>
              )}

              {/* Sizes */}
              {product.sizes?.length > 0 && (
                <Box>
                  <HStack justify="space-between" mb={2}>
                    <Text fontWeight="semibold">
                      Size: <Text as="span" fontWeight="normal">{selectedSize || 'Select'}</Text>
                    </Text>
                    <Text fontSize="sm" color="blue.500" cursor="pointer">Size Chart</Text>
                  </HStack>
                  <Wrap spacing={2}>
                    {product.sizes.map((s) => (
                      <WrapItem key={s}>
                        <Button
                          size="sm"
                          variant={selectedSize === s ? 'solid' : 'outline'}
                          colorScheme={selectedSize === s ? 'blue' : 'gray'}
                          onClick={() => setSelectedSize(s)}
                          minW="48px"
                          fontWeight={selectedSize === s ? 'bold' : 'normal'}
                          _hover={{ borderColor: 'blue.400' }}
                        >
                          {s}
                        </Button>
                      </WrapItem>
                    ))}
                  </Wrap>
                </Box>
              )}

              <Divider />

              {/* Delivery */}
              <Box>
                <Text fontWeight="semibold" mb={2}>Delivery</Text>
                <HStack>
                  <input
                    type="text"
                    placeholder="Enter Pincode"
                    value={pincode}
                    onChange={(e) => {
                      setPincode(e.target.value.replace(/\D/g, '').slice(0, 6));
                      setPincodeMsg('');
                    }}
                    style={{
                      border: '1px solid #e2e8f0',
                      borderRadius: '6px',
                      padding: '6px 12px',
                      width: '150px',
                      fontSize: '14px',
                    }}
                  />
                  <Button size="sm" colorScheme="blue" variant="link" onClick={handlePincode}>
                    Check
                  </Button>
                </HStack>
                {pincodeMsg && (
                  <Text fontSize="sm" color={pincodeMsg.includes('Delivery') ? 'green.600' : 'red.500'} mt={1}>
                    {pincodeMsg}
                  </Text>
                )}
                <HStack mt={3} spacing={6} color="gray.600" fontSize="sm">
                  <HStack>
                    <Icon as={MdLocalShipping} color="blue.500" />
                    <Text>Free delivery</Text>
                  </HStack>
                  <HStack>
                    <Icon as={MdLoop} color="blue.500" />
                    <Text>{product.returnPolicy || '10 days return'}</Text>
                  </HStack>
                </HStack>
              </Box>

              <Divider />

              {/* Highlights */}
              {product.highlights?.length > 0 && (
                <Box>
                  <Text fontWeight="semibold" mb={2}>Highlights</Text>
                  <List spacing={2}>
                    {product.highlights.map((h, i) => (
                      <ListItem key={i} fontSize="sm" display="flex" alignItems="flex-start">
                        <ListIcon as={MdCheckCircle} color="green.500" mt="3px" />
                        {h}
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}

              {/* Material */}
              {product.material && (
                <HStack fontSize="sm" color="gray.600">
                  <Text fontWeight="semibold">Material:</Text>
                  <Text>{product.material}</Text>
                </HStack>
              )}

              <Divider />

              {/* Seller + Warranty */}
              <SimpleGrid columns={{ base: 1, sm: 3 }} spacing={4}>
                {product.seller && (
                  <VStack spacing={1} align="center" p={3} bg="gray.50" rounded="md">
                    <Icon as={MdStorefront} boxSize={5} color="blue.500" />
                    <Text fontSize="xs" color="gray.500">Sold by</Text>
                    <Text fontSize="sm" fontWeight="semibold" textAlign="center">{product.seller}</Text>
                  </VStack>
                )}
                {product.warranty && (
                  <VStack spacing={1} align="center" p={3} bg="gray.50" rounded="md">
                    <Icon as={MdShield} boxSize={5} color="green.500" />
                    <Text fontSize="xs" color="gray.500">Warranty</Text>
                    <Text fontSize="sm" fontWeight="semibold" textAlign="center">{product.warranty}</Text>
                  </VStack>
                )}
                <VStack spacing={1} align="center" p={3} bg="gray.50" rounded="md">
                  <Icon as={MdVerified} boxSize={5} color="purple.500" />
                  <Text fontSize="xs" color="gray.500">Quality</Text>
                  <Text fontSize="sm" fontWeight="semibold" textAlign="center">100% Genuine</Text>
                </VStack>
              </SimpleGrid>

              {/* Wishlist */}
              <Button
                variant="ghost"
                color="pink.500"
                onClick={handleAddWish}
                size="sm"
                leftIcon={<span>♥</span>}
                _hover={{ bg: 'pink.50' }}
              >
                Add to Wishlist
              </Button>

              <Divider />

              {/* Description */}
              {product.dis && (
                <Box>
                  <Text fontWeight="semibold" mb={2}>Product Description</Text>
                  <Text fontSize="sm" color="gray.600" lineHeight="tall">
                    {product.dis}
                  </Text>
                </Box>
              )}

              {/* Specifications Table */}
              {hasSpecs && (
                <Box>
                  <Text fontWeight="semibold" mb={3}>Specifications</Text>
                  <Box border="1px" borderColor="gray.200" rounded="md" overflow="hidden">
                    <Table size="sm" variant="striped" colorScheme="gray">
                      <Tbody>
                        {Object.entries(product.specs).map(([key, val]) => (
                          <Tr key={key}>
                            <Th
                              w="40%"
                              bg="gray.50"
                              color="gray.600"
                              fontWeight="medium"
                              textTransform="none"
                              fontSize="sm"
                              py={3}
                            >
                              {key}
                            </Th>
                            <Td fontSize="sm" py={3}>{val}</Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </Box>
                </Box>
              )}

            </VStack>
          </GridItem>
        </Grid>

        {/* Reviews */}
        <Box mt={10}>
          <ReviewsSection productId={id} />
        </Box>

        {/* Recently Viewed */}
        <Box mt={10}>
          <RecentlyViewed currentId={id} />
        </Box>
      </Box>
    </>
  );
};

export default ProductDetail;
