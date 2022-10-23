import { Text, VStack, Button } from '@chakra-ui/react';
import Products from 'components/Products';

export default function Home() {
  return (
    <>
      <VStack spacing={4}>
        <Products />
      </VStack>
    </>
  );
}
