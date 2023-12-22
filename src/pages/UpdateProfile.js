import React, { useState, useEffect } from 'react';
import '../components/css/UserProfile.css';
import axios from 'axios';
import apiConfig from '../config/apiConfig';
import {useToast,Center, Input, Button, Table, Thead, Tbody, Tr, Th, Td, Image, Box, HStack } from "@chakra-ui/react";

function Profile() {
  const toast = useToast();
  const genderOptions = [
    {
      label: 'Male',
      value: "1"
    },
    {  
      label: 'Female',
      value: "2"
    }
  ]
  const sampleProfile = {
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane@example.com',
    dob: '1990-01-01',
    contact: '+1-234-567-8910',
    address: '123 Main St, Boston MA 02110',
  };
  const [profile, setProfile] = useState();
  const [editMode, setEditMode] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [avatar, setAvatar] = useState();

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = async () => {
    const authTokenString = localStorage.getItem('user'); // Retrieve the token from localStorage
    const authToken = JSON.parse(authTokenString).token;
    
    const uava= removeBase64PrefixW(avatar)
    console.log("save Run"+uava);
    const updatedProfile = {
      ...profile,
      avatar: uava,
    };
    console.log(updatedProfile);
    try {
      await axios.patch(apiConfig.USER_PROFILE_UPDATE, updatedProfile, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });
      alert('Thành công');
      setEditMode(false);
    } catch (error) {
      let message = `Error ${error.response.status}: ${error.response.data.message}`;

          if(error.response.status === 403) {
            message = `Xin lỗi tài khoản này không có quyền.`; 
          }
          if(error.response.status === 401) {
            message = `Vui lòng đăng nhập lại.`; 
          }
          if(error.response.status === 409) {
            message = `Thông tin bị trùng.`; 
          }
          toast({
            title: 'Error',
            description: message,
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
    }
    
  };
  const handleAvatarButtonClick = () => {
    document.getElementById('avatar-input').click();
  };
  function removeBase64PrefixW(base64Image) {
    // Split the base64 string at the comma
    const parts = base64Image.split(',');
  
    // Take the second part of the split result and remove leading/trailing spaces
    const imageWithoutPrefix = parts[1].trim();
  
    return imageWithoutPrefix;
  }
  function removeBase64Prefix(base64Image) {
    // Split the base64 string at the comma
    const parts = base64Image.split(',');
  
    // Take the second part of the split result and remove leading/trailing spaces
    const imageWithoutPrefix = parts[1].trim();
  
    return imageWithoutPrefix;
  }


  const handleFileInputChange = async (event) => {
    const authTokenString = localStorage.getItem('user'); // Retrieve the token from localStorage
    const authToken = JSON.parse(authTokenString).token;
  
    var file = event.target.files[0];
  
    const reader = new FileReader();
  
    reader.onloadend = async () => {
      setAvatar(reader.result);
      console.log("Avatar state:", reader.result);
  
      var updatedAvatar = removeBase64Prefix(reader.result);
      console.log("Pre" + updatedAvatar);
  
      var updatedProfile = JSON.stringify({
        avatar: updatedAvatar
      });
      console.log("after" + updatedProfile);
  
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json'
          },
        };
  
        const response = await axios.patch(apiConfig.USER_PROFILE_UPDATE, updatedProfile, config);
        alert('Thành công');
        setEditMode(false);
      } catch (error) {
        let message = `Error ${error.response.status}: ${error.response.data.message}`;

          if(error.response.status === 403) {
            message = `Xin lỗi tài khoản này không có quyền.`; 
          }
          if(error.response.status === 401) {
            message = `Vui lòng đăng nhập lại.`; 
          }
          if(error.response.status === 409) {
            message = `Thông tin bị trùng.`; 
          }
          toast({
            title: 'Error',
            description: message,
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
      }
    };
  
    reader.readAsDataURL(file);
  };
  const handleSexChange = (e) => {
    setProfile({...profile, sex: e.target.value});
  }
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
        setAvatar(response.data.avatar);
      } catch (error) {
        let message = `Error ${error.response.status}: ${error.response.data.message}`;

          if(error.response.status === 403) {
            message = `Xin lỗi tài khoản này không có quyền.`; 
          }
          if(error.response.status === 401) {
            message = `Vui lòng đăng nhập lại.`; 
          }
          if(error.response.status === 409) {
            message = `Thông tin bị trùng.`; 
          }
          toast({
            title: 'Error',
            description: message,
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
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
            <label className="profile-label">Giới tính:</label>
            {editMode ? (
    <select
      value={profile.sex} 
      onChange={handleSexChange}
    >
      {genderOptions.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}   
        </option>  
      ))}
    </select>
  ) : (
    <span>
      {profile.sex === "1" ? 'Male' : 'Female'}
    </span>
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