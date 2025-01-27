import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { name: '서비스 소개', href: '#about' },
        { name: '주요 기능', href: '#features' },
        { name: 'FAQ', href: '#faq' }
    ];

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                    isScrolled ? 'bg-black/80 backdrop-blur-lg' : 'bg-transparent'
                }`}
            >
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-20">
                        {/* 로고 */}
                        <motion.a
                            href="/"
                            className="text-2xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            FASHIONKING
                        </motion.a>

                        {/* 데스크톱 메뉴 */}
                        <div className="hidden md:flex items-center space-x-8">
                            {navItems.map((item) => (
                                <motion.a
                                    key={item.name}
                                    href={item.href}
                                    className="text-white hover:text-red-400 transition-colors"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {item.name}
                                </motion.a>
                            ))}
                            <motion.a
                                href="#reserve"
                                className="px-6 py-2 rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold hover:opacity-90 transition-opacity"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                사전예약
                            </motion.a>
                        </div>

                        {/* 모바일 메뉴 버튼 */}
                        <div className="md:hidden">
                            <motion.button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="text-white p-2"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                {isMobileMenuOpen ? <X /> : <Menu />}
                            </motion.button>
                        </div>
                    </div>
                </div>
            </motion.nav>

            {/* 모바일 메뉴 */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-40 bg-black/95 backdrop-blur-lg md:hidden pt-20"
                    >
                        <div className="container mx-auto px-4 py-8">
                            <div className="flex flex-col space-y-6">
                                {navItems.map((item) => (
                                    <motion.a
                                        key={item.name}
                                        href={item.href}
                                        className="text-white text-lg hover:text-red-400 transition-colors"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {item.name}
                                    </motion.a>
                                ))}
                                <motion.a
                                    href="#reserve"
                                    className="px-6 py-2 rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold hover:opacity-90 transition-opacity"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    사전예약
                                </motion.a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
} 