import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function SidebarWrapper() {
  console.log("✅ SidebarWrapper loaded");
  const location = useLocation();
  return <Sidebar pathname={location.pathname} />;
}