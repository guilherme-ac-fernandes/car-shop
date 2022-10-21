import { IMotorcycle } from '../../interfaces/IMotorcycle';

const motorcycleMock: IMotorcycle = {
  model: 'Honda',
  year: 2011,
  color: 'Preto',
  status: true,
  buyValue: 1000,
  category: 'Street',
  engineCapacity: 2000,
};

const motorcycleMockWithId: IMotorcycle & { _id: string } = {
  _id: '62cf1fc6498565d94eba52cd',
  model: 'Honda',
  year: 2011,
  color: 'Preto',
  status: true,
  buyValue: 1000,
  category: 'Street',
  engineCapacity: 2000,
};

const motorcycleMockForUpdate: IMotorcycle = {
  model: 'Honda',
  year: 2011,
  color: 'Preto',
  status: true,
  buyValue: 1000,
  category: 'Custom',
  engineCapacity: 2000,
};

const motorcycleMockForUpdateWrong: unknown = {
  model: 'Honda',
  year: '2011',
  color: 'Preto',
  status: true,
  buyValue: 1000,
  category: 'Custom',
  engineCapacity: 2000,
};

const motorcycleMockWithIdUpdated: IMotorcycle & { _id: string } = {
  _id: '62cf1fc6498565d94eba52cd',
  model: 'Honda',
  year: 2011,
  color: 'Preto',
  status: true,
  buyValue: 1000,
  category: 'Custom',
  engineCapacity: 2000,
};

export {
  motorcycleMock,
  motorcycleMockWithId,
  motorcycleMockForUpdate,
  motorcycleMockWithIdUpdated,
  motorcycleMockForUpdateWrong,
};
