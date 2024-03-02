import { createMemoryRouter, RouterProvider } from "react-router-dom";
import Root from "./components/Routes/Root";

const routes = [
    {
        path: "/",
        element: <Root />,
    },
];

const router = createMemoryRouter(routes, {
    initialEntries: ["/"],
    initialIndex: 1,
});

function App() {
    return <RouterProvider router={router} />;
}

export default App;
