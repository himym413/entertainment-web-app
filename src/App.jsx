import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home";
import Movies from "./pages/Movies";
import TvSeries from "./pages/TvSeries";
import ShowDetails from "./ui/ShowDetails";
import Bookmarks from "./pages/Bookmarks";
import About from "./ui/About";
import Account from "./pages/Account";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import EmailConfirmation from "./ui/EmailConfirmation";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";
import ProtectedRoute from "./ui/ProtectedRoute";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/tv" element={<TvSeries />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="/about" element={<About />} />
            <Route path="/account" element={<Account />} />
            <Route path="/:type/:showId" element={<ShowDetails />} />
          </Route>

          <Route path="/confirm" element={<EmailConfirmation />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
