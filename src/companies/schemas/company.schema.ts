import { Prop } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type  companyDocument = HydratedDocument<Company>;

export class Company {
    @Prop()
    name: string;

    @Prop()
    address: string;

    @Prop()
    description: string;

    @Prop()
    createdAt: Date

    @Prop()
    updatedAt: Date

    @Prop()
    isDeleted: boolean

    @Prop({type : Object})
    createdBy: {
        _id: mongoose.Schema.Types.ObjectId,
        email: string
    }
    
    @Prop({type: Object})
    updatedBy: {
        _id: mongoose.Schema.Types.ObjectId,
        email: string
    }

    @Prop({type: Object})
    deletedBy: {
        _id: mongoose.Schema.Types.ObjectId,
        email: string
    }

}
