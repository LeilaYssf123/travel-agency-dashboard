import {type RouteConfig, index, route, layout} from "@react-router/dev/routes";

export default [
    route('sign-in','routes/root/sign-in.tsx'),

    layout("routes/Admin/Admin-layout.tsx",[
    route('Dashboard','routes/Admin/Dashboard.tsx'),
        route('All-users','routes/Admin/All-users.tsx'),
        route('trips','routes/Admin/trips.tsx'),
        route('trips/create','routes/Admin/create-trip.tsx'),
]),
] satisfies RouteConfig;