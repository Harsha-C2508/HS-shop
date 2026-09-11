import React from 'react';
import { Box, Flex, Heading, Image, Link, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { getRecentlyViewed } from '../hooks/useRecentlyViewed';
import { CATEGORY_CONFIG } from '../config/catalog';
import { resolveImageUrl } from '../api/client';

const RecentlyViewed = ({ currentId }) => {
  const items = getRecentlyViewed().filter((p) => p.id !== currentId && String(p.id) !== String(currentId));

  if (items.length === 0) return null;

  return (
    <Box>
      <Heading size="md" mb={4}>
        Recently Viewed
      </Heading>
      <Flex gap={4} overflowX="auto" pb={2}>
        {items.map((item) => {
          const basePath = CATEGORY_CONFIG[item.category]?.basePath || item.basePath || '/home';
          return (
            <Link
              as={RouterLink}
              key={item.id}
              to={`${basePath}/${item.id}`}
              minW="140px"
              _hover={{ textDecoration: 'none' }}
            >
              <Box borderWidth="1px" rounded="md" p={2} _hover={{ shadow: 'md' }}>
                <Image src={resolveImageUrl(item.img)} alt={item.name} h="100px" w="full" objectFit="cover" rounded="md" />
                <Text fontSize="sm" fontWeight="medium" mt={2} noOfLines={1}>
                  {item.name}
                </Text>
                <Text fontSize="sm" color="blue.600">
                  ₹{item.price}
                </Text>
              </Box>
            </Link>
          );
        })}
      </Flex>
    </Box>
  );
};

export default RecentlyViewed;
