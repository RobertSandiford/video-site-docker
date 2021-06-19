import { model as mongooseModel } from "mongoose";
import { IDocument } from "./types";
import schema from "./schema";

const name = "video"

export const Model = mongooseModel<IDocument>(name, schema);