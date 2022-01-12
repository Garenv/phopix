import React, {useEffect, useState} from 'react';
import '../../../sass/gallery/gallery.scss';
import Grid from "../Grid/Grid";
import {Button, Image, Modal} from "react-bootstrap";

const Gallery = () => {
    // Preview modal
    const [show, setShow] = useState(false);
    let authToken = localStorage.getItem('token');
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [uploadsData, setUploadsData] = useState([]);
    const [filePreview, setFilePreview] = useState(null);

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


    const getUploads = async () => {
        const headers = {
            "Accept": 'application/json',
            "Authorization": `Bearer ${authToken}`
        }

        await axios.get('http://localhost:8005/api/get-uploads', {headers})
            .then(resp => {
                // console.log(resp);
                setUploadsData([resp.data]);
            }).catch(error => {
            console.log(error);
        });
    };

    const submitPhoto = (e) => {
        e.preventDefault()
        fileUpload(selectedFile);
    }

    const createImage = (file) => {
        let reader = new FileReader();
        reader.onload = (e) => {
            setSelectedFile(e.target.result);
        };
        console.log(reader)
        reader.readAsDataURL(file);
    }

    const onChange = (e) => {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length) {
            return;
        }
        createImage(files[0]);
    }

    const fileUpload = (selectedFile) => {
        const url = 'http://localhost:8005/api/file-upload';
        const formData = {userUpload : selectedFile}

        const headers = {
            "Accept": 'application/json',
            "Authorization": `Bearer ${authToken}`
        }

        console.log(authToken);
        console.log(formData);
        console.log(headers);

        // JSON.stringify(formData);
        axios.post(url, formData, {
            headers: headers
        })
            .then(resp => {
                console.log(resp);
            }).catch(error => {
                console.log(error);
            });
    }

    return (
        <form encType="multipart/form-data" >
            <div className="fileUpload text-center">
                <input type="file" onChange={onChange} name="userUpload" required/>
                {/*<button onClick={() => uploadFile(selectedFile)}>Upload to S3</button>*/}
                <Button variant="primary" onClick={handleShow}>
                    Launch demo modal
                </Button>

                {/*<Button variant="primary" onClick={logout}>*/}
                {/*    Logout*/}
                {/*</Button>*/}
            </div>

            <Modal show={show} onHide={handleClose}>
                <h1>Would you like to upload this photo?</h1>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <Image fluid src={filePreview}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" onClick={submitPhoto}>Upload!</Button>
                </Modal.Footer>
            </Modal>

            {/*{*/}
            {/*    uploadsData.map((photos, index) => {*/}
            {/*        console.log(photos);*/}
            {/*        return <Grid src={photos[index].url} key={index}/>*/}
            {/*    })*/}
            {/*}*/}

        </form>
    );
}

export default Gallery;
