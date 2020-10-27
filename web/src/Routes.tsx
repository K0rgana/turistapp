import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import AttractionsMap from './pages/AttractionsMap';
import Attraction from './pages/Attraction';
import CreateAttraction from './pages/CreateAttraction';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing} />
                <Route path="/app" component={AttractionsMap} />
                <Route
                    path="/attractions/create"
                    component={CreateAttraction}
                />
                <Route path="/attractions/:id" component={Attraction} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;
