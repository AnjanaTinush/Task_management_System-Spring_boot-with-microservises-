import { useState } from "react";
import {
  AccountBox,
  Home,
  ModeNight,
  Settings,
  Notifications,
  AssignmentTurnedIn,
  Assignment,
  AddTask,
  Logout,
  Menu,
} from "@mui/icons-material";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
  Divider,
  Typography,
  IconButton,
  Drawer,
} from "@mui/material";
import CreateNewTaskForm from "../Page/Task/CreateNewTaskForm";

const menu = [
  { name: "Home", value: "Home", icon: <Home />, role: ["ROLE_ADMIN", "ROLE_CUSTOMER"] },
  { name: "DONE", value: "DONE", icon: <AssignmentTurnedIn />, role: ["ROLE_ADMIN", "ROLE_CUSTOMER"] },
  { name: "ASSIGNED", value: "ASSIGNED", icon: <Assignment />, role: ["ROLE_ADMIN"] },
  { name: "NOT ASSIGNED", value: "PENDING", icon: <Assignment />, role: ["ROLE_ADMIN"] },
  { name: "Create new Task", value: "", icon: <AddTask />, role: ["ROLE_ADMIN"] },
  { name: "Notification", value: "NOTIFICATION", icon: <Notifications />, role: ["ROLE_CUSTOMER"] },
];

const role = "ROLE_ADMIN";

const Sidebar = ({ mode, setMode }) => {
  const [activeMenu, setActiveMenu] = useState("DONE");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [openCreateTaskForm,setOpenCreateTaskForm] = useState(false);
  const handleCloseCreateTaskForm=()=>{
       setOpenCreateTaskForm(false)
  } 
  const handleOpenCreateTaskModel=()=>{
    setOpenCreateTaskForm(true)
}
  
  const handleMenuChange = (item) => {
    if(item.name=="Create new Task"){
      handleOpenCreateTaskModel()
    }
    setActiveMenu(item.name);
  };

  const handleLogout = () => {
    console.log("handle logout");
  };

  const drawerContent = (
    <Box
      sx={{
        width: 211,
        "& .MuiListItemButton-root": {
          borderRadius: "8px",
          mb: 0.5,
        },
      }}
    >
      {/* Header */}
      <Typography
        variant="h6"
        sx={{
          px: 2,
          py: 2,
          fontWeight: 600,
          color: mode === "light" ? "primary.main" : "primary.light",
        }}
      >
        Dashboard
      </Typography>

      <Divider sx={{ mb: 2 }} />

      <List>
        {menu
          .filter((item) => item.role.includes(role))
          .map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                onClick={() => handleMenuChange(item)}
                sx={{
                  backgroundColor: activeMenu === item.name ? "primary.main" : "transparent",
                  color: activeMenu === item.name ? "white" : "inherit",
                  "&:hover": {
                    backgroundColor: activeMenu === item.name
                      ? "primary.dark"
                      : mode === "light"
                      ? "rgba(0, 0, 0, 0.04)"
                      : "rgba(255, 255, 255, 0.08)",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: activeMenu === item.name ? "white" : "inherit",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        <Divider sx={{ my: 2 }} />
        <ListItem disablePadding>
          <ListItemButton component="a" href="#simple-list">
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component="a" href="#simple-list">
            <ListItemIcon>
              <AccountBox />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <ModeNight />
            </ListItemIcon>
            <ListItemText primary="Theme" />
            <Switch
              onChange={() => setMode(mode === "light" ? "dark" : "light")}
              checked={mode === "dark"}
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton className="logoutButton" onClick={handleLogout}>
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );


  
  
  return (
    <>
      {/* Hamburger Icon for Mobile */}
      <IconButton
        sx={{
          display: { sm: "none" },
          position: "absolute",
          top: 16,
          left: 16,
          zIndex: 1300,
        }}
        onClick={() => setDrawerOpen(true)}
      >
        <Menu />
      </IconButton>

      {/* Drawer for Mobile */}
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          display: { xs: "block", sm: "none" },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Permanent Sidebar for Larger Screens */}
      <Box
        flex={1}
        p={2}
        sx={{
          display: { xs: "none", sm: "block" },
          backgroundColor: mode === "light" ? "#ffffff" : "#1e1e1e",
        }}
      >
        {drawerContent}
      </Box>
      <CreateNewTaskForm open={openCreateTaskForm} handleClose={handleCloseCreateTaskForm}/>
    </>
  );
};

export default Sidebar;
