"use client";

import './styles.css';
import axios from 'axios';

import React, { useState, useEffect } from "react";
import api from "../../utils/api";

export default function Edit({ username }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    streaming_URL: "",
    email: "",
  });
  const [displayData, setDisplayData] = useState({
    streaming_URL: "",
    email: "",
  });

  const [monitoringStatus, setMonitoringStatus] = useState(1);

  const handleSave = async () => {
    try {
      const response = await api.put(`/update/config/${username}`, formData);
      alert(`Response: ${response.data.message || "Update successful!"}`);
      setIsEditing(false); // Return to the initial state
      setFormData({ streaming_URL: "", email: "" }); // Clear form data
      setDisplayData(formData); // Update the display data
    } catch (error: any) {
      alert(
        `Error: ${
          error.response?.data?.message || "Failed to update configuration"
        }`
      );
    }
  };

  useEffect(() => {
    const fetchConfigData = async () => {
      try {
        const response = await api.get(`/read/config/${username}`);
        if (response.data) {
          setDisplayData({
            streaming_URL: response.data.streaming_URL || "",
            email: response.data.email || "",
          });
        }
      } catch (error) {
        console.error("Error fetching configuration data:", error);
      }
    };

    fetchConfigData();
  }, [username]);

  useEffect(() => {
    // Fetch the initial Monitoring_status on component mount
    const fetchMonitoringStatus = async () => {
      try {
        const response = await api.get(`/read/status/${username}`);
        setMonitoringStatus(response.data.Monitoring_status); // Set the fetched status
      } catch (error: any) {
        alert(
          `Error: ${
            error.response?.data?.message || "Failed to fetch monitoring status"
          }`
        );
      }
    };
    fetchMonitoringStatus(); // Call the function here
  }, [username]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAdhocClick = async (e) => {
    e.preventDefault(); // Prevent default behavior of the event
  
    try {
      // Replace {username} with the actual prop value

      let a = JSON.stringify({username});
      const response = await axios.post(
        'https://w7pp3r8hpd.execute-api.ap-southeast-1.amazonaws.com/adhocStage', JSON.stringify({username})
      );
  
      console.log('Response:', response.data); // Handle the success response
    } catch (error: any) {
      console.error('Error:', error.message); // Handle errors
    }
  };

  const handleMonitoringChange = async (status: number) => {
    try {
      const response = await api.put(
        `/update/status/${username}?status=${status}`
      );
      setMonitoringStatus(status);
      alert(`Monitoring updated: ${status === 1 ? "On" : "Off"}`);
    } catch (error: any) {
      alert(
        `Error: ${
          error.response?.data?.message || "Failed to update monitoring status"
        }`
      );
    }
  };

  const handleEditClick = () => {
    // Populate formData with the current displayData
    setFormData(displayData);
    setIsEditing(true);
  };

  return (
    <div className="container">
      <div className="card">
        <div className="info">
          <p>
            <strong>Streaming URL:</strong> {displayData.streaming_URL}
          </p>
          <p>
            <strong>Email:</strong> {displayData.email}
          </p>
        </div>
        <div className="edit-section">
          {isEditing ? (
            <div className="form">
              <div className="form-group">
                <label>Streaming URL:</label>
                <input
                  type="text"
                  name="streaming_URL"
                  value={formData.streaming_URL}
                  onChange={handleInputChange}
                  placeholder="Enter streaming URL"
                  className="input"
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter email"
                  className="input"
                />
              </div>
              <button onClick={handleSave} className="button save">
                Save
              </button>
            </div>
          ) : (
            <div>
            <button onClick={handleAdhocClick} className="button edit">
              Ad-hoc
            </button>  
            <button onClick={handleEditClick} className="button edit">
              Edit URL and email
            </button>
            </div>
          )}
        </div>
        <div className="monitoring-section">
          <p>Monitoring Status</p>
          <label className="radio-label">
            <input
              type="radio"
              name="monitoring"
              value="1"
              checked={monitoringStatus === 1}
              onChange={() => handleMonitoringChange(1)}
            />
            On
          </label>
          <label className="radio-label">
            <input
              type="radio"
              name="monitoring"
              value="0"
              checked={monitoringStatus === 0}
              onChange={() => handleMonitoringChange(0)}
            />
            Off
          </label>
        </div>
      </div>
    </div>
  );
}
