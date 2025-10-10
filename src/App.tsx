import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/auth/authContext";
import { AppRoutes } from "./routes/appRoutes";
import AntConfigurationProvider from "./antConfigProvider";
import "./i18n";
function App() {
  return (
    <BrowserRouter>
      <AntConfigurationProvider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </AntConfigurationProvider>
    </BrowserRouter>
  );
}

export default App;
