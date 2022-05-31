import { SelectOption } from './../interfaces/select-option.interface';
import { Area } from '../interfaces/area-interface';
import { apiClient } from './api';

export const findAll = async (): Promise<SelectOption[]> => {
  const response = await apiClient.get<Area[]>('/areas');
  return getOptions(response.data);
};

const getOptions = (areas: Area[]): SelectOption[] => {
  return areas.map((area) => ({
    label: area.name,
    value: area.id.toString(),
  }));
};
