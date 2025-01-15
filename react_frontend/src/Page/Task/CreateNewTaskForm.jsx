import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Grid, Autocomplete, TextField } from "@mui/material";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};

const tags = ["Angular", "React", "Vue.js", "Spring Boot", "Node.js", "Python"];

export default function CreateNewTaskForm({ handleClose, open }) {
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    description: "",
    tags: [],
    deadline: null,
  });

  const [selectedTags, setSelectedTags] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTagsChange = (event, value) => {
    setSelectedTags(value);
    setFormData({ ...formData, tags: value });
  };

  const handleDeadlineChange = (date) => {
    setFormData({ ...formData, deadline: date });
  };

  const formatDate = (input) => {
    if (!input) return null;
    const { $y: year, $M: month, $D: day, $H: hours, $m: minutes, $s: seconds, $ms: milliseconds } = input;
    const date = new Date(year, month, day, hours, minutes, seconds, milliseconds);
    return date.toISOString();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedDeadline = formData.deadline ? formatDate(formData.deadline) : null;

    const updatedFormData = {
      ...formData,
      deadline: formattedDeadline,
      tags: selectedTags,
    };

    console.log(updatedFormData);
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Create New Task
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Title"
                fullWidth
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Image"
                fullWidth
                name="image"
                value={formData.image}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                fullWidth
                multiline
                rows={4}
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                multiple
                id="tags"
                options={tags}
                value={selectedTags}
                onChange={handleTagsChange}
                renderInput={(params) => (
                  <TextField {...params} label="Tags" fullWidth />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  className="w-full"
                  label="Deadline"
                  value={formData.deadline}
                  onChange={handleDeadlineChange}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sx={{ textAlign: "right" }}>
              <Button type="submit" variant="contained">
                Create Task
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
}
