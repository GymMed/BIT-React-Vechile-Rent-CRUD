import { createMemoryRouter, RouterProvider } from "react-router-dom";
import Root from "./components/Routes/Root";

const router = createMemoryRouter([
    {
        path: "/",
        element: <Root />,
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
