import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useMotionTemplate, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, Zap, Users, Flame, Camera, Share2, Smartphone, Search, ShoppingBag, Palette, MessageCircle, Heart, PlusCircle, MinusCircle, Trophy } from "lucide-react";
import { Navbar } from "../components/navigation/Navbar";
import { Footer } from "../components/layout/Footer";

export function MainPage() {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        agree: false
    });

    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

    // FAQ 데이터
    const faqs = [
        {
            question: "패션왕은 어떤 서비스인가요?",
            answer: "패션왕은 AI 기술을 활용하여 인플루언서에게 다양한 옷을 입혀보고 실시간으로 패션 대결을 펼칠 수 있는 서비스입니다. 나만의 독특한 패션 감각으로 최고의 스타일리스트가 되어보세요."
        },
        {
            question: "어떻게 사용하나요?",
            answer: "앱을 다운로드하고 인플루언서를 선택한 후, AI 기술로 다양한 옷을 입혀 스타일링을 완성하세요. 완성된 스타일로 다른 유저들과 실시간 패션 대결을 펼칠 수 있습니다."
        },
        {
            question: "패션 대결은 어떻게 진행되나요?",
            answer: "두 명의 유저가 각자 스타일링한 패션이 실시간으로 대결하며, 다른 유저들의 투표로 승자가 결정됩니다. 승리할수록 랭킹이 올라가고 다양한 보상을 받을 수 있습니다."
        },
        {
            question: "사전예약 특전은 무엇인가요?",
            answer: "사전예약 고객님께는 출시 후 3개월간 프리미엄 기능을 무료로 제공해드립니다. 프리미엄 의류 아이템 패키지와 특별한 인플루언서 스킨도 드립니다."
        },
        {
            question: "랭킹 시스템은 어떻게 운영되나요?",
            answer: "시즌제로 운영되며, 패션 대결에서의 승리와 획득한 좋아요 수에 따라 점수가 부여됩니다. 상위 랭커에게는 특별한 보상이 제공됩니다."
        }
    ];

    // Motion hooks for gradient effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const gradientX = useTransform(mouseX, [0, window.innerWidth], [0, 100]);
    const gradientY = useTransform(mouseY, [0, window.innerHeight], [0, 100]);
    const background = useMotionTemplate`radial-gradient(circle at ${gradientX}% ${gradientY}%, rgba(239,68,68,0.15), transparent 70%)`;

    const handleMouseMove = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        const { clientX, clientY } = e;
        mouseX.set(clientX);
        mouseY.set(clientY);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // TODO: 서버로 데이터 전송
        console.log(formData);
        alert("사전예약이 완료되었습니다!");
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-black text-white" onMouseMove={handleMouseMove}>
                {/* 히어로 섹션 */}
                <section className="relative min-h-screen flex items-center pt-20">
                    <motion.div 
                        className="absolute inset-0" 
                        style={{ background }}
                    />
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-60"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.6 }}
                        transition={{ duration: 1 }}
                    />
                    <div className="container mx-auto px-4 relative">
                        <div className="max-w-4xl mx-auto text-center">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.5 }}
                                className="w-20 h-20 mx-auto mb-8 relative"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-full blur-xl opacity-50" />
                                <div className="relative w-full h-full flex items-center justify-center">
                                    <Flame className="w-12 h-12 text-red-500" />
                                </div>
                            </motion.div>
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.4,
                                    type: "spring",
                                    stiffness: 150
                                }}
                                className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent leading-tight"
                            >
                                AI로 만드는<br />나만의 패션 배틀
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.4 }}
                                className="text-xl text-gray-300 mb-12"
                            >
                                인플루언서에게 AI로 옷을 입혀 패션을 완성하고<br />
                                실시간 투표로 최고의 스타일을 가리세요
                            </motion.p>

                            {/* CTA 버튼 */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.4 }}
                                className="flex flex-col sm:flex-row items-center justify-center gap-6"
                            >
                                <motion.a
                                    href="#reserve"
                                    className="group relative px-8 py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-xl font-bold text-lg overflow-hidden"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-600"
                                        initial={false}
                                        whileHover={{
                                            opacity: [0, 1],
                                            transition: { duration: 0.3 }
                                        }}
                                    />
                                    <motion.div
                                        className="relative flex items-center"
                                        whileHover={{ x: 5 }}
                                        transition={{ type: "spring", stiffness: 400 }}
                                    >
                                        사전예약하기
                                        <ArrowRight className="w-5 h-5 ml-2" />
                                    </motion.div>
                                </motion.a>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* 서비스 소개 섹션 */}
                <section id="about" className="py-24 relative">
                    <motion.div
                        className="absolute inset-0"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-red-900/20 via-black to-black" />
                    </motion.div>
                    <div className="container mx-auto px-4 relative">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                                패션왕이란?
                            </h2>
                            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                                패션왕은 AI 기술로 인플루언서에게 다양한 옷을 입혀보고 실시간으로 대결할 수 있는 새로운 패션 배틀 플랫폼입니다.
                                당신만의 독특한 패션 감각을 뽐내고 최고의 스타일리스트가 되어보세요.
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="space-y-8"
                            >
                                {[
                                    {
                                        title: "AI 패션 스타일링",
                                        description: "AI 기술로 인플루언서에게 원하는 옷을 자유롭게 입혀보고 나만의 스타일을 완성해보세요."
                                    },
                                    {
                                        title: "실시간 패션 배틀",
                                        description: "다른 유저들과 실시간으로 패션 대결을 펼치고 투표로 승자를 가립니다."
                                    },
                                    {
                                        title: "랭킹 시스템",
                                        description: "승리를 거듭하며 랭킹을 올리고 최고의 패션 스타일리스트로 인정받으세요."
                                    }
                                ].map((item, index) => (
                                    <motion.div
                                        key={item.title}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.2 }}
                                    >
                                        <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                                        <p className="text-gray-400">{item.description}</p>
                                    </motion.div>
                                ))}
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="relative"
                            >
                                <div className="aspect-square rounded-2xl overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-orange-500/20 backdrop-blur-3xl" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <img
                                            src="/mockup.png"
                                            alt="패션왕 앱 목업"
                                            className="w-3/4 h-3/4 object-cover rounded-xl shadow-2xl"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* 주요 기능 섹션 */}
                <section id="features" className="py-24 relative">
                    <div className="container mx-auto px-4 relative">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                                주요 기능
                            </h2>
                        </motion.div>
                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: <Camera className="h-8 w-8" />,
                                    title: "AI 스타일링",
                                    description: "AI로 인플루언서에게 다양한 옷을 입혀보고 나만의 스타일을 완성해보세요."
                                },
                                {
                                    icon: <Users className="h-8 w-8" />,
                                    title: "실시간 대결",
                                    description: "다른 유저들과 실시간으로 패션 대결을 펼치고 투표로 승자를 가립니다."
                                },
                                {
                                    icon: <Trophy className="h-8 w-8" />,
                                    title: "시즌별 랭킹",
                                    description: "시즌별 랭킹 시스템으로 최고의 패션 스타일리스트에 도전해보세요."
                                },
                                {
                                    icon: <Heart className="h-8 w-8" />,
                                    title: "팔로우 시스템",
                                    description: "마음에 드는 스타일리스트를 팔로우하고 새로운 패션을 발견하세요."
                                },
                                {
                                    icon: <ShoppingBag className="h-8 w-8" />,
                                    title: "의류 구매",
                                    description: "마음에 드는 의류는 바로 구매할 수 있어요."
                                },
                                {
                                    icon: <Share2 className="h-8 w-8" />,
                                    title: "스타일 공유",
                                    description: "나만의 스타일을 SNS에 공유하고 인기 스타일리스트가 되어보세요."
                                }
                            ].map((feature, index) => (
                                <motion.div
                                    key={feature.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="group relative"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 via-orange-600/20 to-red-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
                                    <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-gray-800 group-hover:border-red-500/50 rounded-2xl p-8 backdrop-blur-sm transition-all duration-500">
                                        <div className="text-red-500 mb-6">{feature.icon}</div>
                                        <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                                        <p className="text-gray-400">{feature.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ 섹션 */}
                <section id="faq" className="py-24 relative">
                    <motion.div
                        className="absolute inset-0"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-red-900/20 via-black to-black" />
                    </motion.div>
                    <div className="container mx-auto px-4 relative">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                                자주 묻는 질문
                            </h2>
                        </motion.div>
                        <div className="max-w-3xl mx-auto">
                            {faqs.map((faq, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="mb-4"
                                >
                                    <button
                                        onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                                        className="w-full flex items-center justify-between p-6 bg-gradient-to-br from-gray-900/90 to-gray-800/90 rounded-xl border border-gray-800 hover:border-red-500/50 transition-all duration-300"
                                    >
                                        <span className="text-left font-semibold text-white">{faq.question}</span>
                                        {openFaqIndex === index ? (
                                            <MinusCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                                        ) : (
                                            <PlusCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                                        )}
                                    </button>
                                    <motion.div
                                        initial={false}
                                        animate={{
                                            height: openFaqIndex === index ? "auto" : 0,
                                            opacity: openFaqIndex === index ? 1 : 0
                                        }}
                                        className="overflow-hidden"
                                    >
                                        <div className="p-6 text-gray-400">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 사전예약 폼 섹션 */}
                <section id="reserve" className="py-24 relative">
                    <motion.div
                        className="absolute inset-0"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-black via-red-900/5 to-black" />
                    </motion.div>
                    <div className="container mx-auto px-4 relative">
                        <div className="max-w-xl mx-auto">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-center mb-12"
                            >
                                <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                                    사전예약 신청
                                </h2>
                                <p className="text-gray-400">
                                    지금 사전예약하시면 출시 후 3개월간 프리미엄 기능을 무료로 이용하실 수 있습니다.
                                </p>
                            </motion.div>
                            <motion.form
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                onSubmit={handleSubmit}
                                className="space-y-6"
                            >
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                                        이름
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 text-white"
                                        placeholder="홍길동"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                                        전화번호
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 text-white"
                                        placeholder="010-0000-0000"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                        이메일
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 text-white"
                                        placeholder="example@email.com"
                                    />
                                </div>
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            type="checkbox"
                                            id="agree"
                                            name="agree"
                                            checked={formData.agree}
                                            onChange={handleChange}
                                            required
                                            className="w-4 h-4 border border-gray-800 rounded bg-gray-900 focus:ring-2 focus:ring-red-500"
                                        />
                                    </div>
                                    <label htmlFor="agree" className="ml-3 text-sm text-gray-400">
                                        개인정보 수집 및 이용에 동의합니다.
                                    </label>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full px-8 py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-xl font-bold text-lg hover:opacity-90 transition-opacity"
                                >
                                    사전예약 신청하기
                                </button>
                            </motion.form>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
} 