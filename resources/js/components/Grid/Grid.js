import React, {useEffect, useState} from 'react';
import '../../../sass/gallery/gallery.scss';

const Grid = (props) => {
    let authToken = localStorage.getItem('token');
    const [like, setLike] = useState(0);

    useEffect(() => {
        createUserPhotoNodes();
    });

    const likesAmount = () => {
        if(like !== 1) {
            setLike(like + 1);
        }

        setLike(like - 1);
    }

    const sendUserLikePost = () => {
        const url = 'http://localhost:8005/api/post-user-like';

        const headers = {
            "Accept": 'application/json',
            "Authorization": `Bearer ${authToken}`
        };

        let data = {
            'like': like
        };

        console.log(data);

        axios.post(url, data, {headers})
            .then(resp => {
                console.log(resp.data);
            }).catch(error => {
            console.log(error);
        });
    }

    const createUserPhotoNodes = () => {
        return (
            <section className="gallery">
                <div className="container">
                    <form method="POST" name="likes" >
                        <div className="img-container">
                            <span onDoubleClick={likesAmount}>
                                <img src={props.src} alt="Photo" className="gallery-img" />
                            </span>
                            <h2 className="userName">{props.userName}</h2>
                            <h2 className="likes">Likes {like}</h2>
                        </div>
                    </form>
                </div>
            </section>
        );
    };

    sendUserLikePost();

    return (
        <>
            {createUserPhotoNodes()}
        </>
    );
}

export default Grid;
