import { model, Schema } from "mongoose";
import { TTransaction } from "./transaction.interface";

const transactionSchema = new Schema<TTransaction>({
    buyerID: {
        type: Schema.ObjectId,
        required: true,
    },
    sellerID: {
        type: Schema.ObjectId,
        required: true,
    },
    itemID: {
        type: Schema.ObjectId,
        required: true,
    },
    status: {
        type: String,
        enum: {
            values: ["pending", "completed"],
            message: '{VALUE} is not a valid status'
        }
    }
},
    {
        timestamps: true,
        versionKey: false
    }
);

export const Transaction = model<TTransaction>("Transaction", transactionSchema)