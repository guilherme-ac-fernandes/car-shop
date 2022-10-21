import { ICar } from '../../interfaces/ICar';

const carsMock: ICar = {
  model: 'Palio',
  year: 2011,
  color: 'Preto',
  status: true,
  buyValue: 1000,
  doorsQty: 4,
  seatsQty: 5,
};

const carsMockWithId: ICar & { _id: string } = {
  _id: '62cf1fc6498565d94eba52cd',
  model: 'Palio',
  year: 2011,
  color: 'Preto',
  status: true,
  buyValue: 1000,
  doorsQty: 4,
  seatsQty: 5,
};

const carsMockForUpdate: ICar = {
  model: 'Palio',
  year: 2011,
  color: 'Preto',
  status: true,
  buyValue: 1000,
  doorsQty: 4,
  seatsQty: 5,
};

const carsMockForUpdateWrong: unknown = {
  model: 'Palio',
  year: '2011',
  color: 'Preto',
  status: true,
  buyValue: 1000,
  doorsQty: 4,
  seatsQty: 5,
};

const carsMockWithIdUpdated: ICar & { _id: string } = {
  _id: '62cf1fc6498565d94eba52cd',
  model: 'Palio',
  year: 2011,
  color: 'Preto',
  status: true,
  buyValue: 1000,
  doorsQty: 4,
  seatsQty: 5,
};

export {
  carsMock,
  carsMockWithId,
  carsMockForUpdate,
  carsMockWithIdUpdated,
  carsMockForUpdateWrong,
};
