import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  Select,
  Stack,
  Text,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import client from '../api/client';

const ReviewsSection = ({ productId }) => {
  const { isAuth, user } = useSelector((store) => store.AuthRedux);
  const toast = useToast();
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [count, setCount] = useState(0);
  const [rating, setRating] = useState('5');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const loadReviews = () => {
    client.get(`/product/${productId}/reviews`).then((res) => {
      setReviews(res.data.reviews || []);
      setAvgRating(res.data.avgRating || 0);
      setCount(res.data.count || 0);
    });
  };

  useEffect(() => {
    loadReviews();
  }, [productId]);

  const submitReview = () => {
    if (!comment.trim()) {
      toast({ title: 'Please write a comment', status: 'warning' });
      return;
    }
    setLoading(true);
    client
      .post(`/product/${productId}/reviews`, { rating: Number(rating), comment })
      .then(() => {
        setComment('');
        loadReviews();
        toast({ title: 'Review submitted!', status: 'success' });
      })
      .catch((e) => {
        toast({ title: e.response?.data?.message || 'Failed to submit', status: 'error' });
      })
      .finally(() => setLoading(false));
  };

  return (
    <Box borderWidth="1px" rounded="lg" p={6}>
      <Flex justify="space-between" align="center" mb={4}>
        <Heading size="md">Customer Reviews</Heading>
        <Text color="gray.600">
          ★ {avgRating} ({count} review{count !== 1 ? 's' : ''})
        </Text>
      </Flex>

      {isAuth && (
        <Box mb={6} p={4} bg="gray.50" rounded="md">
          <Text fontWeight="semibold" mb={2}>
            Write a review as {user?.name}
          </Text>
          <Flex gap={3} mb={3} align="center">
            <Text fontSize="sm">Rating:</Text>
            <Select w="80px" size="sm" value={rating} onChange={(e) => setRating(e.target.value)}>
              {[5, 4, 3, 2, 1].map((n) => (
                <option key={n} value={n}>
                  {n} ★
                </option>
              ))}
            </Select>
          </Flex>
          <Textarea
            placeholder="Share your experience with this product..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            mb={3}
            rows={3}
          />
          <Button size="sm" colorScheme="blue" onClick={submitReview} isLoading={loading}>
            Submit Review
          </Button>
        </Box>
      )}

      <Stack spacing={4}>
        {reviews.length === 0 ? (
          <Text color="gray.500">No reviews yet. Be the first to review!</Text>
        ) : (
          reviews.map((r) => (
            <Box key={r._id} pb={3} borderBottomWidth="1px">
              <Flex justify="space-between">
                <Text fontWeight="semibold">{r.userName}</Text>
                <Text color="orange.400">{'★'.repeat(r.rating)}</Text>
              </Flex>
              <Text mt={1} fontSize="sm">
                {r.comment}
              </Text>
            </Box>
          ))
        )}
      </Stack>
    </Box>
  );
};

export default ReviewsSection;
