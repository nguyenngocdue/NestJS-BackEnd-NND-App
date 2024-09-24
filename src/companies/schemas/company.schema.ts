import { Prop } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

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

    @Prop()
    createdBy: {
        _id: string,
        email: string
    }
    
    @Prop()
    updatedBy: {
        _id: string,
        email: string
    }

    @Prop()
    deletedBy: {
        _id: string,
        email: string
    }

}
