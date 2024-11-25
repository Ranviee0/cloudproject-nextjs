'use client';

import { useState, useEffect } from 'react';

import axios from 'axios';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const api = axios.create({
  baseURL: apiUrl // Replace with your FastAPI backend URL
});

interface ProcessedImagesProps {
  username: string; // The username to filter the images by
}

const ProcessedImages = ({ username }: ProcessedImagesProps) => {
  const [images, setImages] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        // Use the new endpoint
        const response = await api.get('/read/images/${username}');
        setImages(response.data);
      } catch (err: any) {
        setError(err.response?.data?.detail || 'Error fetching images');
      }
    };

    if (username) {
      fetchImages();
    }
  }, [username]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {images.map((base64Image, index) => (
          <img
            key={index}
            src={`data:image/jpeg;base64,${base64Image}`}
            alt={`Processed Image ${index + 1}`}
            style={{ width: '200px', height: '200px', objectFit: 'cover' }}
          />
        ))}
      </div>
    </div>
  );
};

export default ProcessedImages;
