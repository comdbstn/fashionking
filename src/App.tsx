import { motion, useScroll, useSpring } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useRef } from 'react';
import './App.css';

const App = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    container: containerRef,
  });
  
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    agreement: false
  });

  const preRegisterRef = useRef<HTMLElement>(null);

  const scrollToPreRegister = () => {
    preRegisterRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const [submitStatus, setSubmitStatus] = useState({
    isSubmitting: false,
    isSuccess: false,
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.email || !formData.agreement) {
      setSubmitStatus({
        isSubmitting: false,
        isSuccess: false,
        message: '모든 필드를 입력하고 개인정보 수집에 동의해주세요.'
      });
      return;
    }

    setSubmitStatus({ isSubmitting: true, isSuccess: false, message: '' });
    
    try {
      // 임시로 성공 처리
      setSubmitStatus({
        isSubmitting: false,
        isSuccess: true,
        message: '사전예약이 성공적으로 완료되었습니다!'
      });
      
      setFormData({
        name: '',
        phone: '',
        email: '',
        agreement: false
      });

    } catch (error) {
      setSubmitStatus({
        isSubmitting: false,
        isSuccess: false,
        message: '오류가 발생했습니다. 다시 시도해주세요.'
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div ref={containerRef} className="w-full h-screen overflow-y-auto scroll-smooth">
      {/* Progress Bar */}
      <motion.div className="fixed left-[40px] top-1/2 -translate-y-1/2 w-[3px] h-[200px] bg-gray-800 rounded-full z-50">
        <motion.div
          style={{ scaleY }}
          className="absolute top-0 left-0 w-full h-full bg-[#ee0202] origin-top rounded-full"
        >
          <motion.div
            style={{ 
              top: `${scrollYProgress.get() * 100}%`
            }}
            className="absolute -right-[4px] w-3 h-3 bg-[#ee0202] rounded-full"
          />
        </motion.div>
      </motion.div>

      {/* Hero Section */}
      <section className="scroll-section h-screen w-full bg-black flex items-center relative overflow-hidden">
        {/* Dynamic Background Elements */}
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 30% 30%, rgba(238, 2, 2, 0.05) 0%, transparent 70%)",
              "radial-gradient(circle at 70% 70%, rgba(238, 2, 2, 0.05) 0%, transparent 70%)",
              "radial-gradient(circle at 30% 30%, rgba(238, 2, 2, 0.05) 0%, transparent 70%)"
            ]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute inset-0 z-0"
        />

        {/* Moving Gradient Orbs */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#ee0202] rounded-full blur-[150px] opacity-30"
        />

        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#ee0202] rounded-full blur-[150px] opacity-20"
        />

        {/* Phone Image Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-60 z-[5]" />

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: Math.random() * 100, x: Math.random() * window.innerWidth }}
              animate={{
                y: [0, -100, 0],
                x: (i % 2 === 0) ? [0, 50, 0] : [0, -50, 0],
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.5,
              }}
              className="absolute w-2 h-2 bg-[#ee0202] rounded-full opacity-30"
            />
          ))}
        </div>

        {/* ZZOL? Logo */}
        <div className="fixed top-8 left-8 z-50">
          <motion.span 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[#ee0202] text-3xl font-bold"
          >
            zzol?
          </motion.span>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col text-white max-w-3xl ml-24 mt-20">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-xl md:text-2xl mb-6 text-left"
            >
              한 번도 본적 없었던 패션 배틀 플랫폼
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl md:text-5xl font-bold mb-12 text-left leading-relaxed"
            >
              패션 피플들이
              <br />
              <motion.span 
                className="text-[#ee0202] inline-block"
                animate={{ 
                  scale: [1, 1.05, 1],
                  textShadow: ["0 0 0px #ee0202", "0 0 20px #ee0202", "0 0 0px #ee0202"]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                Show & Prove
              </motion.span> 하는
              <br />
              가장 완벽한 방법
            </motion.div>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToPreRegister}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-[#ee0202] text-white px-16 py-4 rounded-full text-xl font-semibold hover:bg-[#cc0101] transition-colors w-fit relative overflow-hidden group"
            >
              <span className="relative z-10">사전예약</span>
              <motion.div
                className="absolute inset-0 bg-white opacity-20"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.5 }}
              />
            </motion.button>
          </div>
        </div>

        {/* Phone Image */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="absolute right-[15%] bottom-[15%] w-[350px] rotate-[-15deg]"
        >
          {/* Dynamic Background Behind Phone */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 360, 0],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute inset-0 w-[500px] h-[500px] bg-gradient-radial from-[#ee020230] to-transparent rounded-full blur-[100px] -z-10 -translate-x-1/4 -translate-y-1/4"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 0, 360],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute inset-0 w-[400px] h-[400px] bg-gradient-radial from-[#ee020220] to-transparent rounded-full blur-[80px] -z-10 translate-x-1/4 translate-y-1/4"
          />
          <motion.img
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            src="./images/section1-phone.png"
            alt="Phone Mockup"
            className="w-full h-auto relative z-10"
          />
        </motion.div>

        {/* Red Circle Platform with Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute right-[25%] bottom-[17%] w-[250px] h-[40px] bg-[#ee0202] rounded-[100px] blur-3xl"
        />

        {/* Bottom Gradient */}
        <motion.div 
          animate={{
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-0 left-0 w-full h-[150px] bg-gradient-to-t from-[#ee0202] via-[#ee020215] to-transparent"
        />
      </section>

      {/* Pre-registration Section */}
      <section ref={preRegisterRef} className="scroll-section h-screen w-full bg-black flex items-center justify-center relative">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <h2 className="text-[#ee0202] text-4xl font-bold text-center mb-8">사전예약 신청</h2>
            
            {submitStatus.message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`text-center p-4 rounded-lg mb-8 ${
                  submitStatus.isSuccess ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                }`}
              >
                {submitStatus.message}
              </motion.div>
            )}

            <div className="text-gray-400 text-center text-lg mb-12 leading-relaxed max-w-3xl mx-auto">
              <p>쫄에서는 AI 기술을 통해 구현된 나의 모습을 제약없이 스타일링 할 수 있습니다.</p>
              <p className="mt-4">옷을 잘 아는 여러분의 감각으로 패션 피플들과의 배틀에서 승부해 보세요.</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-8 max-w-lg mx-auto">
              <div>
                <label className="text-gray-400 block mb-3">이름</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-[#1a1a1a] border-none rounded-lg px-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-[#ee0202]"
                  placeholder="홍길동"
                />
              </div>
              
              <div>
                <label className="text-gray-400 block mb-3">전화번호</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-[#1a1a1a] border-none rounded-lg px-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-[#ee0202]"
                  placeholder="010-0000-0000"
                />
              </div>
              
              <div>
                <label className="text-gray-400 block mb-3">이메일</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-[#1a1a1a] border-none rounded-lg px-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-[#ee0202]"
                  placeholder="example@email.com"
                />
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="agreement"
                  checked={formData.agreement}
                  onChange={handleChange}
                  className="w-5 h-5 text-[#ee0202] border-none rounded focus:ring-0 focus:ring-offset-0 bg-[#1a1a1a]"
                />
                <label className="ml-3 text-gray-400">
                  개인정보 수집 및 이용에 동의합니다.
                </label>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={submitStatus.isSubmitting}
                className={`w-full bg-[#ee0202] text-white py-4 rounded-lg text-lg font-semibold transition-colors mt-8 ${
                  submitStatus.isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#cc0101]'
                }`}
                type="submit"
              >
                {submitStatus.isSubmitting ? '제출 중...' : '사전예약 신청하기'}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Device Section */}
      <section className="scroll-section h-screen w-full bg-black relative overflow-hidden">
        {/* Background Image */}
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0"
        >
          <motion.img
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            src="./images/section2-iphone.png"
            alt="iPhone Background"
            className="w-full h-full object-cover brightness-75"
          />
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" 
          />
        </motion.div>
        
        {/* Text Content */}
        <div className="absolute bottom-32 right-20 text-right max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-white font-pretendard"
          >
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-2xl md:text-3xl font-semibold mb-6 leading-relaxed text-gray-400"
            >
              오늘 꽤 신경 쓴 패션, 아무도 몰라줄 때.
            </motion.h2>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-2xl md:text-3xl font-semibold mb-6 leading-relaxed text-gray-400"
            >
              쟤보단 잘 입는 거 같은데 자꾸 인정 안 할 때.
            </motion.h2>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="text-2xl md:text-3xl font-semibold leading-relaxed text-white"
            >
              쫄은 그런 패피들의 답답함을 해소하기 위해 등장했습니다.
            </motion.h2>
          </motion.div>
        </div>
      </section>

      {/* AI Technology Section */}
      <section className="scroll-section">
        <div className="scroll-section-content bg-black flex items-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-gradient-to-br from-black via-black to-[#ee020215]"
          />
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8 }}
                className="w-full md:w-1/2 mb-8 md:mb-0"
              >
                <motion.span 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6 }}
                  className="text-[#ee0202] text-lg mb-4 block"
                >
                  AI 기술
                </motion.span>
                <motion.h2 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-white text-4xl md:text-5xl font-bold mb-6"
                >
                  입맛에 맞게<br />
                  근데 또 제약은 없이,<br />
                  극사실주의로 나를 디자인
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-gray-400 text-lg leading-relaxed"
                >
                  쫄의 AI 기술은 더 이상 분리된 가상의 아바타를 꾸밀 필요 없이<br />
                  유저가 오로지 자신만을 위한 "스타일링"을 할 만큼 수 있도록 합니다.<br />
                  시공간, 가격 제약 없이 패션 감각을 뽐낼 수 있게 되는 것입니다.
                </motion.p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1 }}
                className="w-full md:w-1/2 relative"
              >
                <div className="relative h-[90vh]">
                  <motion.div 
                    initial={{ opacity: 0, x: 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-10" 
                  />
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="absolute inset-0"
                  >
                    <div className="relative h-full p-4">
                      <motion.img
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        src="./images/screen1,2.png"
                        alt="AI Fashion Comparison"
                        className="w-full h-full object-cover rounded-2xl shadow-lg"
                      />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Battle Section */}
      <section className="scroll-section h-screen w-full bg-black relative overflow-hidden">
        <div className="h-full flex items-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-gradient-to-bl from-black via-black to-[#ee020215]"
          />
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8 }}
                className="w-full md:w-1/2"
              >
                <motion.span 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6 }}
                  className="text-[#ee0202] text-lg mb-4 block"
                >
                  배틀
                </motion.span>
                <motion.h2 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-white text-4xl md:text-5xl font-bold mb-8"
                >
                  내 패션력,<br />
                  쫄에서<br />
                  드디어 증명하다
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-gray-400 text-lg leading-relaxed"
                >
                  쫄이 마련한 다양한 패션 배틀 카테고리에서<br />
                  패피들의 모든 코디를 공개하여<br />
                  유저들의 오지랖과 함께 검증을 받을 수 있도록 합니다.
                </motion.p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="w-full md:w-1/2 flex justify-center items-center"
              >
                <div className="relative w-full max-w-2xl">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 1 }}
                    className="relative z-10"
                  >
                    <motion.img
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      src="./images/section5-vsimage.png"
                      alt="Battle System"
                      className="w-full rounded-2xl shadow-lg"
                    />
                  </motion.div>
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 0.6 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 1.2, delay: 0.2 }}
                    className="absolute bottom-[-20%] left-1/2 transform -translate-x-1/2 w-96 h-96 bg-[#ee0202] rounded-full blur-3xl -z-10" 
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Ranking System Section */}
      <section className="scroll-section h-screen w-full bg-black relative overflow-hidden">
        <div className="h-full flex items-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-gradient-to-tr from-black via-black to-[#ee020215]"
          />
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8 }}
                className="w-full md:w-1/2"
              >
                <motion.span 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6 }}
                  className="text-[#ee0202] text-lg mb-4 block"
                >
                  랭킹 시스템
                </motion.span>
                <motion.h2 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-white text-4xl md:text-5xl font-bold mb-6"
                >
                  패션 랭킹 관리로,<br />
                  내 감각에<br />
                  왈가왈부 금지
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-gray-400 text-lg leading-relaxed"
                >
                  쫄은 시존재 형식의 계층 기반 시스템으로<br />
                  경쟁 형식을 체택함으로써 유저의 명성을 조성합니다.<br />
                  이젠 쫄티어로 여러분의 감각을 자랑해 보세요.
                </motion.p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="w-full md:w-1/2 flex justify-center items-center"
              >
                <div className="relative w-full max-w-2xl">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 1 }}
                    className="relative z-10"
                  >
                    <motion.img
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      src="./images/section6-trophy.png"
                      alt="Ranking System Trophy"
                      className="w-full rounded-2xl shadow-lg"
                    />
                  </motion.div>
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 0.6 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 1.2, delay: 0.2 }}
                    className="absolute bottom-[-20%] left-1/2 transform -translate-x-1/2 w-96 h-96 bg-[#ee0202] rounded-full blur-3xl -z-10" 
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer>
        <div className="py-16 border-t border-gray-800">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center mb-12">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-3xl font-bold mb-4"
              >
                Contact Us
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-gray-400 text-center mb-8"
              >
                콘텐츠 제휴, 마케팅, 사업 및 투자 관련 문의
              </motion.p>
              <motion.a
                href="mailto:contact@zzol.com"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                문의하기
              </motion.a>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col md:flex-row justify-between items-center border-t border-gray-800 pt-8"
            >
              <div className="flex items-center mb-4 md:mb-0">
                <span className="text-[#ee0202] text-2xl font-bold tracking-wider">ZZOL?</span>
              </div>
              <div className="flex space-x-6">
                <a
                  href="https://instagram.com/zzol"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-center text-gray-500 text-sm mt-8"
            >
              © 2024 ZZOL. All rights reserved.
            </motion.div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App; 