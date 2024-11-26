'use client'

import { useEffect, useState } from "react";
import api from '../utils/api';
import './styles.css';

// Define the type for a single configuration
interface Config {
  username: string;
  Monitoring_status: number;
  streaming_URL: string;
  email: string;
}

export default function Home() {
  const [configs, setConfigs] = useState<Config[]>([]); // Explicitly typing the state

  useEffect(() => {
    // Fetch configs from the API
    async function fetchConfigs() {
      try {
        const response = await api.get<Config[]>('/read/configs'); // Type the API response
        setConfigs(response.data); // Assuming response.data contains an array of configs
      } catch (error) {
        console.error("Error fetching configs:", error);
      }
    }
    fetchConfigs();
  }, []);


  return (
    <>
      <div className="container">
        {configs.length > 0 ? (
          <ul className="list">
            {configs.map((config, index) => (
              <li key={index} className="list-item">
                <p><strong>Username:</strong> {config.username}</p>
                <a href={`/dashboard?user=${config.username}`} className="link">Go to Dashboard</a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="loading">Loading configurations...</p>
        )}
      </div>
    </>
  );
}
