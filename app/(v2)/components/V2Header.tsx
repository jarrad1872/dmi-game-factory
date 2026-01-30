'use client';

import { useState } from 'react';

export default function V2Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/v2', label: 'Home' },
    { href: '/v2/templates', label: 'Templates' },
    { href: '/v2/create', label: 'Create Game' },
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container-dmi">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="/v2" className="flex items-center gap-3">
            <img
              src="https://dmitools.com/cdn/shop/files/dmi_800x470.png?v=1613785694"
              alt="DMI Tools"
              className="h-10 md:h-12 w-auto"
            />
            <div className="hidden sm:block">
              <span className="font-display text-xl md:text-2xl text-dmi-black leading-none">
                Game Factory
              </span>
              <span className="font-ui text-xs text-dmi-gray block">
                Professional Edition
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-ui text-sm font-medium text-dmi-black hover:text-dmi-red transition-colors uppercase tracking-wide"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Made in USA Badge - Desktop */}
            <span className="badge-made-in-usa hidden lg:inline-flex">
              Made in USA
            </span>

            {/* Create Button - Desktop */}
            <a
              href="/v2/create"
              className="btn-dmi-primary hidden sm:inline-block text-sm"
            >
              Create Game
            </a>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-dmi-black"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 animate-fade-in">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-ui text-base font-medium text-dmi-black hover:text-dmi-red hover:bg-dmi-gray px-4 py-3 rounded transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-4 px-4">
                <a
                  href="/v2/create"
                  className="btn-dmi-primary block text-center"
                >
                  Create Game
                </a>
              </div>
              <div className="mt-4 px-4">
                <span className="badge-made-in-usa">Made in USA</span>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
