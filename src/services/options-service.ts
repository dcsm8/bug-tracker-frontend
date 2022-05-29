import {
  CategoryType,
  PriorityType,
  ReproducibleType,
} from '@interfaces/task-interface';
import { replaceUnderscores } from '@utils/text-pipes';

export const PriorityOptions = Object.keys(PriorityType).map((key) => ({
  label: replaceUnderscores(PriorityType[key]),
  value: PriorityType[key],
}));

export const CategoryOptions = Object.keys(CategoryType).map((key) => ({
  label: replaceUnderscores(CategoryType[key]),
  value: CategoryType[key],
}));

export const ReproducibleOptions = Object.keys(ReproducibleType).map((key) => ({
  label: replaceUnderscores(ReproducibleType[key]),
  value: ReproducibleType[key],
}));

export const ResponsibleOptions = [
  {
    label: 'David Sánchez',
    value: '1',
  },
];
