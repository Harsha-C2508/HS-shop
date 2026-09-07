import React from 'react';
import { Box, Grid, Heading, Link, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { SHOP_CATEGORIES } from '../config/catalog';
import styles from '../Styles/home.module.css';

const CategoryShowcase = () => (
  <Box maxW="1200px" mx="auto" px={4} py={8}>
    <Heading size="md" mb={6} textAlign={{ base: 'center', md: 'left' }}>
      Shop by Category
    </Heading>
    <Grid templateColumns={{ base: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', lg: 'repeat(6, 1fr)' }} gap={4}>
      {SHOP_CATEGORIES.map((cat) => (
        <Link
          key={cat.path}
          as={RouterLink}
          to={cat.path}
          _hover={{ textDecoration: 'none' }}
        >
          <Box className={styles.categoryCard}>
            <Text fontSize="2xl" mb={2}>
              {cat.emoji}
            </Text>
            <Text fontWeight="semibold" fontSize="sm">
              {cat.label}
            </Text>
            <Text fontSize="xs" color="gray.600" mt={1} noOfLines={2}>
              {cat.desc}
            </Text>
          </Box>
        </Link>
      ))}
    </Grid>
  </Box>
);

export default CategoryShowcase;
