"use client"

import { contactInfo } from "@/lib/contact"
import Link from "next/link"

export function Footer({ darkMode = false }: { darkMode?: boolean }) {
  return (
    <footer className={`mt-12 w-full ${darkMode ? "text-white" : "text-black"}`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-4 py-4">
          <Link 
            href={contactInfo.links.github} 
            target="_blank" 
            rel="noopener noreferrer"
            className="transition-opacity hover:opacity-80"
          >
            GitHub
          </Link>
          <Link 
            href={contactInfo.links.linkedin} 
            target="_blank" 
            rel="noopener noreferrer"
            className="transition-opacity hover:opacity-80"
          >
            LinkedIn
          </Link>
          <Link 
            href={contactInfo.links.facebook} 
            target="_blank" 
            rel="noopener noreferrer"
            className="transition-opacity hover:opacity-80"
          >
            Facebook
          </Link>
          <Link 
            href={contactInfo.links.mail}
            className="transition-opacity hover:opacity-80"
          >
            Email
          </Link>
          <Link 
            href={contactInfo.links.phone}
            className="transition-opacity hover:opacity-80"
          >
            Phone
          </Link>
        </div>
        <div className="pb-6 text-center text-sm opacity-70">
          &copy; {new Date().getFullYear()} {contactInfo.name}. All rights reserved.
        </div>
      </div>
    </footer>
  )
} 