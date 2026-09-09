import React from 'react';
import {
  Box,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  Link,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaYoutube } from 'react-icons/fa';
import {
  MdEmail,
  MdLocationOn,
  MdPhone,
  MdLocalShipping,
  MdLoop,
  MdShield,
  MdPayment,
} from 'react-icons/md';

const FeatureBadge = ({ icon, title, subtitle }) => (
  <Flex align="center" gap={3}>
    <Flex w="44px" h="44px" rounded="xl" bg="whiteAlpha.100" align="center" justify="center" flexShrink={0}>
      <Icon as={icon} boxSize={5} color="blue.300" />
    </Flex>
    <Box>
      <Text fontSize="sm" fontWeight="700" color="white">{title}</Text>
      <Text fontSize="xs" color="gray.400">{subtitle}</Text>
    </Box>
  </Flex>
);

const Footer = () => {
  return (
    <Box bg="gray.900" color="gray.300" mt={12}>
      {/* Feature strip */}
      <Box borderBottom="1px" borderColor="whiteAlpha.100">
        <SimpleGrid
          columns={{ base: 2, md: 4 }}
          spacing={{ base: 4, md: 8 }}
          maxW="1400px"
          mx="auto"
          px={{ base: 6, md: 10 }}
          py={8}
        >
          <FeatureBadge icon={MdLocalShipping} title="Free Shipping" subtitle="On all orders" />
          <FeatureBadge icon={MdLoop} title="Easy Returns" subtitle="Within 10 days" />
          <FeatureBadge icon={MdShield} title="Secure Checkout" subtitle="100% protected" />
          <FeatureBadge icon={MdPayment} title="Multiple Payments" subtitle="UPI, Cards & more" />
        </SimpleGrid>
      </Box>

      {/* Main footer content */}
      <Box maxW="1400px" mx="auto" px={{ base: 6, md: 10 }} py={{ base: 10, md: 14 }}>
        <Grid
          templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)', lg: '2fr 1fr 1fr 1.5fr' }}
          gap={{ base: 10, md: 12 }}
        >
          {/* Brand */}
          <GridItem>
            <Flex align="center" gap={2} mb={4}>
              <Text fontSize="2xl" fontWeight="900" fontStyle="italic" color="white">
                HS
              </Text>
              <Box>
                <Text fontSize="md" fontWeight="800" color="white" lineHeight="1.1">Harsha's</Text>
                <Text fontSize="xs" color="gray.500" letterSpacing="widest" lineHeight="1.1">COLLECTION</Text>
              </Box>
            </Flex>
            <Text fontSize="sm" color="gray.400" lineHeight="1.7" maxW="320px" mb={5}>
              Your one-stop destination for curated fashion, art, and lifestyle products.
              Quality you can trust, style you'll love, delivered to your doorstep.
            </Text>
            <HStack spacing={3}>
              {[
                { icon: FaInstagram, color: 'pink.300', label: 'Instagram' },
                { icon: FaFacebook, color: 'blue.300', label: 'Facebook' },
                { icon: FaTwitter, color: 'cyan.300', label: 'Twitter' },
                { icon: FaLinkedin, color: 'blue.200', label: 'LinkedIn' },
                { icon: FaYoutube, color: 'red.300', label: 'YouTube' },
              ].map(({ icon, color, label }) => (
                <Flex
                  key={label}
                  as="a"
                  href="#"
                  aria-label={label}
                  w="36px"
                  h="36px"
                  rounded="lg"
                  bg="whiteAlpha.100"
                  align="center"
                  justify="center"
                  _hover={{ bg: 'whiteAlpha.200', transform: 'translateY(-2px)' }}
                  transition="all 0.2s"
                >
                  <Icon as={icon} boxSize={4} color={color} />
                </Flex>
              ))}
            </HStack>
          </GridItem>

          {/* Shop links */}
          <GridItem>
            <Heading size="xs" color="white" textTransform="uppercase" letterSpacing="wider" mb={4}>
              Shop
            </Heading>
            <Stack spacing={2.5}>
              {[
                { label: 'Mens', to: '/mens' },
                { label: 'Womens', to: '/womens' },
                { label: 'Footwear', to: '/footwear' },
                { label: 'Accessories', to: '/accessories' },
                { label: 'Paintings', to: '/paintings' },
                { label: 'Home Decor', to: '/homeDecor' },
              ].map(({ label, to }) => (
                <Link
                  key={to}
                  as={RouterLink}
                  to={to}
                  fontSize="sm"
                  color="gray.400"
                  _hover={{ color: 'white', pl: 1 }}
                  transition="all 0.15s"
                >
                  {label}
                </Link>
              ))}
            </Stack>
          </GridItem>

          {/* Account links */}
          <GridItem>
            <Heading size="xs" color="white" textTransform="uppercase" letterSpacing="wider" mb={4}>
              Account
            </Heading>
            <Stack spacing={2.5}>
              {[
                { label: 'My Profile', to: '/profile' },
                { label: 'My Orders', to: '/myOrders' },
                { label: 'Wishlist', to: '/wish' },
                { label: 'Cart', to: '/cart' },
                { label: 'Login', to: '/login' },
              ].map(({ label, to }) => (
                <Link
                  key={to}
                  as={RouterLink}
                  to={to}
                  fontSize="sm"
                  color="gray.400"
                  _hover={{ color: 'white', pl: 1 }}
                  transition="all 0.15s"
                >
                  {label}
                </Link>
              ))}
            </Stack>
          </GridItem>

          {/* Contact info */}
          <GridItem>
            <Heading size="xs" color="white" textTransform="uppercase" letterSpacing="wider" mb={4}>
              Get in Touch
            </Heading>
            <Stack spacing={4}>
              <HStack spacing={3} align="start">
                <Flex w="32px" h="32px" rounded="lg" bg="whiteAlpha.100" align="center" justify="center" flexShrink={0} mt={0.5}>
                  <Icon as={MdLocationOn} boxSize={4} color="red.300" />
                </Flex>
                <Box>
                  <Text fontSize="sm" color="gray.300" fontWeight="600">Bangalore, India</Text>
                  <Text fontSize="xs" color="gray.500">Karnataka, 560001</Text>
                </Box>
              </HStack>

              <HStack spacing={3}>
                <Flex w="32px" h="32px" rounded="lg" bg="whiteAlpha.100" align="center" justify="center" flexShrink={0}>
                  <Icon as={MdEmail} boxSize={4} color="blue.300" />
                </Flex>
                <Box>
                  <Text fontSize="sm" color="gray.300" fontWeight="600">support@hsshop.com</Text>
                  <Text fontSize="xs" color="gray.500">We reply within 24 hours</Text>
                </Box>
              </HStack>

              <HStack spacing={3}>
                <Flex w="32px" h="32px" rounded="lg" bg="whiteAlpha.100" align="center" justify="center" flexShrink={0}>
                  <Icon as={MdPhone} boxSize={4} color="green.300" />
                </Flex>
                <Box>
                  <Text fontSize="sm" color="gray.300" fontWeight="600">+91 89909 87980</Text>
                  <Text fontSize="xs" color="gray.500">Mon-Sat, 10am - 7pm</Text>
                </Box>
              </HStack>
            </Stack>
          </GridItem>
        </Grid>
      </Box>

      {/* Bottom bar */}
      <Box borderTop="1px" borderColor="whiteAlpha.100">
        <Flex
          maxW="1400px"
          mx="auto"
          px={{ base: 6, md: 10 }}
          py={5}
          justify="space-between"
          align="center"
          direction={{ base: 'column', md: 'row' }}
          gap={3}
        >
          <Text fontSize="xs" color="gray.500">
            &copy; {new Date().getFullYear()} Harsha's Collection. All rights reserved.
          </Text>
          <HStack spacing={6} fontSize="xs" color="gray.500">
            <Text cursor="pointer" _hover={{ color: 'gray.300' }}>Privacy Policy</Text>
            <Text cursor="pointer" _hover={{ color: 'gray.300' }}>Terms of Service</Text>
            <Text cursor="pointer" _hover={{ color: 'gray.300' }}>Refund Policy</Text>
          </HStack>
        </Flex>
      </Box>
    </Box>
  );
};

export default Footer;
