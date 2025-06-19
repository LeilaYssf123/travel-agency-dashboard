import {type RouteConfig, index, route, layout} from "@react-router/dev/routes";

export default [

    layout("routes/Admin/Admin-layout.tsx",[
    route('Dashboard','routes/Admin/Dashboard.tsx'),
        route('All-users','routes/Admin/All-users.tsx')
]),
] satisfies RouteConfig;