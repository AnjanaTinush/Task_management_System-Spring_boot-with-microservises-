// SubmissionList.jsx
import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import SubmissionCard from './SubmissionCard ';  // Fixed import path

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const submissions = [1, 1, 1]; // Example data

const SubmissionList = ({ handleClose, open }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {submissions.length > 0 ? (
          <div className="space-y-4">
            {submissions.map((submission, index) => (
              <SubmissionCard key={index} />
            ))}
          </div>
        ) : (
          <div className="text-center">No Submission Found</div>
        )}
      </Box>
    </Modal>
  );
};

export default SubmissionList;