import { IService } from '../interfaces/IService';
import { CarZodSchema, ICar } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import { ErrorTypes } from '../errors/catalog';

class CarService implements IService<ICar> {
  private _frame:IModel<ICar>;

  constructor(model:IModel<ICar>) {
    this._frame = model;
  }

  public async create(obj:unknown):Promise<ICar> {
    const parsed = CarZodSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }
    return this._frame.create(parsed.data);
  }

  public async read():Promise<ICar[]> {
    const frames = await this._frame.read();
    if (!frames) throw new Error(ErrorTypes.EntityNotFound);
    return frames;
  }

  public async readOne(_id:string):Promise<ICar> {
    const frame = await this._frame.readOne(_id);
    if (!frame) throw new Error(ErrorTypes.EntityNotFound);
    return frame;
  }

  public async update(_id:string, obj: unknown):Promise<ICar> {
    const parsed = CarZodSchema.safeParse(obj);
    if (!parsed.success) throw parsed.error;    
    const frameUpdate = await this._frame.update(_id, parsed.data);
    if (!frameUpdate) throw new Error(ErrorTypes.EntityNotFound);
    return frameUpdate;
  }

  public async delete(_id:string):Promise<ICar> {
    const frame = await this._frame.delete(_id);
    if (!frame) throw new Error(ErrorTypes.EntityNotFound);
    return frame;
  }
}

export default CarService;
