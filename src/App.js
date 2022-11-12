import { Route, Routes } from "react-router";
import Home from "./views/home";
import MainLayout from "./layouts/main";

function App() {
  return (
    <>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </MainLayout>
    </>
  );
}

export default App;
