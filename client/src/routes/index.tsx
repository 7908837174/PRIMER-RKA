import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import BaseLayout from "@/layout/base.layout";
import NotFound from "@/page/errors/NotFound";

// Import pages directly
import SignIn from "@/page/auth/Sign-in";
import SignUp from "@/page/auth/Sign-up";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root to sign-in */}
        <Route path="/" element={<Navigate to="/sign-in" replace />} />

        {/* Auth routes - simplified */}
        <Route element={<BaseLayout />}>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Route>

        {/* Catch-all for undefined routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;