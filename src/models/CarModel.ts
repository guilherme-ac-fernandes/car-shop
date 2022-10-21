import { model as mongooseCreateModel, Schema } from 'mongoose';
import { ICar } from '../interfaces/ICar';
import MongoModel from './MongoModel';

// A remoção do campo "__v": 0 pode ser removida com o versionKey: false, solução proposta
// pelo colega de turma Rafael Moraes (Turma 20 B)
const carMongooseSchema = new Schema<ICar>(
  {
    model: String,
    year: Number,
    color: String,
    status: { type: Boolean, required: false },
    buyValue: Number,
    doorsQty: Number,
    seatsQty: Number,
  },
  { versionKey: false },
);

export default class CarModel extends MongoModel<ICar> {
  constructor(model = mongooseCreateModel('Car', carMongooseSchema)) {
    super(model);
  }
}
