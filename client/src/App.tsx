import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { useAuth } from "./_core/hooks/useAuth";
import { useEffect } from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Testimonials from "./pages/Testimonials";
import Dashboard from "./pages/Dashboard";
import DashboardNew from "./pages/DashboardNew";
import ManageServices from "./pages/ManageServices";
import ManageTestimonials from "./pages/ManageTestimonials";
import Login from "./pages/Login";
import Unauthorized from "./pages/Unauthorized";
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header";
import Footer from "./components/Footer";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/about"} component={About} />
      <Route path={"/services"} component={Services} />
      <Route path={"/testimonials"} component={Testimonials} />
      <Route path={"/login"} component={Login} />
      <Route path={"/unauthorized"} component={Unauthorized} />
      <Route path={"/dashboard"}>
        <ProtectedRoute><DashboardNew /></ProtectedRoute>
      </Route>
      <Route path={"/dashboard-old"}>
        <ProtectedRoute><Dashboard /></ProtectedRoute>
      </Route>
      <Route path={"/manage-services"}>
        <ProtectedRoute><ManageServices /></ProtectedRoute>
      </Route>
      <Route path={"/manage-testimonials"}>
        <ProtectedRoute><ManageTestimonials /></ProtectedRoute>
      </Route>
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function AutoRedirectToDashboard() {
  return null;
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <AutoRedirectToDashboard />
          <Header />
          <Router />
          <Footer />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;

