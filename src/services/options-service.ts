import {
  CategoryType,
  PriorityType,
  ReproducibleType,
} from '@interfaces/task-interface';
import { SelectOption } from '@interfaces/select-option.interface';
import { replaceUnderscores } from '@utils/text-pipes';

export const PriorityOptions = (): SelectOption[] => {
  const options: SelectOption[] = [];

  for (let value in PriorityType) {
    const option: PriorityType = PriorityType[value] as PriorityType;
    options.push({
      label: replaceUnderscores(option),
      value: option,
    });
  }

  return options;
};

export const CategoryOptions = (): SelectOption[] => {
  const options: SelectOption[] = [];

  for (let value in CategoryType) {
    const option: CategoryType = CategoryType[value] as CategoryType;
    options.push({
      label: replaceUnderscores(option),
      value: option,
    });
  }

  return options;
};

export const ReproducibleOptions = (): SelectOption[] => {
  const options: SelectOption[] = [];

  for (let value in ReproducibleType) {
    const option: ReproducibleType = ReproducibleType[
      value
    ] as ReproducibleType;
    options.push({
      label: replaceUnderscores(option),
      value: option,
    });
  }

  return options;
};
