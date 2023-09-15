import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../sass/Support/support.scss';
import {toast, ToastContainer} from "react-toastify";
import ApiClient from "../../utilities/ApiClient";
import MenuItem from "@mui/material/MenuItem";
import {FormControl, InputLabel, Select} from "@mui/material";
import {makeStyles} from "@material-ui/core/styles";
import TextField from "@mui/material/TextField";


const useStyles = makeStyles((theme) => ({
    formControl: {
        marginBottom: theme.spacing(2),
    },
    outlined: {
        borderColor: "#000000 !important"
    },
    whiteLabel: {
        color: "#fff",
        "&.Mui-focused": {
            color: "#fff",
        }
    }
}));

const Support = () => {
    const [fileName, setFileName]                                          = useState("");
    const [fileChosen, setFileChosen]                                    = useState(false);
    const [fileContent, setFileContent]                                           = useState(null);
    const [messageText, setMessageText]                                    = useState("");
    const [subject, setSubject]                                            = useState('');
    const classes                                            = useStyles();
    let authToken                                                      = localStorage.getItem('token');

    const handleDropdownChange = (event) => {
        setSubject(event.target.value);
    };

    // Create a reference to the hidden file input element
    const hiddenFileInput = React.useRef(null);

    const handleClick = () => {
        // Programmatically click the hidden file input element
        // when the Button component is clicked
        hiddenFileInput.current.click();
    };

    // Call a function (passed as a prop from the parent component to handle the user-selected file
    const handleChange = (event) => {
        setFileChosen(true);
        setFileContent(event.target.files[0]);
        setFileName(event.target.files[0].name);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let data = new FormData();
        data.append('subject', subject)
        data.append('messageText', messageText);
        data.append('file', fileContent);

        const headers = {
            "Accept": 'application/json',
            "Authorization": `Bearer ${authToken}`
        };

        ApiClient.post('/support', data, {headers})
            .then(resp => {
                let statusMessage = resp.data.message;

                toast.success(statusMessage, {
                    closeOnClick: false,
                    closeButton: false,
                    autoClose: 1400,
                });
            }).catch(error => {
            let errorMessage       = error.response.data.message;

            toast.error(errorMessage, {
                closeOnClick: false,
                closeButton: false,
                autoClose: 1400
            });
        });
    };

    return(
        <>
            <ToastContainer
                hideProgressBar
                closeButton={false}
            />

            <div className="background">
                <div className="container">
                    <div className="screen">
                        <div className="screen-header">
                            <div className="screen-header-left">
                                <div className="screen-header-button close"></div>
                                <div className="screen-header-button maximize"></div>
                                <div className="screen-header-button minimize"></div>
                            </div>
                            <div className="screen-header-right">
                                <div className="screen-header-ellipsis"></div>
                                <div className="screen-header-ellipsis"></div>
                                <div className="screen-header-ellipsis"></div>
                            </div>
                        </div>
                        <Link to="/">
                            <img src="https://cruskip.s3.us-east-2.amazonaws.com/assets/images/phopix/logos/p_1081x1080_transparent.png" className="pLogoPrizes" alt="Prize Page Logo"/>
                        </Link>
                        <div className="screen-body">
                            <div className="screen-body-item left">
                                <div className="contact-form-title">
                                    <h3 className="contact-form-title-text">Questions, comments and/or concerns? Contact us! 🙂</h3>
                                </div>
                            </div>
                            <div className="screen-body-item">
                                <form onSubmit={handleSubmit} method="POST" encType="multipart/form-data">
                                    <div className="app-form">
                                        <FormControl fullWidth variant="outlined">
                                            <InputLabel id="demo-simple-select-outlined-label">Subject</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-outlined-label"
                                                id="demo-simple-select-outlined"
                                                label="Subject"
                                                onChange={(e) => setSubject(e.target.value)}
                                                value={subject}
                                                className={classes.outlined}
                                            >
                                                <MenuItem value="Website loading slowly">Website loading slowly</MenuItem>
                                                <MenuItem value="My Prize Has Not Been Sent Yet">My Prize Has Not Been Sent Yet</MenuItem>
                                                <MenuItem value="Suggestions">Suggestions</MenuItem>
                                                <MenuItem value="Other">Other</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <br/>
                                        <br/>

                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            label="Message Box"
                                            multiline
                                            rows={4}
                                            name="messageText"
                                            onChange={(e) => setMessageText(e.target.value)}
                                            value={messageText}
                                            className={classes.formControl}
                                        />

                                        <br/>
                                        <br/>

                                        <div className="contact-form-group">
                                            <label htmlFor="file"/>
                                            <input type="file" id="file" name="file" hidden onChange={handleChange} ref={hiddenFileInput}/>
                                            <button type="button" id="custom-button" onClick={handleClick}>Choose File</button>
                                            <span id="custom-text">{!fileChosen ? "No file chosen" : fileName}</span>
                                        </div>
                                        <div className="contact-form-group buttons">
                                            <button className="app-form-button">Submit</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Support;
