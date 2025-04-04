import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Card,
  CardContent,
  CardActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';

// Dummy parking space data grouped by location
const parkingSpaces = {
  'Location 1': [
    { id: 1, location: 'Location 1', parkingSpace: 'Parking Space 1', price: '$10/hr' },
    { id: 2, location: 'Location 1', parkingSpace: 'Parking Space 2', price: '$15/hr' },
    { id: 3, location: 'Location 1', parkingSpace: 'Parking Space 3', price: '$18/hr' },
    { id: 4, location: 'Location 1', parkingSpace: 'Parking Space 4', price: '$10/hr' },
  ],
  'Location 2': [
    { id: 5, location: 'Location 2', parkingSpace: 'Parking Space 3', price: '$12/hr' },
    { id: 6, location: 'Location 2', parkingSpace: 'Parking Space 4', price: '$20/hr' },
  ],
};

// Card for each parking space
const ParkingSpaceItem = ({ space, reservedSpaces, onReserve }) => {
  const isReserved = reservedSpaces.includes(space.id);
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>{space.parkingSpace}</Typography>
          <Typography variant="body1">Price: {space.price}</Typography>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            fullWidth
            onClick={() => onReserve(space.id)}
            disabled={isReserved}
            color={isReserved ? 'inherit' : 'primary'}
          >
            {isReserved ? 'Reserved' : 'Reserve'}
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

const Dashboard = () => {
  const [reservedSpaces, setReservedSpaces] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('Location 1');
  const navigate = useNavigate();

  const reserveSpace = (id) => {
    if (!reservedSpaces.includes(id)) {
      setReservedSpaces([...reservedSpaces, id]);
    }
  };

  const handleSignOut = () => {
    navigate('/');
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 6, mb: 8 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4">Parking Spaces</Typography>
        <Button variant="outlined" color="error" onClick={handleSignOut}>
          Sign Out
        </Button>
      </Box>

      <FormControl fullWidth sx={{ mb: 4 }}>
        <InputLabel id="location-select-label">Select Location</InputLabel>
        <Select
          labelId="location-select-label"
          value={selectedLocation}
          label="Select Location"
          onChange={(e) => setSelectedLocation(e.target.value)}
        >
          {Object.keys(parkingSpaces).map((location) => (
            <MenuItem key={location} value={location}>
              {location}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Grid container spacing={3}>
        {parkingSpaces[selectedLocation].map((space) => (
          <ParkingSpaceItem
            key={space.id}
            space={space}
            reservedSpaces={reservedSpaces}
            onReserve={reserveSpace}
          />
        ))}
      </Grid>

      <Box mt={6}>
        <Typography variant="h5" gutterBottom>
          Reserved Spaces
        </Typography>

        {reservedSpaces.length > 0 ? (
          <>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
              Total Price:&nbsp;
              {reservedSpaces.reduce((total, id) => {
                const space = Object.values(parkingSpaces).flat().find(s => s.id === id);
                const numeric = parseFloat(space.price.replace('$', '').replace('/hr', ''));
                return total + numeric;
              }, 0).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}/hr
            </Typography>

            <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Location</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Parking Space</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Price</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {reservedSpaces
                    .map((id) => Object.values(parkingSpaces).flat().find(s => s.id === id))
                    .sort((a, b) => {
                      const locCompare = a.location.localeCompare(b.location);
                      if (locCompare !== 0) return locCompare;
                      return a.parkingSpace.localeCompare(b.parkingSpace);
                    })
                    .map((space) => (
                      <TableRow key={space.id}>
                        <TableCell>{space.location}</TableCell>
                        <TableCell>{space.parkingSpace}</TableCell>
                        <TableCell>{space.price}</TableCell>
                        <TableCell>
                          <Button
                            variant="outlined"
                            color="error"
                            size="small"
                            onClick={() =>
                              setReservedSpaces((prev) =>
                                prev.filter((spaceId) => spaceId !== space.id)
                              )
                            }
                          >
                            Cancel
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        ) : (
          <Typography variant="body1" color="text.secondary" mt={2}>
            No spaces reserved yet.
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default Dashboard;