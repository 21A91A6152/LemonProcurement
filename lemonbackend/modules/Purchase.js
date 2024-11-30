import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Purchaseschema = new Schema({
    farmerName: {
        type: String,
        required: true,
    },
    qty: {
        type: String,
        required: true,
    },
    costPrice: {
        type: String,
        required: true,
    },
    TotalAmount: {
        type: String,
        required: true,
    },
    date: {
        type: String, // Change to String to store "YYYY-MM-DD"
        required: true,
    },
    product: {
        type: String,
        required: true,
    },
    admin: {
        type: String,
        required: true,
    },
});

// Pre-save hook to format date
Purchaseschema.pre("save", function (next) {
    if (this.date) {
        const dateObj = new Date(this.date);
        // Format to "YYYY-MM-DD"
        this.date = dateObj.toISOString().split("T")[0];
    }
    next();
});

export default mongoose.model("purchasedata", Purchaseschema);
