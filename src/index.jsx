import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './styles/index.scss';
import './styles/card.scss';
import './styles/submit.scss';
import './styles/usersPage.scss'
import {SignUp} from './components/SignUp';
import {LogIn} from './components/LogIn';
import {UsersPage} from './components/UsersPage';
import App from './components/App';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "/login",
    element: <LogIn/>
  },
  {
    path: "/signup",
    element: <SignUp/>
  },
  {
    path: "/users-page",
    element: <UsersPage/>
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
