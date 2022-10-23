import { Box, Flex, HStack, useColorModeValue as mode } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import CartOrderSummary from 'components/CartOrderSummary';

export default function Cart() {
  const products = useSelector((state: any) => state.cart);

  return (
    <Box
      maxW={{
        base: '3xl',
        lg: '7xl',
      }}
      mx="auto"
      px={{
        base: '4',
        md: '8',
        lg: '12',
      }}
    >
      <Flex direction="column" align="center" flex="1">
        <CartOrderSummary products={products} />
      </Flex>
    </Box>
  );
}
