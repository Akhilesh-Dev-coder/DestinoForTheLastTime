import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { TripProvider } from "./context/TripContext";

// Import pages
import Index from "./pages/Index";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ForgotPassword from "./pages/auth/ForgotPassword";
import AdminLogin from "./pages/auth/AdminLogin";
import Results from "./pages/Results";
import ManageUsers from "./pages/admin/ManageUsers";
import NotFound from "./pages/NotFound";
import TripsPage from "./pages/TripsPage";
import SharedTrip from "./pages/SharedTrip";
import StaffDashboard from "./pages/staff/StaffDashboard";
import StaffLogin from "./pages/auth/StaffLogin";

// Admin pages (all from /admin folder)
import Dashboard from "./pages/admin/Dashboard";
import Reports from "./pages/admin/Reports";
import Audit from "./pages/admin/Audit";
import Support from "./pages/admin/Support";
import AdminContent from "./pages/admin/AdminContent";
import Feedback from "./pages/admin/Feedback"; // ✅ NEW: Feedback page
import UserDashboard from "./pages/UserDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <TripProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={< UserDashboard/>} />
            
            {/* Authentication Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/staff-login" element={<StaffLogin />} />

            {/* User Routes */}
            <Route path="/results" element={<Results />} />
            
            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/users" element={<ManageUsers />} />
            <Route path="/admin/reports" element={<Reports />} />
            <Route path="/admin/audit" element={<Audit />} />
            <Route path="/admin/support" element={<Support />} />
            <Route path="/admin/content" element={<AdminContent />} />
            <Route path="/admin/feedback" element={<Feedback />} /> {/* ✅ NEW ROUTE */}

            {/* Other Public Routes */}
            <Route path="/trips" element={<TripsPage />} />
            <Route path="/trip/:id" element={<SharedTrip />} />
            
            {/* Staff Routes */}
            <Route path="/staff/panel" element={<StaffDashboard />} />
            
            {/* Redirect /admin to dashboard */}
            <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TripProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;