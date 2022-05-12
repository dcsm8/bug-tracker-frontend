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
  Icon,
} from '@chakra-ui/react';
import {
  CategoryType,
  PriorityType,
  ReproducibleType,
} from '@interfaces/task-interface';
import { replaceUnderscores } from '@utils/text-pipes';
import React from 'react';

type CreateTaskProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const CreateTask = ({ isOpen, onClose }: CreateTaskProps) => {
  const firstField = React.useRef();

  return (
    <Drawer
      isOpen={isOpen}
      placement='right'
      initialFocusRef={firstField}
      onClose={onClose}
      size='lg'
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth='1px'>Create a new task</DrawerHeader>

        <DrawerBody>
          <Stack spacing='24px'>
            <Box>
              <FormLabel htmlFor='title'>Title</FormLabel>
              <Input
                ref={firstField}
                id='title'
                placeholder='Please enter title'
              />
            </Box>

            <Box>
              <FormLabel htmlFor='priority'>Select Priority</FormLabel>
              <Select id='priority' defaultValue={PriorityType.NONE}>
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
            </Box>

            <Box>
              <FormLabel htmlFor='category'>Select Category</FormLabel>
              <Select id='category' defaultValue={CategoryType.FEATURE}>
                <option value={CategoryType.FEATURE}>
                  {CategoryType.FEATURE}
                </option>
                <option value={CategoryType.ISSUE}>{CategoryType.ISSUE}</option>
                <option value={CategoryType.INQUIRY}>
                  {CategoryType.INQUIRY}
                </option>
              </Select>
            </Box>

            <Box>
              <FormLabel htmlFor='reproducible'>Select Reproducible</FormLabel>
              <Select
                id='reproducible'
                defaultValue={ReproducibleType.NOT_APPLICABLE}
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
              <FormLabel htmlFor='shortDescription'>
                Short Description
              </FormLabel>
              <Textarea id='shortDescription' />
            </Box>

            <Box>
              <FormLabel htmlFor='longDescription'>Long Description</FormLabel>
              <Textarea id='longDescription' />
            </Box>

            <Box>
              <FormLabel htmlFor='responsible'>Select Responsible</FormLabel>
              <Select id='responsible' defaultValue='1'>
                <option value='1'>David Sánchez</option>
              </Select>
            </Box>
          </Stack>
        </DrawerBody>

        <DrawerFooter borderTopWidth='1px'>
          <Button variant='outline' mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme='blue'>Submit</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
