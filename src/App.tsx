import { Routes, Route } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";

import Landing from "./Pages/Landing";
import Signup from "./Pages/Signup";
import News from "./Pages/News";
import TradingHub from "./Pages/TradingHub";
import AskStation from "./Pages/AskStation";
import IoTManagement from "./Pages/IoTManagement";
import Account from "./Pages/Account";
import Basket from "./Pages/Basket";

export default function App() {
  return (
    <Routes>
      {/* Landing with custom 3-second loading */}
      <Route element={<MainLayout showHeader={false} showFooter={true} timer={1750} />}>
        <Route path="/" element={<Landing />} />
      </Route>

      {/* Signup without header/footer */}
      <Route element={<MainLayout showHeader={false} showFooter={false} />}>
        <Route path="/signup" element={<Signup />} />
      </Route>

      <Route element={<MainLayout showHeader={true} showFooter={true} />}>
        <Route path="/news" element={<News />} />
      </Route>

      <Route element={<MainLayout showHeader={true} showFooter={true} />}>
        <Route path="/trading" element={<TradingHub />} />
      </Route>

      <Route element={<MainLayout showHeader={true} showFooter={true} />}>
        <Route path="/ask" element={<AskStation />} />
      </Route>

      <Route element={<MainLayout showHeader={true} showFooter={true} />}>
        <Route path="/iot" element={<IoTManagement />} />
      </Route>

      <Route element={<MainLayout showHeader={true} showFooter={true} />}>
        <Route path="/account" element={<Account />} />
      </Route>

      <Route element={<MainLayout showHeader={true} showFooter={true} />}>
        <Route path="/basket" element={<Basket />} />
      </Route>

      {/* Other pages with default loading (1 second) */}
      {/*
      <Route element={<MainLayout />}>
        <Route path="/account" element={<Account />} />
        ...
      </Route>
      */}
    </Routes>
  );
}
