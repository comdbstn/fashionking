import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export function Footer() {
    const socialLinks = [
        { icon: <Facebook className="w-5 h-5" />, href: "#", label: "Facebook" },
        { icon: <Twitter className="w-5 h-5" />, href: "#", label: "Twitter" },
        { icon: <Instagram className="w-5 h-5" />, href: "#", label: "Instagram" },
        { icon: <Youtube className="w-5 h-5" />, href: "#", label: "Youtube" }
    ];

    const footerLinks = [
        {
            title: "서비스",
            links: [
                { label: "서비스 소개", href: "#about" },
                { label: "주요 기능", href: "#features" },
                { label: "사전예약", href: "#reserve" },
                { label: "FAQ", href: "#faq" }
            ]
        },
        {
            title: "고객지원",
            links: [
                { label: "이용약관", href: "#" },
                { label: "개인정보처리방침", href: "#" },
                { label: "고객센터", href: "#" },
                { label: "제휴문의", href: "#" }
            ]
        }
    ];

    return (
        <footer className="bg-black border-t border-gray-800">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* 로고 및 소개 */}
                    <div className="col-span-1 md:col-span-2">
                        <motion.a
                            href="/"
                            className="text-2xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent inline-block mb-4"
                            whileHover={{ scale: 1.05 }}
                        >
                            FASHIONKING
                        </motion.a>
                        <p className="text-gray-400 mb-6">
                            AI 기술로 당신만의 완벽한 스타일을 찾아드립니다.<br />
                            패션의 새로운 기준, 패션왕과 함께하세요.
                        </p>
                        <div className="flex space-x-4">
                            {socialLinks.map((social) => (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    className="text-gray-400 hover:text-red-500 transition-colors"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    aria-label={social.label}
                                >
                                    {social.icon}
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* 링크 섹션 */}
                    {footerLinks.map((section) => (
                        <div key={section.title}>
                            <h3 className="text-white font-semibold mb-4">{section.title}</h3>
                            <ul className="space-y-2">
                                {section.links.map((link) => (
                                    <li key={link.label}>
                                        <motion.a
                                            href={link.href}
                                            className="text-gray-400 hover:text-red-500 transition-colors"
                                            whileHover={{ x: 5 }}
                                        >
                                            {link.label}
                                        </motion.a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* 카피라이트 */}
                <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
                    <p>© 2024 패션왕. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
} 