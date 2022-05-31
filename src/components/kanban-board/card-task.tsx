import { Flex, HStack, Avatar, Text } from '@chakra-ui/react';
import { PriorityLabel } from '@components/priority-label/priority-label';
import { ShowIf } from '@components/show-if/show-if';
import { Task } from '@interfaces/task-interface';
import React from 'react';

type cardTaskProps = {
  task: Task;
  openTask: (task: Task) => void;
  props: any;
};

const DragLayer = ({ children, props }: any) => (
  <React.Fragment {...props}>{children}</React.Fragment>
);

export const CardTask = ({ task, openTask, props }: cardTaskProps) => (
  <DragLayer {...props}>
    <Flex
      align='start'
      mt='10px'
      flexDirection='column'
      p='10px 15px'
      borderRadius='7px'
      borderColor='#EFF0F1'
      bg='white'
      boxShadow='base'
      maxW='270px'
      minW='270px'
      onClick={() => openTask(task)}
    >
      <Text fontSize='sm' fontWeight='semibold' color='gray.500'>
        {task.area?.name}
      </Text>
      <Text fontSize='md' fontWeight='bold'>
        {task.title}
      </Text>
      <HStack mt={task.assignedTo || task.priority ? 3 : 0}>
        <ShowIf condition={task.assignedTo !== null}>
          <Avatar size='xs' name={task.assignedTo?.fullName} />
        </ShowIf>
        <PriorityLabel task={task} />
      </HStack>
    </Flex>
  </DragLayer>
);
