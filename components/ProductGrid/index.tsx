import { SimpleGrid } from '@chakra-ui/react';
import * as React from 'react';

const ProductGrid = (props) => {
  return (
    <SimpleGrid
      columns={[1, null, 4]}
      spacing="40px"
      columnGap={{
        base: '4',
        md: '6',
      }}
      rowGap={{
        base: '8',
        md: '10',
      }}
      pb={30}
      {...props}
    />
  );
};

export default ProductGrid;
