import { IDocument, IModel } from "./types"

export async function findOneOrCreate(
    this: IModel,
    userId: string
): Promise<IDocument> {
    const record = await this.findOne({ userId });
    if (record) return record
    else return this.create({ userId })
}

export async function findByAge(
    this: IModel,
    min?: number,
    max?: number
): Promise<IDocument[]> {
    return this.find({ age: { $gte: min || 0, $lte: max || Infinity } });
}