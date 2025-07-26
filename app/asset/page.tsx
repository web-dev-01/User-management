'use client';
import { useEffect, useState } from 'react';
import {
  Button, Dialog, DialogTitle, DialogContent, DialogActions,
  Card, CardContent, Typography, Stack, Divider, Grid, TextField, MenuItem
} from '@mui/material';

type Asset = {
  id: string;
  name: string;
  type: string;
  status: 'Active' | 'Inactive' | 'Maintenance';
  createdAt: string;
};

export default function AssetsPage() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [filteredAssets, setFilteredAssets] = useState<Asset[]>([]);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [editData, setEditData] = useState<Asset | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    fetch('/api/assets')
      .then(res => res.json())
      .then(data => {
        setAssets(data);
        setFilteredAssets(data);
      });
  }, []);

  useEffect(() => {
    let updated = [...assets];

    if (searchTerm) {
      updated = updated.filter(asset =>
        asset.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterStatus) {
      updated = updated.filter(asset => asset.status === filterStatus);
    }

    if (sortBy === 'name') {
      updated.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'status') {
      updated.sort((a, b) => a.status.localeCompare(b.status));
    }

    setFilteredAssets(updated);
  }, [searchTerm, filterStatus, sortBy, assets]);

  const handleView = (id: string) => {
    const asset = assets.find(a => a.id === id);
    if (asset) {
      setSelectedAsset(asset);
      setIsViewOpen(true);
    }
  };

  const handleEdit = (id: string) => {
    const asset = assets.find(a => a.id === id);
    if (asset) {
      setEditData(asset);
      setIsEditOpen(true);
    }
  };

  const handleDelete = (id: string) => {
    const asset = assets.find(a => a.id === id);
    if (asset) {
      setSelectedAsset(asset);
      setIsDeleteOpen(true);
    }
  };

  const confirmDelete = () => {
    if (selectedAsset) {
      setAssets(prev => prev.filter(a => a.id !== selectedAsset.id));
      setIsDeleteOpen(false);
    }
  };

  return (
    <div style={{ padding: 32 }}>
      <Typography variant="h4" fontWeight={600} gutterBottom>Assets</Typography>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={3}>
        <TextField
          label="Search by Name"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <TextField
          label="Filter by Status"
          select
          fullWidth
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="Inactive">Inactive</MenuItem>
          <MenuItem value="Maintenance">Maintenance</MenuItem>
        </TextField>
        <TextField
          label="Sort by"
          select
          fullWidth
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <MenuItem value="">None</MenuItem>
          <MenuItem value="name">Name</MenuItem>
          <MenuItem value="status">Status</MenuItem>
        </TextField>
      </Stack>

      <Grid container spacing={3}>
        {filteredAssets.map((asset) => (
          <Grid item xs={12} sm={6} md={4} key={asset.id}>
            <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h6">{asset.name}</Typography>
                <Typography variant="body2" color="text.secondary">Type: {asset.type}</Typography>
                <Typography variant="body2" color="text.secondary">Status: {asset.status}</Typography>
                <Typography variant="caption" color="text.secondary">Created At: {asset.createdAt}</Typography>
                <Divider sx={{ my: 1 }} />
                <Stack direction="row" spacing={1}>
                  <Button variant="outlined" size="small" onClick={() => handleView(asset.id)}>View</Button>
                  <Button variant="contained" size="small" onClick={() => handleEdit(asset.id)}>Edit</Button>
                  <Button variant="text" color="error" size="small" onClick={() => handleDelete(asset.id)}>Delete</Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* View Modal */}
      <Dialog open={isViewOpen} onClose={() => setIsViewOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>View Asset</DialogTitle>
        <Divider />
        <DialogContent dividers>
          <Typography variant="body1"><b>Name:</b> {selectedAsset?.name}</Typography>
          <Typography variant="body1"><b>Type:</b> {selectedAsset?.type}</Typography>
          <Typography variant="body1"><b>Status:</b> {selectedAsset?.status}</Typography>
          <Typography variant="body1"><b>Created At:</b> {selectedAsset?.createdAt}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsViewOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={isEditOpen} onClose={() => setIsEditOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Asset</DialogTitle>
        <Divider />
        <DialogContent dividers>
          <Stack spacing={2}>
            <TextField
              label="Name"
              value={editData?.name || ''}
              onChange={(e) => setEditData(prev => ({ ...prev!, name: e.target.value }))}
              fullWidth
            />
            <TextField
              label="Type"
              value={editData?.type || ''}
              onChange={(e) => setEditData(prev => ({ ...prev!, type: e.target.value }))}
              fullWidth
            />
            <TextField
              label="Status"
              select
              value={editData?.status || ''}
              onChange={(e) => setEditData(prev => ({ ...prev!, status: e.target.value as any }))}
              fullWidth
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
              <MenuItem value="Maintenance">Maintenance</MenuItem>
            </TextField>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditOpen(false)} variant="outlined">Cancel</Button>
          <Button
            variant="contained"
            onClick={() => {
              if (editData) {
                setAssets(prev => prev.map(a => (a.id === editData.id ? editData : a)));
                setIsEditOpen(false);
              }
            }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} maxWidth="xs">
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent dividers>
          Are you sure you want to delete <b>{selectedAsset?.name}</b>?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteOpen(false)}>Cancel</Button>
          <Button onClick={confirmDelete} variant="contained" color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
