import { expect } from 'chai';
import * as sinon from 'sinon';
import { Request, Response } from 'express';
import CarsModel from '../../../models/CarModel';
import CarsService from '../../../services/CarService';
import CarsController from '../../../controllers/CarController';
import {
  carsMock,
  carsMockWithId,
  carsMockForUpdate,
  carsMockWithIdUpdated,
	carsMockForUpdateWrong,
} from '../../mocks/carsMock';


describe('Car Controller', () => {
  const carModel = new CarsModel()
  const carService = new CarsService(carModel);
  const carController = new CarsController(carService);
  
  const req = {} as Request; 
  const res = {} as Response;

  before(() => {
    sinon.stub(carService, 'create').resolves(carsMockWithId);
    sinon.stub(carService, 'readOne').resolves(carsMockWithId);
    sinon.stub(carService, 'read').resolves([carsMockWithId]);
    sinon.stub(carService, 'delete').resolves(carsMockWithId);
    sinon.stub(carService, 'update').resolves(carsMockWithId);

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  after(() => sinon.restore());

  describe('Create Car', () => {
    it('Success', async () => {
      req.body = carsMock;
      await carController.create(req, res);
      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carsMockWithId)).to.be.true;
    });
  });

  describe('ReadOne Car', () => {
    it('Success', async () => {
      req.params = { id: carsMockWithId._id };
      await carController.readOne(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carsMockWithId)).to.be.true;
    });
  });

  describe('Read Cars', () => {
    it('Success', async () => {
      await carController.read(req, res);
      
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith([carsMockWithId])).to.be.true;
    });
  });

  describe('Delete Car', () => {
    it('Success', async () => {
      req.params = { id: carsMockWithId._id };
      await carController.delete(req, res);
      
      expect((res.status as sinon.SinonStub).calledWith(204)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carsMockWithId)).to.be.true;
    });
  });

  describe('Update Car', () => {
    it('Success', async () => {
      req.params = { id: carsMockWithId._id };
      req.body = { ...carsMockForUpdate };
      await carController.update(req, res);
      
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carsMockWithIdUpdated)).to.be.true;
    });
  });
});