import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Grid from "../Grid/Grid";
import PrizeStatus from "../Pages/PrizeStatus/PrizeStatus";

const Gallery = () => {
    return (
        <>
            <Router>
                <Switch>
                    <Route path="/gallery">
                        <Grid />
                    </Route>
                    <Route path="/prizeStatus">
                        <PrizeStatus />
                    </Route>
                </Switch>
            </Router>
        </>
    );
}

export default Gallery;
