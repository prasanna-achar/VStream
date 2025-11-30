import React from 'react'
import { Link } from 'react-router-dom'
import { Github, Twitter, Linkedin, Mail } from 'lucide-react'

function Footer() {
    return (
        <footer className="bg-gray-800 text-white border-t border-gray-200 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

                    {/* Brand Section */}
                    <div className="col-span-1 md:col-span-1">
                        <a
                            href="https://github.com/prasanna-achar/VStream"
                            target="_blank"
                            className="flex items-center space-x-2 mb-4">
                            <img
                                src="/VStream Logo in Blue and Gray.png"
                                alt="Logo"
                                className="w-8 h-8 rounded-2xl"
                            />
                            <h2 className="text-xl font-bold text-blue-600">VStream</h2>
                        </a>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Share your stories with the world. The best platform for video content creators and viewers.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Platform</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/" className="text-gray-500 hover:text-blue-600 transition-colors text-sm">Home</Link>
                            </li>
                            <li>
                                <Link to="/videos" className="text-gray-500 hover:text-blue-600 transition-colors text-sm">Explore</Link>
                            </li>
                            <li>
                                <Link to="/videos/upload" className="text-gray-500 hover:text-blue-600 transition-colors text-sm">Upload Video</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Support</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/" className="text-gray-500 hover:text-blue-600 transition-colors text-sm">Help Center</Link>
                            </li>
                            <li>
                                <Link to="/" className="text-gray-500 hover:text-blue-600 transition-colors text-sm">Terms of Service</Link>
                            </li>
                            <li>
                                <Link to="/" className="text-gray-500 hover:text-blue-600 transition-colors text-sm">Privacy Policy</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Social Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Connect</h3>
                        <div className="flex space-x-4">
                            <a href="https://github.com/prasanna-achar/VStream" target="_blank" className="text-gray-400 hover:text-blue-600 transition-colors">
                                <Github size={20} />
                            </a>
                            <a href="/" className="text-gray-400 hover:text-blue-400 transition-colors">
                                <Twitter size={20} />
                            </a>
                            <a href="/" className="text-gray-400 hover:text-blue-700 transition-colors">
                                <Linkedin size={20} />
                            </a>
                            <a href="/" className="text-gray-400 hover:text-red-500 transition-colors">
                                <Mail size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-200 mt-12 pt-8">
                    <p className="text-center text-gray-400 text-sm">
                        &copy; {new Date().getFullYear()} VStream. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
