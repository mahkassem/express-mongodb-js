import {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer
} from '../models/customer.model.js';

export const getAll = async (req, res) => {
  try {
    const customers = await getCustomers();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await getCustomerById(id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const create = async (req, res) => {
  try {
    const customer = req.body;
    const data = await createCustomer(customer);

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = req.body;
    const data = await updateCustomer(id, customer);

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await deleteCustomer(id);

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}