import { Box, Button, Flex, Image, Text, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import { addCart, getDataFromCart, getDataFromWish } from '../Redux/AppRedux/action';
import { CATEGORY_CONFIG } from '../config/catalog';
import { LoadingState, EmptyState } from '../Components/LoadingState';
import Styles from '../Styles/Cart.module.css';
import DeleteWish from './DeleteWish';

const getProductPath = (item) => {
  const config = CATEGORY_CONFIG[item.category];
  const basePath = config ? config.basePath : '/home';
  return `${basePath}/${item.productId || item.id}`;
};

const Wishlist = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const wish = useSelector((store) => store.AppRedux.wish) || [];
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    dispatch(getDataFromWish()).finally(() => setLoading(false));
  }, [dispatch]);

  const handleAddToCart = (item) => {
    dispatch(addCart(item)).then(() => {
      dispatch(getDataFromCart());
      toast({ title: 'Added to cart!', status: 'success', duration: 2000 });
    });
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <LoadingState label="Loading wishlist..." />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Box px={4} py={4}>
        <Text fontWeight="extrabold" fontSize="2xl" mb={4}>
          Your Wishlist
        </Text>
        {wish.length === 0 ? (
          <EmptyState message="Your wishlist is empty. Save items you love!" />
        ) : (
          <Box className={Styles.wish}>
            {wish.map((items) => (
              <div key={items.id} className={Styles.innerBox}>
                <DeleteWish {...items} />
                <Link to={getProductPath(items)}>
                  <Image
                    src={items.img}
                    alt={items.name}
                    className={Styles.img}
                    cursor="pointer"
                    _hover={{ opacity: 0.85 }}
                    transition="opacity 0.2s"
                  />
                  <Text fontWeight="medium" mt={2} noOfLines={2} _hover={{ color: 'blue.600' }}>
                    {items.name}
                  </Text>
                </Link>
                <Text fontWeight="semibold">₹ {items.price}</Text>
                <Flex justifyContent="space-between" w="90%" m="auto">
                  <Text color="green.600" fontSize="sm">{items.offer}% off</Text>
                  <Text fontSize="sm">{items.star}⭐</Text>
                </Flex>
                <Button
                  size="sm"
                  colorScheme="orange"
                  width="90%"
                  mx="auto"
                  display="block"
                  mt={2}
                  onClick={() => handleAddToCart(items)}
                >
                  Add to Cart
                </Button>
              </div>
            ))}
          </Box>
        )}
      </Box>
    </>
  );
};

export default Wishlist;
