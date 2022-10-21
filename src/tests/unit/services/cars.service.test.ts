import { expect } from 'chai';
import * as sinon from 'sinon';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/catalog';
import CarModel from '../../../models/CarModel';
import CarService from '../../../services/CarService';
import {
  carsMock,
  carsMockWithId,
  carsMockForUpdate,
  carsMockWithIdUpdated,
  carsMockForUpdateWrong,
} from '../../mocks/carsMock';

describe('Car Service', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);

  before(() => {
    sinon.stub(carModel, 'create').resolves(carsMockWithId);
    sinon
      .stub(carModel, 'readOne')
      .onCall(0)
      .resolves(carsMockWithId)
      .onCall(1)
      .resolves(null);
    sinon.stub(carModel, 'read').resolves([carsMockWithId]);
    sinon
      .stub(carModel, 'delete')
      .onCall(0)
      .resolves(carsMockWithId)
      .onCall(1)
      .resolves(null);
    sinon
      .stub(carModel, 'update')
      .onCall(0)
      .resolves(carsMockWithIdUpdated)
      .onCall(1)
      .resolves(null)
      .onCall(2)
      .resolves(null);
  });

  after(() => sinon.restore());

  describe('Create Car', () => {
    it('Success', async () => {
      const carCreated = await carService.create(carsMock);
      expect(carCreated).to.be.deep.equal(carsMockWithId);
    });

    it('Failure', async () => {
      let error;
      try {
        await carService.create({});
      } catch (err) {
        error = err;
      }
      expect(error).to.be.instanceOf(ZodError);
    });
  });

  describe('ReadOne Car', () => {
    it('Success', async () => {
      const carCreated = await carService.readOne(carsMockWithId._id);
      expect(carCreated).to.be.deep.equal(carsMockWithId);
    });

    it('Failure', async () => {
      let error;
      try {
        await carService.readOne(carsMockWithId._id);
      } catch (err: any) {
        error = err;
      }
      expect(error, 'error should be defined').not.to.be.undefined;
      expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
    });
  });

  describe('Read Cars', () => {
    it('Success', async () => {
      const carsArray = await carService.read();
      expect(carsArray).to.be.deep.equal([carsMockWithId]);
    });
  });

  describe('Delete Car', () => {
    it('Success', async () => {
      const carDelete = await carService.delete(carsMockWithId._id);
      expect(carDelete).to.be.deep.equal(carsMockWithId);
    });

    it('Failure', async () => {
      let error;
      try {
        await carService.delete(carsMockWithId._id);
      } catch (err: any) {
        error = err;
      }
      expect(error, 'error should be defined').not.to.be.undefined;
      expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
    });
  });

  describe('Update Car', () => {
    it('Success', async () => {
      const carArray = await carService.update(
        carsMockWithId._id,
        carsMockForUpdate
      );
      expect(carArray).to.be.deep.equal(carsMockWithIdUpdated);
    });

    it('Failure: id invalid', async () => {
      let error;
      try {
        await carService.update('123ERRADO', carsMockForUpdate);
      } catch (err: any) {
        error = err;
      }

      expect(error.message).to.be.equal(ErrorTypes.EntityNotFound);
    });

    it('Failure: car invalid', async () => {
      let error;
      try {
        await carService.update(carsMockWithId._id, carsMockForUpdateWrong);
      } catch (err: any) {
        error = err;
      }

      expect(error).to.be.instanceOf(ZodError);
    });
  });
});
