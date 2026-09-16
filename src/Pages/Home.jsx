import React from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../Components/ProductCard';
import CategoryShowcase from '../Components/CategoryShowcase';
import ProductCatalogLayout from '../Components/ProductCatalogLayout';
import Styles from '../Styles/home.module.css';
import { Box, Button, Text, VStack } from '@chakra-ui/react';
import Coursel from '../Styles/Coursel';
import Navbar from '../Components/Navbar';
import { LoadingState } from '../Components/LoadingState';
import { useProductFetch } from '../hooks/useProductFetch';

const Home = () => {
  const [searchParams] = useSearchParams();
  const { loading, fetchError, retry, products } = useProductFetch('home');
  const searchQuery = searchParams.get('q');
  const hasFilters = searchParams.getAll('cat').length > 0 || searchParams.get('sortBy');

  const title = searchQuery ? `Results for "${searchQuery}"` : 'Featured Products';

  return (
    <>
      <Navbar />
      <Coursel />

      <Box className={Styles.promoStrip}>
        <Text fontWeight="semibold">New arrivals across all categories</Text>
        <Text fontSize="sm">Use code WELCOME10 for 10% off - Free shipping on all orders</Text>
      </Box>

      {!searchQuery && !hasFilters && <CategoryShowcase />}

      <ProductCatalogLayout category="home" title={title} productCount={products.length}>
        {loading ? (
          <LoadingState label="Loading products..." />
        ) : fetchError ? (
          <VStack py={12} spacing={4}>
            <Text color="gray.500">Failed to load products. Please check your connection.</Text>
            <Button colorScheme="blue" size="sm" onClick={retry}>
              Retry
            </Button>
          </VStack>
        ) : products.length === 0 ? (
          <Text textAlign="center" py={12} color="gray.500">
            No products match your filters. Try adjusting search or filters.
          </Text>
        ) : (
          <Box className={Styles.box}>
            {products.map((item) => (
              <ProductCard
                key={item.id || item._id}
                product={item}
                basePath="/home"
                styles={Styles}
              />
            ))}
          </Box>
        )}
      </ProductCatalogLayout>
    </>
  );
};

export default Home;
