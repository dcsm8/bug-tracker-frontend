import { useForm } from 'react-hook-form';
import {
  Alert,
  AlertIcon,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from '@chakra-ui/react';
import { ShowIf } from '../../../components/common/show-if/show-if';
import { LoginDto } from './types';
import { useMutation } from 'react-query';
import { authenticate } from '../../../services/login-service';
import { saveToken } from '../../../utils/local-storage';
import { useHistory } from 'react-router-dom';

function LoginForm() {
  const history = useHistory();
  const { register, handleSubmit } = useForm<LoginDto>();
  const { isLoading, isError, mutate } = useMutation(authenticate, {
    onSuccess: (data, variables, context) => {
      saveToken(data.accessToken);
      history.push('/dashboard');
    },
  });

  const onSubmit = (data: LoginDto) => {
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={6}>
        <FormControl id='email'>
          <FormLabel>Email address</FormLabel>
          <Input type='email' {...register('username', { required: true })} />
        </FormControl>
        <FormControl id='password'>
          <FormLabel>Password</FormLabel>
          <Input
            type='password'
            {...register('password', { required: true })}
          />
        </FormControl>
        <ShowIf condition={isError}>
          <Alert status='error'>
            <AlertIcon />
            There was a problem with your login.
          </Alert>
        </ShowIf>
        <Button
          bg={'blue.400'}
          color={'white'}
          _hover={{
            bg: 'blue.500',
          }}
          isLoading={isLoading}
          type='submit'
        >
          Sign in
        </Button>
      </Stack>
    </form>
  );
}

export default LoginForm;
