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
  const [avatarFile, setAvatarFile] = useState(null);
  const [profile, setProfile] = useState(sampleProfile);
  const [editMode, setEditMode] = useState(false);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    setEditMode(false);
  };

  return (
    <div className="profile-container">
      {editMode ? (
        <>
          <form className="profile-form">
          <input
              type="file"
              accept="image/*"
              onChange={(e) => setAvatarFile(e.target.files[0])}
            />
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
        </>
      ) : (
        <>
          <div className="profile-avatar-container">
            {/* Render your avatar component here */}
            <img
              className="profile-avatar"
              src={profile.avatar}
              alt="Avatar"
            />
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

          <button className="edit-button" button onClick={handleEdit}>
            Edit
          </button>
        </>
      )}
    </div>
  );
}

export default Profile;