import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./global.css";
import { BrowserRouter, Routes, Route } from "react-router";
import RootLayout from "./components/layouts/root-layout.page";
import HomePage from "./pages/Home.page";
import NotFoundPage from "./pages/Not-found.page";
import SignInPage from "./pages/Sign-in.page";
import SignUpPage from "./pages/Sign-up.page";
import AccountPage from "./pages/Account.page"
import BookingPage from "./pages/Booking.page";
import HotelDetailsPage from "./pages/HotelDetails.page";
import HotelsPage from "./pages/Hotels.page";
import { Provider } from "react-redux";
import { store } from "./lib/store";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/sign-in" element={<SignInPage/>} />
          <Route path="/sign-up" element={<SignUpPage/>} />
          <Route path="/account" element={<AccountPage/>} />
          <Route path="/hotels" element={<HotelsPage />} />
          <Route path="/hotels/:_id" element={<HotelDetailsPage />} />
          <Route path="/hotels/:_id/book" element={<BookingPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
    </Provider>
  </StrictMode>
);
