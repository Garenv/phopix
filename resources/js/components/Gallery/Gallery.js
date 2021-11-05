import React, {useEffect} from 'react';
import '../../../sass/gallery/gallery.scss';

const Gallery = () => {
    return (
        <>
            <section className="gallery">
                <div className="container">
                    <h1>Our Gallery</h1>
                    <div className="img-container">
                        <img src="https://cruskip.s3.us-east-2.amazonaws.com/assets/images/hw/Resized_extra_image_66940818572588.jpeg" alt="" className="gallery-img"/>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Gallery;
