import React, {useEffect, useState} from 'react';
import '../../../sass/gallery/gallery.scss';
import {Button, Image, Modal} from "react-bootstrap";
import Grid from "../Grid/Grid";


const Gallery = () => {
    // Preview modal
    const [show, setShow] = useState(false);
    let authToken = localStorage.getItem('token');
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [uploadsData, setUploadsData] = useState([]);
    const [filePreview, setFilePreview] = useState(null);
    const [likedPhotoUserId, setLikedPhotoUsedId] = useState('');
    const [like, setLike] = useState(0);

    const [selectedFile, setSelectedFile] = useState(null);

    // Referring the uploadsData inside the useEffect hook's callback and in order to get correct console log,
    // Run the code in a separate useEffect hook.
    // In this way, the getUploads function is called only once and it outputs correct uploadData to the browser console.
    useEffect(() => {
        getUploads();
    }, []);

    useEffect(() => {
        // logs empty array in the console if dependency array is empty
        // logs correct data when dependency array isn't empty - i.e. [uploadsData]
        // console.log(uploadsData);
    }, [uploadsData]);


    const getcreatedPhotoUrl = (e) => {
        setFilePreview(URL.createObjectURL(e.target.files[0]));
        setSelectedFile(e.target.files[0]);
    }

    const getUploads = () => {
        const headers = {
            "Accept": 'application/json',
            "Authorization": `Bearer ${authToken}`
        };

        axios.get('http://localhost:8005/api/get-user-uploads-data', {headers})
            .then(resp => {
                console.log(resp.data);
                setUploadsData(resp.data);
            }).catch(error => {
            console.log(error);
        });
    };

    const photoUserId = (e) => {
        console.log(e);
        setLikedPhotoUsedId(e);
        sendUserLikePost();
    };

    const sendUserLikePost = () => {
        const url = 'http://localhost:8005/api/post-user-like';

        const headers = {
            "Accept": 'application/json',
            "Authorization": `Bearer ${authToken}`
        };

        let data = {
            'like': like,
            'UserID': likedPhotoUserId
        };

        console.log(data);

        axios.post(url, data, {headers})
            .then(resp => {
                console.log(resp.data);
            }).catch(error => {
            console.log(error);
        });
    };

    const displayUploadsData = () => {
        return (
            uploadsData.map((photos, index) => {
                return <Grid
                    src={photos.url}
                    likes={photos.likes}
                    userName={photos.name}
                    key={index}
                    doubleClick={photoUserId}
                    value={photos.UserID}
                />
            })
        );
    };

    const fileUpload = () => {
        const url = 'http://localhost:8005/api/file-upload';

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

    return (
        <>
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

            {displayUploadsData()}
        </>

    );
}

export default Gallery;
