import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';

interface SupplierRouteProps {
  children: ReactNode;
}

export function SupplierRoute({ children }: SupplierRouteProps) {
  const { user, role, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Not authenticated - redirect to login
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Not a supplier - redirect to customer portal
  if (role !== 'supplier_delivery_lead') {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
