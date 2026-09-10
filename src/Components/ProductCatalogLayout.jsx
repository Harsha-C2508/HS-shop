import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import FilterProvider, { ProductFilterBar } from './ProductFilters';

const ProductCatalogLayout = ({ category, title, productCount, children }) => (
  <FilterProvider category={category}>
    <Box maxW="1200px" mx="auto" px={4} pb={8} pt={4}>
      {title && (
        <Heading size="md" mb={4}>
          {title}
        </Heading>
      )}

      <ProductFilterBar productCount={productCount} />
      {children}
    </Box>
  </FilterProvider>
);

export default ProductCatalogLayout;
