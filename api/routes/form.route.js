import express from 'express'
import {createForm} from '../controller/form.controller.js'
import {verifyToken} from '../utils/verifyToken.js'
const router = express.Router()

router.post('/create' , verifyToken , createForm);

export default router;