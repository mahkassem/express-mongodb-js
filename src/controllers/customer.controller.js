import {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer
} from '../models/customer.model.js';
import cache from '../cache.js';

export const getAll = async (req, res) => {
  try {
    // Check if the data is already in the cache
    const data = cache.get('customers');
    if (data) {
      return res.json(data);
    }
    // If not, fetch the data from the database
    const customers = await getCustomers();
    // Store the data in the cache for 5 minutes
    cache.set('customers', customers, 600);
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
    cache.del('customers');
    // Return the newly created customer
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
    // Remove the customers key from the cache
    cache.del('customers');
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await deleteCustomer(id);
    // Remove the customers key from the cache
    cache.del('customers');
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}