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
      food: [],
      transport: [],
      leisure: [],
      necessary: [],
      tracker: tracker || false, // Default to false if not provided
    });

    // Update the respective array based on category
    switch (category.toLowerCase()) { // Use lowercase for case-insensitive comparison
      case "food":
        newForm.food.push(expenseEntry);
        break;
      case "transport":
        newForm.transport.push(expenseEntry);
        break;
      case "leisure":
        newForm.leisure.push(expenseEntry);
        break;
      default:
        return next(errorHandler(400, "Invalid category"));
    }

    // Update the necessary or leisure array based on tracker
    if (tracker) {
      newForm.necessary.push(expenseEntry);
    } else {
      newForm.leisure.push(expenseEntry);
    }

    // Save the new form to the database
    await newForm.save();

    // Send success response
    res.status(201).json({ message: "Form submitted successfully", newForm });
  } catch (error) {
    // Handle errors
    return next(error);
  }
};