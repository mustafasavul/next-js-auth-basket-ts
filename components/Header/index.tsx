import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { IoMoon, IoSunny } from 'react-icons/io5';
import { FiShoppingCart } from 'react-icons/fi';
import NextLink from 'next/link';
import { BsCartCheck } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { signOut, useSession } from 'next-auth/client';
import Link from 'next/link';

const Links = [
  {
    label: 'Products',
    href: '/',
  },
];

export type NavItemProps = {
  children?: React.ReactNode;
  key?: string;
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
  const { colorMode, toggleColorMode } = useColorMode();
  const items = useSelector((state: any) => state.cart);
  const [session, loading] = useSession();

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
                      <Link href="/auth">Login</Link>
                    </li>
                  )}
                  {session && (
                    <li>
                      <Link href="/profile">Profile</Link>
                    </li>
                  )}
                  {session && (
                    <li>
                      <button onClick={logoutHandler}>Logout</button>
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
              In Cart: {items.length}
            </Button>
            <IconButton
              size={'lg'}
              variant={'ghost'}
              aria-label={'Toggle Color Mode'}
              onClick={toggleColorMode}
              mr={4}
              icon={
                colorMode == 'light' ? (
                  <IoMoon size={18} />
                ) : (
                  <IoSunny size={18} />
                )
              }
            />
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default Header;
