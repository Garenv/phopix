import React, {useEffect, useRef, useState} from 'react';
import { Button, Image, Modal } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import '../../../sass/gallery/gallery.scss';
import Navbar from "../Navbar/Navbar";
import PrizeStatus from "../Pages/PrizeStatus/PrizeStatus";
import YourPrizes from "../Pages/YourPrizes/YourPrizes";

const Grid = () => {
    let authToken                                                 = localStorage.getItem('token');

    const [gridData, setGridData]                                 = useState([]);

    // Preview modal content
    const [show, setShow]                                         = useState(false);
    const [filePreview, setFilePreview]                           = useState(null);
    const [filePreviewModalStatus, setFilePreviewModalStatus]     = useState(true);

    // Status codes
    const [errorClose, setErrorClose]                             = useState(false);
    const [uploadSuccess, setUploadSuccess]                       = useState(null);

    const handleClose                                             = () => setShow(false);

    // User clicks likes
    const [userLikedPhotos, setUserLikedPhotos]                   = useState({});

    const closeMessages = () => {
        setErrorClose(true);
    }

    useEffect(() => {
        const headers = {
            "Accept": 'application/json',
            "Authorization": `Bearer ${authToken}`
        };

        axios.get('http://127.0.0.1:8000/api/get-user-uploads-data', {headers})
            .then(resp => {
                console.log(resp.data);
                setGridData(resp.data);
            }).catch(err => {
            console.log(err);
        });

    }, []);

    const handleShowPreviewModal = () => {
        if(filePreview === null) {
            setFilePreviewModalStatus(false);

            toast.error("Nothing to preview!", {
                closeOnClick: false,
                closeButton: false,
                autoClose: 600
            });
            return false;
        }

        setShow(true);
    };

    const handleLike = (likedPhotoUserId, userName, likedPhotoId) => {
        const url = 'http://127.0.0.1:8000/api/like';

        const headers = {
            "Accept": 'application/json',
            "Authorization": `Bearer ${authToken}`
        };

        let data = {
            'UserID': likedPhotoUserId,
            'userName' : userName,
            'likedPhotoId' : likedPhotoId
        };

        userLikedPhotos[likedPhotoUserId] = true;
        gridData.find(photo => photo.UserID === likedPhotoUserId).likes++;
        gridData.find(photo => photo.UserID === likedPhotoUserId).is_liked = 1;

        toast.success(`You liked ${userName}'s photo!`, {
            closeOnClick: false,
            progress: false,
            closeButton: false
        });

        axios.post(url, data, {headers})
            .then(resp => {
                console.log(resp.data);
            }).catch(err => {
            console.log(err);
        });

        setUserLikedPhotos({...userLikedPhotos});
    };

    const handleDislike = (likedPhotoUserId, userName, likedPhotoId) => {
        const url = 'http://127.0.0.1:8000/api/dislike';

        const headers = {
            "Accept": 'application/json',
            "Authorization": `Bearer ${authToken}`
        };

        let data = {
            'UserID': likedPhotoUserId,
            'userName' : userName,
            'dislikedPhotoId' : likedPhotoId
        };

        // dislike
        delete userLikedPhotos[likedPhotoUserId];
        gridData.find(photo => photo.UserID === likedPhotoUserId).likes--;
        gridData.find(photo => photo.UserID === likedPhotoUserId).is_liked = 0;

        toast.error(`You disliked ${userName}'s photo!`, {
            closeOnClick: false,
            progress: false,
            closeButton: false
        });

        axios.post(url, data, {headers})
            .then(resp => {
                console.log(resp.data);
            }).catch(err => {
            console.log(err);
        });

        setUserLikedPhotos({...userLikedPhotos});

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

                toast.success(successMessage, {
                    closeOnClick: false,
                    closeButton: false,
                    autoClose: 1400
                });

                setTimeout(() => {
                    window.location.reload(false);
                },1400);

            }).catch(error => {
            let errorMessage       = error.response.data.message;

            toast.error(errorMessage, {
                closeOnClick: false,
                closeButton: false,
                autoClose: 1400
            });

            setTimeout(() => {
                window.location.reload(false);
            },1400);

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

                toast.success(successMessage, {
                    closeOnClick: false,
                    closeButton: false,
                    autoClose: 1400,
                });

                // setTimeout(() => {
                //     window.location.reload(false);
                // },1400);

            }).catch(error => {
            let errorMessage       = error.response.data.message;

            toast.error(errorMessage, {
                closeOnClick: false,
                closeButton: false,
                autoClose: 1400
            });

        });
    };

    return (
        <>
            <Router>

                {location.pathname === '/gallery' ? <Navbar/> : null }

                <Switch>
                    <Route path="/gallery">
                        <div className="fileUpload text-center">
                            <input type="file" id="file" onChange={getcreatedPhotoUrl}/>
                            <label htmlFor="file" className="btn-1">
                                <span>Upload</span>
                            </label>
                            &nbsp;
                            <Button variant="primary" onClick={handleShowPreviewModal}>Preview before Uploading!</Button>
                        </div>

                        <Modal show={show} onHide={handleClose} className={uploadSuccess === 200 ? "hideModal" : ""}>
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

                        <section className="gallery">
                            <div className="container">
                                <div className="img-container">
                                    {
                                        gridData.map((photos, index) => {
                                            return (
                                                <>
                                                    <img src={photos.url} alt="Photo" className="gallery-img"/>
                                                    <ToastContainer
                                                        hideProgressBar
                                                        closeButton={false}
                                                    />
                                                    <div className="userDetails">
                                                        <span className="likesAmt">❤️ {photos.likes}</span><br/>
                                                        {!photos.is_liked ?
                                                            <Button variant="success" onClick={() => handleLike(photos.UserID, photos.name, photos.photo_id, photos.is_liked)}>Like</Button> :
                                                            <Button variant="danger" onClick={() => handleDislike(photos.UserID, photos.name, photos.photo_id, photos.is_liked)}>Dislike</Button>
                                                        }
                                                            <br/>
                                                            <span className="name">{photos.name} {localStorage.getItem('UserID') === photos.UserID ? <h6 className="you">(You)</h6> : null}</span>
                                                        {localStorage.getItem('UserID') === photos.UserID ? <Button variant="danger" onClick={() => deleteUserUpload(photos.UserID)}>Delete</Button> : null}
                                                    </div>
                                                </>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </section>
                    </Route>

                    <Route path="/prizeStatus">
                        <PrizeStatus/>
                    </Route>

                    <Route path="/yourPrizes">
                        <YourPrizes/>
                    </Route>

                    {/*<Route path= "*" component={PageNotFound} />*/}
                </Switch>
            </Router>
        </>
    )
}

export default Grid;
