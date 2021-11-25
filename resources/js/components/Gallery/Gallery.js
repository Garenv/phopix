import React, {useEffect, useState} from 'react';
import '../../../sass/gallery/gallery.scss';
import Grid from "../Grid/Grid";
import {Button, Image, Modal} from "react-bootstrap";
// import { CookiesProvider } from "react-cookie";
import Cookies from 'js-cookie';


const Gallery = () => {
    // Preview modal
    const [show, setShow] = useState(false);
    let authToken = Cookies.get('token');
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const logout = () => {
        console.log(authToken);
        const headers = {
            "Accept": 'application/json',
            "Authorization": `Bearer ${authToken}`
        }

        axios.post('http://localhost:8005/api/logout', {headers})
            .then(resp => {
                console.log(resp);
            }).catch(err => {
                console.log(err);
        });
    };

    return (
        <>
            <div className="fileUpload text-center">
                <input type="file" />
                {/*<button onClick={() => uploadFile(selectedFile)}>Upload to S3</button>*/}
                <Button variant="primary" onClick={handleShow}>
                    Launch demo modal
                </Button>

                <Button variant="primary" onClick={logout}>
                    Logout
                </Button>
            </div>

            <Modal show={show} onHide={handleClose}>
                <h1>Would you like to upload this photo?</h1>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <Image fluid src={"https://cruskip.s3.us-east-2.amazonaws.com/assets/images/phopix/user/gallery10.jpg"}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" >Upload!</Button>
                </Modal.Footer>
            </Modal>

            {/*{getUploads()}*/}
        </>
    );
}

export default Gallery;
