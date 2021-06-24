import { Document, Model } from "mongoose";

export interface IEntity {
    firstName: string;
    middleNames: string;
    lastName: string;
    age: number;
    createdAt?: Date;
    updatedAt?: Date;
}
  
export interface IDocument extends IEntity, Document {
    
    setLastUpdated: (this: IDocument) => Promise<void>

    sameLastName: (this: IDocument) => Promise<Document[]>

}

export interface IModel extends Model<IDocument> {

    findOneOrCreate: (
        this: IModel,
        {
            firstName,
            lastName,
            age,
        }: { firstName: string; lastName: string; age: number }
    ) => Promise<IDocument>;

    findByAge: (
        this: IModel,
        min?: number,
        max?: number
    ) => Promise<IDocument[]>;

}