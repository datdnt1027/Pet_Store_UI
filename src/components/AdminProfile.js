import React, { useEffect, useState } from 'react';
import axios from 'axios';
import apiConfig from '../config/apiConfig';
import {
  Box,
  Flex,
  Heading,
  Text,
  Image,
  Input,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  useToast,
  Select
} from '@chakra-ui/react';

const AdminProfilePage = () => {
  const [adminData, setAdminData] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [editMode, setEditMode] = useState(false);
  const [editedAdminData, setEditedAdminData] = useState(null);

  function removeBase64Prefix(base64Image) {
    // Split the base64 string at the comma
    const parts = base64Image.split(',');

    // Take the second part of the split result
    const imageWithoutPrefix = parts[1];

    return imageWithoutPrefix;
  }

  const handleAvatarUpload = async () => {
    try {
      const authTokenString = sessionStorage.getItem('admin');
      const authToken = JSON.parse(authTokenString).token;

      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Avatar = removeBase64Prefix(reader.result);
        console.log(reader.result);
        const response = await axios.patch(
          apiConfig.ADMIN_PROFILE_UPDATE,
          { avatar: base64Avatar },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              'Content-Type': 'application/json',
            },
          }
        );

        // Update the adminData state with the new avatar URL
        setAdminData((prevState) => ({
          ...prevState,
          avatar: response.data.avatar,
        }));

        toast({
          title: 'Avatar Uploaded',
          description: 'Your avatar has been successfully uploaded.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      };

      reader.readAsDataURL(selectedAvatar);
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

  useEffect(() => {
    const authTokenString = sessionStorage.getItem('admin');
    const authToken = JSON.parse(authTokenString).token;

    const fetchData = async () => {
      try {
        const response = await axios.get(apiConfig.GET_ADMIN, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setAdminData(response.data);
        if (response.data.avatar) {
          setAvatar(response.data.avatar);
        } else {
          setAvatar('path_to_default_image');
        }
        setEditedAdminData(response.data);
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

  const handleEditProfile = () => {
    setEditMode(true);
  };

  const handleSaveProfile = async () => {
    const authTokenString = sessionStorage.getItem('admin');
    const authToken = JSON.parse(authTokenString).token;
    
    // Create a new object without the avatar field
    const updatedAdminData = { ...editedAdminData };
    delete updatedAdminData.avatar;
    
    try {
      // Make API call to update the profile data
      await axios.patch(apiConfig.ADMIN_PROFILE_UPDATE, updatedAdminData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });
      
      setAdminData(editedAdminData);
      setEditMode(false);
  
      toast({
        title: 'Profile Updated',
        description: 'Your profile has been successfully updated.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
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
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedAdminData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <Box p={4}>
      <Flex direction="column" align="center" maxW="md" mx="auto">
        <Heading mb={4}>Admin Profile</Heading>
        {adminData ? (
          <Box
            borderWidth={1}
            p={4}
            borderRadius="md"
            boxShadow="md"
            bg="white"
            w="100%"
            maxW="500px"
          >
            <Flex direction="column" align="center">
              <Box onClick={onOpen} cursor="pointer">
                {avatar && (
                  <Image
                    src={avatar}
                    alt="Avatar"
                    borderRadius="full"
                    boxSize="150px"
                    mb={4}
                  />
                )}
              </Box>
              <Text fontSize="xl" fontWeight="bold" textAlign="center">
                {adminData.firstName} {adminData.lastName}
              </Text>
              {editMode ? (
                <>
                  <Box mt={2}>
                    <Text fontWeight="bold">Email:</Text>
                    <Input
                      name="email"
                      value={editedAdminData.email}
                      isDisabled={editMode}
                      //onChange={handleInputChange}
                    />
                  </Box>
                  <Box mt={2}>
                    <Text fontWeight="bold">Address:</Text>
                    <Input
                      name="address"
                      value={editedAdminData.address}
                      onChange={handleInputChange}
                    />
                  </Box>
                  <Box mt={2}>
                    <Text fontWeight="bold">Phone Number:</Text>
                    <Input
                      name="phoneNumber"
                      value={editedAdminData.phoneNumber}
                      onChange={handleInputChange}
                    />
                  </Box>
                  <Box mt={2}>
                    <Text fontWeight="bold">Sex:</Text>
                    <Select
                      name="sex"
                      value={editedAdminData.sex}
                      onChange={handleInputChange}
                    >
                      <option value="1">Male</option>
                      <option value="2">Female</option>
                    </Select>
                  </Box>
                </>
              ) : (
                <>
                  <Text fontWeight="bold" mt={2}>
                    Email:
                  </Text>
                  <Text>{adminData.email}</Text>
                  <Text fontWeight="bold" mt={2}>
                    Address:
                  </Text>
                  <Text>{adminData.address}</Text>
                  <Text fontWeight="bold" mt={2}>
                    Phone Number:
                  </Text>
                  <Text>{adminData.phoneNumber}</Text>
                  <Text fontWeight="bold" mt={2}>
                    Sex:
                  </Text>
                  <Text>
                    {adminData.sex === "2" ? "Female" : "Male"}
                  </Text>
                </>
              )}
            </Flex>
            <Box mt={4} textAlign="center">
              <Text color="gray.500" fontSize="sm">
                Last Seen: {new Date().toLocaleString()}
              </Text>
            </Box>
            <Flex justify="center">
              {editMode ? (
                <Button colorScheme="blue" mt={4} onClick={handleSaveProfile}>
                  Save
                </Button>
              ) : (
                <Button colorScheme="blue" mt={4} onClick={handleEditProfile}>
                  Edit Profile
                </Button>
              )}
            </Flex>
          </Box>
        ) : (
          <Text>Loading admin data...</Text>
        )}
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload Avatar</ModalHeader>
          <ModalBody>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setSelectedAvatar(e.target.files[0])}
              onClose={onClose}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleAvatarUpload}>
              Upload
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
export default AdminProfilePage;