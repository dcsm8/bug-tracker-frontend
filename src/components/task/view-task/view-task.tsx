import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  EditableTextarea,
  VStack,
  Stack,
  Box,
  FormLabel,
  Select,
  Textarea,
  Divider,
  DrawerFooter,
  FormControl,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Icon,
  HStack,
  Flex,
  Spacer,
  Editable,
  Tooltip,
  EditablePreview,
  useColorModeValue,
  Input,
  EditableInput,
} from '@chakra-ui/react';
import { FiMoreHorizontal, FiTrash } from 'react-icons/fi';
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

  const btnRef = React.useRef(null);

  const { mutateAsync: createTask } = useMutation(create, {
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks']);
      onClose();
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    await createTask(data);
  };

  if (!selectedTask) return null;

  return (
    <Drawer
      isOpen={isOpen}
      placement='right'
      onClose={onClose}
      size='xl'
      autoFocus={false}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader borderBottomWidth='1px'>
          <HStack minWidth='max-content' alignItems='center' gap='2'>
            <Editable
              defaultValue={selectedTask.title}
              placeholder='Enter title'
              isPreviewFocusable={true}
              selectAllOnFocus={false}
              onSubmit={(nextValue: string) => console.log(nextValue)}
              w='full'
            >
              <Tooltip label='Click to edit'>
                <EditablePreview
                  _hover={{
                    background: useColorModeValue('gray.100', 'gray.700'),
                  }}
                />
              </Tooltip>
              <Input py={2} px={4} as={EditableInput} />
            </Editable>
            <Box justifySelf='end'>
              <Menu>
                <MenuButton
                  as={IconButton}
                  aria-label='Options'
                  icon={<Icon as={FiMoreHorizontal} />}
                  variant='outline'
                  initialFocusRef={btnRef}
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
          </HStack>
        </DrawerHeader>

        <DrawerBody>
          <Flex gap={10}>
            <Box flex={2}>
              <FormLabel htmlFor='description'>Description</FormLabel>
              <Editable
                defaultValue={selectedTask.description}
                placeholder='Enter description'
                isPreviewFocusable={true}
                selectAllOnFocus={false}
                onSubmit={(nextValue: string) => console.log(nextValue)}
                w='full'
              >
                <Tooltip label='Click to edit'>
                  <EditablePreview
                    _hover={{
                      background: useColorModeValue('gray.100', 'gray.700'),
                    }}
                  />
                </Tooltip>
                <Input id='description' as={EditableTextarea} />
              </Editable>
            </Box>
            <Box flex={1}>
              <Stack spacing='24px'>
                <Box>
                  <FormLabel htmlFor='priority'>Status</FormLabel>
                  <Select id='priority' defaultValue={selectedTask.status}>
                    <option value={StatusType.BACKLOG}>
                      {StatusType.BACKLOG}
                    </option>
                    <option value={StatusType.IN_PROGRESS}>
                      {replaceUnderscores(StatusType.IN_PROGRESS)}
                    </option>
                    <option value={StatusType.TESTING}>
                      {StatusType.TESTING}
                    </option>
                    <option value={StatusType.COMPLETE}>
                      {StatusType.COMPLETE}
                    </option>
                  </Select>
                </Box>

                <Box>
                  <FormLabel htmlFor='priority'>Priority</FormLabel>
                  <Select id='priority' defaultValue={selectedTask.priority}>
                    <option value={PriorityType.NONE}>
                      {PriorityType.NONE}
                    </option>
                    <option value={PriorityType.LOW}>{PriorityType.LOW}</option>
                    <option value={PriorityType.NORMAL}>
                      {PriorityType.NORMAL}
                    </option>
                    <option value={PriorityType.HIGH}>
                      {PriorityType.HIGH}
                    </option>
                    <option value={PriorityType.CRITICAL}>
                      {PriorityType.CRITICAL}
                    </option>
                  </Select>
                </Box>

                <Box>
                  <FormLabel htmlFor='category'>Category</FormLabel>
                  <Select id='category' defaultValue={selectedTask.category}>
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
                </Box>

                <Box>
                  <FormLabel htmlFor='reproducible'>Reproducible</FormLabel>
                  <Select
                    id='reproducible'
                    defaultValue={selectedTask.reproducible}
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
                </Box>

                <Box>
                  <FormLabel htmlFor='assignedToId'>Responsible</FormLabel>
                  <Select
                    id='assignedToId'
                    defaultValue={selectedTask.assignedTo.id}
                  >
                    <option value='1'>David Sánchez</option>
                  </Select>
                </Box>

                <Box>
                  <FormLabel htmlFor='assignedToId'>
                    Notification Status
                  </FormLabel>
                  <Select
                    id='assignedToId'
                    defaultValue={selectedTask.notificationStatus}
                  >
                    <option value={NotificationStatusType.NOT_NOTIFIED}>
                      {replaceUnderscores(NotificationStatusType.NOT_NOTIFIED)}
                    </option>
                    <option value={NotificationStatusType.NOTIFIED}>
                      {NotificationStatusType.NOTIFIED}
                    </option>
                  </Select>
                </Box>
              </Stack>
            </Box>
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
