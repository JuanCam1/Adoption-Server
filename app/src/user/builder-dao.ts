import { StateEnum } from "../../const/state-const";
import { NotFoundError } from "../../error/not-found-error";
import { prisma } from "../../lib/prisma";

export const getBuildersDao = async (state: StateTypeModelI): Promise<BuilderResModelI[]> => {
  const builderName = await prisma.configuration.findFirst({
    where: {
      id: 1
    },
    select: {
      builderType: true
    }
  })


  if (!builderName) throw new NotFoundError("BuilderName no encontrado");

  const whereClause = state === "All" ? {} : { state: { state } };
  const builders = await prisma.builder.findMany({
    where: whereClause,
    select: {
      id: true,
      name: true,
      _count: {
        select: {
          apartments: true
        }
      },
      state: {
        select: {
          id: true,
          state: true
        }
      }
    }
  });

  const buildersMap = builders.map((builders) => (
    {
      id: builders.id,
      name: `${builderName.builderType ?? "Torre"}-${builders.name}`,
      state: builders.state,
      totalApartments: builders._count.apartments
    }
  ))

  return buildersMap;
};

export const createUniqueBuilderDao = async (name: string, stateId: number): Promise<BuilderModelI> => {
  const builder = await prisma.builder.create({
    data: {
      name: name.toString(),
      stateId,
    },
  });

  return builder;
};

export const createMultipleBuilderDao = async (builders: MultipleModelI): Promise<string> => {
  const { init, limit } = builders;

  const torres = Array.from({ length: limit - init + 1 }, (_, i) => ({
    name: `${init + i}`,
    stateId: 1
  }));

  await prisma.builder.createMany({
    data: torres,
  });

  return "creado";
};

export const changeBuilderStateDao = async (id: number, stateId: number): Promise<BuilderModelI> => {
  const builder = await prisma.builder.update({
    where: {
      id: Number(id),
    },
    data: {
      stateId: stateId === StateEnum.ACTIVE ? StateEnum.INACTIVE : StateEnum.ACTIVE,
    },
  });

  return builder;
};

export const deleteBuilderDao = async (id: number): Promise<BuilderModelI> => {

  const apts = await prisma.apartament.count({
    where: {
      builderId: Number(id),
    },
  });

  if (apts > 0) throw new Error("El builder tiene apartamentos asociados");

  const builder = await prisma.builder.delete({
    where: {
      id: id,
    },
  });

  return builder;
};


export const builderByIdDao = async (id: number): Promise<BuilderResModelI> => {
  const builder = await prisma.builder.findUnique({
    where: {
      id: Number(id),
    },
    select: {
      id: true,
      name: true,
      _count: {
        select: {
          apartments: true
        }
      },
      state: {
        select: {
          id: true,
          state: true
        }
      }
    },
  });

  if (!builder) throw new NotFoundError("Builder no encontrado");

  const builderMap: BuilderResModelI = {
    id: builder.id,
    name: builder.name,
    totalApartments: builder._count.apartments,
    state: builder.state,
  };

  return builderMap;
};

export const updateBuilderDao = async (id: number): Promise<void> => {
  // const builder = await prisma.builder.update({
  //   where: {
  //     id,
  //   },
  //   data: {
  //     name: "test",
  //   },
  // });

  // return builder;
};
