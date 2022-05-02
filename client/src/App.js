import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import { RoutesList } from "./routers/routes";

function App() {
  const routes = RoutesList;
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Routes>
          {routes.map((route, index) => {
            return (
              <Route path={route.path} element={route.element} key={index} />
            );
          })}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
