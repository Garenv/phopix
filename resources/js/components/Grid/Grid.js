import React, { useEffect, useState } from 'react';
import { Button, Image, Modal } from "react-bootstrap";
import '../../../sass/gallery/gallery.scss';
import Navbar from "../../Navbar/Navbar";
import SelectedWinners from "../SelectedWinners/SelectedWinners";

const Grid = () => {
    let authToken                                                 = localStorage.getItem('token');

    const [gridData, setGridData]                                 = useState([]);

    // Preview modal content
    const [show, setShow]                                         = useState(false);
    const [filePreview, setFilePreview]                           = useState(null);
    const [filePreviewModalStatus, setFilePreviewModalStatus]     = useState(true);

    // Status codes
    const [statusMessage, setStatusMessage]                       = useState("");
    const [statusDelete, setStatusDelete]                         = useState(null);
    const [statusDeleteMessage, setStatusDeleteMessage]           = useState("");
    const [statusCode, setStatusCode]                             = useState(null);
    const [errorClose, setErrorClose]                             = useState(false);
    const [uploadSuccess, setUploadSuccess]                       = useState(null);

    const handleClose                                             = () => setShow(false);

    // Winner modal content
    let today                                                     = new Date();
    const weeklyDay                                               = today.getDay();
    const [showWinners, setShowWinners]                           = useState(true);
    const handleCloseWinners                                      = () => setShowWinners(false);

    // User clicks likes
    const [userLikedPhotos, setUserLikedPhotos]                   = useState({});

    const closeMessages = () => {
        setErrorClose(true);
    }

    const handleShowPreviewModal = () => {
        if(filePreview === null) {
            setFilePreviewModalStatus(false);
            setStatusMessage("Nothing to preview!");
            return false;
        }

        setShow(true);
    };

    useEffect(() => {
        const headers = {
            "Accept": 'application/json',
            "Authorization": `Bearer ${authToken}`
        };

        axios.get('http://127.0.0.1:8000/api/get-user-uploads-data', {headers})
            .then(resp => {
                setGridData(resp.data);
            }).catch(err => {
            console.log(err);
        });

    }, [])

    const handleLikesBasedOnUserId = (likedPhotoUserId) => {
        if(userLikedPhotos[likedPhotoUserId]) {
            // dislike
            delete userLikedPhotos[likedPhotoUserId];

            gridData.find(photo => photo.UserID === likedPhotoUserId).likes--;
            handleDislike(likedPhotoUserId);
        } else {
            // like
            userLikedPhotos[likedPhotoUserId] = true;

            gridData.find(photo => photo.UserID === likedPhotoUserId).likes++;
            handleLike(likedPhotoUserId);
        }
        // Spread the userLikedPhotos to create a new object and force a rendering
        setUserLikedPhotos({...userLikedPhotos});
    };

    const handleLike = (likedPhotoUserId) => {
        const url = 'http://127.0.0.1:8000/api/like';

        const headers = {
            "Accept": 'application/json',
            "Authorization": `Bearer ${authToken}`
        };

        let data = {
            'UserID': likedPhotoUserId
        };

        axios.post(url, data, {headers})
            .then(resp => {
                console.log(resp.data);
            }).catch(err => {
            console.log(err);
        });

    };

    const handleDislike = (likedPhotoUserId) => {
        const url = 'http://127.0.0.1:8000/api/dislike';

        const headers = {
            "Accept": 'application/json',
            "Authorization": `Bearer ${authToken}`
        };

        let data = {
            'UserID': likedPhotoUserId
        };

        axios.post(url, data, {headers})
            .then(resp => {
                console.log(resp.data);
            }).catch(err => {
            console.log(err);
        });

    };

    const deleteUserUpload = (likedPhotoUserId) => {
        const url = `http://127.0.0.1:8000/api/delete-user-upload?UserID=${likedPhotoUserId}`;

        const headers = {
            "Accept": 'application/json',
            "Authorization": `Bearer ${authToken}`
        };

        axios.delete(url,{headers})
            .then(resp => {
                let okStatus       = resp.status;
                let successMessage = resp.data.message;

                if(okStatus) {
                    setShow(false);
                }

                setStatusDeleteMessage(successMessage);
                setStatusDelete(okStatus);

                setTimeout(() => {
                    setStatusDelete(false);
                },5000);

            }).catch(error => {
            let errorMessage       = error.response.data.message;
            let errorStatus        = error.response.status;

            setStatusMessage(errorMessage);
            setStatusCode(errorStatus);
        });
    }

    const getcreatedPhotoUrl = (e) => {
        setFilePreview(URL.createObjectURL(e.target.files[0]));
    }

    const fileUpload = () => {
        const url = 'http://127.0.0.1:8000/api/file-upload';

        let formData = new FormData();
        let imagefile = document.querySelector('#file');
        formData.append("image", imagefile.files[0]);

        const headers = {
            "Accept": 'application/json',
            "Authorization": `Bearer ${authToken}`
        }

        axios.post(url, formData, {headers})
            .then(resp => {
                let okStatus       = resp.status;
                let successMessage = resp.data.message;

                if(okStatus) {
                    setShow(false);
                }

                setUploadSuccess(okStatus);
                setStatusMessage(successMessage);
                setStatusCode(okStatus);

                setTimeout(() => {
                    setStatusCode(false);
                },5000);

            }).catch(error => {
            let errorMessage       = error.response.data.message;
            let errorStatus        = error.response.status;

            setStatusMessage(errorMessage);
            setStatusCode(errorStatus);
        });
    };

    return (
        <>
            {location.pathname === '/gallery' ? <Navbar data={gridData}/> : null }

            { statusCode === 200 ? <section>
                    <div className={`notification success ${errorClose ? 'closed' : null}`}>
                        <span className="title">Success!</span>{statusMessage}<span className="close" onClick={closeMessages}>X</span>
                    </div>
                </section>
                : null }

            { statusDelete === 200 ? <section>
                    <div className={`notification error ${errorClose ? 'closed' : null}`}>
                        <span className="title">Deleted</span>{statusDeleteMessage}<span className='close' onClick={closeMessages}>X</span>
                    </div>
                </section>
                : null }

            { !filePreviewModalStatus ? <section>
                    <div className={`notification error ${errorClose ? 'closed' : null}`}>
                        <span className="title">Error</span>{statusMessage}<span className='close' onClick={closeMessages}>X</span>
                    </div>
                </section>
                : null }

            <div className="fileUpload text-center">
                <input type="file" id="file" onChange={getcreatedPhotoUrl}/>
                <label htmlFor="file" className="btn-1">
                    <span>Upload</span>
                </label>
                &nbsp;
                <Button variant="primary" onClick={handleShowPreviewModal}>Preview before Uploading!</Button>
            </div>

            <Modal show={show} onHide={handleClose} className={uploadSuccess === 200 ? "hideModal" : ""}>
                { statusCode === 500 ?
                    <section>
                        <div className={`notification error ${errorClose ? 'closed' : null}`}>
                            <span className="title">Error</span>{statusMessage}<span className='close' onClick={closeMessages}>X</span>
                        </div>
                    </section>
                    : null }
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

            {weeklyDay === 3 ? <Modal show={showWinners} onHide={handleCloseWinners}>
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
                            gridData.map((photos, index) => {
                                return (
                                    <>
                                        <img src={photos.url} alt="Photo" className="gallery-img" onClick={() => handleLikesBasedOnUserId(photos.UserID)}/>
                                        <span>{photos.name} {localStorage.getItem('UserID') === photos.UserID ? <h6 className="you">(You)</h6> : null}</span>
                                        <span className="image-author">❤️ {photos.likes}</span>
                                        {/*{localStorage.getItem('UserID') === photos.UserID ? <button className="btn-delete btn-danger" onClick={() => deleteUserUpload(photos.UserID)}>Delete</button> : null}*/}
                                    </>
                                )
                            })
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default Grid;



