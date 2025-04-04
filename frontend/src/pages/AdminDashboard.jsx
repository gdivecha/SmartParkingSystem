import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Dummy data for reserved parking spaces
const reservedParkingSpaces = [
  { id: 1, location: 'Location 1', space: 'Parking Space 1', reservedBy: 'admin@example.com' },
  { id: 2, location: 'Location 2', space: 'Parking Space 3', reservedBy: 'admin@example.com' },
];

// Component for displaying reserved parking space item
const ReservedSpaceItem = ({ reservation }) => {
  return (
    <div className="reserved-space">
      <p><strong>Location:</strong> {reservation.location}</p>
      <p><strong>Parking Space:</strong> {reservation.space}</p>
      <p><strong>Reserved By:</strong> {reservation.reservedBy}</p>
    </div>
  );
};

// Main Admin Dashboard component
const AdminDashboard = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleAddLocation = () => {
    navigate('/admin/add-location');
  };

  const handleAddParkingSpot = () => {
    navigate('/admin/add-parking-spot');
  };

  return (
    <div className="admin-dashboard">
        <h1>Reserved Parking Spaces</h1>
        <button onClick={handleAddLocation}>Add New Location</button>
        <button onClick={handleAddParkingSpot}>Add New Parking Spot</button>
        <div className="reserved-spaces-list">
            {reservedParkingSpaces.map((reservation) => (
                <ReservedSpaceItem key={reservation.id} reservation={reservation} />
            ))}
        </div>
    </div>
  );
};

export default AdminDashboard;
