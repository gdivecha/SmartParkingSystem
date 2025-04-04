import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent,
  DialogActions, Button, TextField, Snackbar, Alert
} from '@mui/material';

const AddLocation = ({ open, onClose }) => {
  const [newLocation, setNewLocation] = useState('');
  const [error, setError] = useState('');
  const [snackOpen, setSnackOpen] = useState(false);

  const handleAddLocation = () => {
    if (newLocation.trim() === 'Existing Location') {
      setError('Location already exists');
    } else {
      console.log('New location added:', newLocation);
      setNewLocation('');
      setError('');
      setSnackOpen(true);
      onClose();
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Add New Location</DialogTitle>
        <DialogContent>
          <TextField
            label="Location Name"
            value={newLocation}
            onChange={(e) => setNewLocation(e.target.value)}
            fullWidth
            margin="normal"
            required
            error={!!error}
            helperText={error}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="contained" onClick={handleAddLocation}>Add</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackOpen}
        autoHideDuration={3000}
        onClose={() => setSnackOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackOpen(false)} severity="success" sx={{ width: '100%' }}>
          Location added successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddLocation;