import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const Settings = () => {
    const history = useHistory();

    const handleClick = () => {
        console.log("Button clicked");
    }

    const handleUpdatePasswordClick = () => {
        history.push('/updatePassword');
    };

    const handleUpdateEmailClick = () => {
        history.push('/updateEmail');
    };

    const handleUpdateNameClick = () => {
        history.push('/updateName');
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
        >
            <Link to="/gallery">
                <img src="https://cruskip.s3.us-east-2.amazonaws.com/assets/images/phopix/logos/p_1081x1080_transparent.png" className="pLogoPrizes" alt="Prize Page Logo"/>
            </Link>
            <Button
                variant="contained"
                onClick={handleUpdatePasswordClick}
                sx={{
                    backgroundColor: '#000',
                    color: '#fff',
                    '&:hover': {
                        backgroundColor: '#000',
                    },
                    marginBottom: '1em',
                }}
            >
                Update Password
            </Button>

            <Button
                variant="contained"
                onClick={handleUpdateEmailClick}
                sx={{
                    backgroundColor: '#000',
                    color: '#fff',
                    '&:hover': {
                        backgroundColor: '#000',
                    },
                    marginBottom: '1em',
                }}
            >
                Update Email
            </Button>

            <Button
                variant="contained"
                onClick={handleUpdateNameClick}
                sx={{
                    backgroundColor: '#000',
                    color: '#fff',
                    '&:hover': {
                        backgroundColor: '#000',
                    }
                }}
            >
                Update Name
            </Button>
        </Box>
    );
};

export default Settings;
