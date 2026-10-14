import { Router } from "express";
import { createContact } from "../controllers/contact.controller.js";
import { contactValidationRules } from "../validators/contact.validator.js";
import { validate } from "../middlewares/validator.middleware.js";

const router = Router();

router.post("/", contactValidationRules, validate, createContact);

export default router;