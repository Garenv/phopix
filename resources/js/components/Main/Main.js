import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Grid from "../Grid/Grid";

const Main = () => {
    return (
        <>
            <Router>
                <Switch>
                    <Route path="/gallery">
                        <Grid />
                    </Route>
                </Switch>
            </Router>
        </>
    );
}

export default Main;
