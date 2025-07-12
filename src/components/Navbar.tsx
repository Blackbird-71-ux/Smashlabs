'use client';

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FaBars, FaTimes } from 'react-icons/fa'
import { useRouter, usePathname } from 'next/navigation'
import { trackButtonClick } from '@/lib/analytics'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const router = useRouter();
  const pathname = usePathname();

  // Check if we're on the homepage
  const isHomepage = pathname === '/';

  const navLinks = [
    { id: 'home', label: 'Home', href: '/' },
    { id: 'experience', label: 'Experience', href: isHomepage ? '#experience' : '/#experience' },
    { id: 'themed-rooms', label: 'Rooms', href: '/rooms' },
    { id: 'gallery', label: 'Gallery', href: isHomepage ? '#gallery' : '/#gallery' },
    { id: 'testimonials', label: 'Testimonials', href: isHomepage ? '#testimonials' : '/#testimonials' },
    { id: 'booknow', label: 'Book Now', href: '/book' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Only track active sections on homepage
      if (isHomepage) {
        const sections = document.querySelectorAll('section[id]');
        let currentActive = 'home';
        sections.forEach(section => {
          const sectionTop = section.getBoundingClientRect().top;
          const sectionHeight = section.clientHeight;
          if (sectionTop <= 100 && (sectionTop + sectionHeight) > 100) {
            currentActive = section.id;
          }
        });
        setActiveSection(currentActive);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomepage]);

  const handleNavigation = (link: typeof navLinks[0], e?: React.MouseEvent) => {
    e?.preventDefault();
    setIsMobileMenuOpen(false);

    if (link.href.startsWith('#')) {
      // Section-based navigation (only on homepage)
      const sectionId = link.href.substring(1);
      const element = document.getElementById(sectionId);
      if (element) {
        const offsetTop = element.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
        setActiveSection(sectionId);
      }
    } else if (link.href.startsWith('/#')) {
      // Navigation to homepage section from other pages
      if (isHomepage) {
        const sectionId = link.href.substring(2);
        const element = document.getElementById(sectionId);
        if (element) {
          const offsetTop = element.offsetTop - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
          setActiveSection(sectionId);
        }
      } else {
        router.push(link.href);
      }
    } else {
      // Page-based navigation
      router.push(link.href);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, link: typeof navLinks[0]) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleNavigation(link);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileMenuKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsMobileMenuOpen(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 overflow-x-hidden ${
        isScrolled ? 'bg-dark-900/90 shadow-lg backdrop-blur-lg border-b border-primary-500/20' : 'bg-transparent backdrop-blur-none border-b border-transparent'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between items-center h-20 w-full">
          {/* Logo and Title */}
          <Link 
            href="/" 
            className="flex items-center space-x-3 group focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-dark-900 rounded-lg p-2" 
            aria-label="SmashLabs Home - Go to homepage"
          >
            <Image
              src="/logo.png"
              alt="SmashLabs Logo"
              width={40}
              height={40}
              className="transition-transform duration-300 group-hover:scale-110"
              priority
            />
            <span className={`text-2xl font-extrabold tracking-tight transition-colors duration-300 ${
              isScrolled ? 'text-red-500 group-hover:text-white' : 'text-white group-hover:text-gray-200'
            }`}>
              <span className="text-red-500">SMASH</span>LABS
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6" role="menubar">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={(e) => handleNavigation(link, e)}
                onKeyDown={(e) => handleKeyDown(e, link)}
                className={`text-sm lg:text-base font-medium transition-colors duration-300 whitespace-nowrap px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-dark-900 ${
                  (isHomepage && activeSection === link.id) || (!isHomepage && pathname === link.href) || (link.href === '/rooms' && pathname.startsWith('/rooms'))
                    ? 'text-white font-semibold bg-red-600/20' 
                    : (isScrolled ? 'text-gray-300 hover:text-white hover:bg-gray-700/50' : 'text-gray-300 hover:text-white hover:bg-white/5')
                }`}
                aria-current={((isHomepage && activeSection === link.id) || (!isHomepage && pathname === link.href) || (link.href === '/rooms' && pathname.startsWith('/rooms'))) ? 'page' : undefined}
                role="menuitem"
                tabIndex={0}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            onKeyDown={handleMobileMenuKeyDown}
            className="md:hidden p-3 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-dark-900 transition-colors duration-300 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label={isMobileMenuOpen ? 'Close mobile menu' : 'Open mobile menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? (
              <FaTimes className="w-6 h-6" aria-hidden="true" />
            ) : (
              <FaBars className="w-6 h-6" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
              onClick={handleBackdropClick}
              aria-hidden="true"
            />
            
            {/* Menu Content */}
            <div 
              id="mobile-menu"
              className="md:hidden bg-dark-900/95 backdrop-blur-lg border-t border-gray-700/50 py-4 w-full max-w-full overflow-x-hidden relative z-50"
              role="menu"
              aria-labelledby="mobile-menu-button"
            >
              <div className="flex flex-col space-y-2 px-4 w-full">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={(e) => handleNavigation(link, e)}
                    onKeyDown={(e) => handleKeyDown(e, link)}
                    className={`text-left px-4 py-4 rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-dark-900 w-full max-w-full min-h-[44px] flex items-center transform hover:scale-105 active:scale-95 ${
                      (isHomepage && activeSection === link.id) || (!isHomepage && pathname === link.href) || (link.href === '/rooms' && pathname.startsWith('/rooms'))
                        ? 'text-white font-semibold bg-red-600/20' 
                        : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                    }`}
                    aria-current={((isHomepage && activeSection === link.id) || (!isHomepage && pathname === link.href) || (link.href === '/rooms' && pathname.startsWith('/rooms'))) ? 'page' : undefined}
                    role="menuitem"
                    tabIndex={0}
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 