import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { Suspense } from "react";
import Header from "./components/Header";
import { RoutesList } from "./routers/routes";
import LazyLoad from "./components/Lazy/LazyLoad";
import SignInContainer from "./components/Auth/SignIn/SignInContainer";
import SignUpContainer from "./components/Auth/SignUp/SignUpContainer";
import { UserProvider } from "./contexts/UserContext/UserContext";
// const SignIn = React.lazy(() => {

function App() {
  const routes = RoutesList;
  return (
    <UserProvider>
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
              <Route path="/login" element={<SignInContainer />} />
              <Route path="/register" element={<SignUpContainer />} />
            </Routes>
          </BrowserRouter>
        </Suspense>
      </div>
    </UserProvider>
  );
}

export default App;
