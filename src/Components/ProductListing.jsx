import React from 'react';
import { Box, Button, VStack, Text } from '@chakra-ui/react';
import Navbar from './Navbar';
import ProductCard from './ProductCard';
import ProductCatalogLayout from './ProductCatalogLayout';
import { LoadingState, EmptyState } from './LoadingState';
import { CATEGORY_CONFIG } from '../config/catalog';
import { useProductFetch } from '../hooks/useProductFetch';
import homeStyles from '../Styles/home.module.css';
import mensStyles from '../Styles/mens.module.css';
import womensStyles from '../Styles/womens.module.css';
import paintStyles from '../Styles/painting.module.css';

const STYLE_MAP = {
  home: homeStyles,
  mens: mensStyles,
  womens: womensStyles,
  painting: paintStyles,
  accessories: homeStyles,
  footwear: homeStyles,
  homeDecor: homeStyles,
};

const ProductListing = ({ category = 'mens' }) => {
  const config = CATEGORY_CONFIG[category];
  const styles = STYLE_MAP[category] || homeStyles;
  const { loading, fetchError, retry, products } = useProductFetch(category);
  const basePath = config.basePath;

  return (
    <>
      <Navbar />
      <ProductCatalogLayout category={category} title={config.label} productCount={products.length}>
        {loading ? (
          <LoadingState label={`Loading ${config.label}...`} />
        ) : fetchError ? (
          <VStack py={12} spacing={4}>
            <Text color="gray.500">Failed to load products. Please check your connection.</Text>
            <Button colorScheme="blue" size="sm" onClick={retry}>
              Retry
            </Button>
          </VStack>
        ) : products.length === 0 ? (
          <EmptyState message="No products found. Try adjusting filters." />
        ) : (
          <Box className={styles.box || styles.main}>
            {products.map((item) => (
              <ProductCard
                key={item.id || item._id}
                product={item}
                basePath={basePath}
                styles={styles}
              />
            ))}
          </Box>
        )}
      </ProductCatalogLayout>
    </>
  );
};

export default ProductListing;
