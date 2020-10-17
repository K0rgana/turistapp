import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import AttractionsMap from './pages/AttractionsMap';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing} />
                <Route path="/app" component={AttractionsMap} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;
