import express from 'express'
import {createForm, getAllDetails , categoryWiseExpenseTotal} from '../controller/form.controller.js'
import {verifyToken} from '../utils/verifyToken.js'
const router = express.Router()

router.post('/create' , verifyToken , createForm);
router.post("/allDetails", verifyToken, getAllDetails);
router.post('/categoryWiseExpenseTotal' , verifyToken , categoryWiseExpenseTotal);

export default router;