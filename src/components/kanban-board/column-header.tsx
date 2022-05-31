import { Box, HStack, Text } from '@chakra-ui/react';
import { Column } from '@interfaces/board-interface';

export const ColumnHeader = ({ title, color, cards, labelBg }: Column) => (
  <Box bg={color} p='6px 12px' borderRadius='7px' maxW='270px' minW='270px'>
    <HStack>
      <Text fontSize='sm' fontWeight='semibold' color='white'>
        {title}
      </Text>
      <Box bg={labelBg} px='5px' borderRadius={4}>
        <Text fontSize='small' fontWeight='semibold' color='white'>
          {cards.length}
        </Text>
      </Box>
    </HStack>
  </Box>
);
