"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Code, Lightbulb, Clock, Calculator, Download, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const navItems = [
    { name: "Home", href: "/", icon: null },
    { name: "LaTeX Composer", href: "/latex", icon: <Code className="w-4 h-4 mr-2" /> },
    { name: "Idea Advisor", href: "/advisor", icon: <Lightbulb className="w-4 h-4 mr-2" /> },
    { name: "Pomodoro Timer", href: "/pomodoro", icon: <Clock className="w-4 h-4 mr-2" /> },
    { name: "Converters", href: "/converters", icon: <Calculator className="w-4 h-4 mr-2" /> },
    { name: "Software Guide", href: "/software", icon: <Download className="w-4 h-4 mr-2" /> },
    { name: "Contact", href: "/contact", icon: <Mail className="w-4 h-4 mr-2" /> },
  ]

  return (
    <nav className="bg-gray-900 border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-accent glow-text">Nerdvana</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-accent hover:bg-gray-800 transition-colors"
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu} className="text-gray-300">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-900 pb-4 px-4">
          <div className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-accent hover:bg-gray-800 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

