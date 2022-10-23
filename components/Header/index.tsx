import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiShoppingCart } from 'react-icons/fi';
import NextLink from 'next/link';
import { BsCartCheck } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { signOut, useSession } from 'next-auth/client';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';
import i18nConfig from 'i18n.json';
import ukFlag from '/public/assets/icons/united-kingdom.png';
import trFlag from '/public/assets/icons/turkey.png';
import Image from 'next/image';

export type NavItemProps = {
  children?: React.ReactNode;
  key?: string;
};

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

export const NavItem = ({ children, ...rest }: NavItemProps) => {
  return (
    <Flex
      align="center"
      p="2"
      mx="4"
      borderRadius="lg"
      cursor="pointer"
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
      {...rest}
    >
      {children}
    </Flex>
  );
};

const Header = () => {
  const items = useSelector((state: any) => state.cart);
  const [session, loading] = useSession();
  const { t } = useTranslation();

  const Links = [
    {
      label: `${t('common:products')}`,
      href: '/',
    },
  ];

  function logoutHandler() {
    signOut();
  }

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} mb={16}>
        <Flex
          h={16}
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
          <HStack spacing={8} alignItems={'center'}>
            <HStack>
              <a href="#orderSummary">
                <IconButton
                  size={['sm', 'md', 'lg']}
                  aria-label="Logo"
                  icon={<FiShoppingCart fontSize="1.8rem" />}
                />
              </a>
            </HStack>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}
            >
              {Links.map((link) => (
                <NextLink href={link.href} key={link.label} passHref>
                  <NavItem key={link.label}>{link.label}</NavItem>
                </NextLink>
              ))}
            </HStack>

            <HStack>
              <nav
                style={{
                  backgroundColor: 'gold',
                }}
              >
                <ul>
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
            </HStack>
          </HStack>
          <Flex alignItems={'center'} padding={4} mr={12}>
            <Button
              variant={'outline'}
              colorScheme={'blue'}
              size={'md'}
              mr={4}
              leftIcon={<BsCartCheck />}
            >
              {t('common:inCart')}: {items.length}
            </Button>
          </Flex>
          <Flex>{ChangeLanguage()}</Flex>
        </Flex>
      </Box>
    </>
  );
};

export default Header;
