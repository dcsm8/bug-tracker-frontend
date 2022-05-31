import { HStack, Avatar, Text } from '@chakra-ui/react';
import { components } from 'react-select';

const { Option, SingleValue } = components;
export const AvatarOption = (props: any) => (
  <Option {...props}>
    <HStack>
      <Avatar size={'sm'} name={props.data.label} />
      <Text>{props.data.label}</Text>
    </HStack>
  </Option>
);

export const AvatarSingleValue = (props: any) => (
  <SingleValue {...props}>
    <HStack>
      <Avatar size={'sm'} name={props.data.label} />
      <Text>{props.data.label}</Text>
    </HStack>
  </SingleValue>
);
