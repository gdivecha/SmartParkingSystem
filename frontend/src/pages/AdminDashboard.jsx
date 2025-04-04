import React, { useState } from 'react';
import {
  Container, Box, Typography, Button,
  TableContainer, Table, TableHead, TableRow,
  TableCell, TableBody, Paper
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddLocation from './AddLocation';
import AddParkingSpot from './AddParkingSpot';

const reservedParkingSpaces = [
  { id: 1, location: 'Location 1', space: 'Parking Space 1', reservedBy: 'admin@example.com' },
  { id: 2, location: 'Location 2', space: 'Parking Space 3', reservedBy: 'admin@example.com' },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [openLocationModal, setOpenLocationModal] = useState(false);
  const [openSpotModal, setOpenSpotModal] = useState(false);
  const [locations, setLocations] = useState(['Location 1', 'Location 2', 'Location 3']);
  const [parkingSpots, setParkingSpots] = useState([]);

  const handleSignOut = () => {
    navigate('/');
  };

  const handleAddLocation = (newLoc) => {
    if (!locations.includes(newLoc)) {
      setLocations([...locations, newLoc]);
    }
  };

  const handleAddParkingSpot = (spot) => {
    setParkingSpots([...parkingSpots, spot]);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 6, mb: 8 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4">Admin Dashboard</Typography>
        <Button variant="outlined" color="error" onClick={handleSignOut}>Sign Out</Button>
      </Box>

      <Box display="flex" gap={2} mb={4}>
        <Button variant="contained" onClick={() => setOpenLocationModal(true)}>
          Add New Location
        </Button>
        <Button variant="contained" onClick={() => setOpenSpotModal(true)}>
          Add New Parking Spot
        </Button>
      </Box>

      <Typography variant="h5" gutterBottom>Reserved Parking Spaces</Typography>

      {reservedParkingSpaces.length > 0 ? (
        <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Location</strong></TableCell>
                <TableCell><strong>Parking Space</strong></TableCell>
                <TableCell><strong>Reserved By</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reservedParkingSpaces.map((reservation) => (
                <TableRow key={reservation.id}>
                  <TableCell>{reservation.location}</TableCell>
                  <TableCell>{reservation.space}</TableCell>
                  <TableCell>{reservation.reservedBy}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography>No reserved spaces.</Typography>
      )}

      <AddLocation open={openLocationModal} onClose={() => setOpenLocationModal(false)} onAdd={handleAddLocation} />
      <AddParkingSpot open={openSpotModal} onClose={() => setOpenSpotModal(false)} onAdd={handleAddParkingSpot} locations={locations} />
    </Container>
  );
};

export default AdminDashboard;
