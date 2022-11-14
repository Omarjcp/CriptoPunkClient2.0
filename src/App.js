import { Route, Routes } from "react-router";
import Home from "./views/home";
import MainLayout from "./layouts/main";
import Punks from "./views/punks";
import Punk from "./views/punk";

function App() {
  return (
    <>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/punks" element={<Punks />} />
          <Route path="/punk/:tokenId" element={<Punk />} />
        </Routes>
      </MainLayout>
    </>
  );
}

export default App;
