import {
  builderByIdDao,
  changeBuilderStateDao,
  createMultipleBuilderDao,
  createUniqueBuilderDao,
  deleteBuilderDao,
  getBuildersDao,
  updateBuilderDao
} from "./builder-dao";

export const getBuildersService = async (state: StateTypeModelI) => {
  return await getBuildersDao(state);
};

export const createUniqueBuilderService = async (name: string, stateId: number) => {
  return await createUniqueBuilderDao(name, stateId);
};

export const createMultipleBuilderService = async (builders: MultipleModelI) => {
  return await createMultipleBuilderDao(builders);
};

export const changeBuilderStateService = async (id: number, stateId: number) => {
  return await changeBuilderStateDao(id, stateId);
};

export const deleteBuilderService = async (id: number) => {
  return await deleteBuilderDao(id);
};

export const updateBuilderService = async (id: number) => {
  return await updateBuilderDao(id);
};

export const builderByIdService = async (id: number) => {
  return await builderByIdDao(id);
};