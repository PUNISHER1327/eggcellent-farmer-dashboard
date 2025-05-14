
import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@/hooks/useTheme';
import { useLanguage } from '@/hooks/useLanguage';
import { useAuth } from '@/hooks/useAuth';
import ActivateKitForm from './ActivateKitForm';
import { Button } from '@/components/ui/button';

interface DashboardAccessCheckProps {
  children: React.ReactNode;
}

const DashboardAccessCheck: React.FC<DashboardAccessCheckProps> = ({ children }) => {
  // Simply render the children directly to bypass authentication
  return <>{children}</>;
};

export default DashboardAccessCheck;
