import db from "../db.js";

const collection = 'customers';

export const getCustomers = async () => {
  const result = await db
    .collection(collection)
    .find()
    .toArray();

  return result;
}

export const getCustomerById = async (id) => {
  const result = await db
    .collection(collection)
    .findOne({ _id: Number(id) });

  return result;
}

export const createCustomer = async (customer) => {
  const {
    _id,
    company,
    last_name,
    first_name,
    job_title,
    business_phone,
    fax_number,
    address,
    city,
    state_province,
    zip_postal_code,
    country_region,
  } = customer;
  const result = await db
    .collection(collection)
    .insertOne({
      _id: Number(_id),
      company,
      last_name,
      first_name,
      job_title,
      business_phone,
      fax_number,
      address,
      city,
      state_province,
      zip_postal_code,
      country_region,
    });

  return result;
}

export const updateCustomer = async (id, customer) => {
  const {
    company,
    last_name,
    first_name,
    job_title,
    business_phone,
    fax_number,
    address,
    city,
    state_province,
    zip_postal_code,
    country_region,
  } = customer;

  const result = await db
    .collection(collection)
    .updateOne(
      { _id: Number(id) },
      {
        $set: {
          company,
          last_name,
          first_name,
          job_title,
          business_phone,
          fax_number,
          address,
          city,
          state_province,
          zip_postal_code,
          country_region,
        }
      }
    );

  return result;
}

export const deleteCustomer = async (id) => {
  const result = await db
    .collection(collection)
    .deleteOne({ _id: Number(id) });

  return result;
}
