import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Home as LandingPage } from "./pages/Home";
import { Home as DocsHome } from "./pages/docs/Home";
import { Licensing } from "./pages/docs/Licensing";
import { LicensedResources } from "./pages/docs/LicensedResources";
import { SiteAndApi } from "./pages/docs/SiteAndApi";
import { Installation } from "./pages/docs/Installation";
import { Uninstalling } from "./pages/docs/Uninstalling";
import { ThemeCustomiser } from "./pages/docs/ThemeCustomiser";
import { GameApiSetupGuide } from "./pages/docs/GameApiSetupGuide";
import { PlayerListing } from "./pages/docs/PlayerListing";
import { SetupRefreshTheme } from "./pages/docs/SetupRefreshTheme";
import { McLogs } from "./pages/docs/McLogs";
import { ServerBackgrounds } from "./pages/docs/ServerBackgrounds";
import { Translations } from "./pages/docs/Translations";
import { ResourceAlerts } from "./pages/docs/ResourceAlerts";
import { WebApps } from "./pages/docs/WebApps";
import { StreamLink } from "./pages/docs/StreamLink";
import { EuphoriaLicensing } from "./pages/docs/EuphoriaLicensing";
import { CrafatarApi } from "./pages/docs/CrafatarApi";
import { CrafatarSetup } from "./pages/docs/CrafatarSetup";
import { NitroCraftApi } from "./pages/docs/NitroCraftApi";
import { NitroCraftSetup } from "./pages/docs/NitroCraftSetup";
import { BlueprintAddons } from "./pages/docs/BlueprintAddons";
import { CommunityRefreshTheme } from "./pages/docs/CommunityRefreshTheme";
import { EndstonePlugins } from "./pages/docs/EndstonePlugins";
import { LegalAndTerms } from "./pages/docs/LegalAndTerms";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { RefundPolicy } from "./pages/RefundPolicy";
import { TermsAndConditions } from "./pages/TermsAndConditions";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/docs" element={<DocsHome />} />
        <Route path="/docs/general-guides/licensing" element={<Licensing />} />
        <Route
          path="/docs/general-guides/licensed-resources"
          element={<LicensedResources />}
        />
        <Route
          path="/docs/general-guides/site-and-api"
          element={<SiteAndApi />}
        />
        <Route
          path="/docs/general-guides/installation"
          element={<Installation />}
        />
        <Route
          path="/docs/general-guides/uninstalling"
          element={<Uninstalling />}
        />
        <Route
          path="/docs/euphoria-theme/theme-customiser"
          element={<ThemeCustomiser />}
        />
        <Route
          path="/docs/game-api/setup-guide"
          element={<GameApiSetupGuide />}
        />
        <Route path="/docs/setup/player-listing" element={<PlayerListing />} />
        <Route
          path="/docs/setup/refresh-theme"
          element={<SetupRefreshTheme />}
        />
        <Route path="/docs/setup/mc-logs" element={<McLogs />} />
        <Route
          path="/docs/setup/server-backgrounds"
          element={<ServerBackgrounds />}
        />
        <Route path="/docs/setup/translations" element={<Translations />} />
        <Route
          path="/docs/setup/resource-alerts"
          element={<ResourceAlerts />}
        />
        <Route path="/docs/community/web-apps" element={<WebApps />} />
        <Route path="/docs/community/streamlink" element={<StreamLink />} />
        <Route
          path="/docs/community/euphoria-licensing"
          element={<EuphoriaLicensing />}
        />
        <Route path="/docs/community/crafatar-api" element={<CrafatarApi />} />
        <Route
          path="/docs/community/crafatar-setup"
          element={<CrafatarSetup />}
        />
        <Route
          path="/docs/community/nitrocraft-api"
          element={<NitroCraftApi />}
        />
        <Route
          path="/docs/community/nitrocraft-setup"
          element={<NitroCraftSetup />}
        />
        <Route
          path="/docs/community/blueprint-addons"
          element={<BlueprintAddons />}
        />
        <Route
          path="/docs/community/refresh-theme"
          element={<CommunityRefreshTheme />}
        />
        <Route
          path="/docs/community/endstone-plugins"
          element={<EndstonePlugins />}
        />
        <Route
          path="/docs/legal-and-terms/terms-and-conditions"
          element={<LegalAndTerms />}
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
