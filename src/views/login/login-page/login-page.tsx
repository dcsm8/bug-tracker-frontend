import {
  Flex,
  Box,
  Stack,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import LoginForm from '../login-form/login-form';

export default function LoginPage() {
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} width={'md'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Bug Tracker</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            Sign in to your account
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <LoginForm />
        </Box>
      </Stack>
    </Flex>
  );
}
