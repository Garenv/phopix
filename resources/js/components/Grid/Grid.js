import React, {useEffect} from 'react';
import '../../../sass/gallery/gallery.scss';

const Grid = (props) => {
    useEffect(() => {
        createUserPhotoNodes();
    }, []);

    const generateImgTag = () => {
        return (
            <img src={props.src} alt="Photo" className="gallery-img" />
        );
    };

    const createUserPhotoNodes = () => {
        return (
            <div className="container">
                <div className="img-container">
                    <img src={props.src} alt="Photo" className="gallery-img" />
                    {/*<img src={props.src} alt="Photo" className="gallery-img" />*/}
                </div>
            </div>
        );
    };

    return (
        <>
            <section className="gallery">
                {createUserPhotoNodes()}
            </section>
        </>
    );
}

export default Grid;
