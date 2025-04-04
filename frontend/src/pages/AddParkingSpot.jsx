import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';

const AddParkingSpot = ({ open, onClose }) => {
  const [location, setLocation] = useState('');
  const [spotName, setSpotName] = useState('');
  const [price, setPrice] = useState('');

  const existingLocations = ['Location 1', 'Location 2', 'Location 3'];

  const handleSubmit = () => {
    console.log('New parking spot added:', { location, spotName, price });
    setLocation('');
    setSpotName('');
    setPrice('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Parking Spot</DialogTitle>
      <DialogContent>
        <FormControl fullWidth margin="normal" required>
          <InputLabel id="location-select-label">Location</InputLabel>
          <Select
            labelId="location-select-label"
            value={location}
            label="Location"
            onChange={(e) => setLocation(e.target.value)}
          >
            {existingLocations.map((loc, idx) => (
              <MenuItem key={idx} value={loc}>{loc}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Parking Spot Name"
          value={spotName}
          onChange={(e) => setSpotName(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddParkingSpot;