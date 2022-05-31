import { Box, Text } from '@chakra-ui/react';
import { ShowIf } from '@components/show-if/show-if';
import { PriorityType, PriorityStyles, Task } from '@interfaces/task-interface';
import React from 'react';

type PriorityLabelProps = {
  task: Task;
};

export const PriorityLabel = ({ task }: PriorityLabelProps) => (
  <React.Fragment>
    <ShowIf condition={task.priority === PriorityType.LOW}>
      <Box mt={2} borderRadius={3} bg={PriorityStyles.low.bg} px={2}>
        <Text
          textColor={PriorityStyles.low.textColor}
          fontSize='xs'
          fontWeight='bold'
        >
          Low
        </Text>
      </Box>
    </ShowIf>
    <ShowIf condition={task.priority === PriorityType.MID}>
      <Box mt={2} borderRadius={3} bg={PriorityStyles.mid.bg} px={2}>
        <Text
          textColor={PriorityStyles.mid.textColor}
          fontSize='xs'
          fontWeight='bold'
        >
          Mid
        </Text>
      </Box>
    </ShowIf>
    <ShowIf condition={task.priority === PriorityType.HIGH}>
      <Box mt={2} borderRadius={3} bg={PriorityStyles.high.bg} px={2}>
        <Text
          textColor={PriorityStyles.high.textColor}
          fontSize='xs'
          fontWeight='bold'
        >
          High
        </Text>
      </Box>
    </ShowIf>
  </React.Fragment>
);
