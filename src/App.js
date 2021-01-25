import { BrowserRouter as Router , Route, Switch } from "react-router-dom";
import './App.css';
import Header from './Components/Header/Header';
import Layout from './Components/Layout/Layout';
import MovieDetail from "./Components/MovieDetail/MovieDetail";
import NotFound from "./Components/NotFound/NotFound";
import Sidebar from './Components/Sidebar/Sidebar';

function App() {

  return (
    <Router>
      <div className="app">
        <Header/>
        <Switch>
            <Route path="/movie/:movieId">
              <div className="app__container">
                <Sidebar/>
                <MovieDetail/>
              </div>
            </Route>
            <Route exact path="/">
              <div className="app__container">
                  <Sidebar/>
                  <Layout/>
              </div>
            </Route>
            <Route path="*">
              <div className="app__container">
                    <Sidebar/>
                    <NotFound/>
                </div>
            </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
