import React from 'react';
import { Box, Button, Image, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { resolveImageUrl } from '../api/client';

const ProductCard = ({ product, basePath = '/home', styles = {} }) => {
  const id = product.id || product._id;
  const legacyId = product.legacyId || id;
  const imgSrc = resolveImageUrl(product.img);
  const fallbackSrc = resolveImageUrl(`/api/images/${legacyId}.jpg`);

  return (
    <Box className={styles.innerBox}>
      <Image
        src={imgSrc}
        fallbackSrc={fallbackSrc}
        alt={product.name}
        className={styles.imgSize}
        objectFit="cover"
        borderRadius="md"
      />
      <Text fontWeight="medium" mt={2} noOfLines={2}>
        {product.name}
      </Text>
      <Box className={styles.price}>
        <Text fontWeight="semibold">₹{product.price}</Text>
        <Text color="green.600" fontSize="sm">
          {product.offer}% off
        </Text>
      </Box>
      <Link to={`${basePath}/${id}`}>
        <Button size="sm" variant="outline" mt={2} width="full">
          More Details
        </Button>
      </Link>
    </Box>
  );
};

export default ProductCard;
