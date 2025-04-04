import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AddParkingSpot = () => {
  const [location, setLocation] = useState('');
  const [spotName, setSpotName] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('New parking spot added:', { location, spotName, price });
  };

  // Dummy data for existing locations (replace with your actual data)
  const existingLocations = ['Location 1', 'Location 2', 'Location 3'];

  return (
    <div className="container">
      <h2>Add New Parking Spot</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Location:</label>
          <select value={location} onChange={(e) => setLocation(e.target.value)} required>
            <option value="">Select Location</option>
            {existingLocations.map((loc, index) => (
              <option key={index} value={loc}>{loc}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Parking Spot Name:</label>
          <input type="text" value={spotName} onChange={(e) => setSpotName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Price:</label>
          <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>
        <button type="submit">Add Parking Spot</button>
      </form>
      <Link to="/admin">Back to Dashboard</Link>
    </div>
  );
};

export default AddParkingSpot;
