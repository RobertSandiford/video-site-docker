import { Document, Model } from "mongoose";

export interface IEntity {
    name: string;
    video: string;
    createdAt?: Date;
    updatedAt?: Date;
}
  
export interface IDocument extends IEntity, Document {}

export interface IModel extends Model<IDocument> {}