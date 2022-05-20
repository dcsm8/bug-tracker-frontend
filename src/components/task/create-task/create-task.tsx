import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Stack,
  Box,
  FormLabel,
  Input,
  Select,
  Textarea,
  DrawerFooter,
  FormControl,
} from '@chakra-ui/react';
import {
  CategoryType,
  NotificationStatusType,
  PriorityType,
  ReproducibleType,
  StatusType,
} from '@interfaces/task-interface';
import { create } from '@services/tasks-service';
import { replaceUnderscores } from '@utils/text-pipes';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';

type CreateTaskProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const CreateTask = ({ isOpen, onClose }: CreateTaskProps) => {
  const queryClient = useQueryClient();
  const firstField = React.useRef<any>();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const { mutateAsync: createTask } = useMutation(create, {
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks']);
      onClose();
      reset();
    },
  });

  const onSubmit = async (data) => {
    await createTask(data);
  };

  const { ref, ...rest } = register('title');

  return (
    <Drawer
      isOpen={isOpen}
      placement='right'
      onClose={onClose}
      size='lg'
      initialFocusRef={firstField}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth='1px'>Create a new task</DrawerHeader>

        <DrawerBody>
          <form id='create-task-form' onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing='24px'>
              <FormControl isInvalid={errors.title} as={Box} isRequired>
                <FormLabel htmlFor='title'>Title</FormLabel>
                <Input
                  id='title'
                  placeholder='Please enter title'
                  {...rest}
                  ref={(e) => {
                    ref(e);
                    firstField.current = e;
                  }}
                />
              </FormControl>

              <FormControl isInvalid={errors.priority} as={Box}>
                <FormLabel htmlFor='priority'>Select Priority</FormLabel>
                <Select
                  id='priority'
                  defaultValue={PriorityType.NONE}
                  {...register('priority')}
                >
                  <option value={PriorityType.NONE}>{PriorityType.NONE}</option>
                  <option value={PriorityType.LOW}>{PriorityType.LOW}</option>
                  <option value={PriorityType.NORMAL}>
                    {PriorityType.NORMAL}
                  </option>
                  <option value={PriorityType.HIGH}>{PriorityType.HIGH}</option>
                  <option value={PriorityType.CRITICAL}>
                    {PriorityType.CRITICAL}
                  </option>
                </Select>
              </FormControl>

              <FormControl isInvalid={errors.category} as={Box}>
                <FormLabel htmlFor='category'>Select Category</FormLabel>
                <Select
                  id='category'
                  defaultValue={CategoryType.FEATURE}
                  {...register('category')}
                >
                  <option value={CategoryType.FEATURE}>
                    {CategoryType.FEATURE}
                  </option>
                  <option value={CategoryType.ISSUE}>
                    {CategoryType.ISSUE}
                  </option>
                  <option value={CategoryType.INQUIRY}>
                    {CategoryType.INQUIRY}
                  </option>
                </Select>
              </FormControl>

              <FormControl isInvalid={errors.reproducible} as={Box}>
                <FormLabel htmlFor='reproducible'>
                  Select Reproducible
                </FormLabel>
                <Select
                  id='reproducible'
                  defaultValue={ReproducibleType.NOT_APPLICABLE}
                  {...register('reproducible')}
                >
                  <option value={ReproducibleType.NOT_APPLICABLE}>
                    {replaceUnderscores(ReproducibleType.NOT_APPLICABLE)}
                  </option>
                  <option value={ReproducibleType.UNABLE}>
                    {ReproducibleType.UNABLE}
                  </option>
                  <option value={ReproducibleType.RARELY}>
                    {ReproducibleType.RARELY}
                  </option>
                  <option value={ReproducibleType.SOMETIMES}>
                    {ReproducibleType.SOMETIMES}
                  </option>
                  <option value={ReproducibleType.ALWAYS}>
                    {ReproducibleType.ALWAYS}
                  </option>
                </Select>
              </FormControl>

              <FormControl isInvalid={errors.description} as={Box}>
                <FormLabel htmlFor='description'>Description</FormLabel>
                <Textarea id='description' {...register('description')} />
              </FormControl>

              <FormControl isInvalid={errors.responsible} as={Box}>
                <FormLabel htmlFor='assignedToId'>Select Responsible</FormLabel>
                <Select
                  id='assignedToId'
                  defaultValue='1'
                  {...register('assignedToId', { valueAsNumber: true })}
                >
                  <option value='1'>David Sánchez</option>
                </Select>
              </FormControl>
            </Stack>

            <input
              type='hidden'
              {...register('status')}
              value={StatusType.BACKLOG}
            />
            <input
              type='hidden'
              {...register('notificationStatus')}
              value={NotificationStatusType.NOT_NOTIFIED}
            />
          </form>
        </DrawerBody>

        <DrawerFooter borderTopWidth='1px'>
          <Button variant='outline' mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button
            colorScheme='blue'
            type='submit'
            isLoading={isSubmitting}
            form='create-task-form'
          >
            Submit
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
