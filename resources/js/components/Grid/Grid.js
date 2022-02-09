import React from 'react';
import '../../../sass/gallery/gallery.scss';

const Grid = (props) => {
    const createUserPhotoNodes = () => {
        return (
            <section className="gallery">
                <div className="container">
                    <form method="POST" name="likes" >
                        <div className="img-container">
                            <img src={props.src} alt="Photo" className="gallery-img" onDoubleClick={() => props.doubleClick(props.value)}/>
                            <h2 className="userName">{props.userName}</h2>
                            <h2 className="likes" onChange={props.onChange}>Likes {props.likes}</h2>
                        </div>
                    </form>
                </div>
            </section>
        );
    };

    return (
        <>
            {createUserPhotoNodes()}
        </>
    );
}

export default Grid;
