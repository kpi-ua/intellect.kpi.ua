import { createBrowserRouter } from 'react-router-dom';

import App from '../App';
import IAbout from '../components/pages/I-About/I-About';
import Contacts from '../components/pages/Contacts/Contacts';
import Search from '../components/pages/Search/Search';
import ITeacherInfo from '../components/pages/I-TeacherInfo/I-TeacherInfo';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: 'about',
        element: <IAbout />
      },
      {
        path: 'contacts',
        element: <Contacts />
      },
      {
        path: 'search',
        element: <Search />
      },
      {
        path: 'teacher/:teacherId',
        element: <ITeacherInfo />
      }
    ]
  },
]);

export default router;
