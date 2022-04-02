import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Button, Image, Modal } from "react-bootstrap";
import '../../../sass/gallery/gallery.scss';
import Grid from "../Grid/Grid";
import Navbar from "../../Navbar/Navbar";
import SelectedWinners from "../SelectedWinners/SelectedWinners";

const Gallery = () => {
    let authToken                                                 = localStorage.getItem('token');
    let today                                                     = new Date();

    // Preview modal content
    const [show, setShow]                                         = useState(false);
    const [filePreview, setFilePreview]                           = useState(null);
    const handleClose                                             = () => setShow(false);
    const handleShow                                              = () => setShow(true);

    // Winner modal content
    const weeklyDay                                               = today.getDay();
    const [showWinners, setShowWinners]                           = useState(true);
    const handleCloseWinners                                      = () => setShowWinners(false);

    // User clicks for likes
    const [currentUserClicks, setCurrentUserClicks]               = useState(1);

    async function fetchUploads(){
        const headers = {
            "Accept": 'application/json',
            "Authorization": `Bearer ${authToken}`
        };

        const {data} = await axios.get('http://localhost/api/get-user-uploads-data', {headers});
        return data;
    }

    const handleLikesBasedOnUserId = (likedPhotoUserId) => {
        if(currentUserClicks > 1) {
            setCurrentUserClicks(currentUserClicks - 1);
            incrementDecrementLike(likedPhotoUserId);
        } else {
            setCurrentUserClicks(currentUserClicks + 1);
            incrementDecrementLike(likedPhotoUserId);
        }
    };

    const incrementDecrementLike = (likedPhotoUserId) => {
        const url = 'http://localhost/api/post-user-like';

        const headers = {
            "Accept": 'application/json',
            "Authorization": `Bearer ${authToken}`
        };

        let data = {
            'UserID': likedPhotoUserId,
            'likeCount': currentUserClicks
        };

        axios.post(url, data, {headers});

    };

    const deleteUserUpload = (likedPhotoUserId) => {
        const url = `http://localhost/api/delete-user-upload?UserID=${likedPhotoUserId}`;

        const headers = {
            "Accept": 'application/json',
            "Authorization": `Bearer ${authToken}`
        };

        axios.delete(url,{headers})
            .then(resp => {
                console.log(resp);
            }).catch(error => {
            console.log(error);
        });
    }

    const getcreatedPhotoUrl = (e) => {
        setFilePreview(URL.createObjectURL(e.target.files[0]));
    }

    const fileUpload = () => {
        const url = 'http://localhost/api/file-upload';

        let formData = new FormData();
        let imagefile = document.querySelector('#file');
        formData.append("image", imagefile.files[0]);

        const headers = {
            "Accept": 'application/json',
            "Authorization": `Bearer ${authToken}`
        }

        axios.post(url, formData, {headers})
            .then(resp => {
                console.log(resp.data);
            }).catch(error => {
            console.log(error);
        });
    };


    const { data, error, isError, isLoading } = useQuery('uploads', fetchUploads);

    // first argument is a string to cache and track the query result
    if(isLoading){
        return <div>Loading...</div>
    }
    if(isError){
        return <div>Error! {error.message}</div>
    }

    return (
        <>
            {location.pathname === '/gallery' ? <Navbar data={data}/> : null }

            <div className="fileUpload text-center">
                <input type="file" id="file" onChange={getcreatedPhotoUrl} required/>
                <Button variant="primary" onClick={handleShow}>Launch demo modal</Button>
            </div>

            <Modal show={show} onHide={handleClose}>
                <h1>Would you like to upload this photo?</h1>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <Image fluid src={filePreview}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" onClick={fileUpload}>Upload!</Button>
                </Modal.Footer>
            </Modal>

            {weeklyDay === 6 ? <Modal show={showWinners} onHide={handleCloseWinners}>
                <h1>This Week's Top 3 Winners!</h1>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <SelectedWinners/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseWinners}>Close</Button>
                </Modal.Footer>
            </Modal> : null}

            <section className="gallery">
                <div className="container">
                    <div className="img-container">
                        {
                            data.map((photos, index) => {
                                return <Grid
                                    src={photos.url}
                                    likes={photos.likes}
                                    currentUserClicks={currentUserClicks}
                                    userName={photos.name}
                                    key={index}
                                    onClick={handleLikesBasedOnUserId}
                                    userDelete={deleteUserUpload}
                                    userId={photos.UserID}
                                />
                            })
                        }
                    </div>
                </div>
            </section>


        </>

    );
}

export default Gallery;
