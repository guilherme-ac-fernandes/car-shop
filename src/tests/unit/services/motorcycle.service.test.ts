import { expect } from 'chai';
import * as sinon from 'sinon';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/catalog';
import MotorcycleModel from '../../../models/MotorcycleModel';
import MotorcycleService from '../../../services/MotorcycleService';
import {
  motorcycleMock,
  motorcycleMockWithId,
  motorcycleMockForUpdate,
  motorcycleMockWithIdUpdated,
  motorcycleMockForUpdateWrong,
} from '../../mocks/motorcycleMock';

describe('Motorcycle Service', () => {
  const motorcycleModel = new MotorcycleModel();
  const motorcycleService = new MotorcycleService(motorcycleModel);

  before(() => {
    sinon.stub(motorcycleModel, 'create').resolves(motorcycleMockWithId);
    sinon
      .stub(motorcycleModel, 'readOne')
      .onCall(0)
      .resolves(motorcycleMockWithId)
      .onCall(1)
      .resolves(null);
    sinon.stub(motorcycleModel, 'read').resolves([motorcycleMockWithId]);
    sinon
      .stub(motorcycleModel, 'delete')
      .onCall(0)
      .resolves(motorcycleMockWithId)
      .onCall(1)
      .resolves(null);
    sinon
      .stub(motorcycleModel, 'update')
      .onCall(0)
      .resolves(motorcycleMockWithIdUpdated)
      .onCall(1)
      .resolves(null)
      .onCall(2)
      .resolves(null);
  });

  after(() => sinon.restore());

  describe('Create Motorcycle', () => {
    it('Success', async () => {
      const motorcycleCreated = await motorcycleService.create(motorcycleMock);
      expect(motorcycleCreated).to.be.deep.equal(motorcycleMockWithId);
    });

    it('Failure', async () => {
      let error;
      try {
        await motorcycleService.create({});
      } catch (err) {
        error = err;
      }
      expect(error).to.be.instanceOf(ZodError);
    });
  });

  describe('ReadOne Motorcycle', () => {
    it('Success', async () => {
      const motorcycleCreated = await motorcycleService.readOne(
        motorcycleMockWithId._id
      );
      expect(motorcycleCreated).to.be.deep.equal(motorcycleMockWithId);
    });

    it('Failure', async () => {
      let error;
      try {
        await motorcycleService.readOne(motorcycleMockWithId._id);
      } catch (err: any) {
        error = err;
      }
      expect(error, 'error should be defined').not.to.be.undefined;
      expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
    });
  });

  describe('Read Motorcycles', () => {
    it('Success', async () => {
      const motorcyclesArray = await motorcycleService.read();
      expect(motorcyclesArray).to.be.deep.equal([motorcycleMockWithId]);
    });
  });

  describe('Delete Motorcycle', () => {
    it('Success', async () => {
      const motorcycleDelete = await motorcycleService.delete(
        motorcycleMockWithId._id
      );
      expect(motorcycleDelete).to.be.deep.equal(motorcycleMockWithId);
    });

    it('Failure', async () => {
      let error;
      try {
        await motorcycleService.delete(motorcycleMockWithId._id);
      } catch (err: any) {
        error = err;
      }
      expect(error, 'error should be defined').not.to.be.undefined;
      expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
    });
  });

  describe('Update Motorcycle', () => {
    it('Success', async () => {
      const motorcycleArray = await motorcycleService.update(
        motorcycleMockWithId._id,
        motorcycleMockForUpdate
      );
      expect(motorcycleArray).to.be.deep.equal(motorcycleMockWithIdUpdated);
    });

    it('Failure: id invalid', async () => {
      let error;
      try {
        await motorcycleService.update('123ERRADO', motorcycleMockForUpdate);
      } catch (err: any) {
        error = err;
      }

      expect(error.message).to.be.equal(ErrorTypes.EntityNotFound);
    });

    it('Failure: car invalid', async () => {
      let error;
      try {
        await motorcycleService.update(
          motorcycleMockWithId._id,
          motorcycleMockForUpdateWrong
        );
      } catch (err: any) {
        error = err;
      }

      expect(error).to.be.instanceOf(ZodError);
    });
  });
});
