import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../sass/Support/support.scss';

const Support = () => {
    const [fileName, setFileName]                                                 = useState("");
    const [fileChosen, setFileChosen]                                             = useState(false);
    const [fileContent, setFileContent]                                           = useState(null);
    const [emailError, setErrorMessage]                                           = useState("");
    const [errorStatus, setErrorStatus]                                           = useState(null);
    const [name, setName]                                                         = useState("");
    const [email, setEmail]                                                       = useState("");
    const [messageText, setMessageText]                                           = useState("");

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

        let data = {
            'name' : name,
            'email' : email,
            'file'  : fileContent,
            'messageText' : messageText
        };

        console.log(data);

        const headers = {
            "Accept": 'application/json'
        };

        axios.post('http://localhost/api/support', data, {headers})
            .then(resp => {
                console.log(resp);
            }).catch(error => {
            let errorMessage = error.response.data.message;
            let errorStatus  = error.response.status;

            setErrorMessage(errorMessage);
            setErrorStatus(errorStatus);
        });
    };

    return(
        <>
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
                                <form onSubmit={handleSubmit} method="POST" encType="multipart/form-data/">
                                    <div className="app-form">
                                        <div className="contact-form-group">
                                            <label htmlFor="name"/>
                                            <input className="contact-form-control" name="name" placeholder="Name" onChange={(e) => setName(e.target.value)}/>
                                        </div>
                                        <div className="contact-form-group">
                                            <label htmlFor="email"/>
                                            <input className="contact-form-control" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                                        </div>
                                        <div className="contact-form-group">
                                            <label htmlFor="image"/>
                                            <input type="file" id="file" name="file" hidden onChange={handleChange} ref={hiddenFileInput}/>
                                            <button type="button" id="custom-button" onClick={handleClick}>Choose File</button>
                                            <span id="custom-text">{!fileChosen ? "No file chosen, yet" : fileName}</span>
                                        </div>
                                        <div className="contact-form-group message">
                                            <label htmlFor="message"/>
                                            <textarea className="contact-form-control" name="messageText" placeholder="Message" onChange={(e) => setMessageText(e.target.value)}/>
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
