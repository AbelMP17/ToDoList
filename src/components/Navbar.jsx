import { Link, useLocation } from "react-router-dom";
export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="flex w-full gap-5 justify-center items-center">
      <Link className={`${location.pathname === '/' && 'bg-opacity-70 shadow-inner shadow-[#d3b26c]'} p-5 rounded-xl hover:bg-opacity-70 bg-[#f8d27f] transition-all duration-500`} to="/">Cosas Por Hacer</Link>
      <Link className={`${location.pathname === '/misApuntes' && 'bg-opacity-70 shadow-inner shadow-[#d3b26c]'} p-5 rounded-xl hover:bg-opacity-70 bg-[#f8d27f] transition-all duration-500`} to="/misApuntes">Mis Apuntes</Link>
    </nav>
  );
}
