import React, { useState, useEffect } from 'react';
import '../components/css/UserProfile.css';
import axios from 'axios';
import apiConfig from '../config/apiConfig';

function Profile() {
  const sampleProfile = {
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane@example.com',
    dob: '1990-01-01',
    contact: '+1-234-567-8910',
    address: '123 Main St, Boston MA 02110',
  };
  const [profile, setProfile] = useState(sampleProfile);
  const [editMode, setEditMode] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [avatar, setAvatar] = useState(profile.avatar);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = async () => {
    const authTokenString = localStorage.getItem('user'); // Retrieve the token from localStorage
    const authToken = JSON.parse(authTokenString).token;
    console.log(profile);

    try {
      await axios.patch(apiConfig.USER_PROFILE_UPDATE, profile, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });
      alert('Thành công');
      setEditMode(false);
    } catch (error) {
      console.error('Error saving profile data:', error);
    }
    
  };
  const handleAvatarButtonClick = () => {
    document.getElementById('avatar-input').click();
  };
  function removeBase64Prefix(base64Image) {
    // Split the base64 string at the comma
    const parts = base64Image.split(',');
  
    // Take the second part of the split result
    const imageWithoutPrefix = parts[1];
  
    return imageWithoutPrefix;
  }
  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setAvatar(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const authTokenString = localStorage.getItem('user'); // Retrieve the token from localStorage
    const authToken = JSON.parse(authTokenString).token;
    console.log(authToken);
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get(apiConfig.USER_PROFILE, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchData();
  }, []);

  if (!profile) {
    return <div>Loading...</div>;
  }
  return (
    <div className='page-container'>
      <div className="profile-container">
        <div className="profile-details">
        <div className="profile-avatar-container">
            {/* Render your avatar component here */}
            <img
              className="profile-avatar"
              src={avatar}
              alt="Avatar"
            />
              <button
                className="upload-avatar-button"
                onClick={handleAvatarButtonClick}
              >
                Change Avatar
              </button>
          </div>
          <div className="profile-field">
            <label className="profile-label">First Name:</label>
            {editMode ? (
              <input
                type="text"
                value={profile.firstName}
                onChange={(e) => {
                  const updatedProfile = { ...profile };
                  updatedProfile.firstName = e.target.value;
                  setProfile(updatedProfile);
                }}
                style={{ width: '500px' }}
              />
            ) : (
              <span className="profile-value">{profile.firstName}</span>
            )}
          </div>
          <div className="profile-field">
            <label className="profile-label">Last Name:</label>
            {editMode ? (
              <input
                type="text"
                value={profile.lastName}
                onChange={(e) => {
                  const updatedProfile = { ...profile };
                  updatedProfile.lastName = e.target.value;
                  setProfile(updatedProfile);
                }}
                style={{ width: '500px' }}
              />
            ) : (
              <span className="profile-value">{profile.lastName}</span>
            )}
          </div>
          <div className="profile-field">
            <label className="profile-label">Email:</label>
            {editMode ? (
              <input
                type="text"
                value={profile.email}
                onChange={(e) => {
                  const updatedProfile = { ...profile };
                  updatedProfile.email = e.target.value;
                  setProfile(updatedProfile);
                }}
                style={{ width: '500px' }}
              />
            ) : (
              <span className="profile-value">{profile.email}</span>
            )}
          </div>
          <div className="profile-field">
            <label className="profile-label">Giới tính:</label>
            {editMode ? (
              <input
                type="text"
                value={profile.sex}
                onChange={(e) => {
                  const updatedProfile = { ...profile };
                  updatedProfile.sex = e.target.value;
                  setProfile(updatedProfile);
                }}
                style={{ width: '500px' }}
              />
            ) : (
              <span className="profile-value">{profile.sex}</span>
            )}
          </div>
          <div className="profile-field">
            <label className="profile-label">Contact:</label>
            {editMode ? (
              <input
                type="text"
                value={profile.phoneNumber}
                onChange={(e) => {
                  const updatedProfile = { ...profile };
                  updatedProfile.phoneNumber = e.target.value;
                  setProfile(updatedProfile);
                }}
                style={{ width: '500px' }}
              />
            ) : (
              <span className="profile-value">{profile.phoneNumber}</span>
            )}
          </div>
          <div className="profile-field">
            <label className="profile-label">Address:</label>
            {editMode ? (
              <input
                type="text"
                value={profile.address}
                onChange={(e) => {
                  const updatedProfile = { ...profile };
                  updatedProfile.address = e.target.value;
                  setProfile(updatedProfile);
                }}
                style={{ width: '500px' }}
              />
            ) : (
              <span className="profile-value">{profile.address}</span>
            )}
          </div>
        </div>
        {editMode ? (
          <button className="edit-button" onClick={handleSave}>
            Save
          </button>
        ) : (
          <button className="edit-button" onClick={handleEdit}>
            Edit
          </button>
        )}
      </div>
        <input
          id="avatar-input"
          type="file"
          accept="image/*"
          onChange={handleFileInputChange}
          style={{ display: 'none' }}
        />
    </div>
  );
}

export default Profile;