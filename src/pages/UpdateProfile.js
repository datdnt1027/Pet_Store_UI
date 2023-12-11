import React, { useState } from 'react';
import '../components/css/UserProfile.css';

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

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    setEditMode(false);
  };

  return (
    <div className='page-container'>
      <div className="profile-container">
        <div className="profile-details">
        <div className="profile-avatar-container">
            {/* Render your avatar component here */}
            <img
              className="profile-avatar"
              src={profile.avatar}
              alt="Avatar"
            />
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
            <label className="profile-label">Date of Birth:</label>
            {editMode ? (
              <input
                type="text"
                value={profile.dob}
                onChange={(e) => {
                  const updatedProfile = { ...profile };
                  updatedProfile.dob = e.target.value;
                  setProfile(updatedProfile);
                }}
                style={{ width: '500px' }}
              />
            ) : (
              <span className="profile-value">{profile.dob}</span>
            )}
          </div>
          <div className="profile-field">
            <label className="profile-label">Contact:</label>
            {editMode ? (
              <input
                type="text"
                value={profile.contact}
                onChange={(e) => {
                  const updatedProfile = { ...profile };
                  updatedProfile.contact = e.target.value;
                  setProfile(updatedProfile);
                }}
                style={{ width: '500px' }}
              />
            ) : (
              <span className="profile-value">{profile.contact}</span>
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
    </div>
  );
}

export default Profile;