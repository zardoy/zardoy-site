import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home'
import Ow from './components/Ow'
import { PuffsContainer } from './components/Background'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/ow',
        element: <Ow />,
    },
    {
        path: '/*',
        element: <PuffsContainer />,
    },
])

export default () => <RouterProvider router={router} />
