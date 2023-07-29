import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import { Suspense } from "react";
import Loader from "./components/Loader";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { withAuth } from "./components/Auth";

const HomeWithAuth = withAuth(Home);

function App() {
  return (
    <div className="w-screen max-w-1600 mx-auto min-h-screen flex flex-col ">
      <Header />
      <main className="mt-14  md:mt-20 px-4 md:px-16 py-4 w-full">
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/*" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<HomeWithAuth />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

export default App;
