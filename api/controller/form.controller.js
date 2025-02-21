import Form from "../model/form.model.js";
import { errorHandler } from "../utils/errorHandler.js"; // Ensure you have this utility for error handling

export const createForm = async (req, res, next) => {
  const { amount, category, description, date, tracker } = req.body;

  // Validate required fields
  if (
    !amount ||
    amount.trim() === "" ||
    !category ||
    category.trim() === "" ||
    !description ||
    description.trim() === "" ||
    !date
  ) {
    return next(errorHandler(400, "Please fill all the required fields"));
  }

  // Validate date
  const expenseDate = new Date(date);
  if (isNaN(expenseDate.getTime())) {
    return next(errorHandler(400, "Invalid date"));
  }

  try {
    // Create the expense entry
    const expenseEntry = { amount, description, date: expenseDate };

    // Initialize the new form object
    const newForm = new Form({
      amount,
      category,
      description,
      date: expenseDate,
      tracker: tracker || false,
    });

    await newForm.save();

    res.status(201).json({ message: "Form submitted successfully", newForm });
  } catch (error) {
    console.error("Error creating form:", error);
    return next(error);
  }
};

export const getAllDetails = async (req, res, next) => {
  const { startDate, endDate } = req.body;

  if (!startDate || !endDate) {
    return next(errorHandler(400, "Please fill all the required fields"));
  }

  try {
    const expenses = await Form.find({
      // mongoDB aggregation pipeline
      date: {
        $gte: startDate, // gte -> get greater than or equal to the start date
        $lte: endDate,
      }, // lte -> get less than or equal to the end date
    }).sort({ date: -1 });

    res.status(200).json(expenses);
  } catch (error) {
    return next(error);
  }
};

export const categoryWiseExpenseTotal = async (req, res, next) => {
  const { startDate, endDate } = req.body;

  if (!startDate || !endDate) {
    return next(errorHandler(400, "Please fill all the required fields"));
  }

  try {
    const expenses = await Form.aggregate([
      {
        $match: {
          date: {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          },
        },
      },
      {
        $group: {
          _id: "$category",
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);

    res.status(200).json(expenses);
  } catch (error) {
    return next(error);
  }
};
