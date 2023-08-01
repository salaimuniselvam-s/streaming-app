import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import { Suspense } from "react";
import Loader from "./components/Loader";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminHome from "./pages/AdminHome";
import { withAuth } from "./components/Auth";
import { AnimatePresence } from "framer-motion";

const HomeWithAuth = withAuth(AdminHome);

function App() {
  return (
    <AnimatePresence mode="wait">
      <div className="w-screen max-w-1600 mx-auto flex flex-col ">
        <Header />
        <main className="px-4 md:px-16 py-4 w-full mt-24">
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/*" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/home" element={<HomeWithAuth />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </AnimatePresence>
  );
}

export default App;
