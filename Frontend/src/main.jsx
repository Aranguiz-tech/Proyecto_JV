import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from '@pages/Login';
import Home from '@pages/Home';
import Users from '@pages/Users';
import Register from '@pages/Register';
import Error404 from '@pages/Error404';
import Root from '@pages/Root';
import ProtectedRoute from '@components/ProtectedRoute';
import Solicitud from '@pages/Solicitud';
import Reuniones from '@pages/Reuniones/Reuniones';
import CrearReunion from '@pages/Reuniones/CrearReunion';
import VerReuniones from '@pages/Reuniones/VerReuniones';
import Hogares from '@pages/Hogares/Hogares';
import CrearHogares from '@pages/Hogares/CrearHogares';
import VerHogares from '@pages/Hogares/VerHogares';
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
        )
      },
      {
      path: 'reuniones',
      element: <Reuniones />
    },
    {
      path: 'reuniones/crear',
      element: <CrearReunion />
    },
        {
      path: 'reuniones/ver',
      element: <VerReuniones />
    },

      {
        path: 'solicitudes',
        element: <Solicitud />
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
        path: 'hogares/ver',
        element: <VerHogares />
      }
    ]
  },
  {
    path: 'auth',
    element: <Login />
  },
  {
    path: 'register',
    element: <Register />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
