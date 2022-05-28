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
  DrawerFooter,
  FormControl,
  FormErrorMessage,
  HStack,
  Select,
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
import { useMutation, useQuery, useQueryClient } from 'react-query';
import draftToHtml from 'draftjs-to-html';
import { findAll } from '@services/areas-service';
import RSelect from 'react-select';
import {
  CategoryOptions,
  PriorityOptions,
  ReproducibleOptions,
} from '@services/options-service';

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
  areaId: number;
};

export const CreateTask = ({ isOpen, onClose }: CreateTaskProps) => {
  const queryClient = useQueryClient();
  const firstField = React.useRef<any>();

  const { data: areaOptions } = useQuery(['areas'], findAll);

  const priorityOptions = PriorityOptions();
  const categoryOptions = CategoryOptions();
  const reproducibleOptions = ReproducibleOptions();

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
      isOpen={true}
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

              <FormControl isInvalid={Boolean(errors.areaId)} as={Box}>
                <FormLabel htmlFor='area'>Area</FormLabel>
                <Controller
                  name='areaId'
                  control={control}
                  render={({ field }) => {
                    return (
                      <RSelect
                        id='area'
                        options={areaOptions}
                        onChange={(e) => field.onChange(e!.value)}
                      />
                    );
                  }}
                />
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

              <HStack gap={4}>
                <FormControl isInvalid={Boolean(errors.priority)} as={Box}>
                  <FormLabel htmlFor='priority'>Select Priority</FormLabel>
                  <Controller
                    name='priority'
                    control={control}
                    render={({ field }) => {
                      return (
                        <RSelect
                          id='priority'
                          defaultValue={priorityOptions[0]}
                          options={priorityOptions}
                          onChange={(e) => field.onChange(e!.value)}
                        />
                      );
                    }}
                  />
                </FormControl>

                <FormControl isInvalid={Boolean(errors.category)} as={Box}>
                  <FormLabel htmlFor='category'>Select Category</FormLabel>
                  <Controller
                    name='category'
                    control={control}
                    render={({ field }) => {
                      return (
                        <RSelect
                          id='category'
                          defaultValue={categoryOptions[0]}
                          options={categoryOptions}
                          onChange={(e) => field.onChange(e!.value)}
                        />
                      );
                    }}
                  />
                </FormControl>
              </HStack>

              <HStack gap={4}>
                <FormControl isInvalid={Boolean(errors.reproducible)} as={Box}>
                  <FormLabel htmlFor='reproducible'>
                    Select Reproducible
                  </FormLabel>
                  <Controller
                    name='reproducible'
                    control={control}
                    render={({ field }) => {
                      return (
                        <RSelect
                          id='reproducible'
                          defaultValue={reproducibleOptions[0]}
                          options={reproducibleOptions}
                          onChange={(e) => field.onChange(e!.value)}
                        />
                      );
                    }}
                  />
                </FormControl>

                <FormControl isInvalid={Boolean(errors.assignedToId)} as={Box}>
                  <FormLabel htmlFor='assignedToId'>
                    Select Responsible
                  </FormLabel>
                  <Select
                    id='assignedToId'
                    defaultValue='1'
                    {...register('assignedToId', { valueAsNumber: true })}
                  >
                    <option value='1'>David Sánchez</option>
                  </Select>
                </FormControl>
              </HStack>
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
