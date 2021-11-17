import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Dashboard = React.lazy(
  () =>
    import(
      /* webpackMode: "lazy" */
      /* webpackPrefetch: true */
      /* webpackChunkName: "dashboard" */
      /* webpackPreload: true */
      '../pages/Dashboard'
    ),
);
const Repo = React.lazy(
  () =>
    import(
      /* webpackMode: "lazy" */
      /* webpackPrefetch: true */
      /* webpackChunkName: "repositorios" */
      /* webpackPreload: true */
      '../pages/Repo'
    ),
);

export const Routes: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/repositories/:repository+" component={Repo} />
        </Switch>
      </Suspense>
    </Router>
  );
};
