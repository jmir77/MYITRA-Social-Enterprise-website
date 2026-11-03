import EnquiryTab from "./components/EnquiryTab";
import { type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "@/components/error-boundary";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import KotakCantik from "@/pages/kotak-cantik";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { SiteBackground } from "@/components/fx/site-background";
import { LogoIntro } from "@/components/fx/logo-reveal";
import { SiteDock } from "@/components/site/SiteDock";
import { Route, Switch, useLocation, Router as WouterRouter } from "wouter";

const queryClient = new QueryClient();

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/kotak-cantik" component={KotakCantik} />
        {/* Added the route path for your Enquiry tab here */}
        <Route path="/enquiry" component={EnquiryTab} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <SiteBackground />
          <LogoIntro />
          <div className="relative z-[1]">
            <Header />
            <main id="main">
              <Router />
            </main>
            <Footer />
          </div>
          <SiteDock />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
