import { getCustomerById } from "../models/customer.model.js";

export const validateCreate = async (req, res, next) => {
  const { _id } = req.body;

  const customer = await getCustomerById(_id);

  if (customer) {
    return res.status(400).json({ message: 'Customer already exists' });
  }

  next();
}

export const validateUpdate = async (req, res, next) => {
  const { id } = req.params;

  const customer = await getCustomerById(id);

  if (!customer) {
    return res.status(400).json({ message: `No customer found with customer_id: ${id}` });
  }

  const user = res.locals.user;

  if (user.customer_id !== Number(id)) {
    return res.status(403).json({ message: 'Forbidden! You can not update this user' });
  }

  next();
}