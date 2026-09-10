import React from 'react';
import { Box, Spinner, Text, Button } from '@chakra-ui/react';

export const LoadingState = ({ label = 'Loading...' }) => (
  <Box textAlign="center" py={16}>
    <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
    <Text mt={4} color="gray.600">
      {label}
    </Text>
  </Box>
);

export const ErrorState = ({ message = 'Something went wrong.', onRetry }) => (
  <Box textAlign="center" py={16} px={4}>
    <Text color="red.500" mb={4}>
      {message}
    </Text>
    {onRetry && (
      <Button colorScheme="blue" onClick={onRetry}>
        Try again
      </Button>
    )}
  </Box>
);

export const EmptyState = ({ message, actionLabel, onAction }) => (
  <Box textAlign="center" py={16} px={4}>
    <Text color="gray.500" mb={4}>
      {message}
    </Text>
    {actionLabel && onAction && (
      <Button colorScheme="blue" variant="outline" onClick={onAction}>
        {actionLabel}
      </Button>
    )}
  </Box>
);
