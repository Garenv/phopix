import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const Settings = () => {
    const history = useHistory();

    const handleClick = () => {
        console.log("Button clicked");
    }

    const handleChangePasswordClick = () => {
        history.push('/changePassword');
    };


    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
        >
            <Button
                variant="contained"
                onClick={handleChangePasswordClick}
                sx={{
                    backgroundColor: '#000',
                    color: '#fff',
                    '&:hover': {
                        backgroundColor: '#000',
                    },
                    marginBottom: '1em',
                }}
            >
                Change Password
            </Button>

            <Button
                variant="contained"
                onClick={handleClick}
                sx={{
                    backgroundColor: '#000',
                    color: '#fff',
                    '&:hover': {
                        backgroundColor: '#000',
                    },
                    marginBottom: '1em',
                }}
            >
                Change Email
            </Button>

            <Button
                variant="contained"
                onClick={handleClick}
                sx={{
                    backgroundColor: '#000',
                    color: '#fff',
                    '&:hover': {
                        backgroundColor: '#000',
                    }
                }}
            >
                Change Name
            </Button>
        </Box>
    );
};

export default Settings;
