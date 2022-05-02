import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { Suspense } from "react";

import Header from "./components/Header";
import { RoutesList } from "./routers/routes";
import LazyLoad from "./components/Lazy/LazyLoad";
const SignIn = React.lazy(() => {
  return new Promise((resolve) => setTimeout(resolve, 3 * 1000)).then(() =>
    import("./components/Auth/SignIn/SignIn")
  );
});

function App() {
  const routes = RoutesList;
  return (
    <div className="App">
      <Suspense fallback={<LazyLoad />}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Header />}>
              {routes.map((route, index) => {
                return (
                  <Route
                    path={route.path}
                    element={route.element}
                    key={index}
                  />
                );
              })}
            </Route>
            <Route path="/login" element={<SignIn />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
