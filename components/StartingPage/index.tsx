import { useRouter } from 'next/router';
import Lottie from 'react-lottie-player';
import lottieJson from 'public/assets/isometric-house.json';
import classes from './starting-page.module.css';
import useTranslation from 'next-translate/useTranslation';
import {
  Flex,
  Container,
  Heading,
  Stack,
  Text,
  Button,
} from '@chakra-ui/react';

function StartingPageContent() {
  const router = useRouter();
  const { t } = useTranslation();

  const handleClick = (e) => {
    e.preventDefault();
    router.push('/auth');
  };

  return (
    <section className={classes.starting}>
      <Container maxW={'5xl'}>
        <Stack align={'center'}>
          <Flex w={'40%'}>
            <Lottie loop animationData={lottieJson} play />
          </Flex>
        </Stack>
        <Stack textAlign={'center'} align={'center'}>
          <Heading
            fontWeight={600}
            fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}
          >
            {t('common:heroText1')}{' '}
            <Text as={'span'} color={'orange.400'}>
              {t('common:tapucom')}
            </Text>
          </Heading>
          <Text color={'gray.500'} maxW={'3xl'}>
            {t('common:heroText2')}
          </Text>
          <Stack spacing={6} direction={'row'}>
            <Button
              rounded={'full'}
              px={6}
              colorScheme={'orange'}
              bg={'orange.400'}
              _hover={{ bg: 'orange.500' }}
              onClick={handleClick}
            >
              {t('common:getStarted')}
            </Button>
          </Stack>
        </Stack>
      </Container>
    </section>
  );
}

export default StartingPageContent;
