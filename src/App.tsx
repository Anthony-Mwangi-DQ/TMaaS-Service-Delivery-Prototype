import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { SupplierRoute } from "@/components/auth/SupplierRoute";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import ServiceRequests from "./pages/ServiceRequests";
import ServiceDetail from "./pages/ServiceDetail";
import Notifications from "./pages/Notifications";
import Documents from "./pages/Documents";
import Messages from "./pages/Messages";
import Reporting from "./pages/Reporting";
import NotFound from "./pages/NotFound";

// Console (Supplier) Pages
import ConsoleIndex from "./pages/console/ConsoleIndex";
import ConsoleDeliveries from "./pages/console/ConsoleDeliveries";
import DeliveryDetail from "./pages/console/DeliveryDetail";
import ConsoleNotifications from "./pages/console/ConsoleNotifications";
import ConsoleDocuments from "./pages/console/ConsoleDocuments";
import ConsoleMessages from "./pages/console/ConsoleMessages";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            
            {/* Customer Portal Routes */}
            <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
            <Route path="/services" element={<ProtectedRoute><ServiceRequests /></ProtectedRoute>} />
            <Route path="/services/:id" element={<ProtectedRoute><ServiceDetail /></ProtectedRoute>} />
            <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
            <Route path="/documents" element={<ProtectedRoute><Documents /></ProtectedRoute>} />
            <Route path="/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
            <Route path="/reporting" element={<ProtectedRoute><Reporting /></ProtectedRoute>} />
            
            {/* DQ Delivery Console Routes */}
            <Route path="/console" element={<SupplierRoute><ConsoleIndex /></SupplierRoute>} />
            <Route path="/console/deliveries" element={<SupplierRoute><ConsoleDeliveries /></SupplierRoute>} />
            <Route path="/console/deliveries/:id" element={<SupplierRoute><DeliveryDetail /></SupplierRoute>} />
            <Route path="/console/notifications" element={<SupplierRoute><ConsoleNotifications /></SupplierRoute>} />
            <Route path="/console/documents" element={<SupplierRoute><ConsoleDocuments /></SupplierRoute>} />
            <Route path="/console/messages" element={<SupplierRoute><ConsoleMessages /></SupplierRoute>} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
