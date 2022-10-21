import { expect } from 'chai';
import sinon from 'sinon';
import CarModel from '../../../models/CarModel';
import { Model } from 'mongoose';
import {
  carsMock,
  carsMockWithId,
  carsMockForUpdate,
  carsMockWithIdUpdated,
} from '../../mocks/carsMock';
import { ErrorTypes } from '../../../errors/catalog';

describe('Car Model', () => {
  const carsModel = new CarModel();

  before(() => {
    sinon.stub(Model, 'create').resolves(carsMockWithId);
    sinon.stub(Model, 'findOne').resolves(carsMockWithId);
    sinon.stub(Model, 'find').resolves([carsMockWithId]);
    sinon.stub(Model, 'findByIdAndDelete').resolves(carsMockWithId);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(carsMockWithIdUpdated);
  });

  after(() => sinon.restore());

  describe('creating a new car', () => {
    it('successfully created', async () => {
      const newCar = await carsModel.create(carsMock);
      expect(newCar).to.be.deep.equal(carsMockWithId);
    });
  });

  describe('searching a car', () => {
    it('successfully found', async () => {
      const carFound = await carsModel.readOne('62cf1fc6498565d94eba52cd');
      expect(carFound).to.be.deep.equal(carsMockWithId);
    });

    it('_id not found', async () => {
      try {
        await carsModel.readOne('123ERRADO');
      } catch (error: any) {
        expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
      }
    });
  });

  describe('searching all cars', () => {
    it('successfully found', async () => {
      const carsFound = await carsModel.read();
      expect(carsFound).to.be.deep.equal([carsMockWithId]);
    });
  });

  describe('deleteting a car', () => {
    it('successfully delete', async () => {
      const carDelete = await carsModel.delete('62cf1fc6498565d94eba52cd');
      expect(carDelete).to.be.deep.equal(carsMockWithId);
    });

    it('_id not found', async () => {
      try {
        await carsModel.delete('123ERRADO');
      } catch (error: any) {
        expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
      }
    });
  });

  describe('updating a car', () => {
    it('successfully update', async () => {
      const carUpdate = await carsModel.update(
        '62cf1fc6498565d94eba52cd',
        carsMockForUpdate
      );
      expect(carUpdate).to.be.deep.equal(carsMockWithIdUpdated);
    });

    it('_id not found', async () => {
      try {
        await carsModel.update('123ERRADO', carsMock);
      } catch (error: any) {
        expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
      }
    });
  });
});
