import { motion, useScroll, useSpring } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import './App.css';

// EmailJS 초기화
emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

const App = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const sections = ['hero', 'preregister', 'device', 'ai', 'battle', 'ranking', 'footer'];
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const rootElement = document.getElementById('root');
    if (!rootElement) return;

    const handleScroll = () => {
      const scrollPosition = rootElement.scrollTop;
      const windowHeight = window.innerHeight;
      
      let newSection = 0;
      sectionRefs.current.forEach((section, index) => {
        if (section) {
          const sectionTop = section.offsetTop;
          if (scrollPosition >= sectionTop - windowHeight / 3) {
            newSection = index;
          }
        }
      });
      
      if (currentSection !== newSection) {
        setCurrentSection(newSection);
      }
    };

    rootElement.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => {
      rootElement.removeEventListener('scroll', handleScroll);
    };
  }, [currentSection]);

  const scrollToSection = (index: number) => {
    const section = sectionRefs.current[index];
    if (section) {
      const rootElement = document.getElementById('root');
      if (rootElement) {
        const offset = section.offsetTop;
        rootElement.scrollTo({
          top: offset,
          behavior: 'smooth'
        });
      }
    }
  };

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
      // 첫 번째 이메일 템플릿으로 전송
      const templateParams1 = {
        to_email: 'director@freeyourmindcorp.com',
        from_name: formData.name,
        phone: formData.phone,
        email: formData.email,
        submit_time: new Date().toLocaleString('ko-KR')
      };

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        'template_q5qyi3b',
        templateParams1,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      // 두 번째 이메일 템플릿으로 전송
      const templateParams2 = {
        to_email: 'ampfounder@gmail.com',
        from_name: formData.name,
        phone: formData.phone,
        email: formData.email,
        submit_time: new Date().toLocaleString('ko-KR')
      };

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        'template_5jariry',
        templateParams2,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      
      // 성공 메시지 표시 및 폼 초기화
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
      // 에러가 발생해도 성공 메시지 표시
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
    <div ref={containerRef} className="w-full min-h-screen bg-black">
      {/* Navigation Dots */}
      <div className="fixed right-[20px] md:right-[40px] top-1/2 transform -translate-y-1/2 z-50 hidden md:flex flex-col gap-4">
        {sections.map((section, index) => (
          <motion.div
            key={section}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              currentSection === index ? 'bg-[#ee0202]' : 'bg-gray-500'
            }`}
            onClick={() => scrollToSection(index)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section 
        ref={el => sectionRefs.current[0] = el}
        className="min-h-[100dvh] w-full bg-black flex items-center relative overflow-hidden"
      >
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
          className="absolute inset-0 z-[1]"
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
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#ee0202] rounded-full blur-[150px] opacity-30 z-[1]"
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
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#ee0202] rounded-full blur-[150px] opacity-20 z-[1]"
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

        {/* ZZOL Logo */}
        <div className="fixed top-4 md:top-8 right-4 md:left-8 z-50">
          <motion.img 
            src="/images/zzol-logo.png"
            alt="ZZOL"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="h-[30px] md:h-[40px] w-auto cursor-pointer"
            onClick={() => window.location.reload()}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col text-white max-w-3xl md:ml-24 mt-10 md:mt-20 px-4 md:px-0 z-20">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-base md:text-2xl mb-4 md:mb-6 text-left font-['Pretendard'] font-medium"
            >
              한 번도 본적 없었던 패션 배틀 플랫폼
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-5xl font-bold mb-8 md:mb-12 text-left leading-relaxed font-['Pretendard'] font-extrabold"
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
              onClick={() => scrollToSection(1)}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-[#ee0202] text-white px-8 py-5 rounded-full text-xl font-semibold hover:bg-[#cc0101] transition-colors w-[180px] h-[60px] relative overflow-hidden group flex items-center justify-center"
            >
              <span className="relative z-10 whitespace-nowrap">사전예약</span>
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
          className="absolute right-[5%] md:right-[15%] bottom-[10%] md:bottom-[15%] w-[180px] md:w-[350px] rotate-[-15deg]"
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
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            src="/images/section1-phone.png"
            alt="Phone Mockup"
            className="w-full h-auto relative z-10"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
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
      <section 
        ref={el => sectionRefs.current[1] = el}
        className="min-h-[100dvh] w-full bg-black flex items-center justify-center relative py-12 md:py-0 px-4 md:px-0"
      >
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full"
          >
            <h2 className="text-[#ee0202] text-2xl md:text-4xl font-bold text-center mb-4 md:mb-8">사전예약 신청</h2>
            
            {submitStatus.message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`text-center p-3 md:p-4 rounded-lg mb-4 md:mb-8 ${
                  submitStatus.isSuccess ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                }`}
              >
                {submitStatus.message}
              </motion.div>
            )}

            <div className="text-gray-400 text-center text-sm md:text-base mb-6 md:mb-8 leading-relaxed max-w-3xl mx-auto">
              <p className="text-gray-400 leading-relaxed font-['Pretendard'] font-medium">
                쫄에서는 AI 기술을 통해 구현된 나의 모습을 제약없이 스타일링 할 수 있습니다.
              </p>
              <p className="mt-3 text-gray-400 leading-relaxed font-['Pretendard'] font-medium">
                옷을 잘 아는 여러분의 감각으로 패션 피플들과의 배틀에서 승부해 보세요.
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8 max-w-lg mx-auto">
              <div>
                <label className="text-gray-400 block mb-2 md:mb-3 text-sm md:text-base">이름</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-[#1a1a1a] border-none rounded-lg px-4 py-3 md:py-4 text-white focus:outline-none focus:ring-2 focus:ring-[#ee0202] text-sm md:text-base"
                  placeholder="홍길동"
                />
              </div>
              
              <div>
                <label className="text-gray-400 block mb-2 md:mb-3 text-sm md:text-base">전화번호</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-[#1a1a1a] border-none rounded-lg px-4 py-3 md:py-4 text-white focus:outline-none focus:ring-2 focus:ring-[#ee0202] text-sm md:text-base"
                  placeholder="010-0000-0000"
                />
              </div>
              
              <div>
                <label className="text-gray-400 block mb-2 md:mb-3 text-sm md:text-base">이메일</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-[#1a1a1a] border-none rounded-lg px-4 py-3 md:py-4 text-white focus:outline-none focus:ring-2 focus:ring-[#ee0202] text-sm md:text-base"
                  placeholder="example@email.com"
                />
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="agreement"
                  checked={formData.agreement}
                  onChange={handleChange}
                  className="w-4 h-4 md:w-5 md:h-5 text-[#ee0202] border-none rounded focus:ring-0 focus:ring-offset-0 bg-[#1a1a1a]"
                />
                <label className="ml-2 md:ml-3 text-gray-400 text-sm md:text-base">
                  개인정보 수집 및 이용에 동의합니다.
                </label>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={submitStatus.isSubmitting}
                className={`w-full bg-[#ee0202] text-white py-3 md:py-4 rounded-lg text-base md:text-lg font-semibold transition-colors mt-6 md:mt-8 ${
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
      <section 
        ref={el => sectionRefs.current[2] = el}
        className="min-h-[100dvh] w-full bg-black relative overflow-hidden"
      >
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
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            src="/images/section2-iphone.png"
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
        <div className="absolute bottom-20 md:bottom-32 right-4 md:right-20 text-right max-w-2xl px-4 md:px-0">
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
              className="text-xl md:text-3xl font-semibold mb-6 leading-relaxed text-gray-400 font-['Pretendard'] font-medium"
            >
              오늘 꽤 신경 쓴 패션, 아무도 몰라줄 때.
            </motion.h2>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-xl md:text-3xl font-semibold mb-6 leading-relaxed text-gray-400 font-['Pretendard'] font-medium"
            >
              쟤보단 잘 입는 거 같은데 자꾸 인정 안 할 때.
            </motion.h2>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="text-xl md:text-3xl font-semibold leading-relaxed text-white font-['Pretendard'] font-extrabold"
            >
              쫄은 그런 패피들의 답답함을<br />
              해소하기 위해 등장했습니다.
            </motion.h2>
          </motion.div>
        </div>
      </section>

      {/* AI Technology Section */}
      <section 
        ref={el => sectionRefs.current[3] = el}
        className="min-h-[100dvh] w-full bg-black relative overflow-hidden"
      >
        <div className="min-h-[100dvh] flex items-center py-10 md:py-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-gradient-to-br from-black via-black to-[#ee020215]"
          />
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
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
                  className="text-white text-2xl md:text-5xl font-bold mb-6 font-['Pretendard'] font-extrabold"
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
                  className="text-gray-400 text-sm md:text-lg leading-relaxed font-['Pretendard'] font-medium"
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
                <div className="relative h-[50vh] md:h-[90vh]">
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
                        src="/images/screen1-2.png"
                        alt="AI Fashion Comparison"
                        className="w-full h-full object-contain md:object-cover rounded-2xl shadow-lg"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
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
      <section 
        ref={el => sectionRefs.current[4] = el}
        className="min-h-[100dvh] w-full bg-black relative overflow-hidden"
      >
        <div className="min-h-[100dvh] flex items-center py-10 md:py-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-gradient-to-bl from-black via-black to-[#ee020215]"
          />
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
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
                  className="text-white text-2xl md:text-5xl font-bold mb-6 font-['Pretendard'] font-extrabold"
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
                  className="text-gray-400 text-sm md:text-lg leading-relaxed font-['Pretendard'] font-medium"
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
                <div className="relative w-full max-w-2xl px-4 md:px-0">
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
                      src="/images/section5-vsimage-new.png?v=2"
                      alt="Battle System"
                      className="w-full h-auto object-contain md:object-cover rounded-2xl shadow-lg"
                    />
                  </motion.div>
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 0.6 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 1.2, delay: 0.2 }}
                    className="absolute bottom-[-10%] md:bottom-[-20%] left-1/2 transform -translate-x-1/2 w-64 md:w-96 h-64 md:h-96 bg-[#ee0202] rounded-full blur-3xl -z-10" 
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Ranking System Section */}
      <section 
        ref={el => sectionRefs.current[5] = el}
        className="min-h-[100dvh] w-full bg-black relative overflow-hidden"
      >
        <div className="min-h-[100dvh] flex items-center py-10 md:py-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-gradient-to-tr from-black via-black to-[#ee020215]"
          />
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
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
                  className="text-white text-2xl md:text-5xl font-bold mb-6 font-['Pretendard'] font-extrabold"
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
                  className="text-gray-400 text-sm md:text-lg leading-relaxed font-['Pretendard'] font-medium"
                >
                  쫄은 시즌제 형식의 계층 기반 시스템으로<br />
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
                <div className="relative w-full max-w-2xl px-4 md:px-0">
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
                      src="/images/section6-trophy.png"
                      alt="Ranking System Trophy"
                      className="w-full h-auto object-contain rounded-2xl"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        console.error('Trophy image failed to load');
                      }}
                    />
                  </motion.div>
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 0.6 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 1.2, delay: 0.2 }}
                    className="absolute bottom-[-10%] md:bottom-[-20%] left-1/2 transform -translate-x-1/2 w-64 md:w-96 h-64 md:h-96 bg-[#ee0202] rounded-full blur-3xl -z-10" 
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <section 
        ref={el => sectionRefs.current[6] = el}
        className="min-h-[100dvh] w-full bg-black relative flex items-center justify-center"
      >
        <div className="container mx-auto px-4 py-10 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <div className="flex flex-col items-center mb-8 md:mb-12">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-2xl md:text-3xl font-bold mb-4"
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
                href="mailto:contact@freeyourmindcorp.com"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  window.open('https://mail.google.com/mail/?view=cm&fs=1&to=contact@freeyourmindcorp.com', '_blank');
                }}
              >
                문의하기
              </motion.a>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col md:flex-row justify-between items-center border-t border-gray-800 pt-8 gap-4 md:gap-0"
            >
              <div className="flex items-center mb-4 md:mb-0">
                <img 
                  src="/images/zzol-logo.png"
                  alt="ZZOL"
                  className="h-[30px] w-auto"
                />
              </div>
              <div className="flex space-x-6">
                <a
                  href="https://www.instagram.com/zzol_studio_official/"
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
              © 2025 ZZOL. All rights reserved.
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default App; 