import React, { useState } from 'react';
import axios from 'axios';

function ApplyPage() {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    txtemail: '',
    phoneno: '',
    address: '',
    exisbusiness: 'No',
    siteloc: '',
    city: '',
    pincode: '',
    area: '',
    floor: '',
    ownership: 'Owned',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    // alert("fwrfeffw"); Correct
    e.preventDefault();
    setMessage('');
    // alert("fwrfeffw");
    try {
      // alert("fwrfeffw");
      const response = await axios.post('/api/applicant/saveFranApp', formData);
      // alert("fwrfeffw");
      if (response.data.status) {
        setMessage('Application submitted successfully!');
      } else {
        setMessage('Failed to submit application. Please try again.');
      }
    } catch (error) {
      console.error('Submission Error:', error);
      setMessage('An error occurred during submission.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Franchise Application Form
        </h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input type="text" name="fname" value={formData.fname} onChange={handleChange} placeholder="First Name" required className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
          <input type="text" name="lname" value={formData.lname} onChange={handleChange} placeholder="Last Name" required className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
          <input type="email" name="txtemail" value={formData.txtemail} onChange={handleChange} placeholder="Email Address" required className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
          <input type="tel" name="phoneno" value={formData.phoneno} onChange={handleChange} placeholder="Phone Number" required className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
          <textarea name="address" value={formData.address} onChange={handleChange} placeholder="Full Address" required className="md:col-span-2 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"></textarea>
          <div className="md:col-span-2 text-center">
            <button type="submit" className="w-full md:w-auto bg-blue-600 text-white font-bold py-3 px-8 rounded-md hover:bg-blue-700 transition duration-300">
              Submit Application
            </button>
          </div>
        </form>
        {message && <p className="mt-6 text-center text-lg font-medium text-green-600">{message}</p>}
      </div>
    </div>
  );
}

export default ApplyPage;