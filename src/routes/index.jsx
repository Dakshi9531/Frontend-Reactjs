import {
Routes,
Route,
Navigate
} from 'react-router-dom';

import AppLayout from '../layouts/AppLayout';

import Dashboard from '../pages/Dashboard';
import Projects from '../pages/Projects';
import ProjectDetail from '../pages/ProjectDetail';
import Overview from '../pages/Overview';
import Estimate from '../pages/Estimate';
import Team from '../pages/Team';
import UserDetail from '../pages/UserDetail';
import NotFound from '../pages/NotFound';

function AppRoutes() {
return (
    <Routes>
    <Route element={<AppLayout />}>

        <Route
        path="/"
        element={
            <Navigate
            to="/projects/1"
            replace
            />
        }
        />

        <Route
        path="/dashboard"
        element={<Dashboard />}
        />

        <Route
        path="/projects"
        element={<Projects />}
        />

        <Route
        path="/users/:userId"
        element={<UserDetail />}
        />

        <Route
        path="/projects/:projectId"
        element={<ProjectDetail />}
        >
        <Route
            index
            element={<Overview />}
        />

        <Route
            path="estimate"
            element={<Estimate />}
        />

        <Route
            path="team"
            element={<Team />}
        />
        </Route>

    </Route>

    <Route
        path="*"
        element={<NotFound />}
    />
    </Routes>
);
}

export default AppRoutes;