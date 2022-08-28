import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Button, Image, Modal } from "react-bootstrap";
import '../../../sass/gallery/gallery.scss';
import Grid from "../Grid/Grid";
import Navbar from "../../Navbar/Navbar";
import SelectedWinners from "../SelectedWinners/SelectedWinners";

const Gallery = () => {
    let authToken                                                 = localStorage.getItem('token');

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

    // Likes/dislikes
    const [isLikedClicked, setIsLikeClicked]                      = useState(false);
    const [isDislikeClicked, setIsDislikeClicked]                 = useState(false);
    const [userLikes, setUserLikes]                               = useState(null);

    const handleClose                                             = () => setShow(false);

    // Winner modal content
    let today                                                     = new Date();
    const weeklyDay                                               = today.getDay();
    const [showWinners, setShowWinners]                           = useState(true);
    const handleCloseWinners                                      = () => setShowWinners(false);

    // User clicks likes
    const [currentUserClicks, setCurrentUserClicks]               = useState(null);

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

    async function fetchUploads(){
        const headers = {
            "Accept": 'application/json',
            "Authorization": `Bearer ${authToken}`
        };

        const {data} = await axios.get('http://127.0.0.1:8000/api/get-user-uploads-data', {headers});
        return data;
    }

    const { data, error, isError, isLoading } = useQuery('uploads', fetchUploads); // First argument is a string to cache and track the query result

    if(isLoading){
        return <div className="loading"></div>
        // return <img src="https://cruskip.s3.us-east-2.amazonaws.com/assets/images/phopix/logos/phopixel_600x370.jpg" className="img-fluid loading" alt="Logo"/>;
    }
    if(isError){
        return <div>Error! {error.message}</div>
    }

    const handleLikesBasedOnUserId = (likedPhotoUserId) => {
        if(currentUserClicks >= 1) {
            setCurrentUserClicks(currentUserClicks - 1);
            setIsDislikeClicked(true);
            handleDislike(likedPhotoUserId);
        } else {
            setCurrentUserClicks(currentUserClicks + 1);
            setIsLikeClicked(true);
            handleLike(likedPhotoUserId);
        }

    };

    const handleLike = (likedPhotoUserId) => {
        const url = 'http://127.0.0.1:8000/api/like';

        const headers = {
            "Accept": 'application/json',
            "Authorization": `Bearer ${authToken}`
        };

        let data = {
            'UserID': likedPhotoUserId
            // 'likeCount': currentUserClicks
        };

        axios.post(url, data, {headers})
            .then(resp => {
                // setLiked(true);
                console.log(resp.data);
                setUserLikes(resp.data.userLikes);
                // setUserLike(resp.data.incrementDecrementLikes);
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
            // 'likeCount': currentUserClicks
        };


        axios.post(url, data, {headers})
            .then(resp => {
                // setDisliked(true);
                console.log(resp.data);
                setUserLikes(resp.data.userLikes);
                // setUserLike(resp.data.incrementDecrementLikes);
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

                console.log(resp);
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
            {location.pathname === '/gallery' ? <Navbar data={data}/> : null }

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

            {weeklyDay === 1 ? <Modal show={showWinners} onHide={handleCloseWinners}>
                <h1>This Week's Top 3 Winners!</h1>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <SelectedWinners/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseWinners}>Close</Button>
                </Modal.Footer>
            </Modal> : null}


            <div className="main">
                <ul className="cards">
                    {
                        data.map((photos, index) => {
                            return <Grid
                                src={photos.url}
                                newlyUploadedSrc={uploadSuccess}
                                likes={photos.likes}
                                currentUserClicks={currentUserClicks}
                                userName={photos.name}
                                key={index}
                                onClick={handleLikesBasedOnUserId}
                                userDelete={deleteUserUpload}
                                isLikedClicked={isLikedClicked}
                                isDislikeClicked={isDislikeClicked}
                                userLikes={userLikes}
                                userId={photos.UserID}
                            />
                        })
                    }
                </ul>
            </div>
        </>
    );
}

export default Gallery;
