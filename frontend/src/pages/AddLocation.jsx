import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AddLocation = () => {
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Dummy check for existing location (replace with your actual logic)
    if (location === 'Existing Location') {
      setError('Location already exists');
    } else {
      // Perform your submit logic here, e.g., sending a request to add the location
      console.log('New location added:', { location });
      // Redirect the admin to the dashboard or another appropriate page
    }
  };

  return (
    <div className="container">
      <h2>Add New Location</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Location Name:</label>
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
        </div>
        <button type="submit">Add Location</button>
      </form>
      <Link to="/admin">Back to Dashboard</Link>
    </div>
  );
};

export default AddLocation;
