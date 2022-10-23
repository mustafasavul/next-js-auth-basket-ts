import { VStack } from '@chakra-ui/react';
import Products from 'components/Products';
import StartingPageContent from 'components/StartingPage';
import { useEffect, useState } from 'react';

export default function Home() {
  const [storage, setStorage] = useState([]);

  useEffect(() => {
    const item = localStorage.getItem('tpComSignIn');
    if (item) {
      setStorage(JSON.parse(item));
    }
  }, []);

  return (
    <>
      <VStack spacing={4}>
        {storage ? <Products /> : <StartingPageContent />}
      </VStack>
    </>
  );
}
