import mongoose from "mongoose";

const formSchema = mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
      default: 0,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    food: {
      type: [{ amount: Number, date: Date }],
      default: [],
    },
    transport: {
      type: [{ amount: Number, date: Date }],
      default: [],
    },
    leisure: {
      type: [{ amount: Number, date: Date }],
      default: [],
    },
    necessary: {
      type: [{ amount: Number, date: Date }],
      default: [],
    },
    tracker: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Form = mongoose.model("Form", formSchema);
export default Form;