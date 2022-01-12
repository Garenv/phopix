import React, {useEffect, useState} from 'react';
import '../../../sass/gallery/gallery.scss';

const Grid = (props) => {
    const [userPhoto, setUserPhoto] = useState([]);

    useEffect(() => {
        createUserPhotoNodes();
    }, []);

    useEffect(() => {
        // console.log("Inside Grid.js second useEffect()");
        // console.log(userPhoto.src);
        setUserPhoto(props);
    }, [userPhoto]);

    const createUserPhotoNodes = () => {
        return (
            <div className="container">
                <div className="img-container">
                    <img src={props.src} alt="Photo" className={props.className} />
                </div>
            </div>
        );
    }

    return (
        <>
            <section className="gallery">
                {createUserPhotoNodes()}
            </section>
        </>
    );
}

export default Grid;
