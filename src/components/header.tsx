import { useTheme } from "../context/theme-provider";
import { Link } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import CitySearch from "./city-search"
import weatherDark from '../assets/weather-dark.png';
import weatherLight from '../assets/weather-light.png';
import {Cloudy} from 'lucide-react'



function Header() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  return (
    <header className="sticky top-0 z-50  w-full border-b bg-background/95 backdrop-blur py-2 supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/">
          <div className="text-xl font-bold tracking-tight">
            
            {weatherDark && weatherLight ? <img src={`${isDark ? weatherDark : weatherLight}`} alt="☁️" className="h-10 w-10" />:<Cloudy className="h-10 w-10" />}
          </div>
        </Link>
        
        <div className="flex gap-4" >
        <CitySearch />
        <div
          className={`flex items-center space-x-4 cursor-pointer transition-transform duration-500 ${isDark ? "rotate-180" : "rotate-0"}`}
          onClick={() => setTheme(isDark ? "light" : "dark")}
        >
          {isDark ? (
            <Sun className="h-6 w-6 text-yellow-500 rotate-0 transition-all" />
          ) : (
            <Moon className="h-6 w-6 text-blue-500 rotate-0 transition-all" />
          )}
        </div>
       </div>
      </div>
    </header>
  );
}

export default Header;
