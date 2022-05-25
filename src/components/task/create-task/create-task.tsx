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
  FormErrorMessage,
} from '@chakra-ui/react';
import { RichTextEditor } from '@components/rich-text-editor/rich-text-editor';
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
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

type CreateTaskProps = {
  isOpen: boolean;
  onClose: () => void;
};

type FormValues = {
  title: string;
  priority: PriorityType;
  category: CategoryType;
  reproducible: ReproducibleType;
  description?: string;
  assignedToId: number;
  status: StatusType;
  notificationStatus: NotificationStatusType;
};

export const CreateTask = ({ isOpen, onClose }: CreateTaskProps) => {
  const queryClient = useQueryClient();
  const firstField = React.useRef<any>();

  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const { mutateAsync: createTask } = useMutation(create, {
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks']);
      onClose();
      reset();
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (data.description) {
      data.description = draftToHtml(data.description);
    }

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
              <FormControl isInvalid={Boolean(errors.title)} as={Box}>
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
                <FormErrorMessage>
                  {errors.title && errors.title.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={Boolean(errors.description)} as={Box}>
                <FormLabel htmlFor='description'>Description</FormLabel>
                <Controller
                  name='description'
                  control={control}
                  render={({ field }) => {
                    return (
                      <RichTextEditor
                        showToolbar
                        value={field.value}
                        onChange={field.onChange}
                        placeholder='Enter description'
                      />
                    );
                  }}
                />
              </FormControl>

              <FormControl isInvalid={Boolean(errors.priority)} as={Box}>
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

              <FormControl isInvalid={Boolean(errors.category)} as={Box}>
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

              <FormControl isInvalid={Boolean(errors.reproducible)} as={Box}>
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

              <FormControl isInvalid={Boolean(errors.assignedToId)} as={Box}>
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
          <Button
            variant='outline'
            mr={3}
            onClick={() => {
              onClose();
              reset();
            }}
          >
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
