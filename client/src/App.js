import './App.css';
import Authentication from './pages/Authentication/Authentication'
import { BrowserRouter, Switch } from 'react-router-dom';
import PublicRoute from './components/PublicRoute/PublicRoute';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Dashboard from './pages/Dashboard/Dashboard';
import NotFound from './pages/NotFound/NotFound';
import NewsPage from './pages/NewsPage/NewsPage';
import SportPage from './pages/SportPage/SportPage';
import TasksPage from './pages/TasksPage/TasksPage';
import PhotosPage from './pages/PhotosPage/PhotosPage';
import background from './assets/Background.png'

function App() {
  return (
    <div style={{ backgroundImage: `url(${background})`, height: '100%',  backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
      <BrowserRouter>
        <Switch>
          <PublicRoute restricted={true} component={Authentication} path="/" />
          <PrivateRoute component={Dashboard} path="/dashboard" />
          <PrivateRoute component={NewsPage} path="/news" />
          <PrivateRoute component={SportPage} path="/sport" />
          <PrivateRoute component={TasksPage} path="/tasks" />
          <PrivateRoute component={PhotosPage} path="/photos" />
          <PublicRoute component={NotFound} />
        </Switch>
      </BrowserRouter>
    </div>

  );
}

export default App;
