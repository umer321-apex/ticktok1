import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Button, TextField, Typography, Card, CardContent, CircularProgress } from '@mui/material';
import api from "../services/api";
import { useNavigate } from 'react-router-dom';
const UploadPage = () => {
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  // const location = useLocation();
  const userId =localStorage.getItem("authToken");
 
  console.log('user id',userId);
  const handleFileChange = (e) => {
    setVideo(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!video) {
      alert('Please select a video file.');
      return;
    }

    const formData = new FormData();
    formData.append('video', video);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('userId', userId); // Include userId

    setLoading(true);

    try {
      const response = await api.post('/videos/upload', formData);
      alert('Video uploaded successfully!');
      console.log('Response:', response.data);
      setTitle('');
      setDescription('');
      setVideo(null);
      navigate('/');
    } catch (err) {
      console.error('Error:', err);
      const errorMessage = err.response?.data?.error || 'Create Account to upload,like and comment the Video';
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  const handleNavigation = () => {
    navigate('/');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#000',
      }}
    >
      <Card sx={{ maxWidth: 500, width: '100%', backgroundColor: '#1c1c1c', color: '#fff' }}>
        <CardContent>
          <Typography variant="h5" sx={{ color: '#ff0050', textAlign: 'center', marginBottom: '20px' }}>
            Upload Video
          </Typography>
          <form onSubmit={handleSubmit}>
            <input
              type="file"
              accept="video/*"
              onChange={handleFileChange}
              required
              style={{ margin: '10px 0', color: '#fff' }}
            />
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              sx={{ marginBottom: '10px', backgroundColor: '#333' }}
              InputLabelProps={{ style: { color: '#fff' } }}
              inputProps={{ style: { color: '#fff' } }}
            />
            <TextField
              label="Description"
              variant="outlined"
              multiline
              rows={3}
              fullWidth
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              sx={{ marginBottom: '10px', backgroundColor: '#333' }}
              InputLabelProps={{ style: { color: '#fff' } }}
              inputProps={{ style: { color: '#fff' } }}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{
                backgroundColor: loading ? '#555' : '#ff0050',
                color: '#fff',
                '&:hover': { backgroundColor: loading ? '#555' : '#d60046' },
              }}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: '#fff' }} />
              ) : (
                'Upload'
              )}
            </Button>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              
              disabled={loading}
              onClick={handleNavigation}
              sx={{
                mt:2,
                backgroundColor: loading ? '#555' : '#ff0050',
                color: '#fff',
                '&:hover': { backgroundColor: loading ? '#555' : '#d60046' },
              }}
            >
             
                Watch reels
              
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UploadPage;
