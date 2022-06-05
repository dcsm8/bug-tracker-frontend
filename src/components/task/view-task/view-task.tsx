import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Stack,
  Box,
  FormLabel,
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
  useDisclosure,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { FiMoreHorizontal, FiTrash } from 'react-icons/fi';
import { Task } from '@interfaces/task-interface';
import { update } from '@services/tasks-service';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import draftToHtml from 'draftjs-to-html';
import { EditorState, convertToRaw } from 'draft-js';
import { useEffect, useState } from 'react';
import { RichTextEditor } from '@components/rich-text-editor/rich-text-editor';
import { useTaskStore } from '@store/task-store';
import { loadEditorState } from '@utils/load-editor-state';
import { DeleteConfirmDialog } from '@components/delete-confirm-dialog/delete-confirm-dialog';
import Select, { ActionMeta, SingleValue } from 'react-select';
import {
  CategoryOptions,
  PriorityOptions,
  ReproducibleOptions,
  ResponsibleOptions,
} from '@services/options-service';
import { SelectOption } from '@interfaces/select-option.interface';
import { findAll } from '@services/areas-service';
import {
  AvatarOption,
  AvatarSingleValue,
} from '@components/avatar-option/avatar-option';
import { useDebounce } from '@store/use-debounce';
import { AddComment } from '@components/comment/add-comment/add-comment';
import { ViewComments } from '@components/comment/view-comments/view-comments';

type ViewTaskProps = {
  isOpen: boolean;
  onClose: () => void;
  onRemoveCard: (card: Task) => void;
};

const DEBOUNCE_DELAY = 1500;

export const ViewTask = ({ isOpen, onClose, onRemoveCard }: ViewTaskProps) => {
  const selectedTask = useTaskStore((state) => state.selectedTask);
  const queryClient = useQueryClient();
  const [descriptionEditorState, setDescriptionEditorState] = useState(() =>
    EditorState.createEmpty(),
  );
  const debouncedEditorState = useDebounce(
    descriptionEditorState,
    DEBOUNCE_DELAY,
  );

  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();

  const { data: areaOptions, isLoading: isLoadingAreas } = useQuery(
    ['areas'],
    findAll,
  );

  useEffect(() => {
    if (selectedTask && selectedTask.description !== null) {
      setDescriptionEditorState(loadEditorState(selectedTask.description));
    }
  }, [selectedTask]);

  useEffect(() => {
    if (debouncedEditorState) {
      const rawContentState = convertToRaw(
        debouncedEditorState.getCurrentContent(),
      );

      const markup = draftToHtml(rawContentState);
      onSubmit('description', markup);
    }
  }, [debouncedEditorState]);

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
      await updateTask(updatedTask);
    }
  };

  const onChangeSelect = async (
    e: SingleValue<SelectOption>,
    triggeredAction: ActionMeta<SelectOption>,
    prop: keyof Task,
  ) => {
    let value;
    value = e?.value;
    if (triggeredAction.action === 'clear') {
      value = null;
    }
    onSubmit(prop, value);
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
              fontSize='2xl'
              fontWeight='bold'
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
                  <MenuItem icon={<Icon as={FiTrash} />} onClick={onOpenDelete}>
                    Delete
                  </MenuItem>
                  <DeleteConfirmDialog
                    isOpen={isOpenDelete}
                    onClose={onCloseDelete}
                    onDelete={() => onRemoveCard(selectedTask)}
                    title='Delete Task'
                  />
                </MenuList>
              </Menu>
            </Box>
          </HStack>
        </DrawerHeader>

        <DrawerBody>
          <Flex gap={10}>
            <Box flex={2}>
              <FormLabel htmlFor='description'>Description</FormLabel>
              <RichTextEditor
                showToolbar={false}
                editorState={descriptionEditorState}
                onEditorStateChange={setDescriptionEditorState}
                placeholder='Enter description'
              />

              <FormLabel htmlFor='description' mt={10}>
                Activity
              </FormLabel>
              <Tabs variant='soft-rounded' colorScheme='gray' size='sm'>
                <TabList>
                  <Tab fontWeight='semibold'>Comments</Tab>
                  <Tab fontWeight='semibold'>History</Tab>
                </TabList>

                <TabPanels>
                  <TabPanel>
                    <AddComment />
                    <ViewComments comments={selectedTask.comments} />
                  </TabPanel>
                  <TabPanel>
                    <p>History here</p>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>
            <Box flex={1}>
              <Stack spacing='24px'>
                <Box>
                  <FormLabel htmlFor='priority'>Priority</FormLabel>
                  <Select
                    id='priority'
                    options={PriorityOptions}
                    defaultValue={PriorityOptions.filter(
                      (option) => option.value === selectedTask.priority,
                    )}
                    onChange={(e, triggeredAction) =>
                      onChangeSelect(e, triggeredAction, 'priority')
                    }
                    isClearable
                  />
                </Box>
                <Box>
                  <FormLabel htmlFor='area'>Area</FormLabel>
                  <Select
                    id='area'
                    options={areaOptions}
                    defaultValue={areaOptions?.filter(
                      (option) =>
                        parseInt(option.value) === selectedTask.area?.id,
                    )}
                    onChange={(e, triggeredAction) =>
                      onChangeSelect(e, triggeredAction, 'area')
                    }
                    isClearable
                    isLoading={isLoadingAreas}
                  />
                </Box>
                <Box>
                  <FormLabel htmlFor='category'>Category</FormLabel>
                  <Select
                    id='category'
                    options={CategoryOptions}
                    defaultValue={CategoryOptions.filter(
                      (option) => option.value === selectedTask.category,
                    )}
                    onChange={(e, triggeredAction) =>
                      onChangeSelect(e, triggeredAction, 'category')
                    }
                    isClearable
                  />
                </Box>
                <Box>
                  <FormLabel htmlFor='reproducible'>Reproducible</FormLabel>
                  <Select
                    id='reproducible'
                    options={ReproducibleOptions}
                    defaultValue={ReproducibleOptions.filter(
                      (option) => option.value === selectedTask.reproducible,
                    )}
                    onChange={(e, triggeredAction) =>
                      onChangeSelect(e, triggeredAction, 'reproducible')
                    }
                    isClearable
                  />
                </Box>
                <Box>
                  <FormLabel htmlFor='assignedTo'>Assigned To</FormLabel>
                  <Select
                    id='assignedTo'
                    options={ResponsibleOptions}
                    defaultValue={ResponsibleOptions.filter(
                      (option) =>
                        parseInt(option.value) === selectedTask.assignedTo?.id,
                    )}
                    isClearable
                    components={{
                      Option: AvatarOption,
                      SingleValue: AvatarSingleValue,
                    }}
                    onChange={(e, triggeredAction) =>
                      onChangeSelect(e, triggeredAction, 'assignedTo')
                    }
                  />
                </Box>
              </Stack>
            </Box>
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
