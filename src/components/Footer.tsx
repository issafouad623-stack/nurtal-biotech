import Link from 'next/link';
import { Mail, Twitter, Linkedin, Github, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-scientific rounded-lg flex items-center justify-center">
                <span className="text-white font-display text-xl font-bold">N</span>
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold">Nurtal Biotechnologies</h3>
                <p className="text-secondary-400 text-sm font-mono">AI & Biotechnology News</p>
              </div>
            </div>
            <p className="text-secondary-300 leading-relaxed max-w-md">
              Your premier source for cutting-edge biotechnology and AI news. Stay informed with the latest 
              breakthroughs, research, and innovations in the biotech sector.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-secondary-400 hover:text-primary-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-secondary-400 hover:text-primary-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-secondary-400 hover:text-primary-400 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-secondary-400 hover:text-primary-400 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-secondary-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/articles" className="text-secondary-300 hover:text-white transition-colors">
                  All Articles
                </Link>
              </li>
              <li>
                <Link href="/category/ai" className="text-secondary-300 hover:text-white transition-colors">
                  AI News
                </Link>
              </li>
              <li>
                <Link href="/category/biotechnology" className="text-secondary-300 hover:text-white transition-colors">
                  Biotechnology
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-secondary-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Categories</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/category/research" className="text-secondary-300 hover:text-white transition-colors">
                  Research
                </Link>
              </li>
              <li>
                <Link href="/category/innovation" className="text-secondary-300 hover:text-white transition-colors">
                  Innovation
                </Link>
              </li>
              <li>
                <Link href="/category/startup" className="text-secondary-300 hover:text-white transition-colors">
                  Startups
                </Link>
              </li>
              <li>
                <Link href="/category/ai" className="text-secondary-300 hover:text-white transition-colors">
                  Artificial Intelligence
                </Link>
              </li>
              <li>
                <Link href="/category/biotechnology" className="text-secondary-300 hover:text-white transition-colors">
                  Biotechnology
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-secondary-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-secondary-400 text-sm">
              © {currentYear} Nurtal Biotechnologies News. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <Link href="/privacy" className="text-secondary-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-secondary-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
              <Link href="/contact" className="text-secondary-400 hover:text-white text-sm transition-colors">
                Contact
              </Link>
            </div>
          </div>
          <div className="text-center mt-4">
            <p className="text-secondary-500 text-xs flex items-center justify-center">
              Made with <Heart className="w-3 h-3 mx-1 text-red-500" /> for the future of biotechnology
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
