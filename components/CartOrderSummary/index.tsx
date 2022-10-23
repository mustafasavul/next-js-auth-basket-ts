import {
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import * as React from 'react';

const OrderSummaryItem = (props) => {
  const { label, value, children } = props;
  return (
    <Flex justify="space-between" fontSize="sm">
      <Text fontWeight="medium" color={mode('gray.600', 'gray.400')}>
        {label}
      </Text>
      {value ? <Text fontWeight="medium">{value}</Text> : children}
    </Flex>
  );
};

const CartOrderSummary = (props) => {
  const { products } = props;
  let total = 0;

  const { t } = useTranslation('common');

  products.forEach((product) => {
    total += product.price;
  });

  let totalMessage = total.toFixed(2) + ' ₺';

  return (
    <Stack
      spacing="8"
      borderWidth="1px"
      rounded="lg"
      padding="8"
      width="full"
      id="orderSummary"
    >
      <Heading size="md">{t('common:orderSummary')}:</Heading>

      <Stack spacing="6">
        <OrderSummaryItem label="Subtotal" value={totalMessage} />
        <Flex justify="space-between">
          <Text fontSize="lg" fontWeight="semibold">
            {t('common:total')}:
          </Text>
          <Text fontSize="xl" fontWeight="extrabold">
            {totalMessage}
          </Text>
        </Flex>
      </Stack>
    </Stack>
  );
};

export default CartOrderSummary;
