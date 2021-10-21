import { lazy, Suspense } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
import ReactDOM from 'react-dom';
import PublicRoute from "./Routes/PublicRoute/PublicRoute";
import HomePage from "./HomePage/HomePage";
import '../../css/HomePage/homePage.scss';
import {Provider} from "react-redux";
import store from '../store';
import PrivateRoute from "./Routes/PrivateRoute/PrivateRoute";
// import Gallery from "./Gallery/Gallery";

// const HomePage = lazy(() => import('./HomePage/HomePage'));
const Gallery = lazy(() => import('./Gallery/Gallery'));

function App() {
    const isAuthenticated = true;

    return (
        <Router>
            <Suspense fallback={<>Loading...</>}>
                <Switch>
                    <PublicRoute
                        path="/"
                        isAuthenticated={isAuthenticated}
                    >
                        <HomePage/>
                    </PublicRoute>
                    <PrivateRoute
                        path="/gallery"
                        isAuthenticated={isAuthenticated}
                    >
                        <Gallery/>
                    </PrivateRoute>
                </Switch>
            </Suspense>
        </Router>
    );
}

export default App;

if (document.getElementById('example')) {
    ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('example'));
}
