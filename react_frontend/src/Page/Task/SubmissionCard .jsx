import React from 'react';
import { OpenInNew } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';
import { Check, Close } from '@mui/icons-material';

const SubmissionCard = () => {

  const handleAcceptDecline = (status) => {
    console.log(status);
  };

  return (
    <div className="flex items-center justify-between p-4 bg-black rounded-md">
      <div className="space-y-2 text-white">
        <div className="flex items-center gap-2">
          <span>GitHub:</span>
          <div className="flex items-center text-blue-200">
            <OpenInNew />
            <a href="/" target="_blank" rel="noopener noreferrer" className="ml-1 underline">
              Go To Link
            </a>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <p>Submission Time :</p>
          <p className="text-gray-400">2024-01-18T22:15:39:512345</p>
        </div>
      </div>
      <div>
        {
          true ? (
            <div className="flex gap-5">
              <IconButton color="success" onClick={() => handleAcceptDecline("ACCEPTED")}>
                <Check />
              </IconButton>
              <IconButton color="error" onClick={() => handleAcceptDecline("DECLINED")}>
                <Close />
              </IconButton>
            </div>
          ) : (
            <Button 
              size="small" 
              variant="outlined"
              sx={{
                color: 'green', 
                borderColor: 'green',
                '&:hover': {
                  borderColor: 'green',
                  backgroundColor: 'rgba(0, 128, 0, 0.1)', // Light green background on hover
                },
              }}
            >
              Accept
            </Button>
          )
        }
      </div>
    </div>
  );
};

export default SubmissionCard;
