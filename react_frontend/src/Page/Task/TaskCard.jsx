import React, { useState } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { MoreVertical } from 'lucide-react';
import UserList from './UserList';
import SubmissionList from './SubmitionList';  // Fixed import path
import EditTaskForm from './EditTaskForm';  // Fixed import path

const TaskCard = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  const [openUserList, setOpenUserList] = useState(false);
  const [openSubmissionList, setOpenSubmissionList] = useState(false);
  const [openUpdateTaskForm, setOpenUpdateTaskForm] = useState(false);
  
  const role = "ROLE_ADMIN";

  return (
    <div className="relative justify-between p-5 mt-16 bg-white border-2 border-blue-100 rounded-lg card lg:flex">
      <div className="absolute top-2 right-2">
        <IconButton
          id="basic-button"
          aria-controls={openMenu ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={openMenu ? 'true' : undefined}
          onClick={handleMenuClick}
        >
          <MoreVertical />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={openMenu}
          onClose={handleMenuClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          {role === "ROLE_ADMIN" && (
            <>
              <MenuItem onClick={() => setOpenUserList(true)}>Assigned Users</MenuItem>
              <MenuItem onClick={() => setOpenSubmissionList(true)}>See Submissions</MenuItem>
              <MenuItem onClick={() => setOpenUpdateTaskForm(true)}>Edit</MenuItem>
              <MenuItem onClick={handleMenuClose}>Delete</MenuItem>
            </>
          )}
        </Menu>
      </div>
      <div className="w-full gap-5 lg:flex">
        <div className="flex-shrink-0">
          <img
            className="flex items-center justify-center object-cover mt-3 rounded-full lg:w-20 lg:h-20"
            src="https://img.freepik.com/free-photo/luxurious-car-parked-highway-with-illuminated-headlight-sunset_181624-60607.jpg?semt=ais_hybrid"
            alt="icon"
          />
        </div>
        <div className="flex-grow space-y-5">
          <div className="space-y-2">
            <h1 className="text-lg font-bold">Car Rental Website</h1>
            <p className="text-sm text-gray-500">
              Use the latest framework and technology to make this website.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {[1, 2, 3, 4].map((_, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs text-blue-600 bg-blue-100 rounded-md"
              >
                Angular
              </span>
            ))}
          </div>
        </div>
      </div>
      {openUserList && <UserList open={openUserList} handleClose={() => setOpenUserList(false)} />}
      {openSubmissionList && <SubmissionList open={openSubmissionList} handleClose={() => setOpenSubmissionList(false)} />}
      {openUpdateTaskForm && <EditTaskForm open={openUpdateTaskForm} handleClose={() => setOpenUpdateTaskForm(false)} />}
    </div>
  );
};

export default TaskCard;