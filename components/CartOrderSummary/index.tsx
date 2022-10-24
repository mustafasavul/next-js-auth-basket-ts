import {
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import { CartOrderSummaryProps } from 'model';
import useTranslation from 'next-translate/useTranslation';
import * as React from 'react';

const CartOrderSummary = ({ products }: CartOrderSummaryProps) => {
  let total = 0;

  const { t } = useTranslation('common');

  products.forEach((product) => {
    total += product.price;
  });

  const totalMessage = total + (total * 10) / 100;

  return (
    <Stack width="full" id="orderSummary">
      <Heading size="md">{t('common:orderSummary')}:</Heading>

      <Stack spacing="6">
        <Flex>
          <Text fontWeight="bold">{t('common:tax')}: 10%</Text>
        </Flex>
        <Flex justify="space-between">
          <Text fontSize="lg" fontWeight="semibold">
            {t('common:total')}:
          </Text>
          <Text fontSize="xl" fontWeight="extrabold">
            {totalMessage} TL
          </Text>
        </Flex>
      </Stack>
    </Stack>
  );
};

export default CartOrderSummary;
