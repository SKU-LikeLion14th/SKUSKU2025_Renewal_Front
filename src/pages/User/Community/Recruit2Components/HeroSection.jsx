import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { FiArrowDown, FiArrowRight } from 'react-icons/fi';

// --- Countdown Component ---
const DDayCounter = () => {
    const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });

    useEffect(() => {
        // Updated to 2026. 3/6 18:00 (KST)
        const targetDate = new Date('2026-03-06T18:00:00+09:00').getTime();
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const diff = targetDate - now;

            if (diff <= 0) {
                setTimeLeft({ d: 0, h: 0, m: 0, s: 0 });
                clearInterval(interval);
            } else {
                setTimeLeft({
                    d: Math.floor(diff / (1000 * 60 * 60 * 24)),
                    h: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    m: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
                    s: Math.floor((diff % (1000 * 60)) / 1000)
                });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const format = (num) => String(num).padStart(2, '0');

    return (
        <div className="flex gap-2 sm:gap-4 md:gap-6 items-center justify-center md:justify-start text-[#111111] fontBlack text-4xl sm:text-5xl md:text-[80px] mt-2 mb-4 md:mb-8 tracking-tighter transition-all">
            <div className="flex flex-col items-center">
                <span>{format(timeLeft.d)}</span>
                <span className="text-[10px] sm:text-xs md:text-sm text-[#888] fontBold uppercase tracking-[0.2em] md:tracking-[0.4em] mt-1 md:mt-4">Days</span>
            </div>
            <span className="pb-4 sm:pb-6 md:pb-12 text-[#ccc]">:</span>
            <div className="flex flex-col items-center">
                <span>{format(timeLeft.h)}</span>
                <span className="text-[10px] sm:text-xs md:text-sm text-[#888] fontBold uppercase tracking-[0.2em] md:tracking-[0.4em] mt-1 md:mt-4">Hours</span>
            </div>
            <span className="pb-4 sm:pb-6 md:pb-12 text-[#ccc]">:</span>
            <div className="flex flex-col items-center">
                <span>{format(timeLeft.m)}</span>
                <span className="text-[10px] sm:text-xs md:text-sm text-[#888] fontBold uppercase tracking-[0.2em] md:tracking-[0.4em] mt-1 md:mt-4">Mins</span>
            </div>
            <span className="pb-4 sm:pb-6 md:pb-12 text-[#ccc]">:</span>
            <div className="flex flex-col items-center text-[#0060C6]">
                <span>{format(timeLeft.s)}</span>
                <span className="text-[10px] sm:text-xs md:text-sm text-[#0060C6] fontBold uppercase tracking-[0.2em] md:tracking-[0.4em] mt-1 md:mt-4">Secs</span>
            </div>
        </div>
    );
};

// --- Shape Morphing Canvas Logic ---
class Particle {
    constructor(effect, targetX, targetY, color) {
        this.effect = effect;
        this.x = effect.canvasWidth / 2 + (Math.random() - 0.5) * effect.canvasWidth;
        this.y = effect.canvasHeight / 2 + (Math.random() - 0.5) * effect.canvasHeight;
        this.originX = targetX;
        this.originY = targetY;
        this.color = color;
        this.size = effect.gap - 1;
        this.density = (Math.random() * 40) + 5;
        this.friction = 0.85;
        this.ease = 0.04 + Math.random() * 0.04;
    }

    setTarget(x, y, color) {
        this.originX = x;
        this.originY = y;
        this.color = color;
    }

    draw(context) {
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
        context.fill();
    }

    update() {
        let dxMouse = this.effect.mouse.x - this.x;
        let dyMouse = this.effect.mouse.y - this.y;
        let distanceMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        let maxDistance = this.effect.mouse.radius;

        if (distanceMouse < maxDistance) {
            let forceDirectionX = dxMouse / distanceMouse;
            let forceDirectionY = dyMouse / distanceMouse;
            let force = (maxDistance - distanceMouse) / maxDistance;
            let pushX = forceDirectionX * force * this.density;
            let pushY = forceDirectionY * force * this.density;

            this.x -= pushX * 3;
            this.y -= pushY * 3;
        }

        let dxTarget = this.originX - this.x;
        let dyTarget = this.originY - this.y;

        this.x += dxTarget * this.ease;
        this.y += dyTarget * this.ease;
    }
}

class MorphEffect {
    constructor(ctx, canvasWidth, canvasHeight, logoImg) {
        this.ctx = ctx;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.gap = window.innerWidth < 768 ? 4 : 5;
        this.particles = [];
        this.mouse = { radius: 120, x: -1000, y: -1000 };

        const offscreenCanvas = document.createElement('canvas');
        offscreenCanvas.width = canvasWidth;
        offscreenCanvas.height = canvasHeight;
        const offCtx = offscreenCanvas.getContext('2d', { willReadFrequently: true });

        // Phase 1: Giant Logo (1.4x larger: max 800)
        offCtx.clearRect(0, 0, canvasWidth, canvasHeight);
        let logoSize1 = Math.min(canvasWidth * 0.95, 800);
        let logoY1 = canvasHeight / 2 - logoSize1 / 2;
        if (window.innerWidth < 768) logoY1 -= 80;
        offCtx.drawImage(logoImg, canvasWidth / 2 - logoSize1 / 2, logoY1, logoSize1, logoSize1);
        this.state1 = this.extractPixels(offCtx);

        // Phase 2: Smaller Logo + Text (2x larger: max 500)
        offCtx.clearRect(0, 0, canvasWidth, canvasHeight);
        let logoSize2 = Math.min(canvasWidth * 0.70, 500);
        let logoY2 = canvasHeight / 2 - logoSize2 / 2 - 120;
        if (window.innerWidth < 768) logoY2 -= 60;

        offCtx.drawImage(logoImg, canvasWidth / 2 - logoSize2 / 2, logoY2, logoSize2, logoSize2);

        offCtx.textAlign = 'center';
        offCtx.textBaseline = 'middle';
        let fs1 = window.innerWidth < 768 ? 60 : 120; // 2x larger
        let fs2 = window.innerWidth < 768 ? 45 : 90;  // 2x larger

        let textY = logoY2 + logoSize2 + fs1 / 2 + 30;
        offCtx.font = `900 ${fs1}px Pretendard, sans-serif`;
        offCtx.fillStyle = '#111111';
        offCtx.fillText('LIKELION', canvasWidth / 2, textY);

        offCtx.font = `900 ${fs2}px Pretendard, sans-serif`;
        offCtx.fillStyle = '#0060C6';
        offCtx.fillText('SKU 14th', canvasWidth / 2, textY + fs1 + 10);

        this.state2 = this.extractPixels(offCtx);

        // Phase 3: Shift Canvas to the left (Desktop) / Move up (Mobile)
        offCtx.clearRect(0, 0, canvasWidth, canvasHeight);
        let shiftX = window.innerWidth >= 768 ? canvasWidth * 0.22 : 0; // Shift 22% left
        let shiftY = window.innerWidth < 768 ? -80 : 0; // Move up on mobile

        let logoX3 = canvasWidth / 2 - logoSize2 / 2 - shiftX;
        let logoY3 = logoY2 + shiftY;
        let textX3 = canvasWidth / 2 - shiftX;
        let textY3 = textY + shiftY;

        offCtx.drawImage(logoImg, logoX3, logoY3, logoSize2, logoSize2);

        offCtx.textAlign = 'center';
        offCtx.textBaseline = 'middle';
        offCtx.font = `900 ${fs1}px Pretendard, sans-serif`;
        offCtx.fillStyle = '#111111';
        offCtx.fillText('LIKELION', textX3, textY3);

        offCtx.font = `900 ${fs2}px Pretendard, sans-serif`;
        offCtx.fillStyle = '#0060C6';
        offCtx.fillText('SKU 14th', textX3, textY3 + fs1 + 10);

        this.state3 = this.extractPixels(offCtx);

        // Generate Particles max required
        const maxParticles = Math.max(this.state1.length, this.state2.length, this.state3.length);
        for (let i = 0; i < maxParticles; i++) {
            let target = this.state1[i] || { x: Math.random() * canvasWidth, y: -200, color: 'rgba(0,0,0,0)' };
            this.particles.push(new Particle(this, target.x, target.y, target.color));
            if (!this.state1[i]) this.particles[i].size = 0; // invisible if unused initially
        }
    }

    extractPixels(ctx) {
        const pixels = ctx.getImageData(0, 0, this.canvasWidth, this.canvasHeight).data;
        let coords = [];
        for (let y = 0; y < this.canvasHeight; y += this.gap) {
            for (let x = 0; x < this.canvasWidth; x += this.gap) {
                const index = (y * this.canvasWidth + x) * 4;
                const alpha = pixels[index + 3];
                if (alpha > 128) {
                    const r = pixels[index];
                    const g = pixels[index + 1];
                    const b = pixels[index + 2];
                    coords.push({ x, y, color: `rgb(${r}, ${g}, ${b})` });
                }
            }
        }
        return coords;
    }

    triggerPhase2() {
        for (let i = 0; i < this.particles.length; i++) {
            let target = this.state2[i] || { x: Math.random() * this.canvasWidth, y: this.canvasHeight + 200, color: 'rgba(0,0,0,0)' };
            this.particles[i].setTarget(target.x, target.y, target.color);
            this.particles[i].size = this.gap - 1; // restore visibility
            this.particles[i].ease = 0.02 + Math.random() * 0.03;
        }
    }

    triggerPhase3() {
        for (let i = 0; i < this.particles.length; i++) {
            let target = this.state3[i] || { x: Math.random() * this.canvasWidth, y: this.canvasHeight + 200, color: 'rgba(0,0,0,0)' };
            this.particles[i].setTarget(target.x, target.y, target.color);
            this.particles[i].size = this.gap - 1; // restore visibility
            this.particles[i].ease = 0.03 + Math.random() * 0.04;
        }
    }

    render() {
        this.particles.forEach(p => {
            p.update();
            p.draw(this.ctx);
        });
    }
}


// --- Right Side Rocket Particle Component ---
class RocketExhaustParticle {
    constructor(w, h, colorList, isDesktop) {
        this.canvasWidth = w;
        this.canvasHeight = h;
        this.colorList = colorList;
        this.isDesktop = isDesktop;
        this.reset(true);
    }

    reset(initial = false) {
        // Shift right on desktop
        const startX = this.isDesktop ? this.canvasWidth * 0.75 : this.canvasWidth / 2;
        const startY = this.canvasHeight / 2 + 100; // further down because 1.3x scale

        this.x = startX + (Math.random() - 0.5) * 52;
        this.y = initial ? startY + Math.random() * 200 : startY;
        this.size = Math.random() * 7 + 3;

        this.speedY = Math.random() * 4 + 2;
        this.speedX = (Math.random() - 0.5) * 2;

        this.life = 1.0;
        this.decay = Math.random() * 0.015 + 0.005;
        this.color = this.colorList[Math.floor(Math.random() * this.colorList.length)];
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= this.decay;
        this.size *= 0.96;
        this.y += 2;

        if (this.life <= 0 || this.size <= 0.1) this.reset();
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.globalAlpha = Math.max(0, this.life);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;
    }
}

const RocketCanvas = () => {
    const rocketCanvasRef = useRef(null);

    useEffect(() => {
        const canvas = rocketCanvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        const w = canvas.parentElement.clientWidth;
        const h = Math.max(canvas.parentElement.clientHeight, 400);
        canvas.width = w;
        canvas.height = h;

        const colors = ['#E6F2FF', '#0060C6', '#6E6E6E', '#00326A'];
        const isDesktop = window.innerWidth >= 768;

        let exhaustParticles = Array.from({ length: 180 }, () => new RocketExhaustParticle(w, h, colors, isDesktop));
        let animationFrameId;

        const cx = isDesktop ? w * 0.75 : w / 2; // Right shift
        const cy = h / 2;

        const drawStaticRocket = () => {
            const scale = 2.6; // 1.3x times larger than 2.0

            ctx.fillStyle = '#E6F2FF';
            ctx.filter = 'blur(10px)';
            ctx.beginPath();
            ctx.arc(cx, cy + 100, 50, 0, Math.PI * 2);
            ctx.fill();
            ctx.filter = 'none';

            ctx.fillStyle = '#E6F2FF';
            ctx.beginPath();
            ctx.ellipse(cx, cy, 30 * scale, 60 * scale, 0, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = '#0060C6';
            ctx.beginPath();
            ctx.moveTo(cx - 24 * scale, cy - 35 * scale);
            ctx.lineTo(cx + 24 * scale, cy - 35 * scale);
            ctx.lineTo(cx, cy - 70 * scale);
            ctx.fill();

            ctx.fillStyle = '#6E6E6E';
            ctx.beginPath();
            ctx.moveTo(cx - 28 * scale, cy + 20 * scale);
            ctx.lineTo(cx - 50 * scale, cy + 60 * scale);
            ctx.lineTo(cx - 20 * scale, cy + 50 * scale);
            ctx.fill();

            ctx.beginPath();
            ctx.moveTo(cx + 28 * scale, cy + 20 * scale);
            ctx.lineTo(cx + 50 * scale, cy + 60 * scale);
            ctx.lineTo(cx + 20 * scale, cy + 50 * scale);
            ctx.fill();

            ctx.fillStyle = '#00326A';
            ctx.beginPath();
            ctx.arc(cx, cy - 10 * scale, 12 * scale, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = '#E6F2FF';
            ctx.beginPath();
            ctx.arc(cx - 4 * scale, cy - 14 * scale, 3 * scale, 0, Math.PI * 2);
            ctx.fill();
        };

        let time = 0;

        const animate = () => {
            ctx.clearRect(0, 0, w, h);

            exhaustParticles.forEach(p => {
                p.update();
                p.draw(ctx);
            });

            ctx.save();
            ctx.translate(0, Math.sin(time) * 15);
            drawStaticRocket();
            ctx.restore();

            time += 0.05;
            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    return (
        <div className="w-full h-[400px] md:h-full relative flex items-center justify-center pointer-events-none">
            <canvas ref={rocketCanvasRef} className="absolute inset-0 w-full h-full" />
        </div>
    );
};

// --- Text Reveal Component (Modified to 2-column layout) ---
const ScrollRevealText = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 70%", "end 30%"] // Mapping bounds
    });

    const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

    const lines = [
        "단순한 스터디를 넘어",
        "실제 배포의 경험까지,",
        "당신의 머릿속에 머물던",
        "아이디어가 세상에 나오는",
        "모든 과정을 직접 경험하세요."
    ];

    return (
        <div ref={containerRef} className="relative w-full py-32 flex justify-center items-center overflow-hidden bg-white min-h-[80vh]">
            <div className="max-w-[1400px] w-full px-6 grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-24 items-center">

                {/* 1. Left Text Section */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left selection:bg-[#0060C6] selection:text-white z-10 w-full">
                    {lines.map((line, i) => {
                        const start = i / lines.length;
                        const end = (i + 1) / lines.length;
                        // 2배 속도로 채워지게: [start/2, end/2]
                        const fillAmount = useTransform(smoothProgress, [start / 2, end / 2], ["0%", "100%"]);

                        return (
                            <div key={i} className="relative w-max mb-3 sm:mb-5 overflow-hidden">
                                <p className="text-[28px] sm:text-[40px] md:text-[48px] lg:text-[64px] fontBlack tracking-tight text-[#D5E9FF] whitespace-nowrap">
                                    {line}
                                </p>
                                <motion.p
                                    className="absolute top-0 left-0 text-[28px] sm:text-[40px] md:text-[48px] lg:text-[64px] fontBlack tracking-tight text-[#0060C6] whitespace-nowrap overflow-hidden"
                                    style={{ width: fillAmount }}
                                >
                                    {line}
                                </motion.p>
                            </div>
                        );
                    })}
                </div>

                {/* 2. Right Rocket Canvas */}
                <RocketCanvas />
            </div>
        </div>
    );
};

// --- Main Hero Section Composition ---
export default function HeroSection() {
    const canvasRef = useRef(null);
    const [logoImage, setLogoImage] = useState(null);
    const [uiPhase, setUiPhase] = useState(1); // 1 = Center, 2 = Center Small Text, 3 = Left Shift & Right UI

    useEffect(() => {
        const img = new Image();
        img.src = '/likelionLogo.png';
        img.onload = () => setLogoImage(img);
    }, []);

    useEffect(() => {
        if (!logoImage) return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });

        let currentEffect = null;
        let animationFrameId = null;

        const initCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            currentEffect = new MorphEffect(ctx, canvas.width, canvas.height, logoImage);

            // Re-apply correct phase instantly on resize
            if (uiPhase === 2) currentEffect.triggerPhase2();
            if (uiPhase === 3) currentEffect.triggerPhase3();
        };

        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(initCanvas);
        } else {
            initCanvas();
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            if (currentEffect) currentEffect.render();
            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        const handleMouseMove = (e) => {
            if (!currentEffect) return;
            const rect = canvas.getBoundingClientRect();
            currentEffect.mouse.x = e.clientX - rect.left;
            currentEffect.mouse.y = e.clientY - rect.top;
        };
        const handleTouchMove = (e) => {
            if (!currentEffect || e.touches.length === 0) return;
            const rect = canvas.getBoundingClientRect();
            currentEffect.mouse.x = e.touches[0].clientX - rect.left;
            currentEffect.mouse.y = e.touches[0].clientY - rect.top;
        };
        const handleMouseLeave = () => {
            if (!currentEffect) return;
            currentEffect.mouse.x = -1000;
            currentEffect.mouse.y = -1000;
        };

        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('touchmove', handleTouchMove);
        canvas.addEventListener('mouseleave', handleMouseLeave);
        canvas.addEventListener('touchend', handleMouseLeave);

        let resizeTimer;
        const handleResize = () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(initCanvas, 200);
        };
        window.addEventListener('resize', handleResize);

        // --- TIMING SEQUENCE ---
        const phase2Timer = setTimeout(() => {
            if (currentEffect) currentEffect.triggerPhase2();
            setUiPhase(2);
        }, 2000);

        const phase3Timer = setTimeout(() => {
            if (currentEffect) currentEffect.triggerPhase3();
            setUiPhase(3);
        }, 2500);

        return () => {
            window.removeEventListener('resize', handleResize);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('touchmove', handleTouchMove);
            canvas.removeEventListener('mouseleave', handleMouseLeave);
            canvas.removeEventListener('touchend', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
            clearTimeout(phase2Timer);
            clearTimeout(phase3Timer);
        };
    }, [logoImage]); // Do NOT include uiPhase in deps, it triggers re-init

    return (
        <React.Fragment>
            <section className="relative w-full h-[120vh] bg-[#FFFFFF] overflow-hidden flex flex-col items-center justify-end pb-24 md:pb-12 pt-16">

                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 z-0 touch-none pointer-events-auto"
                />

                <div className="relative z-20 w-full h-full max-w-[1400px] flex items-center justify-center p-6 mt-16 pointer-events-none">
                    <AnimatePresence>
                        {uiPhase >= 3 && (
                            <motion.div
                                initial={{ opacity: 0, x: window.innerWidth >= 768 ? 50 : 0, y: window.innerWidth < 768 ? 50 : 0 }}
                                animate={{ opacity: 1, x: 0, y: 0 }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                className="flex flex-col items-center md:items-start text-center md:text-left pointer-events-auto w-full md:w-1/2 md:ml-auto mt-auto md:mt-0 pr-0 xl:pr-[5%]"
                            >
                                {/* Headline */}
                                <div className="fontBlack text-[#0060C6] leading-[1.35] text-[24px] sm:text-[32px] md:text-[42px] lg:text-[54px] xl:text-[68px] 2xl:text-[76px] mb-4 md:mb-8 whitespace-nowrap tracking-tight">
                                    멋쟁이사자처럼 성결대에서<br />
                                    14기 아기사자를 모집합니다
                                </div>
                                <div className="w-full flex justify-center md:justify-start">
                                    <DDayCounter />
                                </div>
                                <div className="w-full flex justify-center md:justify-start mt-4 md:mt-8">
                                    <a
                                        href="https://forms.gle/iUKyRxowKLMufkJy5"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="px-8 py-4 sm:px-12 sm:py-6 bg-[#0060C6] text-white rounded-full fontBlack text-lg sm:text-2xl flex items-center justify-center gap-3 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,96,198,0.3)] transition-all duration-300 pointer-events-auto shadow-2xl"
                                    >
                                        지원하기 <FiArrowRight size={28} />
                                    </a>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <AnimatePresence>
                    {uiPhase < 3 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ delay: 1, duration: 1 }}
                            className="absolute bottom-10 z-10 w-full flex flex-col items-center justify-center text-[#999999]"
                        >
                            <span className="text-xs tracking-[0.3em] fontBold uppercase mb-3">Scroll to explore</span>
                            <motion.div
                                animate={{ y: [0, 10, 0] }}
                                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                            >
                                <FiArrowDown size={20} />
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>

            <ScrollRevealText />
        </React.Fragment>
    );
}
