'use client';

import { useState } from 'react';

const AddProfile = () => {
  const [fields, setFields] = useState({
    type: '',
    introduction: '',
    location: {
      street: '',
      city: '',
      state: '',
      zipcode: '',
    },
    employees: '',
    year_in_business: '',
    price: '',
    payment: [],
    company_info: {
      name: '',
      email: '',
      phone: '',
    },
    logo: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes('.')) {
      const [outerKey, innerKey] = name.split('.');

      setFields((prevFields) => ({
        ...prevFields,
        [outerKey]: { ...prevFields[outerKey], [innerKey]: value },
      }));
    } else {
      setFields((prevFields) => ({ ...prevFields, [name]: value }));
    }
  };
  const handlePaymentChange = (e) => {
    const { value, checked } = e.target;

    // Clone the current array

    const updatedPayment = [...fields.payment];

    if (checked) {
      // Add value to the array
      updatedPayment.push(value);
    } else {
      // remove value from array
      const index = updatedPayment.indexOf(value);
      if (index !== -1) {
        updatedPayment.splice(index, 1);
      }
    }
    // Update state with updated array
    setFields((prevFields) => ({
      ...prevFields,
      payment: updatedPayment,
    }));
  };
  const handleImageChange = (e) => {
    const { files } = e.target;

    const updatedImages = [...fields.logo];
    for (const file of files) {
      updatedImages.push(file);
    }

    setFields((prev) => ({ ...prev, logo: updatedImages }));
  };
  return (
    <section className='bg-indigo-50'>
      <div className='container m-auto max-w-2xl py-24'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <form
            action='/api/professionals'
            method='POST'
            encType='multipart/form-data'
          >
            <h2 className='text-3xl text-center font-semibold mb-6'>
              Add Service
            </h2>

            <div className='mb-4'>
              <label
                htmlFor='type'
                className='block text-gray-700 font-bold mb-2'
              >
                Service Type
              </label>
              <select
                id='type'
                name='type'
                className='border rounded w-full py-2 px-3'
                required
                value={fields.type}
                onChange={handleChange}
              >
                <option value='Cleaning Service'>Cleaning Service</option>
                <option value='Electrician'>Electrician</option>
                <option value='Plumbers'>Plumbers</option>
                <option value='Carpenters'>Carpenters</option>
                <option value='Photography & Videography'>
                  Photography & Videography
                </option>
                <option value='Health, Beauty & Fashion'>
                  Health, Beauty & Fashion
                </option>
                <option value='Computing & IT'>Computing & IT</option>
                <option value='Other'>Other</option>
              </select>
            </div>
            {/* <div className='mb-4'>
              <label className='block text-gray-700 font-bold mb-2'>
                Listing Name
              </label>
              <input
                type='text'
                id='name'
                name='name'
                className='border rounded w-full py-2 px-3 mb-2'
                placeholder='eg. Beautiful Apartment In Miami'
                required
              />
            </div> */}
            <div className='mb-4'>
              <label
                htmlFor='introduction'
                className='block text-gray-700 font-bold mb-2'
              >
                Your introduction
              </label>
              <textarea
                id='introducton'
                name='introduction'
                className='border rounded w-full py-2 px-3'
                rows='4'
                placeholder='Add an optional introduction'
                value={fields.introduction}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className='mb-4 bg-indigo-50 p-4'>
              <label className='block text-gray-700 font-bold mb-2'>
                Location
              </label>
              <input
                type='text'
                id='street'
                name='location.street'
                className='border rounded w-full py-2 px-3 mb-2'
                placeholder='Street'
                value={fields.location.street}
                onChange={handleChange}
              />
              <input
                type='text'
                id='city'
                name='location.city'
                className='border rounded w-full py-2 px-3 mb-2'
                placeholder='City'
                required
                value={fields.location.city}
                onChange={handleChange}
              />
              <input
                type='text'
                id='state'
                name='location.state'
                className='border rounded w-full py-2 px-3 mb-2'
                placeholder='State'
                required
                value={fields.location.state}
                onChange={handleChange}
              />
              <input
                type='text'
                id='zipcode'
                name='location.zipcode'
                className='border rounded w-full py-2 px-3 mb-2'
                placeholder='Zipcode'
                value={fields.location.zipcode}
                onChange={handleChange}
              />
            </div>

            <div className='mb-4 flex flex-wrap'>
              <div className='w-full sm:w-1/2 px-2'>
                <label
                  htmlFor='employees'
                  className='block text-gray-700 font-bold mb-2 pt-2'
                >
                  Number of employees
                </label>
                <input
                  type='number'
                  id='employees'
                  name='employees'
                  className='border rounded w-full py-2 px-3 pb-2'
                  required
                  value={fields.employees}
                  onChange={handleChange}
                />
              </div>
              <div className='w-full sm:w-1/2 px-2'>
                <label
                  htmlFor='year_in_business'
                  className='block text-gray-700 font-bold mb-2 pt-2'
                >
                  Year in business
                </label>
                <input
                  type='number'
                  id='year_in_business'
                  name='year_in_business'
                  className='border rounded w-full py-2 px-3 pb-2'
                  required
                  value={fields.year_in_business}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className='mb-4 grid grid-cols-2 gap-4'>
              <div>
                <div className='mb-4 bg-indigo-50 p-4'>
                  <div className='flex flex-col'>
                    <div className='items-center'>
                      <label
                        htmlFor='starting_price'
                        className='text-gray-700 font-bold mr-2 w-full'
                      >
                        Starting price in GH₵
                      </label>
                      <input
                        type='number'
                        id='starting_price'
                        name='price'
                        className='border rounded w-full mt-2 py-2 px-3'
                        value={fields.price}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <label className='block text-gray-700 font-bold mb-2'>
                  Accepted payment
                </label>
                <div className='grid grid-cols-2 md:grid-cols-3 gap-2'>
                  <div>
                    <input
                      type='checkbox'
                      id='payment_cash'
                      name='payment'
                      value='Cash'
                      className='mr-2'
                      checked={fields.payment.includes('Cash')}
                      onChange={handlePaymentChange}
                    />
                    <label htmlFor='payment_cash'>Cash</label>
                  </div>
                </div>
                <div>
                  <input
                    type='checkbox'
                    id='payment_momo'
                    name='payment'
                    value='Mobile Money'
                    className='mr-2'
                    checked={fields.payment.includes('Mobile Money')}
                    onChange={handlePaymentChange}
                  />
                  <label htmlFor='Momo'>Mobile Money</label>
                </div>

                <div>
                  <input
                    type='checkbox'
                    id='payment_cheque'
                    name='payment'
                    value='Cheque'
                    className='mr-2'
                    checked={fields.payment.includes('Cheque')}
                    onChange={handlePaymentChange}
                  />
                  <label htmlFor='payment_cheque'>Cheque</label>
                </div>
                <div>
                  <input
                    type='checkbox'
                    id='payment_bankTransfert'
                    name='payment'
                    value='BankTransfer'
                    className='mr-2'
                    checked={fields.payment.includes('BankTransfer')}
                    onChange={handlePaymentChange}
                  />
                  <label htmlFor='payment_cheque'>Bank Transfer</label>
                </div>
              </div>
            </div>

            <div className='mb-4'>
              <label
                htmlFor='company_name'
                className='block text-gray-700 font-bold mb-2'
              >
                Company Name
              </label>
              <input
                type='text'
                id='company_name'
                name='company_info.name'
                className='border rounded w-full py-2 px-3'
                placeholder='Name'
                value={fields.company_info.name}
                onChange={handleChange}
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='company_email'
                className='block text-gray-700 font-bold mb-2'
              >
                Company Email
              </label>
              <input
                type='email'
                id='company_email'
                name='company_info.email'
                className='border rounded w-full py-2 px-3'
                placeholder='Email address'
                required
                value={fields.company_info.email}
                onChange={handleChange}
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='company_phone'
                className='block text-gray-700 font-bold mb-2'
              >
                Company Phone
              </label>
              <input
                type='tel'
                id='company_phone'
                name='company_info.phone'
                className='border rounded w-full py-2 px-3'
                placeholder='Phone'
                value={fields.company_info.phone}
                onChange={handleChange}
              />
            </div>

            <div className='mb-4'>
              <label
                htmlFor='images'
                className='block text-gray-700 font-bold mb-2'
              >
                Comapny Logo (Select an image )
              </label>
              <input
                type='file'
                id='logo'
                name='logo'
                className='border rounded w-full py-2 px-3'
                accept='image/*'
                onChange={handleImageChange}
              />
            </div>

            <div>
              <button
                className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline'
                type='submit'
              >
                Add Service
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddProfile;
