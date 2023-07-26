import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useForm } from "react-hook-form";
import ApiClient from "../../utilities/ApiClient";
import { toast, ToastContainer } from "react-toastify";
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress } from "@mui/material";

const useStyles = makeStyles(theme => ({
    spinner: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },
}));

const ChangePassword = () => {
    const { register, handleSubmit } = useForm();
    let authToken= localStorage.getItem('token');
    let history  = useHistory();
    const classes = useStyles();
    const [loading, setLoading] = useState(false);


    const onSubmit = (data) => {
        console.log("currentPassword: ", data.currentPassword);
        console.log("newPassword: ", data.newPassword);

        const formData = {
            currentPassword : data.currentPassword,
            newPassword : data.newPassword
        };

        const headers = {
            "Accept": 'application/json',
            "Authorization": `Bearer ${authToken}`
        };

        ApiClient.post('change-password', formData, {headers})
            .then(resp => {
                console.log(resp);

                toast.success(resp.data.message, {
                    closeOnClick: false,
                    closeButton: false,
                    autoClose: 1400,
                });

                setTimeout(() => {
                    history.push("/gallery");
                }, 4000);

                setLoading(true);

            }).catch(error => {

            setLoading(false);

            toast.error(error.response.data.message, {
                closeOnClick: false,
                closeButton: false,
                autoClose: 5000
            });
        });
    }

    return (
        <>
            {loading && <CircularProgress className={classes.spinner} />}
            <Container component="main" maxWidth="xs">
                <ToastContainer
                    hideProgressBar
                    closeButton={false}
                />

                <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="100vh"
                >
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            {...register('currentPassword')}
                            variant="standard"
                            margin="normal"
                            required
                            fullWidth
                            id="currentPassword"
                            label="Current Password"
                            name="currentPassword"
                            type="password"
                            autoFocus
                        />

                        <TextField
                            {...register('newPassword')}
                            variant="standard"
                            margin="normal"
                            required
                            fullWidth
                            name="newPassword"
                            label="New Password"
                            type="password"
                            id="newPassword"
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Submit
                        </Button>
                    </form>
                </Box>
            </Container>
        </>
    );
};

export default ChangePassword;
