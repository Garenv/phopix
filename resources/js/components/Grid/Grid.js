import React from 'react';
import '../../../sass/gallery/gallery.scss';

const Grid = (props) => {
    return (
        <>
            <section className="gallery">
                <div className="container">
                    <div className="img-container">
                        <img src={props.src} alt="" className={props.className} />
                    </div>
                </div>
            </section>
        </>
    );
}

export default Grid;
