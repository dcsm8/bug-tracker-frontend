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
} from '@chakra-ui/react';
import { RichTextEditor } from '@components/rich-text-editor/rich-text-editor';
import { CreateTaskDto } from '@interfaces/task-interface';
import { create } from '@services/tasks-service';
import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import draftToHtml from 'draftjs-to-html';
import { findAll } from '@services/areas-service';
import Select from 'react-select';
import {
  CategoryOptions,
  PriorityOptions,
  ReproducibleOptions,
  ResponsibleOptions,
} from '@services/options-service';
import { SelectOption } from '@interfaces/select-option.interface';

type CreateTaskProps = {
  isOpen: boolean;
  onClose: () => void;
};

type FormValues = {
  title: string;
  description?: string;
  category?: SelectOption;
  priority?: SelectOption;
  reproducible?: SelectOption;
  assignedToId?: SelectOption;
  areaId?: SelectOption;
};

export const CreateTask = ({ isOpen, onClose }: CreateTaskProps) => {
  const queryClient = useQueryClient();
  const firstField = React.useRef<any>();

  const { data: areaOptions } = useQuery(['areas'], findAll);

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

    const createTaskDto: CreateTaskDto = {
      title: data.title,
      priority: data.priority?.value,
      category: data.category?.value,
      reproducible: data.reproducible?.value,
      assignedToId: data.assignedToId && parseInt(data.assignedToId.value),
      areaId: data.assignedToId && parseInt(data.assignedToId.value),
      description: data.description,
    };

    await createTask(createTaskDto);
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
                      <Select
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
                        <Select
                          {...field}
                          id='priority'
                          options={PriorityOptions}
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
                        <Select
                          {...field}
                          id='category'
                          options={CategoryOptions}
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
                        <Select
                          {...field}
                          id='reproducible'
                          options={ReproducibleOptions}
                        />
                      );
                    }}
                  />
                </FormControl>

                <FormControl isInvalid={Boolean(errors.assignedToId)} as={Box}>
                  <FormLabel htmlFor='assignedToId'>
                    Select Responsible
                  </FormLabel>
                  <Controller
                    name='assignedToId'
                    control={control}
                    render={({ field }) => {
                      return (
                        <Select
                          {...field}
                          id='assignedToId'
                          options={ResponsibleOptions}
                        />
                      );
                    }}
                  />
                </FormControl>
              </HStack>
            </Stack>
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
