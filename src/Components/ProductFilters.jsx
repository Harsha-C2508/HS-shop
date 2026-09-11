import React, { createContext, useContext, useEffect, useRef } from 'react';
import {
  Box,
  Button,
  Flex,
  Select,
  Text,
} from '@chakra-ui/react';
import { useSearchParams } from 'react-router-dom';
import { FILTER_OPTIONS } from '../config/catalog';
import filterStyles from '../Styles/filters.module.css';

const FilterContext = createContext(null);

const useFilterContext = () => {
  const ctx = useContext(FilterContext);
  if (!ctx) throw new Error('Filter components must be used within FilterProvider');
  return ctx;
};

export const FilterProvider = ({ category, children }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const options = FILTER_OPTIONS[category] || FILTER_OPTIONS.home;
  const cat = searchParams.getAll('cat');
  const prevCategory = useRef(category);

  // Clear type filters only when navigating to a different shop section
  useEffect(() => {
    if (prevCategory.current === category) return;
    prevCategory.current = category;
    if (searchParams.getAll('cat').length === 0) return;
    const next = {};
    searchParams.forEach((value, key) => {
      if (key !== 'cat') next[key] = value;
    });
    setSearchParams(next, { replace: true });
  }, [category, searchParams, setSearchParams]);

  const updateCat = (nextCat) => {
    const next = {};
    searchParams.forEach((value, key) => {
      if (key !== 'cat') next[key] = value;
    });
    if (nextCat.length > 0) {
      next.cat = nextCat;
    }
    setSearchParams(next, { replace: true });
  };

  const toggleCat = (value) => {
    const next = cat.includes(value) ? cat.filter((c) => c !== value) : [...cat, value];
    updateCat(next);
  };

  const clearAll = () => updateCat([]);

  return (
    <FilterContext.Provider value={{ cat, options, toggleCat, clearAll }}>
      {children}
    </FilterContext.Provider>
  );
};

export const ProductSort = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get('sortBy') || '';

  const handleSort = (e) => {
    const value = e.target.value;
    const next = {};
    searchParams.forEach((v, k) => {
      if (k !== 'sortBy') next[k] = v;
    });
    if (value) next.sortBy = value;
    setSearchParams(next, { replace: true });
  };

  return (
    <Select
      size="sm"
      width={{ base: 'full', sm: '200px' }}
      value={sortBy}
      onChange={handleSort}
      bg="white"
      borderColor="gray.200"
      borderRadius="full"
      fontWeight="medium"
      aria-label="Sort by price"
    >
      <option value="">Sort by price</option>
      <option value="asc">Price: Low to High</option>
      <option value="desc">Price: High to Low</option>
    </Select>
  );
};

const FilterPills = () => {
  const { cat, options, toggleCat, clearAll } = useFilterContext();

  if (options.length <= 1) return null;

  return (
    <Box className={filterStyles.pillRow}>
      <Text fontSize="xs" fontWeight="semibold" color="gray.500" mb={2} textTransform="uppercase" letterSpacing="wide">
        Filter by type
      </Text>
      <Flex className={filterStyles.pillScroll} gap={2}>
        <Button
          size="sm"
          borderRadius="full"
          variant={cat.length === 0 ? 'solid' : 'outline'}
          bg={cat.length === 0 ? 'gray.800' : 'white'}
          color={cat.length === 0 ? 'white' : 'gray.700'}
          borderColor="gray.300"
          onClick={clearAll}
          flexShrink={0}
        >
          All
        </Button>
        {options.map((opt) => {
          const active = cat.includes(opt);
          return (
            <Button
              key={opt}
              size="sm"
              borderRadius="full"
              variant={active ? 'solid' : 'outline'}
              bg={active ? 'blue.600' : 'white'}
              color={active ? 'white' : 'gray.700'}
              borderColor={active ? 'blue.600' : 'gray.300'}
              onClick={() => toggleCat(opt)}
              flexShrink={0}
              fontWeight="medium"
            >
              {opt}
            </Button>
          );
        })}
      </Flex>
    </Box>
  );
};

export const ProductFilterBar = ({ productCount = 0 }) => {
  const { cat, clearAll } = useFilterContext();

  return (
    <Box className={filterStyles.filterBar}>
      <Flex
        direction={{ base: 'column', sm: 'row' }}
        align={{ base: 'stretch', sm: 'center' }}
        justify="space-between"
        gap={3}
      >
        <Flex align="center" gap={3} flexWrap="wrap">
          <Text fontSize="sm" color="gray.600" fontWeight="medium">
            {productCount} {productCount === 1 ? 'product' : 'products'}
          </Text>
          {cat.length > 0 && (
            <Button size="xs" variant="link" colorScheme="blue" onClick={clearAll}>
              Clear filters ({cat.length})
            </Button>
          )}
        </Flex>
        <ProductSort />
      </Flex>

      <FilterPills />
    </Box>
  );
};

export default FilterProvider;
