import { useContext } from 'react';
import { createBrowserRouter, Navigate, RouterProvider, Outlet } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { AuthContext } from './context/AuthContext';
import Header from './components/header/Header';
import Home from './pages/home/Home';
import Login from './pages/connection/Login';
import Register from './pages/connection/Register';
import NotFound from './pages/notFound/NotFound';
import Sauce from './pages/sauce/Sauce';

export default function App() {

    const { currentUser } = useContext(AuthContext);

    const queryClient = new QueryClient();

    const Layout = ({ children }) => {
        return (
            <QueryClientProvider client={queryClient}>
                <>
                    <Header />
                    {children}
                </>
            </QueryClientProvider>
        );
    };

    const PrivateRoute = ({ component }) => {
        if (!currentUser) {
            return <Navigate to='/piiquante/login' />;
        }
        return component;
    };

    const router = createBrowserRouter([
        {
            path: "/piiquante/",
            element: <Layout><Outlet /></Layout>,
            children: [
                {
                    path: "/piiquante/",
                    element: <PrivateRoute component={<Home />} />
                },
                {
                    path: "/piiquante/login",
                    element: <Login />
                },
                {
                    path: "/piiquante/register",
                    element: <Register />
                },
                {
                    path: "/piiquante/:id",
                    element: <Sauce />
                }
            ]
        },
        {
            path: "*",
            element: <NotFound />
        }
    ]);

    return (
        <RouterProvider router={router} />
    );
}