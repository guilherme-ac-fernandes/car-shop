import { expect } from 'chai';
import sinon from 'sinon';
import MotorcycleModel from '../../../models/MotorcycleModel';
import { Model } from 'mongoose';
import {
  motorcycleMock,
  motorcycleMockWithId,
  motorcycleMockForUpdate,
  motorcycleMockWithIdUpdated,
} from '../../mocks/motorcycleMock';
import { ErrorTypes } from '../../../errors/catalog';

describe('Motorcycle Model', () => {
  const motorcycleModel = new MotorcycleModel();

  before(() => {
    sinon.stub(Model, 'create').resolves(motorcycleMockWithId);
    sinon.stub(Model, 'findOne').resolves(motorcycleMockWithId);
    sinon.stub(Model, 'find').resolves([motorcycleMockWithId]);
    sinon.stub(Model, 'findByIdAndDelete').resolves(motorcycleMockWithId);
    sinon
      .stub(Model, 'findByIdAndUpdate')
      .resolves(motorcycleMockWithIdUpdated);
  });

  after(() => sinon.restore());

  describe('creating a new motorcycle', () => {
    it('successfully created', async () => {
      const newMotorcycle = await motorcycleModel.create(motorcycleMock);
      expect(newMotorcycle).to.be.deep.equal(motorcycleMockWithId);
    });
  });

  describe('searching a motorcycle', () => {
    it('successfully found', async () => {
      const motorcycleFound = await motorcycleModel.readOne(
        '62cf1fc6498565d94eba52cd'
      );
      expect(motorcycleFound).to.be.deep.equal(motorcycleMockWithId);
    });

    it('_id not found', async () => {
      try {
        await motorcycleModel.readOne('123ERRADO');
      } catch (error: any) {
        expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
      }
    });
  });

  describe('searching all motorcycles', () => {
    it('successfully found', async () => {
      const motorcyclesFound = await motorcycleModel.read();
      expect(motorcyclesFound).to.be.deep.equal([motorcycleMockWithId]);
    });
  });

  describe('deleteting a motorcycle', () => {
    it('successfully delete', async () => {
      const motorcycleDelete = await motorcycleModel.delete(
        '62cf1fc6498565d94eba52cd'
      );
      expect(motorcycleDelete).to.be.deep.equal(motorcycleMockWithId);
    });

    it('_id not found', async () => {
      try {
        await motorcycleModel.delete('123ERRADO');
      } catch (error: any) {
        expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
      }
    });
  });

  describe('updating a motorcycle', () => {
    it('successfully update', async () => {
      const motorcycleUpdate = await motorcycleModel.update(
        '62cf1fc6498565d94eba52cd',
        motorcycleMockForUpdate
      );
      expect(motorcycleUpdate).to.be.deep.equal(motorcycleMockWithIdUpdated);
    });

    it('_id not found', async () => {
      try {
        await motorcycleModel.update('123ERRADO', motorcycleMock);
      } catch (error: any) {
        expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
      }
    });
  });
});
