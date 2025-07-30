import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from '@pages/Login';
import Home from '@pages/Home';
import Users from '@pages/Users';
import Error404 from '@pages/Error404';
import Root from '@pages/Root';
import ProtectedRoute from '@components/ProtectedRoute';
import Solicitud from '@pages/Solicitud';
import SolicitudD from '@pages/SolicitudD';
import Reuniones from '@pages/Reuniones/Reuniones';
import CrearReunion from '@pages/Reuniones/CrearReunion';
import Reuniones from '@pages/Reuniones/Reuniones';
import CrearHogares from '@pages/Hogares/CrearHogares';
import Hogares from '@pages/Hogares/Hogares';
import '@styles/styles.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Error404 />,
    children: [
      {
        path: 'home',
        element: <Home />
      },
      {
        path: 'users',
        element: (
          <ProtectedRoute allowedRoles={['administrador']}>
            <Users />
          </ProtectedRoute>
        ),
        
      },
    {
      path: 'reuniones/crear',
      element: <CrearReunion />
    },
        {
      path: 'reuniones',
      element: <Reuniones />
    },

      {
        path: 'solicitudes',
        element: <Solicitud />
      },
      {
        path: 'solicitudesD',
        element: <SolicitudD />
      },
       {
        path: 'hogares',
        element: <Hogares />
      },
      {
        path: 'hogares/crear',
        element: <CrearHogares />
      },
       {
        path: 'hogares',
        element: <Hogares />
      }
    ]
  },
  {
    path: 'auth',
    element: <Login />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
