import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {
  Avatar,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export default function UserList({ handleClose, open }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" mb={2}>
          User List
        </Typography>
        {Array.from({ length: 3 }).map((_, index) => (
          <React.Fragment key={index}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              mb={2}
            >
              {/* User Info */}
              <ListItem disablePadding>
                <ListItemAvatar>
                  <Avatar
                    src="https://img.freepik.com/premium-vector/boy-work-computers_987671-48.jpg?ga=GA1.1.1585285130.1736833318&semt=ais_hybrid"
                    alt="User Avatar"
                  />
                </ListItemAvatar>
                <ListItemText
                  primary="Code with Roy"
                  secondary="@code_with_Standard"
                  primaryTypographyProps={{ variant: 'body1', noWrap: false }}
                  secondaryTypographyProps={{
                    variant: 'body2',
                    color: 'textSecondary',
                  }}
                />
              </ListItem>

              {/* Select Button */}
              <Button
                variant="contained"
                size="small"
                color="primary"
                onClick={() => console.log('User selected')}
              >
                Select
              </Button>
            </Box>
            {/* Add Divider between items, except after the last one */}
            {index < 2 && <Divider />}
          </React.Fragment>
        ))}
      </Box>
    </Modal>
  );
}
