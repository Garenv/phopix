import { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, useHistory} from 'react-router-dom';
import ReactDOM from 'react-dom';
// import HomePage from "./HomePage/HomePage";
import '../../sass/HomePage/homePage.scss';
// import PublicRoute from './Routes/PublicRoute';
// import PrivateRoute from "./Routes/PrivateRoute";
import LoginRegister from "./LoginRegister/LoginRegister";
import Gallery from "./Gallery/Gallery";

// const gallery = lazy(() => import('../components/gallery/gallery'));

function App() {
    let history = useHistory();
    const [userState, setUserState] = useState(localStorage.getItem("token"));

    useEffect(() => {
        let authToken = localStorage.getItem('token');
        console.log(authToken);
        if (authToken !== null) {
            // console.log(authToken, "User's authenticated, returning to gallery view");
            return history.push('/gallery');
        }
        console.log("User's NOT authenticated, returning to login view");
        return history.push('/');
    });

    return (
        <>
            <Switch>
                <Route exact path="/" component={LoginRegister} />
                <Route exact path="/gallery" component={Gallery}/>
            </Switch>
        </>
    );
}

export default App;

if (document.getElementById('example')) {
    ReactDOM.render(<Router><App/></Router>, document.getElementById('example'));
}
