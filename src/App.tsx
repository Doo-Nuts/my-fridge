import { Route, Routes } from "react-router-dom";
import "./App.css";
import GlobalLayout from "./components/GlobalLayout";
import Home from "./Home";
import Items from "./items";
import AddItem from "./add-item";
import Settings from "./settings";
import AuthPage from "./AuthPage";


function App() {
  return (
      <GlobalLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/items" element={<Items />} />
          <Route path="/add-item" element={<AddItem />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </GlobalLayout>
    
  );
}

export default App;
