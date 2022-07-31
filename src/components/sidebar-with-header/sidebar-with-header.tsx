import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Button,
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
  FiPlus,
  FiBriefcase,
} from 'react-icons/fi';
import { IconType } from 'react-icons';
import { useHistory } from 'react-router-dom';
import { Logo } from '@components/logo/logo';
import { useUser } from '@store/use-user';
import { CreateTask } from '@components/task/create-task/create-task';

interface LinkItemProps {
  name: string;
  icon: IconType;
  to: string;
}
const LinkItems: Array<LinkItemProps> = [
  { name: 'Overview', icon: FiHome, to: '/dashboard' },
  { name: 'Workspaces', icon: FiBriefcase, to: '/dashboard' },
  { name: 'Notifications', icon: FiBell, to: '/dashboard' },
  { name: 'Settings', icon: FiSettings, to: '/dashboard/user' },
];

export const SidebarWithHeader = ({ children }: { children: JSX.Element }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH='100vh' bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size='full'
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }}>{children}</Box>
    </Box>
  );
};

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      transition='3s ease'
      bg='#F6F6F6'
      borderRight='1px'
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos='fixed'
      h='full'
      {...rest}
    >
      <Flex h='20' alignItems='center' mx='8' justifyContent='space-between'>
        <Logo width='40' height='40' />
        <Text
          fontSize='2xl'
          fontFamily='monospace'
          fontWeight='bold'
          textColor='#454545'
          marginLeft={2}
        >
          Bug Tracker
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} link={link}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  link: LinkItemProps;
  children: string | number;
}
const NavItem = ({ icon, children, link, ...rest }: NavItemProps) => {
  return (
    <NavLink to={link.to}>
      <Flex
        align='center'
        p='3'
        mx='4'
        borderRadius='lg'
        role='group'
        cursor='pointer'
        fontWeight='semibold'
        _hover={{
          bg: '#2B65E8',
          color: 'white',
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr='4'
            fontSize='16'
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </NavLink>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const history = useHistory();
  const { isOpen, onOpen: OnOpenCreateTask, onClose } = useDisclosure();

  const { setAccessToken, user } = useUser();

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height='20'
      alignItems='center'
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth='1px'
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant='outline'
        aria-label='open menu'
        icon={<FiMenu />}
      />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize='2xl'
        fontFamily='monospace'
        fontWeight='bold'
      >
        Bug Tracker
      </Text>

      <HStack spacing={{ base: '0', md: '6' }}>
        <Button
          leftIcon={<Icon as={FiPlus} color='white' />}
          colorScheme='blue'
          bg='#2C65EA'
          _hover={{
            background: '#1652de',
          }}
          variant='solid'
          onClick={OnOpenCreateTask}
          mr={2}
        >
          Create Task
        </Button>
        <CreateTask isOpen={isOpen} onClose={onClose} />
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              py={2}
              transition='all 0.3s'
              _focus={{ boxShadow: 'none' }}
            >
              <HStack>
                <Avatar size={'sm'} name={user?.fullName} />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems='flex-start'
                  spacing='1px'
                  ml='2'
                >
                  <Text fontSize='sm'>{user?.fullName}</Text>
                  <Text fontSize='xs' color='gray.600'>
                    Admin
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}
            >
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuDivider />
              <MenuItem
                onClick={() => {
                  if (setAccessToken) {
                    setAccessToken(null);
                    history.push('/');
                  }
                }}
              >
                Sign out
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
