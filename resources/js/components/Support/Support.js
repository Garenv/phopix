import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../sass/Support/support.scss';

const Support = () => {
    const [fileName, setFileName] = useState("");

    // Create a reference to the hidden file input element
    const hiddenFileInput = React.useRef(null);

    // Programmatically click the hidden file input element
    // when the Button component is clicked
    const handleClick = () => {
        hiddenFileInput.current.click();
    };

    // Call a function (passed as a prop from the parent component)
    // to handle the user-selected file
    const handleChange = (event) => {
        const fileUploaded = event.target.files[0].name;
        setFileName(fileUploaded);
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
                            <img src="https://cruskip.s3.us-east-2.amazonaws.com/assets/images/phopix/user/phopixLogo_v2.png" className="supportFormLogo" alt="Phopixel Logo"/>
                        </Link>
                        <div className="screen-body">
                            <div className="screen-body-item left">
                                <div className="contact-form-title">
                                    <h3 className="contact-form-title-text">Questions, comments and/or concerns? Contact us! 🙂</h3>
                                </div>
                            </div>
                            <div className="screen-body-item">
                                <div className="app-form">
                                    <div className="contact-form-group">
                                        <input className="contact-form-control" placeholder="Name"/>
                                    </div>
                                    <div className="contact-form-group">
                                        <input className="contact-form-control" placeholder="Email"/>
                                    </div>
                                    <div className="contact-form-group">
                                        <input type="file" id="real-file" hidden="hidden" ref={hiddenFileInput} onChange={handleChange} />
                                        <button type="button" id="custom-button" onClick={handleClick}>Choose File</button>
                                        <span id="custom-text">{fileName}</span>
                                    </div>
                                    <div className="contact-form-group message">
                                        <textarea className="contact-form-control" placeholder="Message"/>
                                    </div>
                                    <div className="contact-form-group buttons">
                                        <button className="app-form-button">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Support;
