import mongoose from "mongoose";

const recordSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  amount: {
    type: Number,
    required: true
  },

  type: {
    type: String,
    enum: ["income", "expense"]
  },

  category: String,

  notes: String,

  date: Date,

  isDeleted: {
    type: Boolean,
    default: false
  }

}, { timestamps: true });

export default mongoose.model("Record", recordSchema);