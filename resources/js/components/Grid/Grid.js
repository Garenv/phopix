import React, { useEffect, useState } from 'react';
import '../../../sass/gallery/gallery.scss';

const Grid = (props) => {
    // const [userName, setUserName] = useState(props);
    const [like, setLike] = useState(0);



    useEffect(() => {
        createUserPhotoNodes();
    }, []);

    const createUserPhotoNodes = () => {
        return (
            <div className="container">
                <div className="img-container">
                    <img src={props.src} alt="Photo" className="gallery-img" onDoubleClick={() => setLike(like + 1)}/>
                    <h2 className="userName">{props.userName}</h2>
                    <h2 className="likes">Likes {like}</h2>
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
