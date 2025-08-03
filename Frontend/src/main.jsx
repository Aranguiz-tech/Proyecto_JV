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
import VistaReuniones from '@pages/Reuniones/VistaReuniones';
import Hogares from '@pages/Hogares/Hogares';
import VistaHogares from '@pages/Hogares/VistaHogares';
import Asistencia from '@pages/Reuniones/Asistencia';
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
        element: (
          <ProtectedRoute allowedRoles={['administrador']}>
            <Reuniones />
          </ProtectedRoute>
        )
      },
      {
        path: 'reuniones/ver',
        element: (
          <ProtectedRoute allowedRoles={['administrador', 'jefe de hogar', 'vecino']}>
            <VistaReuniones />
          </ProtectedRoute>
        )
      },
      {
        path: 'asistencia/:id',
        element: (
          <ProtectedRoute allowedRoles={['administrador']}>
            <Asistencia />
          </ProtectedRoute>
        )
      },
      {
        path: 'solicitudes',
        element: (
          <ProtectedRoute allowedRoles={['jefe de hogar']}>
            <Solicitud />
          </ProtectedRoute>
        )
      },
      {
        path: 'solicitudesD',
        element: (
          <ProtectedRoute allowedRoles={['administrador']}>
            <SolicitudD />
          </ProtectedRoute>
        )
      },
      {
        path: 'hogares',
        element: (
          <ProtectedRoute allowedRoles={['administrador', 'jefe de hogar', 'vecino']}>
            <Hogares />
          </ProtectedRoute>
        )
      },
      {
        path: 'hogares/ver',
        element: (
          <ProtectedRoute allowedRoles={['administrador', 'jefe de hogar', 'vecino']}>
            <VistaHogares />
          </ProtectedRoute>
        )
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
