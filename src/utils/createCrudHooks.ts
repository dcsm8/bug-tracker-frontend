import { useQuery, useMutation, useQueryClient } from 'react-query';

interface QueryCustomConfig {
  onSuccess?: Function;
}

export default function createCrudHooks({
  baseKey,
  indexFn,
  singleFn,
  createFn,
  updateFn,
  deleteFn,
}) {
  const queryClient = useQueryClient();

  const useIndex = (config) => useQuery([baseKey], indexFn, config);

  const useSingle = (id, config) =>
    useQuery([baseKey, id], () => singleFn(id), config);

  const useCreate = (config: QueryCustomConfig = {}) =>
    useMutation(createFn, {
      ...config,
      onSuccess: (...args) => {
        queryClient.invalidateQueries([baseKey]);
        if (config.onSuccess) config.onSuccess(...args);
      },
    });

  const useUpdate = (config: QueryCustomConfig = {}) =>
    useMutation(updateFn, {
      ...config,
      onSuccess: (...args) => {
        queryClient.invalidateQueries([baseKey]);
        if (config.onSuccess) config.onSuccess(...args);
      },
    });

  const useDelete = (config: QueryCustomConfig = {}) =>
    useMutation(deleteFn, {
      ...config,
      onSuccess: (...args) => {
        queryClient.invalidateQueries([baseKey]);
        if (config.onSuccess) config.onSuccess(...args);
      },
    });

  return [useIndex, useSingle, useCreate, useUpdate, useDelete];
}
