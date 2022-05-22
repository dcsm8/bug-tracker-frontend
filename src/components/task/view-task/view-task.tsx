import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Stack,
  Box,
  FormLabel,
  Select,
  Textarea,
  DrawerFooter,
  FormControl,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Icon,
} from '@chakra-ui/react';
import { FiMoreVertical, FiTrash } from 'react-icons/fi';
import {
  CategoryType,
  NotificationStatusType,
  PriorityType,
  ReproducibleType,
  StatusType,
  Task,
} from '@interfaces/task-interface';
import { create } from '@services/tasks-service';
import { replaceUnderscores } from '@utils/text-pipes';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';

type CreateTaskProps = {
  isOpen: boolean;
  onClose: () => void;
  onRemoveCard: (card: Task) => void;
  selectedTask: Task | null;
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

export const ViewTask = ({
  isOpen,
  onClose,
  onRemoveCard,
  selectedTask,
}: CreateTaskProps) => {
  const queryClient = useQueryClient();
  const firstField = React.useRef<any>();

  const {
    handleSubmit,
    register,
    reset,
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
    await createTask(data);
  };

  const { ref, ...rest } = register('title');

  if (!selectedTask) return null;

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
        <DrawerHeader borderBottomWidth='1px'>
          {selectedTask.title}
        </DrawerHeader>

        <Box pos='absolute' right='0.75rem' top='0.6rem'>
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label='Options'
              icon={<Icon as={FiMoreVertical} />}
              variant='outline'
            />
            <MenuList>
              <MenuItem
                icon={<Icon as={FiTrash} />}
                onClick={() => onRemoveCard(selectedTask)}
              >
                Delete
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>

        <DrawerBody>
          <form id='create-task-form' onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing='24px'>
              <FormControl isInvalid={Boolean(errors.priority)} as={Box}>
                <FormLabel htmlFor='priority'>Priority</FormLabel>
                <Select
                  id='priority'
                  defaultValue={selectedTask.priority}
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
                <FormLabel htmlFor='category'>Category</FormLabel>
                <Select
                  id='category'
                  defaultValue={selectedTask.category}
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
                <FormLabel htmlFor='reproducible'>Reproducible</FormLabel>
                <Select
                  id='reproducible'
                  defaultValue={selectedTask.reproducible}
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

              <FormControl isInvalid={Boolean(errors.description)} as={Box}>
                <FormLabel htmlFor='description'>Description</FormLabel>
                <Textarea
                  id='description'
                  {...register('description')}
                  value={selectedTask.description}
                />
              </FormControl>

              <FormControl isInvalid={Boolean(errors.assignedToId)} as={Box}>
                <FormLabel htmlFor='assignedToId'>Responsible</FormLabel>
                <Select
                  id='assignedToId'
                  defaultValue={selectedTask.assignedTo.id}
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
