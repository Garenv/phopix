import React, { useState } from 'react';
import '../../../sass/gallery/gallery.scss';

const Grid = (props) => {
    const [likes, setLikes] = useState(props.likes);
    // Note: props.value contains the photo's UserID

    const createUserPhotoNodes = () => {
        return (
            <section className="gallery">
                <div className="container">
                    <span style={{display: 'none'}}>{props.currentUserClicks}</span>
                    <div className="img-container">
                        <img src={props.src} alt="Photo" className="gallery-img" onClick={() => props.onClick(props.value, props.currentUserClicks > 1 ? setLikes(props.likes) : setLikes(props.likes + 1))}/>
                        <h2 className="userName">{props.userName}</h2>
                        <h2 className="likes">Likes {likes}</h2>
                        {localStorage.getItem('UserID') === props.value ? <button onClick={() => props.userDelete(props.value)}>delete</button> : null}
                    </div>
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
