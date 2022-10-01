const Grid = (props) => {
    return (
        <>
            <div className="section">
                <div className="container">
                    <div className="grid-row">
                        <div className="grid-item">
                            <img src={props.src} alt="Photo" onClick={() => props.onClick(props.userId)} />
                            <h2>{props.userName} {localStorage.getItem('UserID') === props.userId ? <h6 className="you">(You)</h6> : null}</h2>
                            <h5>❤️ {props.likes}</h5>
                            {localStorage.getItem('UserID') === props.userId ? <button className="btn-delete btn-danger" onClick={() => props.userDelete(props.userId)}>Delete</button> : null}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Grid;
