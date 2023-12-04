import React, { useState } from 'react';
import '../components/css/UserProfile.css';

function Profile() {
  const sampleProfile = {
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane@email.com',
    dob: '1990-01-01',
    contact: '+1-234-567-8910',
    address: '123 Main St, Boston MA 02110',
    avatar: null,
  };

  const [profile, setProfile] = useState(sampleProfile);
  const [editMode, setEditMode] = useState(false);

  const handleEdit = () => {
    setEditMode(true);
  }

  const handleSave = () => {
    setEditMode(false);
  }

  return (
    <div className="profile-container">
      {editMode ? (
        <>
          <form>
    {Object.entries(profile).map(([key, value]) => (
      <div key={key}>
        <label>{key}</label>
        <input 
          type="text"
          value={value}
          onChange={(e) => {
            // update profile state
          }} 
        />
      </div>
    ))}

    <button type="button" onClick={handleSave}>
      Save
    </button>
  </form>
          <button onClick={handleSave}>Save</button>
        </>  
      ) : (
        <>
          <div className="profile-avatar-container">
        {profile.avatar ? (
          <img className="profile-avatar" src={URL.createObjectURL(profile.avatar)} alt="Avatar" />
        ) : (
          <div className="profile-avatar-placeholder">
            <span>+</span>
          </div>
        )}
      </div>
      <div className="profile-details">
        <div className="profile-field">
          <label className="profile-label">First Name:</label>
          <span className="profile-value">{profile.firstName}</span>
        </div>
        <div className="profile-field">
          <label className="profile-label">Last Name:</label>
          <span className="profile-value">{profile.lastName}</span>
        </div>
        <div className="profile-field">
          <label className="profile-label">Email:</label>
          <span className="profile-value">{profile.email}</span>
        </div>
        <div className="profile-field">
          <label className="profile-label">Date of Birth:</label>
          <span className="profile-value">{profile.dob}</span>
        </div>
        <div className="profile-field">
          <label className="profile-label">Contact:</label>
          <span className="profile-value">{profile.contact}</span>
        </div>
        <div className="profile-field">
          <label className="profile-label">Address:</label>
          <span className="profile-value">{profile.address}</span>
        </div>
      </div>
          
          <button className="edit-button" button onClick={handleEdit}>Edit</button> 
        </>
      )}
      
    </div>
  );
}

export default Profile;