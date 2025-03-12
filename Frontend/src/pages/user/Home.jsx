import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import {
  fetchRestaurants,
  addRestaurant,
  updateRestaurant,
  deleteRestaurant,
} from "../../services/userServices";
import {
  Typography,
  Box,
  Container,
  Button,
  TextField,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  AppBar,
  Toolbar,
  Snackbar,
  Alert,
  Avatar,
  Person 
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  Add,
  Delete,
  Edit,
  Logout,
  Upload,
  LocationOn,
  Phone,
  RestaurantMenu,
} from "@mui/icons-material";
import { motion } from "framer-motion";

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    contact: "",
    image: null,
  });
  const [editing, setEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [open, setOpen] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    loadRestaurants();
  }, []);

  const loadRestaurants = async () => {
    try {
      const data = await fetchRestaurants();
      setRestaurants(data);
    } catch (error) {
      console.error("Error loading restaurants:", error);
    }
  };

  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/login");
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.contact) {
      newErrors.contact = "Contact is required";
    } else if (!/^\d{10}$/.test(formData.contact)) {
      newErrors.contact = "Contact must be a 10-digit number";
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const formDataWithImage = new FormData();
      formDataWithImage.append("name", formData.name);
      formDataWithImage.append("address", formData.address);
      formDataWithImage.append("contact", formData.contact);
      if (formData.image) formDataWithImage.append("image", formData.image);

      if (editing) {
        const response = await updateRestaurant(currentId, formDataWithImage);
        if (response.status === 200) {
          showNotification("Restaurant updated successfully!", "success");
          setEditing(false);
          setCurrentId(null);
          setFormData({ name: "", address: "", contact: "", image: null });
          loadRestaurants();
        }
      } else {
        await addRestaurant(formDataWithImage);
        showNotification("Restaurant added successfully!", "success");
      }

      setFormData({ name: "", address: "", contact: "", image: null });
      loadRestaurants();
      setOpen(false);
    } catch (error) {
      console.error("Error updating restaurant:", error);
      showNotification(
        error.response?.data?.message || "Error updating restaurant.",
        "error"
      );
    }
  };

  const handleEdit = (restaurant) => {
    setEditing(true);
    setCurrentId(restaurant._id);
    setFormData({
      name: restaurant.name,
      address: restaurant.address,
      contact: restaurant.contact,
      image: null,
    });
    setOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteRestaurant(id);
      if (response.status === 204) {
        loadRestaurants();
        showNotification("Restaurant deleted successfully!", "success");
      }
    } catch (error) {
      console.error("Error deleting restaurant:", error);
      showNotification(
        error.response?.data?.message || "Error deleting restaurant.",
        "error"
      );
    }
  };

  const showNotification = (message, severity) => {
    setNotification({ open: true, message, severity });
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEditing(false);
    setFormData({ name: "", address: "", contact: "", image: null });
    setErrors({});
  };

  return (
    <>
      {/* Snackbar Notification */}
      <Snackbar
        open={notification.open}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={3000}
        onClose={handleCloseNotification}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
          sx={{ width: "100%" }}
        >
          {notification.message}
        </Alert>
      </Snackbar>

      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          <Typography
            variant="h5"
            component="div"
            sx={{ flexGrow: 1, fontWeight: "bold" }}
          >
            Restaurant Management
          </Typography>
          <Box display="flex" gap={2}>
            <Button
              variant="contained"
              sx={{
                background: "linear-gradient(135deg, #D2B48C, #FFF8E1)",
                color: "#5C4033",
              }}
              onClick={handleOpen}
              startIcon={<Add />}
            >
              Add Restaurant
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={handleLogout}
              startIcon={<Logout />}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {/* Restaurant Cards */}
        <Box
          display="grid"
          gridTemplateColumns={{
            xs: "1fr",
            sm: "1fr 1fr",
            md: "repeat(3, 1fr)",
          }}
          gap={3}
          sx={{ mt: 3 }}
        >
          {restaurants.map((restaurant) => (
            <motion.div
              key={restaurant._id}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  boxShadow: 3,
                  "&:hover": {
                    boxShadow: 6,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={
                    `https://restaurant-listing-platform.onrender.com${restaurant.image}` ||
                    "https://via.placeholder.com/300x200.png?text=No+Image"
                  }
                  alt={`${restaurant.name} image`}
                  sx={{
                    width: "100%",
                    height: 200,
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    gutterBottom
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    <RestaurantMenu sx={{ fontSize: 20, marginRight: 1 }} />{" "}
                    {restaurant.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    paragraph
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    <LocationOn sx={{ fontSize: 20 }} color="action" />{" "}
                    {restaurant.address}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    <Phone sx={{ fontSize: 20 }} color="action" />{" "}
                    {restaurant.contact}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    paragraph
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    <Person  sx={{ fontSize: 20, marginRight: 1}} color="action" />{" "}
                    {restaurant.userId.username}
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{ justifyContent: "space-between", padding: 2 }}
                >
                  <Button
                    variant="text"
                    startIcon={<Edit />}
                    color="primary"
                    onClick={() => handleEdit(restaurant)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="text"
                    startIcon={<Delete />}
                    color="error"
                    onClick={() => handleDelete(restaurant._id)}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </motion.div>
          ))}
        </Box>

        {/* Add/Edit Restaurant Dialog */}
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
          <DialogTitle>
            {editing ? "Edit Restaurant" : "Add Restaurant"}
          </DialogTitle>
          <DialogContent>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
              <TextField
                fullWidth
                margin="normal"
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                error={!!errors.address}
                helperText={errors.address}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Contact"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                error={!!errors.contact}
                helperText={errors.contact}
              />
              <Box display="flex" alignItems="center" gap={2} sx={{ mt: 2 }}>
                <Button
                  variant="outlined"
                  sx={{
                    background: "linear-gradient(135deg, #D2B48C, #FFF8E1)",
                    color: "#5C4033",
                  }}
                  component="label"
                  startIcon={<Upload />}
                >
                  Upload Image
                  <input type="file" hidden onChange={handleImageChange} />
                </Button>
                {formData.image && (
                  <Avatar
                    src={URL.createObjectURL(formData.image)}
                    alt="Preview"
                    sx={{ width: 60, height: 60 }}
                  />
                )}
              </Box>
            </Box>
          </DialogContent>
          <DialogActions sx={{ padding: 2 }}>
            <Button onClick={handleClose} color="inherit">
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              type="submit"
              variant="contained"
              sx={{
                background: "linear-gradient(135deg, #D2B48C, #FFF8E1)",
                color: "#5C4033",
              }}
            >
              {editing ? "Update" : "Add"}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
};

export default Home;
