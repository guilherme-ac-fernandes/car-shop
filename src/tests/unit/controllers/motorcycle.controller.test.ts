import { expect } from 'chai';
import * as sinon from 'sinon';
import { Request, Response } from 'express';
import MotorcycleModel from '../../../models/MotorcycleModel';
import MotorcycleService from '../../../services/MotorcycleService';
import MotorcycleController from '../../../controllers/MotorcycleController';
import {
  motorcycleMock,
  motorcycleMockWithId,
  motorcycleMockForUpdate,
  motorcycleMockWithIdUpdated,
} from '../../mocks/motorcycleMock';

describe('Motorcycle Controller', () => {
  const motorcycleModel = new MotorcycleModel();
  const motorcycleService = new MotorcycleService(motorcycleModel);
  const motorcycleController = new MotorcycleController(motorcycleService);

  const req = {} as Request;
  const res = {} as Response;

  before(() => {
    sinon.stub(motorcycleService, 'create').resolves(motorcycleMockWithId);
    sinon.stub(motorcycleService, 'readOne').resolves(motorcycleMockWithId);
    sinon.stub(motorcycleService, 'read').resolves([motorcycleMockWithId]);
    sinon.stub(motorcycleService, 'delete').resolves(motorcycleMockWithId);
    sinon
      .stub(motorcycleService, 'update')
      .resolves(motorcycleMockWithIdUpdated);

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  after(() => sinon.restore());

  describe('Create Motorcycle', () => {
    it('Success', async () => {
      req.body = motorcycleMock;
      await motorcycleController.create(req, res);
      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(motorcycleMockWithId)).to
        .be.true;
    });
  });

  describe('ReadOne Motorcycle', () => {
    it('Success', async () => {
      req.params = { id: motorcycleMockWithId._id };
      await motorcycleController.readOne(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(motorcycleMockWithId)).to
        .be.true;
    });
  });

  describe('Read Motorcycles', () => {
    it('Success', async () => {
      await motorcycleController.read(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith([motorcycleMockWithId]))
        .to.be.true;
    });
  });

  describe('Delete Motorcycle', () => {
    it('Success', async () => {
      req.params = { id: motorcycleMockWithId._id };
      await motorcycleController.delete(req, res);

      expect((res.status as sinon.SinonStub).calledWith(204)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(motorcycleMockWithId)).to
        .be.true;
    });
  });

  describe('Update Motorcycle', () => {
    it('Success', async () => {
      req.params = { id: motorcycleMockWithId._id };
      req.body = { ...motorcycleMockForUpdate };
      await motorcycleController.update(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect(
        (res.json as sinon.SinonStub).calledWith(motorcycleMockWithIdUpdated)
      ).to.be.true;
    });
  });
});
