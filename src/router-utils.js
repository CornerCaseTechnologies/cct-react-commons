import React from 'react';
import {Redirect, Route} from 'react-router-dom';

function RouterUtils(isLoggedInFunc) {

    this.ReactRoute = (route) => {
        route.routes.map((routeItem) => {
            routeItem.path = route.path + routeItem.path;
            routeItem.onlyAuthorized = route.onlyAuthorized || routeItem.onlyAuthorized;
            routeItem.onlyNotAuthorized = route.onlyNotAuthorized || routeItem.onlyNotAuthorized;
            routeItem = this.ReactRoute(routeItem);
            return routeItem;
        });
        return route;
    };

    this.RouteWithSubRoutes = (route) => (
        <Route path={route.path} render={(props) => {

            if ((route.onlyAuthorized && !isLoggedInFunc()) || (route.onlyNotAuthorized && isLoggedInFunc())) {
                return this.redirectHome(props.location);
            }

            return <route.component {...props} routes={route.routes}/>;
        }}/>
    );

    this.redirectHome = (path, location) => {
        return (<Redirect to={{
            pathname: '/',
            state: {
                from: location,
            }
        }}/>);
    };
}

export default RouterUtils;
