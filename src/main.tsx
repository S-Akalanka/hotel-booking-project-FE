import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./global.css";
import { BrowserRouter, Routes, Route } from "react-router";
import RootLayout from "./components/layouts/root-layout.page";
import HomePage from "./pages/Home.page";
import NotFoundPage from "./pages/not-found.page";
import SignInPage from "./pages/sign-in.page";
import SignUpPage from "./pages/sign-up.page";
import AccountPage from "./pages/Account.page";
import BookingPage from "./pages/Booking.page";
import HotelDetailsPage from "./pages/HotelDetails.page";
import HotelsPage from "./pages/Hotels.page";
import { Provider } from "react-redux";
import { store } from "./lib/store";
import { ClerkProvider } from "@clerk/clerk-react";
import ProtectLayout from "./components/layouts/protect.layout";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<RootLayout />}>
              <Route index element={<HomePage />} />
              <Route path="/sign-in" element={<SignInPage />} />
              <Route path="/sign-up" element={<SignUpPage />} />
              <Route path="/hotels" element={<HotelsPage />} />
              <Route element={<ProtectLayout />}>
                <Route path="/users" element={<AccountPage />} />
                <Route path="/hotels/:_id" element={<HotelDetailsPage />} />
                <Route path="/hotels/:_id/book" element={<BookingPage />} />
              </Route>
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </ClerkProvider>
  </StrictMode>
);
