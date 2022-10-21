import { model as mongooseCreateModel, Schema } from 'mongoose';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import MongoModel from './MongoModel';

// A remoção do campo "__v": 0 pode ser removida com o versionKey: false, solução proposta
// pelo colega de turma Rafael Moraes (Turma 20 B)
const motorcycleMongooseSchema = new Schema<IMotorcycle>(
  {
    model: String,
    year: Number,
    color: String,
    status: { type: Boolean, required: false },
    buyValue: Number,
    category: String,
    engineCapacity: Number,
  },
  { versionKey: false },
);

export default class MotorcycleModel extends MongoModel<IMotorcycle> {
  constructor(
    model = mongooseCreateModel('Motorcycle', motorcycleMongooseSchema),
  ) {
    super(model);
  }
}
