import { Switch, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from "./hoc/Layout/Layout";

import "./App.scss";
const HomePage = lazy(() =>
  import("./views/HomePage/HomePage.jsx" /*webpackChunkName: "HomePageLazy"*/)
);
const Movies = lazy(() =>
  import("./views/Movies/Movies.jsx" /*webpackChunkName: "MoviesLazy"*/)
);
const NotFoundView = lazy(() =>
  import("./views/NotFoundView.jsx" /*webpackChunkName: "NotFoundView"*/)
);
const MovieDetails = lazy(() =>
  import(
    "./components/MovieDetails/MovieDetails.jsx" /*webpackChunkName: "MovieDetails"*/
  )
);

function App() {
  return (
    <Layout>
      <Suspense
        fallback={
          <>
            <h1>loader ... </h1>
          </>
        }
      >
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/react-hw-04-movies" exact component={HomePage} />
          <Route path="/movies" exact component={Movies} />
          <Route path="/movies/:moviesId" component={MovieDetails} />
          <Route component={NotFoundView} />
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;
