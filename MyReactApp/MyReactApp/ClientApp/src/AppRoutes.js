import { Counter } from "./components/Counter";
import { Department } from "./components/Department";
import { Employee } from "./components/Employee";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";

const AppRoutes = [
    {
        index: true,
        element: <Home />
    },
    {
        path: '/counter',
        element: <Counter />
    },
    {
        path: '/fetch-data',
        element: <FetchData />
    },
    {
        path: '/department',
        element: <Department />
    },
    {
        path: '/employee',
        element: <Employee />
    }
];

export default AppRoutes;
