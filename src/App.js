import logo from "./logo.svg";
import { Route, Routes, Link, Outlet, BrowserRouter } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="p-5">
        <p>E-LOG BOOK | Final Project </p>
        <h1 className=" font-bold text-2xl mb-5">ADEBOYE JACOB</h1>

        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

function Layout() {
  return (
    <div>
      {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
      <nav>
        <ul className=" flex gap-5">
          <li className=" bg-slate-400 p-2 text-white">
            <Link to="/">Home</Link>
          </li>
          <li className=" bg-slate-400 p-2 text-white">
            <Link to="/about">About</Link>
          </li>
          <li className=" bg-slate-400 p-2 text-white">
            <Link to="/dashboard">Login</Link>
          </li>
          <li className=" bg-slate-400 p-2 text-white">
            <Link to="/nothing-here">Nothing Here</Link>
          </li>
        </ul>
      </nav>

      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet />
    </div>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}

export default App;
