import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  Badge,
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import { ChevronDownIcon, HamburgerIcon, SearchIcon } from '@chakra-ui/icons';
import { MdPerson, MdShoppingBag, MdAdminPanelSettings, MdLogout } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../Redux/AuthRedux/action';
import { getDataFromCart } from '../Redux/AppRedux/action';

const CATEGORY_LINKS = [
  { label: 'Mens', to: '/mens' },
  { label: 'Womens', to: '/womens' },
  { label: 'Paintings', to: '/paintings' },
  { label: 'Footwear', to: '/footwear' },
  { label: 'Accessories', to: '/accessories' },
  { label: 'Home Decor', to: '/homeDecor' },
];

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const cart = useSelector((store) => store.AppRedux.cart);
  const { isAuth, user } = useSelector((store) => store.AuthRedux);
  const cartLength = cart?.length || 0;
  const [search, setSearch] = useState(searchParams.get('q') || '');

  useEffect(() => {
    if (isAuth) dispatch(getDataFromCart());
  }, [dispatch, isAuth]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const params = {};
    searchParams.getAll('cat').forEach((c) => {
      if (!params.cat) params.cat = [];
      params.cat.push(c);
    });
    if (searchParams.get('sortBy')) params.sortBy = searchParams.get('sortBy');
    if (search.trim()) params.q = search.trim();
    setSearchParams(params);
    if (window.location.pathname !== '/') {
      navigate('/?' + new URLSearchParams(params).toString());
    }
  };

  return (
    <Box as="header" position="sticky" top="0" zIndex="100" bg="white" shadow="sm">
      {/* ─── Top Bar ─── */}
      <Box borderBottom="1px solid" borderColor="gray.100">
        <Flex
          maxW="1200px"
          mx="auto"
          px={4}
          h={{ base: '56px', md: '64px' }}
          align="center"
          justify="space-between"
          gap={4}
        >
          {/* Logo + Brand */}
          <Flex
            align="center"
            gap={2}
            cursor="pointer"
            onClick={() => navigate('/')}
            flexShrink={0}
            _hover={{ opacity: 0.85 }}
            transition="opacity 0.15s"
          >
            <Text fontSize={{ base: 'xl', md: '2xl' }} fontWeight="bold" fontStyle="italic" color="gray.800">
              HS
            </Text>
            <Box display={{ base: 'none', sm: 'block' }}>
              <Text fontSize="sm" fontWeight="700" color="gray.800" lineHeight="1.1">
                Harsha's
              </Text>
              <Text fontSize="xs" color="gray.500" lineHeight="1.1" letterSpacing="wider">
                COLLECTION
              </Text>
            </Box>
          </Flex>

          {/* Search Bar */}
          <Box as="form" onSubmit={handleSearch} flex="1" maxW="500px" display={{ base: 'none', md: 'block' }}>
            <InputGroup size="md">
              <Input
                placeholder="Search for products, brands and more"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                bg="gray.50"
                border="1px solid"
                borderColor="gray.200"
                borderRadius="md"
                fontSize="sm"
                _focus={{ borderColor: 'blue.400', bg: 'white' }}
              />
              <InputRightElement>
                <SearchIcon color="gray.400" cursor="pointer" onClick={handleSearch} />
              </InputRightElement>
            </InputGroup>
          </Box>

          {/* Right Actions */}
          <HStack spacing={{ base: 2, md: 4 }} flexShrink={0}>
            {/* Mobile search */}
            <IconButton
              aria-label="Search"
              icon={<SearchIcon />}
              size="sm"
              variant="ghost"
              display={{ base: 'inline-flex', md: 'none' }}
              onClick={() => navigate('/')}
            />

            {/* Wishlist */}
            <Link to="/wish">
              <Flex align="center" gap={1} px={2} py={1} borderRadius="md" _hover={{ bg: 'gray.50' }} transition="background 0.15s">
                <Text fontSize="lg" lineHeight={1}>♥</Text>
                <Text fontSize="sm" fontWeight="600" display={{ base: 'none', lg: 'block' }} color="gray.700">
                  Wishlist
                </Text>
              </Flex>
            </Link>

            {/* Cart */}
            <Link to="/cart">
              <Flex align="center" gap={1} px={2} py={1} borderRadius="md" _hover={{ bg: 'gray.50' }} transition="background 0.15s" position="relative">
                <Text fontSize="lg" lineHeight={1}>🛒</Text>
                <Text fontSize="sm" fontWeight="600" display={{ base: 'none', lg: 'block' }} color="gray.700">
                  Cart
                </Text>
                {cartLength > 0 && (
                  <Badge
                    colorScheme="red"
                    borderRadius="full"
                    position="absolute"
                    top="-2px"
                    right="-4px"
                    minW="18px"
                    h="18px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontSize="10px"
                  >
                    {cartLength}
                  </Badge>
                )}
              </Flex>
            </Link>

            {/* Account / Login */}
            {isAuth ? (
              <Menu>
                <MenuButton
                  as={Button}
                  size="sm"
                  variant="ghost"
                  rightIcon={<ChevronDownIcon />}
                  fontWeight="600"
                  color="gray.700"
                  display={{ base: 'none', md: 'inline-flex' }}
                >
                  {user?.name?.split(' ')[0] || 'Account'}
                </MenuButton>
                <MenuList fontSize="sm" minW="180px" shadow="lg" rounded="lg" py={2}>
                  <MenuItem as={Link} to="/profile" icon={<Icon as={MdPerson} boxSize={4} color="blue.500" />}>
                    My Profile
                  </MenuItem>
                  <MenuItem as={Link} to="/myOrders" icon={<Icon as={MdShoppingBag} boxSize={4} color="orange.500" />}>
                    My Orders
                  </MenuItem>
                  {user?.role === 'admin' && (
                    <MenuItem as={Link} to="/admin" icon={<Icon as={MdAdminPanelSettings} boxSize={4} color="purple.500" />}>
                      Admin Panel
                    </MenuItem>
                  )}
                  <MenuItem onClick={handleLogout} color="red.500" icon={<Icon as={MdLogout} boxSize={4} />}>
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <Button
                as={Link}
                to="/login"
                size="sm"
                colorScheme="blue"
                variant="solid"
                fontWeight="600"
                display={{ base: 'none', md: 'inline-flex' }}
              >
                Login
              </Button>
            )}

            {/* Mobile hamburger */}
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Menu"
                icon={<HamburgerIcon />}
                variant="outline"
                size="sm"
                display={{ base: 'inline-flex', md: 'none' }}
              />
              <MenuList>
                <MenuItem as={Link} to="/">Home</MenuItem>
                {CATEGORY_LINKS.map(({ label, to }) => (
                  <MenuItem key={to} as={Link} to={to}>{label}</MenuItem>
                ))}
                <MenuItem as={Link} to="/wish">Wishlist</MenuItem>
                <MenuItem as={Link} to="/cart">Cart {cartLength > 0 ? `(${cartLength})` : ''}</MenuItem>
                {isAuth ? (
                  <>
                    <MenuItem as={Link} to="/profile" icon={<Icon as={MdPerson} boxSize={4} color="blue.500" />}>My Profile</MenuItem>
                    <MenuItem as={Link} to="/myOrders" icon={<Icon as={MdShoppingBag} boxSize={4} color="orange.500" />}>My Orders</MenuItem>
                    <MenuItem onClick={handleLogout} color="red.500" icon={<Icon as={MdLogout} boxSize={4} />}>Logout</MenuItem>
                  </>
                ) : (
                  <MenuItem as={Link} to="/login">Login</MenuItem>
                )}
              </MenuList>
            </Menu>
          </HStack>
        </Flex>
      </Box>

      {/* ─── Category Navigation Bar ─── */}
      <Box bg="gray.50" display={{ base: 'none', md: 'block' }} borderBottom="1px solid" borderColor="gray.100">
        <HStack
          maxW="1200px"
          mx="auto"
          px={4}
          h="40px"
          spacing={0}
          overflowX="auto"
          css={{ '&::-webkit-scrollbar': { display: 'none' } }}
        >
          <Link to="/">
            <Box px={4} py={2} fontSize="sm" fontWeight="600" color="gray.600" _hover={{ color: 'blue.600', bg: 'blue.50' }} borderRadius="md" transition="all 0.15s" whiteSpace="nowrap">
              Home
            </Box>
          </Link>
          {CATEGORY_LINKS.map(({ label, to }) => (
            <Link key={to} to={to}>
              <Box px={4} py={2} fontSize="sm" fontWeight="600" color="gray.600" _hover={{ color: 'blue.600', bg: 'blue.50' }} borderRadius="md" transition="all 0.15s" whiteSpace="nowrap">
                {label}
              </Box>
            </Link>
          ))}
        </HStack>
      </Box>
    </Box>
  );
};

export default Navbar;
