import {
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Icon,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Table,
  Tbody,
  Td,
  Text,
  Textarea,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { MdAdd, MdEdit, MdDelete, MdInventory, MdImage } from 'react-icons/md';
import React, { useEffect, useMemo, useReducer, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addNewProduct,
  deleteProduct,
  editProdData,
  getDataAtAdminPage,
} from '../Redux/AppRedux/action';
import AdminNav from '../Components/AdminNav';
import { resolveImageUrl } from '../api/client';

const categoryColors = {
  home: 'blue',
  mens: 'green',
  womens: 'pink',
  painting: 'purple',
  accessories: 'orange',
  footwear: 'teal',
  homeDecor: 'cyan',
};

const SECTIONS = [
  { value: 'home', label: 'Home (Featured)' },
  { value: 'mens', label: 'Mens' },
  { value: 'womens', label: 'Womens' },
  { value: 'painting', label: 'Paintings' },
  { value: 'accessories', label: 'Accessories' },
  { value: 'footwear', label: 'Footwear' },
  { value: 'homeDecor', label: 'Home Decor' },
];

const TYPES = [
  'Shirt', 'T-shirt', 'Jeans', 'Shorts', 'Sports Shorts', 'Joggers',
  'Sweaters', 'Top', 'Skirts', 'Palazzo Pants', 'Painting', 'Accessories',
  'Footwear', 'Home Decor', 'Electronics', 'Beauty', 'Formal', 'Dress', 'Sports',
];

const initialProduct = {
  name: '', img: '', price: '', dis: '', cat: 'Shirt',
  offer: '', star: '', category: 'home',
};

const productReducer = (state, action) => {
  if (action.type === 'reset') return initialProduct;
  if (action.type === 'load') return { ...initialProduct, ...action.value };
  return { ...state, [action.field]: action.value };
};

const ProductFormModal = ({ isOpen, onClose, mode, product, onSave, isSaving }) => {
  const [form, setForm] = useReducer(productReducer, initialProduct);
  const set = (field) => (e) => setForm({ field, value: e.target.value });
  const previewImg = form.img ? resolveImageUrl(form.img) : null;

  useEffect(() => {
    if (isOpen) {
      if (mode === 'edit' && product) {
        setForm({
          type: 'load',
          value: {
            name: product.name || '',
            img: product.img || '',
            price: product.price?.toString() || '',
            dis: product.dis || '',
            cat: product.cat || 'Shirt',
            offer: product.offer?.toString() || '',
            star: product.star?.toString() || '',
            category: product.category || 'home',
          },
        });
      } else {
        setForm({ type: 'reset' });
      }
    }
  }, [isOpen, mode, product]);

  const handleSubmit = () => onSave(form);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered motionPreset="slideInBottom">
      <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(4px)" />
      <ModalContent rounded="2xl" mx={4} maxH="90vh" overflow="hidden">
        <ModalHeader pb={2}>
          <HStack spacing={3}>
            <Flex w="40px" h="40px" rounded="xl" bg={mode === 'edit' ? 'teal.50' : 'blue.50'} align="center" justify="center">
              <Icon as={mode === 'edit' ? MdEdit : MdAdd} color={mode === 'edit' ? 'teal.500' : 'blue.500'} boxSize={5} />
            </Flex>
            <Box>
              <Heading size="md">{mode === 'edit' ? 'Edit Product' : 'Add New Product'}</Heading>
              <Text fontSize="xs" color="gray.500" fontWeight="normal">
                {mode === 'edit' ? 'Update product details below' : 'Fill in the details to add a new product'}
              </Text>
            </Box>
          </HStack>
        </ModalHeader>
        <ModalCloseButton top={4} right={4} />

        <Divider />

        <ModalBody py={5} overflowY="auto">
          <VStack spacing={4} align="stretch">
            {/* Image preview */}
            {previewImg && (
              <Flex justify="center" mb={1}>
                <Box rounded="xl" overflow="hidden" border="1px" borderColor="gray.200" shadow="sm">
                  <Image src={previewImg} alt="Preview" maxH="120px" objectFit="cover" />
                </Box>
              </Flex>
            )}

            <FormControl isRequired>
              <FormLabel fontSize="sm" fontWeight="600" color="gray.700">Product Name</FormLabel>
              <Input
                value={form.name}
                onChange={set('name')}
                placeholder="e.g. Premium Linen Shirt"
                size="md"
                rounded="lg"
                bg="gray.50"
                _focus={{ bg: 'white', borderColor: 'blue.400' }}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel fontSize="sm" fontWeight="600" color="gray.700">
                <HStack spacing={1}><Icon as={MdImage} boxSize={4} /><Text>Image URL</Text></HStack>
              </FormLabel>
              <Input
                value={form.img}
                onChange={set('img')}
                placeholder="https://..."
                size="md"
                rounded="lg"
                bg="gray.50"
                _focus={{ bg: 'white', borderColor: 'blue.400' }}
              />
            </FormControl>

            <SimpleGrid columns={2} spacing={4}>
              <FormControl isRequired>
                <FormLabel fontSize="sm" fontWeight="600" color="gray.700">Price ({'\u20B9'})</FormLabel>
                <Input
                  value={form.price}
                  onChange={set('price')}
                  type="number"
                  placeholder="1499"
                  size="md"
                  rounded="lg"
                  bg="gray.50"
                  _focus={{ bg: 'white', borderColor: 'blue.400' }}
                />
              </FormControl>
              <FormControl>
                <FormLabel fontSize="sm" fontWeight="600" color="gray.700">Offer (%)</FormLabel>
                <Input
                  value={form.offer}
                  onChange={set('offer')}
                  type="number"
                  placeholder="20"
                  size="md"
                  rounded="lg"
                  bg="gray.50"
                  _focus={{ bg: 'white', borderColor: 'blue.400' }}
                />
              </FormControl>
            </SimpleGrid>

            <FormControl>
              <FormLabel fontSize="sm" fontWeight="600" color="gray.700">Description</FormLabel>
              <Textarea
                value={form.dis}
                onChange={set('dis')}
                placeholder="Brief product description..."
                size="md"
                rounded="lg"
                bg="gray.50"
                rows={2}
                _focus={{ bg: 'white', borderColor: 'blue.400' }}
              />
            </FormControl>

            <SimpleGrid columns={2} spacing={4}>
              <FormControl>
                <FormLabel fontSize="sm" fontWeight="600" color="gray.700">Store Section</FormLabel>
                <Select value={form.category} onChange={set('category')} rounded="lg" bg="gray.50" size="md">
                  {SECTIONS.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel fontSize="sm" fontWeight="600" color="gray.700">Product Type</FormLabel>
                <Select value={form.cat} onChange={set('cat')} rounded="lg" bg="gray.50" size="md">
                  {TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </Select>
              </FormControl>
            </SimpleGrid>

            <FormControl>
              <FormLabel fontSize="sm" fontWeight="600" color="gray.700">Rating (1-5)</FormLabel>
              <Input
                value={form.star}
                onChange={set('star')}
                type="number"
                step="0.1"
                min="1"
                max="5"
                placeholder="4.5"
                size="md"
                rounded="lg"
                bg="gray.50"
                maxW="120px"
                _focus={{ bg: 'white', borderColor: 'blue.400' }}
              />
            </FormControl>
          </VStack>
        </ModalBody>

        <Divider />

        <ModalFooter gap={3}>
          <Button variant="ghost" onClick={onClose} rounded="lg">Cancel</Button>
          <Button
            colorScheme={mode === 'edit' ? 'teal' : 'blue'}
            onClick={handleSubmit}
            isLoading={isSaving}
            loadingText={mode === 'edit' ? 'Updating...' : 'Adding...'}
            rounded="lg"
            px={6}
            shadow="sm"
          >
            {mode === 'edit' ? 'Update Product' : 'Add Product'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const Admin = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const adminProd = useSelector((store) => store.AppRedux.adminProd) || [];
  const adminStats = useSelector((store) => store.AppRedux.adminStats) || {};
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [saving, setSaving] = useState(false);

  const addModal = useDisclosure();
  const editModal = useDisclosure();
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    dispatch(getDataAtAdminPage());
  }, [dispatch]);

  const filtered = useMemo(() => {
    return adminProd.filter((item) => {
      const matchesSearch =
        !search ||
        item.name?.toLowerCase().includes(search.toLowerCase()) ||
        item.cat?.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = filter === 'all' || item.category === filter;
      return matchesSearch && matchesCategory;
    });
  }, [adminProd, search, filter]);

  const handleAdd = async (form) => {
    if (!form.name || !form.img || !form.price) {
      toast({ title: 'Name, image URL, and price are required', status: 'warning', duration: 3000 });
      return;
    }
    setSaving(true);
    try {
      await dispatch(
        addNewProduct({
          ...form,
          price: Number(form.price),
          offer: Number(form.offer) || 0,
          star: Number(form.star) || 0,
        })
      );
      await dispatch(getDataAtAdminPage());
      toast({ title: 'Product added successfully', status: 'success', duration: 2000 });
      addModal.onClose();
    } catch {
      toast({ title: 'Failed to add product', status: 'error', duration: 3000 });
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = async (form) => {
    if (!editingProduct) return;
    setSaving(true);
    try {
      const id = editingProduct._id || editingProduct.id;
      await editProdData({
        offer: form.offer,
        price: form.price,
        star: form.star,
        img: form.img,
        params: { id },
        dispatch,
      });
      await dispatch(getDataAtAdminPage());
      toast({ title: 'Product updated', status: 'success', duration: 2000 });
      editModal.onClose();
      setEditingProduct(null);
    } catch {
      toast({ title: 'Failed to update product', status: 'error', duration: 3000 });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (id, name) => {
    if (!window.confirm(`Delete "${name}"?`)) return;
    dispatch(deleteProduct(id)).then(() => {
      toast({ title: 'Product deleted', status: 'success', duration: 2000 });
      dispatch(getDataAtAdminPage());
    });
  };

  const openEdit = (product) => {
    setEditingProduct(product);
    editModal.onOpen();
  };

  return (
    <Box minH="100vh" bg="gray.50">
      <AdminNav />
      <Box maxW="1400px" mx="auto" px={{ base: 4, md: 6 }} py={6}>
        <Flex justify="space-between" align="center" mb={6} wrap="wrap" gap={3}>
          <Box>
            <Heading size="lg">Admin Dashboard</Heading>
            <Text fontSize="sm" color="gray.500" mt={0.5}>Manage your product catalog</Text>
          </Box>
          <Button
            colorScheme="blue"
            leftIcon={<Icon as={MdAdd} />}
            onClick={addModal.onOpen}
            rounded="lg"
            shadow="sm"
            _hover={{ transform: 'translateY(-1px)', shadow: 'md' }}
            transition="all 0.2s"
          >
            Add Product
          </Button>
        </Flex>

        <SimpleGrid columns={{ base: 2, md: 5 }} spacing={4} mb={8}>
          {[
            { label: 'Total', value: adminStats.total ?? adminProd.length, color: 'blue' },
            { label: 'Home', value: adminStats.home ?? 0, color: 'cyan' },
            { label: 'Mens', value: adminStats.mens ?? 0, color: 'green' },
            { label: 'Womens', value: adminStats.womens ?? 0, color: 'pink' },
            { label: 'Paintings', value: adminStats.painting ?? 0, color: 'purple' },
          ].map((s) => (
            <Stat
              key={s.label}
              p={4}
              bg="white"
              shadow="sm"
              borderWidth="1px"
              borderColor="gray.100"
              rounded="xl"
              cursor="pointer"
              _hover={{ shadow: 'md', borderColor: `${s.color}.200` }}
              transition="all 0.15s"
              onClick={() => setFilter(s.label === 'Total' ? 'all' : s.label.toLowerCase())}
            >
              <StatLabel fontSize="xs" color="gray.500" fontWeight="600">{s.label}</StatLabel>
              <StatNumber fontSize="2xl" color={`${s.color}.600`}>{s.value}</StatNumber>
            </Stat>
          ))}
        </SimpleGrid>

        <Flex gap={3} mb={4} wrap="wrap">
          <InputGroup maxW="320px">
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.400" />
            </InputLeftElement>
            <Input
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              rounded="lg"
              bg="white"
            />
          </InputGroup>
          <HStack spacing={2} flexWrap="wrap">
            {['all', 'home', 'mens', 'womens', 'painting', 'accessories', 'footwear'].map((cat) => (
              <Button
                key={cat}
                size="sm"
                variant={filter === cat ? 'solid' : 'ghost'}
                colorScheme={filter === cat ? 'blue' : 'gray'}
                onClick={() => setFilter(cat)}
                rounded="full"
                fontWeight="600"
                fontSize="xs"
              >
                {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </Button>
            ))}
          </HStack>
        </Flex>

        <Box overflowX="auto" bg="white" borderWidth="1px" borderColor="gray.100" rounded="xl" shadow="sm">
          <Table size="sm">
            <Thead bg="gray.50">
              <Tr>
                <Th py={3} fontSize="xs">Product</Th>
                <Th py={3} fontSize="xs">Category</Th>
                <Th py={3} fontSize="xs">Type</Th>
                <Th py={3} fontSize="xs" isNumeric>Price</Th>
                <Th py={3} fontSize="xs" isNumeric>Offer</Th>
                <Th py={3} fontSize="xs" isNumeric>Rating</Th>
                <Th py={3} fontSize="xs" textAlign="center">Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filtered.map((item) => (
                <Tr key={item._id || item.id} _hover={{ bg: 'gray.50' }} transition="background 0.1s">
                  <Td py={3}>
                    <Flex align="center" gap={3}>
                      <Image
                        src={resolveImageUrl(item.img)}
                        alt={item.name}
                        boxSize="44px"
                        objectFit="cover"
                        rounded="lg"
                        bg="gray.100"
                      />
                      <Box>
                        <Text fontWeight="600" fontSize="sm">{item.name}</Text>
                        <Text fontSize="xs" color="gray.500" noOfLines={1} maxW="200px">{item.dis}</Text>
                      </Box>
                    </Flex>
                  </Td>
                  <Td>
                    <Badge
                      colorScheme={categoryColors[item.category] || 'gray'}
                      rounded="full"
                      px={2}
                      fontSize="10px"
                    >
                      {item.category}
                    </Badge>
                  </Td>
                  <Td fontSize="sm">{item.cat}</Td>
                  <Td isNumeric fontWeight="600" fontSize="sm">{'\u20B9'}{item.price}</Td>
                  <Td isNumeric fontSize="sm">{item.offer}%</Td>
                  <Td isNumeric fontSize="sm">{item.star}{'\u2605'}</Td>
                  <Td>
                    <HStack spacing={1} justify="center">
                      <IconButton
                        aria-label="Edit"
                        icon={<Icon as={MdEdit} />}
                        size="sm"
                        variant="ghost"
                        colorScheme="teal"
                        rounded="lg"
                        onClick={() => openEdit(item)}
                      />
                      <IconButton
                        aria-label="Delete"
                        icon={<Icon as={MdDelete} />}
                        size="sm"
                        variant="ghost"
                        colorScheme="red"
                        rounded="lg"
                        onClick={() => handleDelete(item._id || item.id, item.name)}
                      />
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          {filtered.length === 0 && (
            <Flex direction="column" align="center" py={12} gap={3}>
              <Icon as={MdInventory} boxSize={10} color="gray.300" />
              <Text color="gray.400" fontSize="sm">No products found</Text>
              <Button size="sm" colorScheme="blue" variant="outline" onClick={addModal.onOpen}>
                Add your first product
              </Button>
            </Flex>
          )}
        </Box>
      </Box>

      {/* Add Product Modal */}
      <ProductFormModal
        isOpen={addModal.isOpen}
        onClose={addModal.onClose}
        mode="add"
        product={null}
        onSave={handleAdd}
        isSaving={saving}
      />

      {/* Edit Product Modal */}
      <ProductFormModal
        isOpen={editModal.isOpen}
        onClose={() => { editModal.onClose(); setEditingProduct(null); }}
        mode="edit"
        product={editingProduct}
        onSave={handleEdit}
        isSaving={saving}
      />
    </Box>
  );
};

export default Admin;
