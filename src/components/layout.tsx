import type { PropsWithChildren } from "react";
import Header from "./header";
import {Github} from 'lucide-react'


const Layout = ({ children }: PropsWithChildren) => {
  
  return (
    <div className="bg-gradient-to-br from-background to-muted">
      <Header />
      <main className="min-h-screen mx-auto container px-4 py-8">
        {children}
      </main>
      <footer className="border-t backdrop-blur py-12 supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex px-4 w-full text-center text-gray-400"></div>
        <p className="flex justify-center gap-4 font-bold items-center">Made with shadcn{" "} <span> <a href="https://github.com/pavitra0" target="_blank">
        <Github className="h-6 w-6 rounded-lg hover:text-purple-600 transition-all" />
        </a>
          
        </span></p>
        
        
      </footer>
    </div>
  );
};

export default Layout;
