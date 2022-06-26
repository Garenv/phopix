import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../sass/Support/support.scss';

const Support = () => {
    const [fileName, setFileName]                                                 = useState("");
    const [fileChosen, setFileChosen]                                             = useState(false);
    const [fileContent, setFileContent]                                           = useState(null);
    const [statusMessage, setStatusMessage]                                       = useState("");
    const [statusCode, setStatusCode]                                             = useState(null);
    const [name, setName]                                                         = useState("");
    const [email, setEmail]                                                       = useState("");
    const [messageText, setMessageText]                                           = useState("");
    const [errorClose, setErrorClose]                                             = useState(false);

    const closeMessages = () => {
        setErrorClose(true);
    }

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
        data.append('name', name);
        data.append('email', email);
        data.append('messageText', messageText);
        data.append('file', fileContent);

        const headers = {
            "Accept": 'application/json'
        };

        axios.post('http://127.0.0.1:8000/api/support', data, {headers})
            .then(resp => {
                console.log(resp);
                let statusMessage = resp.data.message;
                let statusCode  = resp.status;

                setStatusMessage(statusMessage);
                setStatusCode(statusCode);
            }).catch(error => {
            let statusMessage = error.response.data.message;
            let statusCode  = error.response.status;

            setStatusMessage(statusMessage);
            setStatusCode(statusCode);
        });
    };

    return(
        <>
            { statusCode === 200 ? <section>
                    <div className={`notification success ${errorClose ? 'closed' : null}`}>
                        <span className="title">Success!</span>{statusMessage}<span className="close" onClick={closeMessages}>X</span>
                    </div>
                </section>
                : null }

            { statusCode === 422 ? <section>
                    <div className={`notification error ${errorClose ? 'closed' : null}`}>
                        <span className="title">Failed!</span>{statusMessage}<span className="close" onClick={closeMessages}>X</span>
                    </div>
                </section>
                : null }

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
                                        <div className="contact-form-group">
                                            <label htmlFor="name"/>
                                            <input className="contact-form-control" name="name" placeholder="Name" onChange={(e) => setName(e.target.value)}/>
                                        </div>
                                        <div className="contact-form-group">
                                            <label htmlFor="email"/>
                                            <input className="contact-form-control" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                                        </div>
                                        <div className="contact-form-group">
                                            <label htmlFor="file"/>
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
