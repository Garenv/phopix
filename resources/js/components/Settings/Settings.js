import React, { useEffect } from 'react';
import Switch from '@mui/material/Switch';
import {FormControlLabel, Grid} from "@mui/material";

const Settings = () => {
    const [darkModeChecked, setCheckDarkMode] = React.useState(false);

    const toggleDarkMode = (event) => {
        setCheckDarkMode(event.target.checked);
    };

    useEffect(() => {
        document.body.style.backgroundColor = darkModeChecked ? 'black' : 'white';
    }, [darkModeChecked]);

    return (
        <Grid container direction="column" alignItems="center" justifyContent="center" spacing={2}>
            <Grid item>
                <FormControlLabel
                    control={<Switch checked={darkModeChecked} onChange={toggleDarkMode} />}
                    label="Text to the top"
                    labelPlacement="top"
                />
            </Grid>
        </Grid>
    );
};

export default Settings;
