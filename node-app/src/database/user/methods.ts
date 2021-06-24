import { Document } from "mongoose";
import { IDocument } from "./types";

export async function setUpdatedAt(this: IDocument): Promise<void> {
    const now = new Date();
    if (!this.updatedAt || this.updatedAt < now) {
        this.updatedAt = now;
        await this.save();
    }
}

export async function sameLastName(this: IDocument): Promise<Document[]> {
    return this.model("user").find({ lastName: this.lastName });
}