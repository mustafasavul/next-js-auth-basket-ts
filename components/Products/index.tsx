import React, { useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import ProductCard from '../ProductCard';
import ProductGrid from '../ProductGrid';
import Loading from '../Loading';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, STATUSES } from 'redux/features/productSlice';
import Cart from 'pages/cart';
import useTranslation from 'next-translate/useTranslation';
import StickyNavbar from 'components/StickyNavbar';

export interface IRootState {
  product: any;
}

const Products = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<any>();
  const { data: products, status } = useSelector(
    (state: IRootState) => state.product
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  if (status === STATUSES.LOADING) {
    return <Loading />;
  }

  if (status === STATUSES.ERROR) {
    return <h2>{t('common:somethingWentWrong')}</h2>;
  }

  return (
    <>
      <Box
        maxW="7xl"
        mx="auto"
        px={{
          base: '4',
          md: '8',
          lg: '12',
        }}
        py={{
          base: '6',
          md: '8',
          lg: '12',
        }}
        pb={115}
      >
        <ProductGrid>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ProductGrid>
        <Cart />
      </Box>

      <StickyNavbar />
    </>
  );
};

export default Products;
