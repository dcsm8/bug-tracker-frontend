import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  EditableTextarea,
  Stack,
  Box,
  FormLabel,
  Select,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Icon,
  HStack,
  Flex,
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
import { update } from '@services/tasks-service';
import { replaceUnderscores } from '@utils/text-pipes';
import { useMutation, useQueryClient } from 'react-query';

type ViewTaskProps = {
  isOpen: boolean;
  onClose: () => void;
  onRemoveCard: (card: Task) => void;
  selectedTask: Task | null;
};

export const ViewTask = ({
  isOpen,
  onClose,
  onRemoveCard,
  selectedTask,
}: ViewTaskProps) => {
  const queryClient = useQueryClient();

  const { mutateAsync: updateTask } = useMutation(update, {
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks']);
    },
  });

  const onSubmit = async (prop: keyof Task, value) => {
    if (selectedTask) {
      const updatedTask: Partial<Task> = {
        id: selectedTask.id,
        [prop]: value,
      };
      // changeCard(board, cardId, newCard);
      await updateTask(updatedTask);
    }
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
              onSubmit={(nextValue: string) => onSubmit('title', nextValue)}
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
                />
                <MenuList fontSize='md'>
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
                onSubmit={(nextValue: string) =>
                  onSubmit('description', nextValue)
                }
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
                  <FormLabel htmlFor='status'>Status</FormLabel>
                  <Select
                    id='status'
                    defaultValue={selectedTask.status}
                    onChange={(e) => onSubmit('status', e.target.value)}
                  >
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
                  <Select
                    id='priority'
                    defaultValue={selectedTask.priority}
                    onChange={(e) => onSubmit('priority', e.target.value)}
                  >
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
                  <Select
                    id='category'
                    defaultValue={selectedTask.category}
                    onChange={(e) => onSubmit('category', e.target.value)}
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
                </Box>

                <Box>
                  <FormLabel htmlFor='reproducible'>Reproducible</FormLabel>
                  <Select
                    id='reproducible'
                    defaultValue={selectedTask.reproducible}
                    onChange={(e) => onSubmit('reproducible', e.target.value)}
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
                  <FormLabel htmlFor='notificationStatus'>
                    Notification Status
                  </FormLabel>
                  <Select
                    id='notificationStatus'
                    defaultValue={selectedTask.notificationStatus}
                    onChange={(e) =>
                      onSubmit('notificationStatus', e.target.value)
                    }
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
