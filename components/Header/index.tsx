import {
  Box,
  Flex,
  HStack,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react';
import { BsCartCheck } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { signOut, useSession } from 'next-auth/client';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';
import i18nConfig from 'i18n.json';
import ukFlag from '/public/assets/icons/united-kingdom.png';
import trFlag from '/public/assets/icons/turkey.png';
import Image from 'next/image';

export const ChangeLanguage = () => {
  const { t, lang } = useTranslation();
  const { locales } = i18nConfig;

  return locales.map((lng) => {
    if (lng === lang) return null;

    return (
      <Link href="/" locale={lng} key={lng}>
        <Flex
          align="center"
          style={{
            cursor: 'pointer',
          }}
          gap={2}
        >
          {t(`common:language-name-${lng}`)}
          <Image
            height="30px"
            width="30px"
            src={lng === 'en' ? ukFlag : trFlag}
            alt="Language Flags"
          />
        </Flex>
      </Link>
    );
  });
};

const Header = () => {
  const items = useSelector((state: any) => state.cart);
  const [session, loading] = useSession();
  const { t } = useTranslation();

  function logoutHandler() {
    signOut();
    localStorage.setItem('tpComSignIn', 'false');
  }

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} mb={16}>
        <Flex
          h={16}
          px={4}
          alignItems={'center'}
          justifyContent={'space-between'}
          as={'header'}
          pos="fixed"
          top="0"
          w={'full'}
          boxShadow={'sm'}
          zIndex="999"
          css={{
            backdropFilter: 'saturate(180%) blur(5px)',
            backgroundColor: useColorModeValue(
              'rgba(255, 255, 255, 0.7)',
              'rgba(26, 32, 44, 0.9)'
            ),
          }}
        >
          <HStack as={'nav'} spacing={4}>
            <a href="#orderSummary">
              <IconButton
                mr={2}
                size={['sm']}
                aria-label="Logo"
                icon={<BsCartCheck fontSize="1.2rem" />}
              />
              {t('common:inCart')}: {items.length}
            </a>
          </HStack>

          <HStack>
            <nav>
              <ul className="header-list">
                {!session && !loading && (
                  <li>
                    <Link href="/auth">{t('common:login')}</Link>
                  </li>
                )}
                {session && (
                  <li>
                    <Link href="/profile">{t('common:profile')}</Link>
                  </li>
                )}
                {session && (
                  <li>
                    <button onClick={logoutHandler}>
                      {t('common:logout')}
                    </button>
                  </li>
                )}
              </ul>
            </nav>
            {ChangeLanguage()}
          </HStack>
        </Flex>
      </Box>
    </>
  );
};

export default Header;
