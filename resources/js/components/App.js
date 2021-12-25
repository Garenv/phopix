import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, useHistory} from 'react-router-dom';
import ReactDOM from 'react-dom';
import '../../sass/HomePage/homePage.scss';
import LoginRegister from "./LoginRegister/LoginRegister";
import Gallery from "./Gallery/Gallery";

const App = () => {
    let { push } = useHistory();
    let authToken = localStorage.getItem('token');

    useEffect(() => {
        if (authToken !== null) {
            // getUploads();
            push('/gallery');
        } else {
            console.log("User's NOT authenticated, returning to login view");
            push('/');
        }
    }, [push, authToken]);

    return (
        <>
            <Switch>
                <Route exact path="/" component={LoginRegister} />
                <Route exact path="/gallery" component={Gallery} />
            </Switch>
        </>
    );
}

export default App;

if (document.getElementById('example')) {
    ReactDOM.render(<Router><App/></Router>, document.getElementById('example'));
}
