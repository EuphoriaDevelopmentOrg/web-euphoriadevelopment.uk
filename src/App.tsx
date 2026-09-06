import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { DocsHome } from "./pages/DocsHome";
import { DocsLicensing } from "./pages/DocsLicensing";
import { DocsLicensedResources } from "./pages/DocsLicensedResources";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { RefundPolicy } from "./pages/RefundPolicy";
import { TermsAndConditions } from "./pages/TermsAndConditions";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/docs" element={<DocsHome />} />
        <Route
          path="/docs/general-guides/licensing"
          element={<DocsLicensing />}
        />
        <Route
          path="/docs/general-guides/licensed-resources"
          element={<DocsLicensedResources />}
        />
        <Route path="/legal/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/legal/refund-policy" element={<RefundPolicy />} />
        <Route
          path="/legal/terms-and-conditions"
          element={<TermsAndConditions />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
