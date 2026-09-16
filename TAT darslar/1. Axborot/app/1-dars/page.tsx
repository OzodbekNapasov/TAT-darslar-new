'use client';

import React, { useEffect, useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  Sparkles,
  BookOpen,
  Laptop,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Activity,
  HeartPulse,
  FileText,
  ShieldCheck,
  Award,
  RotateCcw,
  ChevronRight,
  Database,
  Lock,
  Zap,
  Search,
  Check,
  Power,
  Mouse,
  Keyboard,
  Sliders,
  ArrowDown,
  Monitor,
  HardDrive,
  CornerDownLeft,
  ShieldAlert,
  Calendar,
  Volume2,
  Video,
  Hand,
  QrCode,
  Eye,
  Layers,
  Shuffle,
  Trash2,
  Folder,
  FolderPlus,
  Building2,
  Cpu,
  Move,
  TrendingUp,
  MousePointer,
} from 'lucide-react';

import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { getLesson } from '@/lib/lessons';
import { formatUzbekDate } from '@/lib/site';
import { useClientValue } from '@/lib/use-client-value';
import { QuizFigure } from '@/components/quiz-figures';
import {
  QUIZ_BANKS,
  TOTAL_QUESTIONS,
  buildOrders,
  grade,
  optionText,
  reshuffleBank,
  type OrderMap,
  type QuizBank,
} from '@/lib/quiz-1-dars';


type TabId = 'intro' | 'theory' | 'practice' | 'quiz';

const TABS: {id: TabId; label: string; Icon: LucideIcon}[] = [
  {id: 'intro', label: 'KIRISH: NIMA UCHUN IT?', Icon: Sparkles},
  {id: 'theory', label: '1. NAZARIYA', Icon: BookOpen},
  {id: 'practice', label: '2. AMALIYOT VA QURILMALAR', Icon: Laptop},
  {id: 'quiz', label: '3. BILIMNI SINASH (TEST)', Icon: CheckCircle2},
];

const LESSON = getLesson('/1-dars')!;

export default function MedicalInformaticsApp() {
  const [activeTab, setActiveTab] = useState<TabId>('intro');

  // Resolved on the client only: this page is prerendered, so computing the
  // date during render would freeze the build date into the exported HTML.
  const currentDateFormatted = useClientValue(() => formatUzbekDate(), '');


  // Interactive intro comparison mode state
  const [interactiveMode, setInteractiveMode] = useState<'digital' | 'paper'>('digital');

  // Practice Interactive states
  const [selectedMousePart, setSelectedMousePart] = useState<'left' | 'right' | 'wheel' | 'body'>('left');
  const [selectedKeyboardZone, setSelectedKeyboardZone] = useState<'numpad' | 'alpha' | 'special' | 'function' | 'arrows'>('numpad');
  const [activePowerStep, setActivePowerStep] = useState<number>(1);
  const [activeShutdownStep, setActiveShutdownStep] = useState<number>(1);

  // Keyboard LED Indicator Lights State (Matching User's Photo)
  const [numLockOn, setNumLockOn] = useState<boolean>(true); // Default ON like photo
  const [capsLockOn, setCapsLockOn] = useState<boolean>(false);
  const [scrollLockOn, setScrollLockOn] = useState<boolean>(false);
  const [activeIndicatorCard, setActiveIndicatorCard] = useState<'num' | 'caps' | 'scroll'>('num');
  const [indicatorTestText, setIndicatorTestText] = useState<string>('Bemor: Aliyev Vali, Qon bosimi: 120/80, Tana harorati: 36.6 C');
  const [interactiveTypedKey, setInteractiveTypedKey] = useState<string>('');
  // Interactive stat counters for Section 8 (Theory)
  const [statCounts, setStatCounts] = useState({ speed: 10, accuracy: 99, paper: 85, time: 70 });
  const [isCounting, setIsCounting] = useState(false);

  const handleReplayCounters = () => {
    setIsCounting(true);
    setStatCounts({ speed: 0, accuracy: 0, paper: 0, time: 0 });
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      if (progress >= 100) {
        setStatCounts({ speed: 10, accuracy: 99, paper: 85, time: 70 });
        setIsCounting(false);
        clearInterval(interval);
      } else {
        const factor = progress / 100;
        setStatCounts({
          speed: Math.round(10 * factor),
          accuracy: Math.round(99 * factor),
          paper: Math.round(85 * factor),
          time: Math.round(70 * factor),
        });
      }
    }, 35);
  };

  // Section 6: Context Menu Simulator (Right click)
  const [contextMenuPos, setContextMenuPos] = useState<{ x: number; y: number } | null>(null);
  const [contextSubmenuOpen, setContextSubmenuOpen] = useState(false);
  const [desktopFolders, setDesktopFolders] = useState<string[]>([]);
  const [contextSuccessMsg, setContextSuccessMsg] = useState(false);

  // Section 7: Mouse Wheel Scroll Patient Search
  const [targetPatientFound, setTargetPatientFound] = useState(false);

  // Section 8: Drag and Drop Simulator
  const [fileInTrash, setFileInTrash] = useState(false);
  const [isDraggingFile, setIsDraggingFile] = useState(false);

  // Quiz state - the two banks are scored independently
  const [quizSet, setQuizSet] = useState<QuizBank['key']>('theory');
  const [answers, setAnswers] = useState<Record<QuizBank['key'], Record<number, number>>>({
    theory: {},
    practice: {},
  });

  // Javob variantlari har safar boshqa tartibda chiqadi. Birinchi (prerender
  // qilingan) chizishda tabiiy tartib turadi, aralashtirish mountdan keyin
  // beriladi - shunda serverdagi HTML bilan brauzernikida farq bo'lmaydi.
  const [orders, setOrders] = useState<OrderMap>(() => buildOrders(false));
  useEffect(() => setOrders(buildOrders(true)), []);

  // Interactive Practice State (Virtual Nurse Desk)
  const [simPatientName, setSimPatientName] = useState('Karimov Anvar Saidovich');
  const [simBloodPressure, setSimBloodPressure] = useState('120/80');
  const [simPulse, setSimPulse] = useState('74');
  const [simTemp, setSimTemp] = useState('36.6');
  const [simMedGiven, setSimMedGiven] = useState(false);
  const [simLog, setSimLog] = useState<string[]>([
    "[08:30] Karimov Anvar Saidovich: Qon bosimi: 120/80 mm.sim.ust, Puls: 74 ur/daq, Harorat: 36.6°C. Tizimga dastlabki qabul kiritildi."
  ]);
  const [simSuccessMsg, setSimSuccessMsg] = useState('');

  // Answers are final: the first click on a question locks it in
  const handleSelectAnswer = (bank: QuizBank['key'], questionId: number, optionIndex: number) => {
    setAnswers(prev =>
      prev[bank][questionId] !== undefined
        ? prev
        : { ...prev, [bank]: { ...prev[bank], [questionId]: optionIndex } },
    );
  };

  const handleResetQuiz = (bank: QuizBank['key']) => {
    setAnswers(prev => ({ ...prev, [bank]: {} }));
    setOrders(prev => reshuffleBank(prev, bank));
  };

  // Score of the bank currently open
  const stats = (() => {
    const bank = QUIZ_BANKS.find(b => b.key === quizSet)!;
    const given = answers[quizSet];
    const correct = bank.questions.reduce(
      (n, q) => (given[q.id] === q.correctIndex ? n + 1 : n),
      0,
    );
    const total = bank.questions.length;
    return {
      bank,
      total,
      answered: Object.keys(given).length,
      correct,
      percent: Math.round((correct / total) * 100),
    };
  })();

  const otherBank = QUIZ_BANKS.find(b => b.key !== quizSet);

  // Practice simulator action
  const handleSaveSimData = () => {
    if (!simBloodPressure || !simPulse || !simTemp) {
      setSimSuccessMsg("Barcha ko'rsatkichlarni to'ldiring!");
      return;
    }
    const timeStr = new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' });
    const newEntry = `[${timeStr}] ${simPatientName}: Qon bosimi: ${simBloodPressure} mm.sim.ust, Puls: ${simPulse} ur/daq, Harorat: ${simTemp}°C. Muolaja: ${simMedGiven ? 'Bajarildi (Kiritildi)' : 'Kutilmoqda'}`;
    setSimLog(prev => [newEntry, ...prev.slice(0, 4)]);
    setSimSuccessMsg("Ma'lumotlar bazaga muvaffaqiyatli saqlandi!");
    setTimeout(() => setSimSuccessMsg(''), 4000);
  };

  // Toggle virtual keyboard key simulation
  const handleSimulateKeyClick = (keyChar: string) => {
    setInteractiveTypedKey(keyChar);
    setTimeout(() => setInteractiveTypedKey(''), 500);
  };

  // Calculate lesson progress
  const answeredCount =
    Object.keys(answers.theory).length + Object.keys(answers.practice).length;
  let overallProgress = 25;
  if (activeTab === 'intro') overallProgress = 25;
  if (activeTab === 'theory') overallProgress = 50;
  if (activeTab === 'practice') overallProgress = 75;
  if (activeTab === 'quiz') {
    overallProgress = Math.min(100, Math.round(75 + (answeredCount / TOTAL_QUESTIONS) * 25));
  }

  return (
    <div className="min-h-screen bg-canvas flex flex-col font-sans text-fg antialiased selection:bg-blue-edge selection:text-blue-ink">
      
      <SiteHeader
        eyebrow={LESSON.label}
        title={LESSON.title}
        subtitle={LESSON.topic}
        back={{label: 'Mundarijaga qaytish', to: '/'}}
      />

      {/* ===================== LESSON SECTION TABS ===================== */}
      <div className="border-b border-line bg-surface">
        <div className="mx-auto w-full max-w-7xl px-4 py-3 sm:px-8">
          <nav
            aria-label="Dars bo'limlari"
            className="grid w-full grid-cols-2 gap-1.5 rounded-2xl border border-line bg-subtle p-1.5 lg:grid-cols-4"
          >
            {TABS.map(({id, label, Icon}) => {
              const active = activeTab === id;
              return (
                <button
                  key={id}
                  id={`tab-${id}-btn`}
                  type="button"
                  aria-current={active ? 'page' : undefined}
                  onClick={() => setActiveTab(id)}
                  className={`flex cursor-pointer items-center justify-center gap-2.5 rounded-xl px-3 py-3 text-center text-sm font-bold transition-all duration-200 sm:px-4 sm:py-3.5 sm:text-[15px] ${
                    active
                      ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25'
                      : 'text-fg-muted hover:bg-surface hover:text-fg'
                  }`}
                >
                  <Icon
                    className={`h-5 w-5 shrink-0 ${active ? 'text-white' : 'text-fg-subtle'}`}
                  />
                  <span className="truncate">{label}</span>
                  {id === 'quiz' && answeredCount > 0 ? (
                    <span
                      className={`rounded-md px-2 py-0.5 text-xs font-bold ${
                        active
                          ? 'bg-white/20 text-white'
                          : 'border border-blue-edge bg-blue-tint-strong text-blue-ink'
                      }`}
                    >
                      {answeredCount}/{TOTAL_QUESTIONS}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* ================= MAIN CONTENT (FULL WIDTH) ================= */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col gap-10">
        
        {/* ACTIVE TAB CONTENT */}
        <div className="w-full flex flex-col gap-8">

          {/* ========================================================= */}
          {/* TAB 0: KIRISH (INSPIRING INTRODUCTION FOR NURSES)         */}
          {/* ========================================================= */}
          {activeTab === 'intro' && (
            <div className="space-y-8">
              
              {/* Top Hero Card: Large Font Motivational Headline & Intro */}
              <div className="bg-surface p-6 sm:p-8 rounded-2xl border border-line shadow-sm relative overflow-hidden">
                <div className="flex items-center gap-2.5 text-teal-ink font-bold text-sm tracking-wider uppercase mb-3">
                  <span className="w-3 h-3 rounded-full bg-blue-600 inline-block animate-pulse"></span>
                  {"Bo'lajak hamshiralar uchun kirish so'zi"}
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-fg tracking-tight leading-tight mb-4">
                  {"Nima uchun zamonaviy hamshiraga kompyuter va axborot texnologiyalari zarur?"}
                </h2>
                <p className="text-fg-muted text-base sm:text-lg leading-relaxed mb-6">
                  {"Hurmatli bo'lajak hamshira! Siz inson salomatligi va hayotini saqlashdek eng sharafli, mas'uliyatli kasbni tanladingiz. Bugungi zamonaviy shifoxonada kompyuter va axborot texnologiyalari shunchaki qo'shimcha uskunalar emas — ular sizning eng ishonchli, tezkor va xatosiz yordamchingizdir."}
                </p>
                <div className="p-5 bg-blue-tint border-2 border-blue-edge rounded-xl text-fg text-base sm:text-lg leading-relaxed flex items-start gap-4 shadow-xs">
                  <HeartPulse className="w-8 h-8 text-blue-ink shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-blue-ink font-bold block mb-1 text-base sm:text-lg">
                      {"Hamshiralik san'ati va raqamli qudrat:"}
                    </strong>
                    {"Axborot texnologiyalarini puxta egallagan hamshira ortiqcha qog'ozbozlikdan xalos bo'ladi, bemorga ko'proq mehr va e'tibor ajratadi, shifokor bilan uzluksiz hamkorlikda inson hayotini saqlab qolishda muhim daqiqalarni yutib oladi."}
                  </div>
                </div>

                {/* RICH VISUAL BANNER: SMART HOSPITAL & DIGITAL NURSE DESK ILLUSTRATION */}
                <div className="on-dark mt-6 p-6 bg-gradient-to-br from-blue-900 via-slate-900 to-indigo-950 rounded-2xl border-2 border-blue-700 text-white shadow-md">
                  <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                    <div className="flex-1">
                      <span className="on-dark text-xs font-black tracking-widest text-cyan-300 uppercase bg-blue-950/80 px-3 py-1 rounded-md border border-cyan-500/30 inline-block mb-3">
                        {"Vizual O'quv Sxemasi"}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-black text-white mb-2 leading-snug">
                        {"Zamonaviy Raqamli Klinika va Hamshira Ish Stoli"}
                      </h3>
                      <p className="text-sm text-blue-100/90 leading-relaxed mb-4">
                        {"Bugungi shifoxonada hamshira kompyuteri orqali bemorning kardiogrammasi, laboratoriya tahlillari va dori ko'rsatkichlari markaziy bazaga biriktirilgan holda uzluksiz nazorat qilinadi:"}
                      </p>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
                        <div className="on-dark bg-blue-950/70 p-2.5 rounded-xl border border-blue-700/50">
                          <span className="text-xs font-bold text-cyan-300 block">{"1. EMR Baza"}</span>
                          <span className="text-[11px] text-slate-300">{"Barcha kasallik tarixi"}</span>
                        </div>
                        <div className="on-dark bg-blue-950/70 p-2.5 rounded-xl border border-blue-700/50">
                          <span className="text-xs font-bold text-cyan-300 block">{"2. Vital Monitor"}</span>
                          <span className="text-[11px] text-slate-300">{"EKG va Bosim onlayn"}</span>
                        </div>
                        <div className="on-dark bg-blue-950/70 p-2.5 rounded-xl border border-blue-700/50">
                          <span className="text-xs font-bold text-cyan-300 block">{"3. Laboratoriya"}</span>
                          <span className="text-[11px] text-slate-300">{"Tahlillar 3 soniyada"}</span>
                        </div>
                        <div className="on-dark bg-blue-950/70 p-2.5 rounded-xl border border-blue-700/50">
                          <span className="text-xs font-bold text-cyan-300 block">{"4. E-Retsept"}</span>
                          <span className="text-[11px] text-slate-300">{"Dori xatosiz beriladi"}</span>
                        </div>
                      </div>
                    </div>

                    {/* SVG Graphic of Digital Health Network */}
                    <div className="on-dark w-full lg:w-80 bg-slate-950/80 p-4 rounded-xl border border-blue-500/30 flex items-center justify-center shrink-0">
                      <svg viewBox="0 0 300 200" className="w-full h-auto drop-shadow-md select-none">
                        {/* Central Hospital Server */}
                        <rect x="110" y="70" width="80" height="60" rx="10" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="2" />
                        <text x="150" y="98" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">KLINIKA BAZASI</text>
                        <text x="150" y="112" fill="#93c5fd" fontSize="8" textAnchor="middle">Markaziy Server</text>
                        <circle cx="150" cy="80" r="3" fill="#22c55e" />

                        {/* Top Node: Nurse Workstation */}
                        <g transform="translate(110, 10)">
                          <rect width="80" height="36" rx="8" fill="#0f766e" stroke="#2dd4bf" strokeWidth="1.5" />
                          <text x="40" y="18" fill="#ffffff" fontSize="8.5" fontWeight="bold" textAnchor="middle">Hamshira Posti</text>
                          <text x="40" y="29" fill="#99f6e4" fontSize="7" textAnchor="middle">Kompyuter & Kiritish</text>
                        </g>
                        <line x1="150" y1="46" x2="150" y2="70" stroke="#2dd4bf" strokeWidth="2" strokeDasharray="3,3" />

                        {/* Left Node: Bedside Monitor */}
                        <g transform="translate(10, 80)">
                          <rect width="75" height="40" rx="8" fill="#4338ca" stroke="#818cf8" strokeWidth="1.5" />
                          <text x="37" y="18" fill="#ffffff" fontSize="8.5" fontWeight="bold" textAnchor="middle">Bemor Palatasi</text>
                          <text x="37" y="30" fill="#c7d2fe" fontSize="7" textAnchor="middle">EKG & Monitor</text>
                        </g>
                        <line x1="85" y1="100" x2="110" y2="100" stroke="#818cf8" strokeWidth="2" strokeDasharray="3,3" />

                        {/* Right Node: Laboratory */}
                        <g transform="translate(215, 80)">
                          <rect width="75" height="40" rx="8" fill="#0369a1" stroke="#38bdf8" strokeWidth="1.5" />
                          <text x="37" y="18" fill="#ffffff" fontSize="8.5" fontWeight="bold" textAnchor="middle">Laboratoriya</text>
                          <text x="37" y="30" fill="#bae6fd" fontSize="7" textAnchor="middle">Qon tahlillari</text>
                        </g>
                        <line x1="190" y1="100" x2="215" y2="100" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3,3" />

                        {/* Bottom Node: Pharmacy / Doctor */}
                        <g transform="translate(110, 155)">
                          <rect width="80" height="36" rx="8" fill="#9333ea" stroke="#c084fc" strokeWidth="1.5" />
                          <text x="40" y="18" fill="#ffffff" fontSize="8.5" fontWeight="bold" textAnchor="middle">Dorixona & Shifokor</text>
                          <text x="40" y="29" fill="#e9d5ff" fontSize="7" textAnchor="middle">E-Retsept & Tasdiq</text>
                        </g>
                        <line x1="150" y1="130" x2="150" y2="155" stroke="#c084fc" strokeWidth="2" strokeDasharray="3,3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION: 4 Main Directions Cards Grid (Large, Legible Cards) */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-fg flex items-center gap-3">
                    <span className="w-2.5 h-7 bg-blue-600 rounded-full inline-block"></span>
                    {"Hamshira faoliyatida IT ning 4 ta hayotiy ustuni"}
                  </h3>
                  <span className="text-sm font-bold text-blue-ink bg-blue-tint px-3 py-1 rounded-lg border border-blue-edge">
                    {"4 ta asosiy yo'nalish"}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  
                  {/* CARD 1: Qog'ozbozlikdan qutulish va bemorga e'tibor */}
                  <div className="bg-surface p-6 rounded-2xl border-2 border-line shadow-sm hover:border-blue-400 transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-blue-tint border border-blue-edge flex items-center justify-center text-blue-ink">
                          <FileText className="w-7 h-7" />
                        </div>
                        <span className="text-xs font-bold text-blue-ink bg-blue-tint-strong px-3 py-1 rounded-md">
                          {"1-Ustun"}
                        </span>
                      </div>

                      <h4 className="font-bold text-fg text-lg sm:text-xl mb-3 leading-snug">
                        {"Qog'ozbozlikdan qutulish va bemorga ko'proq e'tibor"}
                      </h4>

                      <p className="text-sm sm:text-base text-fg-muted leading-relaxed mb-4">
                        {"Ilgari bemorning kasallik tarixini arxivdagi qalin daftarlardan qidirish 20-30 daqiqa vaqtni olar edi. Zamonaviy elektron tizimda esa bemor ismini yozish bilan sanoqli soniyalarda uning "}
                        <strong className="text-fg font-bold">{"qon guruhi, o'tkazgan kasalliklari va dorilarga allergiyalari"}</strong>
                        {" ekranda paydo bo'ladi."}
                      </p>
                    </div>

                    <div className="pt-3.5 border-t border-line bg-subtle -mx-6 -mb-6 p-4 rounded-b-2xl">
                      <p className="text-sm text-blue-ink font-bold flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-blue-ink shrink-0" />
                        <span>{"Natija: Vaqt qog'oz to'ldirishga emas, bemor parvarishiga sarflanadi."}</span>
                      </p>
                    </div>
                  </div>

                  {/* CARD 2: Tibbiy xatoliklarning oldini olish */}
                  <div className="bg-surface p-6 rounded-2xl border-2 border-line shadow-sm hover:border-emerald-400 transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-emerald-tint border border-emerald-edge flex items-center justify-center text-emerald-ink">
                          <ShieldCheck className="w-7 h-7" />
                        </div>
                        <span className="text-xs font-bold text-emerald-ink bg-emerald-tint-strong px-3 py-1 rounded-md">
                          {"2-Ustun"}
                        </span>
                      </div>

                      <h4 className="font-bold text-fg text-lg sm:text-xl mb-3 leading-snug">
                        {"Tibbiy xatoliklarning oldini olish va xavfsizlik"}
                      </h4>

                      <p className="text-sm sm:text-base text-fg-muted leading-relaxed mb-4">
                        {"Qo'lda yozilgan noaniq shifokor yozuvini tushunmaslik oqibatida dori dozasini yanglishtirish inson salomatligiga jiddiy xavf soladi. Elektron tizimda "}
                        <strong className="text-fg font-bold">{"dori nomi, berilish vaqti va aniq dozasi (masalan, 5 mg o'rniga 50 mg emas)"}</strong>
                        {" aniq ko'rsatiladi, tizim xatolik yuz bersa zudlik bilan ogohlantiradi."}
                      </p>
                    </div>

                    <div className="pt-3.5 border-t border-line bg-subtle -mx-6 -mb-6 p-4 rounded-b-2xl">
                      <p className="text-sm text-emerald-ink font-bold flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-ink shrink-0" />
                        <span>{"Natija: Inson omili sababli kelib chiqadigan xatolar 95% gacha yo'qoladi."}</span>
                      </p>
                    </div>
                  </div>

                  {/* CARD 3: Zamonaviy tibbiy uskunalar bilan ishlash */}
                  <div className="bg-surface p-6 rounded-2xl border-2 border-line shadow-sm hover:border-blue-400 transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-blue-tint border border-blue-edge flex items-center justify-center text-blue-ink">
                          <Activity className="w-7 h-7" />
                        </div>
                        <span className="text-xs font-bold text-blue-ink bg-blue-tint-strong px-3 py-1 rounded-md">
                          {"3-Ustun"}
                        </span>
                      </div>

                      <h4 className="font-bold text-fg text-lg sm:text-xl mb-3 leading-snug">
                        {"Zamonaviy tibbiy uskunalar bilan professional ishlash"}
                      </h4>

                      <p className="text-sm sm:text-base text-fg-muted leading-relaxed mb-4">
                        {"Bugungi kunda bemorning yurak urishi va nafasini uzluksiz kuzatuvchi reanimatsion monitorlar, kardiogramma asboblari hamda tomchilatib dori yuboruvchi avtomatlashgan uskunalar — aslida "}
                        <strong className="text-fg font-bold">{"maxsus dasturlashtirilgan kompyuterlardir"}</strong>
                        {". Ularni sozlash va signallarini to'g'ri tushunish uchun hamshiraga IT savodxonlik zarur."}
                      </p>
                    </div>

                    <div className="pt-3.5 border-t border-line bg-subtle -mx-6 -mb-6 p-4 rounded-b-2xl">
                      <p className="text-sm text-blue-ink font-bold flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-blue-ink shrink-0" />
                        <span>{"Natija: Hamshira har qanday ilg'or uskunani ishonch bilan boshqara oladi."}</span>
                      </p>
                    </div>
                  </div>

                  {/* CARD 4: Tezkor yordam va tahlillar */}
                  <div className="bg-surface p-6 rounded-2xl border-2 border-line shadow-sm hover:border-indigo-400 transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-indigo-tint border border-indigo-edge flex items-center justify-center text-indigo-ink">
                          <Zap className="w-7 h-7" />
                        </div>
                        <span className="text-xs font-bold text-indigo-ink bg-indigo-tint-strong px-3 py-1 rounded-md">
                          {"4-Ustun"}
                        </span>
                      </div>

                      <h4 className="font-bold text-fg text-lg sm:text-xl mb-3 leading-snug">
                        {"Tezkor yordam va tahlil natijalarini zudlik bilan olish"}
                      </h4>

                      <p className="text-sm sm:text-base text-fg-muted leading-relaxed mb-4">
                        {"Og'ir vaziyatlarda laboratoriyadan qon tahlili natijalarini qog'ozda kutib vaqt yo'qotilmaydi. Tahlil tayyor bo'lishi bilan natijalar to'g'ridan-to'g'ri "}
                        <strong className="text-fg font-bold">{"hamshiraning ish stoli kompyuteriga soniyalarda yetib keladi"}</strong>
                        {". Bu esa shoshilinch yordam ko'rsatishda qimmatli daqiqalarni saqlab qoladi."}
                      </p>
                    </div>

                    <div className="pt-3.5 border-t border-line bg-subtle -mx-6 -mb-6 p-4 rounded-b-2xl">
                      <p className="text-sm text-indigo-ink font-bold flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-indigo-ink shrink-0" />
                        <span>{"Natija: Shifokor va hamshira bemorga darhol to'g'ri muolajani boshlaydi."}</span>
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              {/* INTERACTIVE COMPARISON SIMULATOR: Qog'ozli usul vs Raqamli usul */}
              <div className="bg-surface p-6 sm:p-8 rounded-2xl border border-line shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-fg flex items-center gap-3">
                      <span className="w-2.5 h-6 bg-blue-600 rounded-full inline-block"></span>
                      {"Interaktiv sinov: An'anaviy qog'oz usuli vs Zamonaviy raqamli tizim"}
                    </h3>
                    <p className="text-sm text-fg-muted mt-1">
                      {"Rejimni tanlab, kasalxona amaliyotidagi farqni bevosita solishtiring:"}
                    </p>
                  </div>

                  <div className="flex bg-line p-1.5 rounded-xl border border-line-strong self-start sm:self-auto">
                    <button
                      onClick={() => setInteractiveMode('digital')}
                      className={`px-4 py-2 rounded-lg text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                        interactiveMode === 'digital'
                          ? 'bg-surface text-blue-ink shadow-sm'
                          : 'text-fg-muted hover:text-fg'
                      }`}
                    >
                      <Laptop className="w-4 h-4 text-blue-ink" />
                      <span>{"Raqamli tizim"}</span>
                    </button>

                    <button
                      onClick={() => setInteractiveMode('paper')}
                      className={`px-4 py-2 rounded-lg text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                        interactiveMode === 'paper'
                          ? 'bg-surface text-rose-ink shadow-sm'
                          : 'text-fg-muted hover:text-fg'
                      }`}
                    >
                      <FileText className="w-4 h-4 text-rose-ink" />
                      <span>{"Qog'ozli usul"}</span>
                    </button>
                  </div>
                </div>

                {interactiveMode === 'digital' ? (
                  <div className="p-6 bg-blue-tint/70 border-2 border-blue-edge rounded-2xl space-y-5">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className="text-base font-bold text-blue-ink flex items-center gap-2">
                        <Check className="w-5 h-5 text-blue-ink" />
                        {"Zamonaviy tibbiyot axborot tizimi (Elektron karta)"}
                      </span>
                      <span className="text-sm font-bold text-blue-ink bg-surface px-3 py-1 rounded-lg border border-blue-edge shadow-2xs">
                        {"Qidiruv vaqti: 2 soniya"}
                      </span>
                    </div>

                    {/* Mini search simulation */}
                    <div className="bg-surface p-5 rounded-xl border border-blue-edge shadow-xs space-y-4">
                      <div className="flex gap-3">
                        <div className="relative flex-1">
                          <Search className="w-5 h-5 text-fg-subtle absolute left-3.5 top-3" />
                          <input
                            type="text"
                            placeholder="Bemor ismini kiriting (Masalan: Alimov...)"
                            defaultValue="Alimov Sanjarbek"
                            className="w-full text-sm sm:text-base bg-subtle border border-line-strong rounded-xl pl-11 pr-4 py-2.5 text-fg focus:bg-surface focus:outline-hidden focus:border-blue-500 font-medium"
                          />
                        </div>
                        <button
                          type="button"
                          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold cursor-pointer"
                        >
                          {"Topish"}
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                        <div className="p-3 bg-subtle rounded-lg border border-line">
                          <span className="text-xs text-fg-subtle block font-bold uppercase mb-0.5">{"Qon guruhi"}</span>
                          <span className="font-bold text-blue-ink text-base">{"A(II) Rh+ (Musbat)"}</span>
                        </div>
                        <div className="p-3 bg-rose-tint/60 rounded-lg border border-rose-edge">
                          <span className="text-xs text-rose-ink block font-bold uppercase mb-0.5">{"Allergik reaksiya"}</span>
                          <span className="font-bold text-rose-ink text-sm sm:text-base">{"Penitsillin guruhiga bor"}</span>
                        </div>
                        <div className="p-3 bg-emerald-tint/60 rounded-lg border border-emerald-edge">
                          <span className="text-xs text-emerald-ink block font-bold uppercase mb-0.5">{"Laboratoriya holati"}</span>
                          <span className="font-bold text-emerald-ink text-sm sm:text-base">{"Qon tahlili: Tayyor"}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm sm:text-base text-fg-muted leading-relaxed font-medium">
                      {"Hamshira barcha ma'lumotlarni darhol ko'radi va bemorga noto'g'ri dori yuborilishining oldi to'liq olinadi."}
                    </p>
                  </div>
                ) : (
                  <div className="p-6 bg-rose-tint/70 border-2 border-rose-edge rounded-2xl space-y-5">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className="text-base font-bold text-rose-ink flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-rose-ink" />
                        {"Eski an'anaviy qog'oz daftarlar usuli"}
                      </span>
                      <span className="text-sm font-bold text-rose-ink bg-surface px-3 py-1 rounded-lg border border-rose-edge shadow-2xs">
                        {"Qidiruv vaqti: 25-30 daqiqa"}
                      </span>
                    </div>

                    <div className="bg-surface p-5 rounded-xl border border-rose-edge shadow-xs space-y-3 text-sm sm:text-base">
                      <div className="flex items-start gap-3 text-rose-ink">
                        <span className="w-2 h-2 rounded-full bg-rose-500 mt-2 shrink-0"></span>
                        <p>{"Qalin kartoteka javonlaridan bemorning qog'oz kasallik tarixini qidirish talab etiladi."}</p>
                      </div>
                      <div className="flex items-start gap-3 text-rose-ink">
                        <span className="w-2 h-2 rounded-full bg-rose-500 mt-2 shrink-0"></span>
                        <p>{"Shifokorning qo'lyozmasini tushunish qiyin, allergik ma'lumotlar boshqa varaqda qolib ketishi mumkin."}</p>
                      </div>
                      <div className="flex items-start gap-3 text-rose-ink">
                        <span className="w-2 h-2 rounded-full bg-rose-500 mt-2 shrink-0"></span>
                        <p>{"Laboratoriyaga tahlil qog'ozini olib kelish uchun shaxsan borib-kelishga to'g'ri keladi."}</p>
                      </div>
                    </div>

                    <p className="text-sm sm:text-base text-rose-ink leading-relaxed font-bold">
                      {"Qimmatli vaqt behuda qog'oz qidirishga sarflanadi va shoshilinch yordam ko'rsatish kechikishi mumkin."}
                    </p>
                  </div>
                )}
              </div>

              {/* Bottom Nav Action */}
              <div className="flex justify-end pt-2">
                <button
                  id="go-to-theory-btn"
                  onClick={() => {
                    setActiveTab('theory');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-base font-bold shadow-sm flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <span>{"1-Bo'lim: Nazariyaga o'tish"}</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 1: NAZARIYA (THEORY)                                  */}
          {/* ========================================================= */}
          {activeTab === 'theory' && (
            <div className="space-y-8">
              
              {/* TOP HERO BANNER: Katta mavzu sarlavhasi va Dinamik bugungi sana */}
              <div className="on-dark bg-gradient-to-r from-blue-900 via-blue-800 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-md border-2 border-blue-700/50 relative overflow-hidden">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-blue-700/60 mb-5">
                  <div className="flex items-center gap-3">
                    <span className="bg-blue-500/30 text-blue-200 text-xs sm:text-sm font-black px-3.5 py-1.5 rounded-xl border border-blue-400/40 uppercase tracking-wider">
                      {"1-DARS NAZARIYASI"}
                    </span>
                    <span className="text-blue-200/80 text-xs sm:text-sm font-medium">
                      {"Hamshiralik ishi • Shahrisabz Tibbiyot Texnikumi"}
                    </span>
                  </div>

                  {/* Dinamik bugungi sana ko'rsatkichi */}
                  <div className="on-dark flex items-center gap-2.5 bg-blue-950/60 border border-blue-500/40 px-4 py-2 rounded-2xl w-fit">
                    <Calendar className="w-5 h-5 text-blue-300 shrink-0 animate-pulse" />
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-blue-300/80 font-bold block leading-none">
                        {"Bugungi sana:"}
                      </span>
                      <strong className="text-sm sm:text-base font-bold text-white tracking-wide">
                        {currentDateFormatted || "Yuklanmoqda..."}
                      </strong>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-xs sm:text-sm font-bold text-blue-300 uppercase tracking-widest block">
                    {"O'quv mashg'uloti mavzusi:"}
                  </span>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight tracking-tight">
                    {"Mavzu: Axborot haqida tushuncha. Axborot texnologiyalari haqida ma’lumot."}
                  </h1>
                  <p className="text-sm sm:text-base text-blue-100/90 max-w-4xl pt-1 font-medium leading-relaxed">
                    {"Tibbiyot sohasida axborot tushunchasi, uning 5 ta asosiy xususiyati, turlari hamda zamonaviy hamshira faoliyatida tibbiy axborot texnologiyalarining o'rni va ahamiyati."}
                  </p>
                </div>
              </div>

              {/* Card 1: Medical Information Definition */}
              <div className="bg-surface p-6 sm:p-8 rounded-2xl border border-line shadow-sm">
                <h2 className="text-xl sm:text-2xl font-bold text-fg mb-4 flex items-center gap-3">
                  <span className="w-2.5 h-7 bg-blue-600 rounded-full inline-block"></span>
                  {"Tibbiy axborot nima?"}
                </h2>
                <p className="text-fg-muted leading-relaxed text-base sm:text-lg mb-6">
                  {"Tibbiyotda axborot — bu bemorning holati, shikoyati, tahlil natijalari va davolash jarayoni haqidagi ma'lumotlar majmuidir. Masalan, hamshira bemorning tana haroratini o'lchaganda olingan "}
                  <strong className="text-fg font-black">{"38.5°C"}</strong>
                  {" ko'rsatkichi — bu xom ma'lumot. Ushbu ma'lumotni "}
                  <em className="text-fg font-semibold">{"\"Isitma baland, shifokorga xabar berish kerak\""}</em>
                  {" deb baholash esa "}
                  <strong className="text-blue-ink font-bold">{"axborot"}</strong>
                  {" hisoblanadi."}
                </p>

                {/* Information types graphic grid */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base sm:text-lg font-bold text-fg flex items-center gap-2">
                      <Layers className="w-5 h-5 text-blue-ink" />
                      {"Tibbiyotda axborotning 7 ta asosiy taqdim etilish shakli:"}
                    </h3>
                    <span className="text-xs font-bold text-blue-ink bg-blue-tint px-2.5 py-1 rounded-md border border-blue-edge">
                      {"To'liq tasnif"}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* 1. Matnli */}
                    <div className="bg-subtle p-5 rounded-xl border-2 border-blue-edge/80 hover:border-blue-400 transition-all flex flex-col justify-between">
                      <div>
                        <div className="w-10 h-10 rounded-lg bg-blue-tint-strong text-blue-ink flex items-center justify-center font-bold mb-3 shadow-2xs">
                          <FileText className="w-5 h-5" />
                        </div>
                        <p className="text-sm font-bold text-blue-ink uppercase tracking-wider mb-1.5 flex items-center gap-2">
                          <span>{"1. Matnli axborot"}</span>
                        </p>
                        <p className="text-xs sm:text-sm text-fg-muted leading-relaxed">
                          {"Bemorning shikoyatlari, anamnez (kasallik tarixi), shifokor kundaligi, epikriz, hamshiralik parvarish rejasi va konsilium xulosalari."}
                        </p>
                      </div>
                      <div className="mt-3 pt-2.5 border-t border-line text-[11px] font-semibold text-blue-ink">
                        {"Misol: \"Bemor bosh og'rig'i va holsizlikdan shikoyat qilmoqda\""}
                      </div>
                    </div>

                    {/* 2. Raqamli */}
                    <div className="bg-subtle p-5 rounded-xl border-2 border-blue-edge/80 hover:border-blue-400 transition-all flex flex-col justify-between">
                      <div>
                        <div className="w-10 h-10 rounded-lg bg-blue-tint-strong text-blue-ink flex items-center justify-center font-bold mb-3 shadow-2xs">
                          <Activity className="w-5 h-5" />
                        </div>
                        <p className="text-sm font-bold text-blue-ink uppercase tracking-wider mb-1.5 flex items-center gap-2">
                          <span>{"2. Raqamli axborot"}</span>
                        </p>
                        <p className="text-xs sm:text-sm text-fg-muted leading-relaxed">
                          {"Qon bosimi (120/80 mm sim.ust), puls (74 ur/daq), tana harorati (36.6°C), qondagi qand (glyukoza - 5.2 mmol/l), gemoglobin, bemor vazni va bo'yi."}
                        </p>
                      </div>
                      <div className="mt-3 pt-2.5 border-t border-line text-[11px] font-semibold text-blue-ink">
                        {"Misol: 120/80 mm sim.ust, 37.2°C, 5.5 mmol/l"}
                      </div>
                    </div>

                    {/* 3. Grafik va Tasviriy */}
                    <div className="bg-subtle p-5 rounded-xl border-2 border-indigo-edge/80 hover:border-indigo-400 transition-all flex flex-col justify-between">
                      <div>
                        <div className="w-10 h-10 rounded-lg bg-indigo-tint-strong text-indigo-ink flex items-center justify-center font-bold mb-3 shadow-2xs">
                          <HeartPulse className="w-5 h-5" />
                        </div>
                        <p className="text-sm font-bold text-indigo-ink uppercase tracking-wider mb-1.5 flex items-center gap-2">
                          <span>{"3. Grafik va Tasviriy axborot"}</span>
                        </p>
                        <p className="text-xs sm:text-sm text-fg-muted leading-relaxed">
                          {"Rentgen suratlari, MRT, MSKT (kompyuter tomografiyasi), ultratovush (UTT/UZI), mikroskop ostidagi qon surtmasi tasviri va elektrokardiogramma (EKG) egri chiziqlari."}
                        </p>
                      </div>
                      <div className="mt-3 pt-2.5 border-t border-line text-[11px] font-semibold text-indigo-ink">
                        {"Misol: Rentgen plyonkasi, EKG qog'oz tasmasi"}
                      </div>
                    </div>

                    {/* 4. Tovushli (Audio / Akustik) */}
                    <div className="bg-subtle p-5 rounded-xl border-2 border-emerald-edge/80 hover:border-emerald-400 transition-all flex flex-col justify-between">
                      <div>
                        <div className="w-10 h-10 rounded-lg bg-emerald-tint-strong text-emerald-ink flex items-center justify-center font-bold mb-3 shadow-2xs">
                          <Volume2 className="w-5 h-5" />
                        </div>
                        <p className="text-sm font-bold text-emerald-ink uppercase tracking-wider mb-1.5 flex items-center gap-2">
                          <span>{"4. Tovushli (Audio) axborot"}</span>
                        </p>
                        <p className="text-xs sm:text-sm text-fg-muted leading-relaxed">
                          {"Fonendoskop orqali eshitiladigan yurak tonlari va o'pka nafas shovqinlari (auskultatsiya), audiometriya (eshitishni tekshirish signallari), bemor ovozi va telemeditsina audio muloqoti."}
                        </p>
                      </div>
                      <div className="mt-3 pt-2.5 border-t border-line text-[11px] font-semibold text-emerald-ink">
                        {"Misol: Yurak urish tovushlari, o'pka xirillashi, monitor signallari"}
                      </div>
                    </div>

                    {/* 5. Video va Dinamik axborot */}
                    <div className="bg-subtle p-5 rounded-xl border-2 border-amber-edge/80 hover:border-amber-400 transition-all flex flex-col justify-between">
                      <div>
                        <div className="w-10 h-10 rounded-lg bg-amber-tint-strong text-amber-ink flex items-center justify-center font-bold mb-3 shadow-2xs">
                          <Video className="w-5 h-5" />
                        </div>
                        <p className="text-sm font-bold text-amber-ink uppercase tracking-wider mb-1.5 flex items-center gap-2">
                          <span>{"5. Video va Dinamik axborot"}</span>
                        </p>
                        <p className="text-xs sm:text-sm text-fg-muted leading-relaxed">
                          {"Endoskopiya, gastroskopiya, kolonoskopiya va laparoskopik video-jarrohlik jarayoni, exokardiografiya (yurak klapanlari dinamik harakati) va ultratovush dopplerografiyasi videolari."}
                        </p>
                      </div>
                      <div className="mt-3 pt-2.5 border-t border-line text-[11px] font-semibold text-amber-ink">
                        {"Misol: Laparoskopik operatsiya video yozuvi, yurak qisqarishi"}
                      </div>
                    </div>

                    {/* 6. Taktil (Sezgi / Sensor) axborot */}
                    <div className="bg-subtle p-5 rounded-xl border-2 border-purple-edge/80 hover:border-purple-400 transition-all flex flex-col justify-between">
                      <div>
                        <div className="w-10 h-10 rounded-lg bg-purple-tint-strong text-purple-ink flex items-center justify-center font-bold mb-3 shadow-2xs">
                          <Hand className="w-5 h-5" />
                        </div>
                        <p className="text-sm font-bold text-purple-ink uppercase tracking-wider mb-1.5 flex items-center gap-2">
                          <span>{"6. Taktil (Sezgi) axborot"}</span>
                        </p>
                        <p className="text-xs sm:text-sm text-fg-muted leading-relaxed">
                          {"Tibbiyot xodimining qo'l bilan paypaslab tekshirishi (palpatsiya), terining harorati, turgori (tarangligi), shishlarni aniqlash hamda bionik protezlar va tibbiy robotlarning sezgi datchiklari."}
                        </p>
                      </div>
                      <div className="mt-3 pt-2.5 border-t border-line text-[11px] font-semibold text-purple-ink">
                        {"Misol: Qorin palpatsiyasi, terining elastikligi va harorat sezgisi"}
                      </div>
                    </div>

                    {/* 7. Maxsus bio-kodli va Identifikatsiya axboroti */}
                    <div className="bg-subtle p-5 rounded-xl border-2 border-rose-edge/80 hover:border-rose-400 transition-all flex flex-col justify-between md:col-span-2 lg:col-span-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-lg bg-rose-tint-strong text-rose-ink flex items-center justify-center font-bold shrink-0 shadow-2xs">
                            <QrCode className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-rose-ink uppercase tracking-wider mb-1 flex items-center gap-2">
                              <span>{"7. Maxsus Bio-kodli va Identifikatsiya axboroti"}</span>
                            </p>
                            <p className="text-xs sm:text-sm text-fg-muted leading-relaxed">
                              {"Bemor bilaguzugidagi QR va Shtrix-kodlar (shaxsni xatosiz aniqlash), DNK va genetik kod sekvensiyasi, dori vositalarining raqamli markirovkasi hamda shifrlangan elektron retsept kodlari."}
                            </p>
                          </div>
                        </div>
                        <div className="shrink-0 bg-surface px-3 py-1.5 rounded-lg border border-rose-edge text-xs font-bold text-rose-ink">
                          {"QR / Shtrix-kod & DNK kodi"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Concept: Inson sezgi a'zolari orqali qabul qilinishi */}
                <div className="on-dark mt-6 p-5 bg-blue-900 text-white rounded-2xl border-2 border-blue-700">
                  <div className="flex items-center gap-2 mb-3">
                    <Eye className="w-5 h-5 text-blue-300" />
                    <h4 className="font-bold text-sm sm:text-base text-blue-100">
                      {"Inson idrok etish a'zolari bo'yicha axborot turlari:"}
                    </h4>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
                    <div className="on-dark bg-blue-950/60 p-2.5 rounded-xl border border-blue-600/40">
                      <span className="text-lg font-black text-blue-300 block">{"80-90%"}</span>
                      <strong className="text-xs text-white block">{"Vizual (Ko'rish)"}</strong>
                      <span className="text-[10px] text-blue-200">{"Ko'z orqali"}</span>
                    </div>
                    <div className="on-dark bg-blue-950/60 p-2.5 rounded-xl border border-blue-600/40">
                      <span className="text-lg font-black text-blue-300 block">{"8-10%"}</span>
                      <strong className="text-xs text-white block">{"Audial (Eshitish)"}</strong>
                      <span className="text-[10px] text-blue-200">{"Quloq orqali"}</span>
                    </div>
                    <div className="on-dark bg-blue-950/60 p-2.5 rounded-xl border border-blue-600/40">
                      <span className="text-lg font-black text-blue-300 block">{"1-2%"}</span>
                      <strong className="text-xs text-white block">{"Taktil (Sezish)"}</strong>
                      <span className="text-[10px] text-blue-200">{"Teri orqali"}</span>
                    </div>
                    <div className="on-dark bg-blue-950/60 p-2.5 rounded-xl border border-blue-600/40">
                      <span className="text-lg font-black text-blue-300 block">{"~1%"}</span>
                      <strong className="text-xs text-white block">{"Olfaktor (Hid)"}</strong>
                      <span className="text-[10px] text-blue-200">{"Burun orqali"}</span>
                    </div>
                    <div className="on-dark bg-blue-950/60 p-2.5 rounded-xl border border-blue-600/40">
                      <span className="text-lg font-black text-blue-300 block">{"~1%"}</span>
                      <strong className="text-xs text-white block">{"Gustator (Ta'm)"}</strong>
                      <span className="text-[10px] text-blue-200">{"Til orqali"}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: 5 Main Properties in Nursing */}
              <div className="bg-surface p-6 sm:p-8 rounded-2xl border border-line shadow-sm">
                <h2 className="text-xl sm:text-2xl font-bold text-fg mb-6 flex items-center gap-3">
                  <span className="w-2.5 h-7 bg-blue-600 rounded-full inline-block"></span>
                  {"Hamshiralik amaliyotida axborotning 5 ta asosiy xususiyati"}
                </h2>

                <div className="space-y-4">
                  <div className="flex gap-4 items-start p-4 bg-subtle rounded-xl border border-line">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shrink-0 text-white font-bold text-base shadow-2xs">
                      1
                    </div>
                    <div>
                      <p className="font-bold text-fg text-base sm:text-lg">{"Aniqlik (To'g'rilik)"}</p>
                      <p className="text-sm sm:text-base text-fg-muted mt-1 leading-relaxed">
                        {"Dori dozasini xatosiz yozish: masalan, "}
                        <span className="font-bold text-rose-ink">50 mg</span>
                        {" emas, shifokor buyurgan aniq "}
                        <span className="font-bold text-emerald-ink">5 mg</span>
                        {" miqdorini kiritish."}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start p-4 bg-subtle rounded-xl border border-line">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shrink-0 text-white font-bold text-base shadow-2xs">
                      2
                    </div>
                    <div>
                      <p className="font-bold text-fg text-base sm:text-lg">{"O'z vaqtidalik (Tezkorlik)"}</p>
                      <p className="text-sm sm:text-base text-fg-muted mt-1 leading-relaxed">
                        {"Shoshilinch qon tahlillari va keskin ko'tarilgan qon bosimini shifokorga darhol yetkazish."}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start p-4 bg-subtle rounded-xl border border-line">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shrink-0 text-white font-bold text-base shadow-2xs">
                      3
                    </div>
                    <div>
                      <p className="font-bold text-fg text-base sm:text-lg">{"To'liqlik"}</p>
                      <p className="text-sm sm:text-base text-fg-muted mt-1 leading-relaxed">
                        {"Bemorning barcha shikoyatlari, avvalgi operatsiyalari va dorilarga allergik reaksiyalarini to'liq qayd etish."}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start p-4 bg-subtle rounded-xl border border-line">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shrink-0 text-white font-bold text-base shadow-2xs">
                      4
                    </div>
                    <div>
                      <p className="font-bold text-fg text-base sm:text-lg">{"Ishonchlilik"}</p>
                      <p className="text-sm sm:text-base text-fg-muted mt-1 leading-relaxed">
                        {"Faqat tekshirilgan va to'g'ri sozlangan tibbiy asboblar (bosim o'lchagich, kardiograf, laboratoriya analizatori) ma'lumotlariga tayanish."}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start p-4 bg-subtle rounded-xl border border-line">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shrink-0 text-white font-bold text-base shadow-2xs">
                      5
                    </div>
                    <div>
                      <p className="font-bold text-fg text-base sm:text-lg">{"Maxfiylik (Tibbiy sir)"}</p>
                      <p className="text-sm sm:text-base text-fg-muted mt-1 leading-relaxed">
                        {"Bemorning tashxisi va davolash ma'lumotlarini begonalar yoki ruxsatsiz shaxslarga aslo oshkor qilmaslik."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ========================================================= */}
              {/* 3-BO'LIM: TIBBIYOTDA AXBOROT TEXNOLOGIYALARI              */}
              {/* ========================================================= */}
              <div className="bg-surface p-6 sm:p-8 rounded-2xl border border-line shadow-sm">
                <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                  <h2 className="text-xl sm:text-2xl font-bold text-fg flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                      <Monitor className="w-6 h-6" />
                    </div>
                    <span>{"3-Bo'lim. Tibbiyotda axborot texnologiyalari"}</span>
                  </h2>
                  <span className="text-xs font-bold text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-lg border border-cyan-500/30">
                    {"Raqamli tibbiyot"}
                  </span>
                </div>

                <p className="text-fg-muted text-sm sm:text-base leading-relaxed mb-6">
                  {"Raqamli tibbiyot (Digital Medicine) bugungi kunda shifoxonalar faoliyatini butunlay o'zgartirdi. Quyidagi asosiy yo'nalishlar tibbiyotda AKT fanining asosiy o'rganish ob'ektlaridir:"}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Card 1: EMK */}
                  <div className="p-5 rounded-xl border border-line bg-subtle hover:border-cyan-500/40 transition-all">
                    <div className="flex items-center gap-2.5 mb-2 text-cyan-400 font-bold text-base">
                      <FileText className="w-5 h-5 shrink-0" />
                      <span>{"Elektron tibbiy karta (EMK / ЭМК)"}</span>
                    </div>
                    <p className="text-sm text-fg-muted leading-relaxed">
                      {"Bemorning barcha klinik ma'lumotlari, tashxislari, tahlil natijalari va retseptlari saqlanadigan yagona raqamli pasport. Shifokor kompyuter orqali bir necha soniyada barcha tarixni ko'ra oladi."}
                    </p>
                  </div>

                  {/* Card 2: Telemeditsina */}
                  <div className="p-5 rounded-xl border border-line bg-subtle hover:border-cyan-500/40 transition-all">
                    <div className="flex items-center gap-2.5 mb-2 text-cyan-400 font-bold text-base">
                      <Video className="w-5 h-5 shrink-0" />
                      <span>{"Telemeditsina (Onlayn konsultatsiya)"}</span>
                    </div>
                    <p className="text-sm text-fg-muted leading-relaxed">
                      {"Uzoq qishloqlardagi yoki viloyatlardagi bemorlarni poytaxtdagi yetakchi shifokorlar bilan internet kanallari orqali video-konsultatsiya qilish, masofadan tashxis qo'yish imkoniyati."}
                    </p>
                  </div>

                  {/* Card 3: MIS */}
                  <div className="p-5 rounded-xl border border-line bg-subtle hover:border-cyan-500/40 transition-all">
                    <div className="flex items-center gap-2.5 mb-2 text-cyan-400 font-bold text-base">
                      <Building2 className="w-5 h-5 shrink-0" />
                      <span>{"Kasalxona axborot tizimlari (MIS)"}</span>
                    </div>
                    <p className="text-sm text-fg-muted leading-relaxed">
                      {"Shifoxonadagi bemorlarni ro'yxatga olish, shifokorlar ish jadvalini rejalashtirish, dorilar omborini to'liq nazorat qilish va moliyaviy hisobotlarni avtomatlashtiradigan boshqaruv tizimi."}
                    </p>
                  </div>

                  {/* Card 4: Elektron retsept */}
                  <div className="p-5 rounded-xl border border-line bg-subtle hover:border-cyan-500/40 transition-all">
                    <div className="flex items-center gap-2.5 mb-2 text-cyan-400 font-bold text-base">
                      <QrCode className="w-5 h-5 shrink-0" />
                      <span>{"Elektron retsept (E-Prescribing)"}</span>
                    </div>
                    <p className="text-sm text-fg-muted leading-relaxed">
                      {"Shifokor yozgan dori retsepti to'g'ridan-to'g'ri dorixonalar bazasiga elektron tarzda yuklanadi. Bemor dorixonaga pasport kodi yoki elektron ID bilan borib, kerakli dorilarni oladi."}
                    </p>
                  </div>

                  {/* Card 5: AI Assistant (Full Width) */}
                  <div className="md:col-span-2 p-5 rounded-xl border border-line bg-subtle hover:border-emerald-500/40 transition-all">
                    <div className="flex items-center gap-2.5 mb-2 text-emerald-400 font-bold text-base">
                      <Cpu className="w-5 h-5 shrink-0" />
                      <span>{"Sun'iy Intellekt va Tashxislar (AI Assistant)"}</span>
                    </div>
                    <p className="text-sm text-fg-muted leading-relaxed">
                      {"Neyron tarmoqlar o'pkadagi pnevmoniya alomatlarini, saraton shishlarini rentgen va MRT tasvirlari asosida 98% aniqlik bilan avtomatik tahlil qilib, shifokorga hisobot beradi. Bu inson xatolarini minimallashtiradi."}
                    </p>
                  </div>
                </div>
              </div>

              {/* ========================================================= */}
              {/* 4-BO'LIM: AXBOROT TEXNOLOGIYALARINING AFZALLIKLARI        */}
              {/* ========================================================= */}
              <div className="bg-surface p-6 sm:p-8 rounded-2xl border border-line shadow-sm">
                <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                  <h2 className="text-xl sm:text-2xl font-bold text-fg flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400">
                      <TrendingUp className="w-6 h-6" />
                    </div>
                    <span>{"4-Bo'lim. Axborot texnologiyalarining afzalliklari"}</span>
                  </h2>
                  <span className="text-xs font-bold text-blue-ink bg-blue-tint px-3 py-1 rounded-lg border border-blue-edge">
                    {"Samaradorlik ko'rsatkichlari"}
                  </span>
                </div>

                <p className="text-fg-muted text-sm sm:text-base leading-relaxed mb-6">
                  {"Tibbiyot va ijtimoiy hayotga IT tizimlarining joriy etilishi ish samaradorligi va xizmat sifatini yangi bosqichga olib chiqdi:"}
                </p>

                {/* 4 Stat Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  {/* Stat 1: 10x */}
                  <div className="p-5 rounded-2xl border border-line bg-subtle text-center flex flex-col justify-between hover:border-blue-500/40 transition-all">
                    <div>
                      <div className="text-3xl sm:text-4xl font-black text-cyan-400 tracking-tight mb-2">
                        {statCounts.speed}{"x"}
                      </div>
                      <h4 className="font-bold text-fg text-sm sm:text-base mb-2">
                        {"Tezlik ko'rsatkichi"}
                      </h4>
                    </div>
                    <p className="text-xs text-fg-muted leading-relaxed">
                      {"Hujjatlar aylanmasi 10 barobar tezlashdi."}
                    </p>
                  </div>

                  {/* Stat 2: 99% */}
                  <div className="p-5 rounded-2xl border border-line bg-subtle text-center flex flex-col justify-between hover:border-blue-500/40 transition-all">
                    <div>
                      <div className="text-3xl sm:text-4xl font-black text-cyan-400 tracking-tight mb-2">
                        {statCounts.accuracy}{"%"}
                      </div>
                      <h4 className="font-bold text-fg text-sm sm:text-base mb-2">
                        {"Tashxis aniqligi (%)"}
                      </h4>
                    </div>
                    <p className="text-xs text-fg-muted leading-relaxed">
                      {"AI va aqlli tizimlar yordamida aniqlik darajasi."}
                    </p>
                  </div>

                  {/* Stat 3: 85% */}
                  <div className="p-5 rounded-2xl border border-line bg-subtle text-center flex flex-col justify-between hover:border-blue-500/40 transition-all">
                    <div>
                      <div className="text-3xl sm:text-4xl font-black text-cyan-400 tracking-tight mb-2">
                        {statCounts.paper}{"%"}
                      </div>
                      <h4 className="font-bold text-fg text-sm sm:text-base mb-2">
                        {"Qog'oz tejalishi (%)"}
                      </h4>
                    </div>
                    <p className="text-xs text-fg-muted leading-relaxed">
                      {"Elektron kartaga o'tish hisobiga tejalgan qog'oz."}
                    </p>
                  </div>

                  {/* Stat 4: 70% */}
                  <div className="p-5 rounded-2xl border border-line bg-subtle text-center flex flex-col justify-between hover:border-blue-500/40 transition-all">
                    <div>
                      <div className="text-3xl sm:text-4xl font-black text-cyan-400 tracking-tight mb-2">
                        {statCounts.time}{"%"}
                      </div>
                      <h4 className="font-bold text-fg text-sm sm:text-base mb-2">
                        {"Vaqt tejalishi (%)"}
                      </h4>
                    </div>
                    <p className="text-xs text-fg-muted leading-relaxed">
                      {"Kasalxona navbatlarining kamayishi."}
                    </p>
                  </div>
                </div>

                {/* Replay Counters Button */}
                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={handleReplayCounters}
                    disabled={isCounting}
                    className="flex items-center gap-2 rounded-full border border-cyan-500/40 bg-cyan-500/10 px-6 py-2.5 text-sm font-bold text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-400 transition-all cursor-pointer shadow-sm active:scale-95 disabled:opacity-50"
                  >
                    <RotateCcw className={`w-4 h-4 ${isCounting ? 'animate-spin' : ''}`} />
                    <span>{"Hisoblagichlarni qayta faollashtirish"}</span>
                  </button>
                </div>
              </div>

              {/* Bottom Nav Action */}
              <div className="flex justify-between items-center pt-2">
                <button
                  onClick={() => {
                    setActiveTab('intro');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-line hover:bg-line-strong text-fg px-5 py-2.5 rounded-xl text-base font-bold transition-colors cursor-pointer"
                >
                  {"← Kirish qismiga qaytish"}
                </button>

                <button
                  onClick={() => {
                    setActiveTab('practice');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-base font-bold shadow-sm flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <span>{"2-Bo'lim: Amaliyotga o'tish"}</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 2: AMALIYOT VA QURILMALAR (DEEP VISUAL PRACTICE)      */}
          {/* ========================================================= */}
          {activeTab === 'practice' && (
            <div className="space-y-8">

              {/* OVERVIEW GRAPHIC: COMPUTER HARDWARE IN HEALTHCARE */}
              <div className="bg-surface p-6 sm:p-8 rounded-2xl border border-line shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl sm:text-2xl font-bold text-fg flex items-center gap-3">
                    <span className="w-2.5 h-7 bg-blue-600 rounded-full inline-block"></span>
                    {"1. Tibbiy kompyuterning tuzilishi (Grafik sxema)"}
                  </h2>
                  <span className="text-xs font-bold text-blue-ink bg-blue-tint px-3 py-1 rounded-lg border border-blue-edge">
                    {"Asosiy qurilmalar"}
                  </span>
                </div>

                <p className="text-fg-muted text-sm sm:text-base leading-relaxed mb-6">
                  {"Hamshira ish stantsiyasidagi shaxsiy kompyuter quyidagi 4 ta asosiy qismdan tashkil topgan. Har bir qism o'ziga xos tibbiy vazifani bajaradi:"}
                </p>

                {/* Visual Graphic Block of Computer Hardware */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  
                  {/* Monitor */}
                  <div className="p-4 bg-subtle rounded-xl border-2 border-line flex flex-col items-center text-center">
                    <div className="w-14 h-14 bg-blue-tint-strong rounded-2xl flex items-center justify-center text-blue-ink mb-3">
                      <Monitor className="w-8 h-8" />
                    </div>
                    <h4 className="font-bold text-fg text-base mb-1">{"1. Monitor (Ekran)"}</h4>
                    <p className="text-xs text-fg-muted leading-relaxed">
                      {"Axborotni chiqarish: Bemor anketasi, tahlillar va kardiogrammani ko'rsatadi."}
                    </p>
                  </div>

                  {/* System Unit */}
                  <div className="p-4 bg-subtle rounded-xl border-2 border-line flex flex-col items-center text-center">
                    <div className="w-14 h-14 bg-blue-tint-strong rounded-2xl flex items-center justify-center text-blue-ink mb-3">
                      <HardDrive className="w-8 h-8" />
                    </div>
                    <h4 className="font-bold text-fg text-base mb-1">{"2. Tizim bloki"}</h4>
                    <p className="text-xs text-fg-muted leading-relaxed">
                      {"Kompyuterning miyasi: Barcha hisob-kitoblar va ma'lumotlarni saqlaydi."}
                    </p>
                  </div>

                  {/* Keyboard */}
                  <div className="p-4 bg-subtle rounded-xl border-2 border-line flex flex-col items-center text-center">
                    <div className="w-14 h-14 bg-blue-tint-strong rounded-2xl flex items-center justify-center text-blue-ink mb-3">
                      <Keyboard className="w-8 h-8" />
                    </div>
                    <h4 className="font-bold text-fg text-base mb-1">{"3. Klaviatura"}</h4>
                    <p className="text-xs text-fg-muted leading-relaxed">
                      {"Axborot kiritish: Bemor ismi, dori dozasi va raqamli ko'rsatkichlarni terish."}
                    </p>
                  </div>

                  {/* Mouse */}
                  <div className="p-4 bg-subtle rounded-xl border-2 border-line flex flex-col items-center text-center">
                    <div className="w-14 h-14 bg-indigo-tint-strong rounded-2xl flex items-center justify-center text-indigo-ink mb-3">
                      <Mouse className="w-8 h-8" />
                    </div>
                    <h4 className="font-bold text-fg text-base mb-1">{"4. Sichqoncha"}</h4>
                    <p className="text-xs text-fg-muted leading-relaxed">
                      {"Boshqaruv: Ekrandagi kursorni harakatlantirish va buyruqlarni tanlash."}
                    </p>
                  </div>

                </div>
              </div>

              {/* TOPIC 2: POWER ON & SAFE SHUTDOWN ALGORITHM (INTERACTIVE & SCHEMATIC) */}
              <div className="bg-surface p-6 sm:p-8 rounded-2xl border border-line shadow-sm">
                <h2 className="text-xl sm:text-2xl font-bold text-fg mb-4 flex items-center gap-3">
                  <span className="w-2.5 h-7 bg-blue-600 rounded-full inline-block"></span>
                  {"2. Kompyuterni to'g'ri yoqish va xavfsiz o'chirish algoritmi"}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  
                  {/* Power ON Scheme */}
                  <div className="bg-blue-tint/60 p-5 rounded-2xl border-2 border-blue-edge flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2.5 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
                          <Power className="w-5 h-5" />
                        </div>
                        <h3 className="font-bold text-blue-ink text-base sm:text-lg">
                          {"Kompyuterni to'g'ri yoqish tartibi"}
                        </h3>
                      </div>

                      <ol className="space-y-3 text-sm sm:text-base text-fg">
                        <li className="flex items-start gap-2.5">
                          <span className="w-6 h-6 rounded-full bg-blue-edge text-blue-ink font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">1</span>
                          <span><strong>Elektr toki:</strong> Rozetka va uzatgich (stabilizator) yoqilganligini tekshiring.</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <span className="w-6 h-6 rounded-full bg-blue-edge text-blue-ink font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">2</span>
                          <span><strong>Tizim bloki:</strong> Tizim blokining old panelidagi yirik <strong>Power (Quvvat)</strong> tugmasini 1 marta bosing.</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <span className="w-6 h-6 rounded-full bg-blue-edge text-blue-ink font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">3</span>
                          <span><strong>Monitor:</strong> Agar monitor avtomatik yoqilmasa, monitorning quvvat tugmasini bosing.</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <span className="w-6 h-6 rounded-full bg-blue-edge text-blue-ink font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">4</span>
                          <span><strong>{"Tizimga kirish:"}</strong> {"Windows to'liq yuklangach, o'z shaxsiy hamshiralik login va parolingizni kiriting."}</span>
                        </li>
                      </ol>
                    </div>

                    <div className="mt-4 p-3 bg-blue-tint-strong/70 rounded-xl text-xs text-blue-ink font-medium">
                      {"💡 Eslatma: Yuklanish jarayonida tugmalarni ketma-ket qayta bosish tizim qotishiga olib keladi."}
                    </div>
                  </div>

                  {/* Safe Shutdown Scheme */}
                  <div className="bg-rose-tint/60 p-5 rounded-2xl border-2 border-rose-edge flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2.5 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-rose-600 text-white flex items-center justify-center font-bold">
                          <ShieldAlert className="w-5 h-5" />
                        </div>
                        <h3 className="font-bold text-rose-ink text-base sm:text-lg">
                          {"Xavfsiz o'chirish (Qat'iy qoida)"}
                        </h3>
                      </div>

                      <ol className="space-y-3 text-sm sm:text-base text-fg">
                        <li className="flex items-start gap-2.5">
                          <span className="w-6 h-6 rounded-full bg-rose-edge text-rose-ink font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">1</span>
                          <span><strong>{"Ma'lumotlarni saqlash:"}</strong> {"Bemorlar kartochkalari va o'tkazilgan muolajalarni saqlang."}</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <span className="w-6 h-6 rounded-full bg-rose-edge text-rose-ink font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">2</span>
                          <span><strong>{"Dasturlarni yopish:"}</strong> {"Ochiq turgan barcha tibbiy dasturlardan to'g'ri chiqing."}</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <span className="w-6 h-6 rounded-full bg-rose-edge text-rose-ink font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">3</span>
                          <span><strong>{"Boshlash menyusi:"}</strong> {"Ekranning chap pastki burchagidagi "}<strong>{"\"Boshlash\" (Пуск/Start)"}</strong>{" tugmasini bosing."}</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <span className="w-6 h-6 rounded-full bg-rose-edge text-rose-ink font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">4</span>
                          <span><strong>{"O'chirish:"}</strong> <strong>{"\"Tizimni o'chirish\" (Завершение работы)"}</strong>{" buyrug'ini tanlang."}</span>
                        </li>
                      </ol>
                    </div>

                    <div className="mt-4 p-3 bg-rose-tint-strong/80 rounded-xl text-xs text-rose-ink font-bold">
                      {"⚠️ Qat'iyan taqiqlanadi: Elektr vilkasini rozetkadan sug'urib o'chirish bemorlar bazasini shikastlaydi!"}
                    </div>
                  </div>

                </div>

                {/* Screen lock tip */}
                <div className="p-4 bg-amber-tint border border-amber-edge rounded-xl flex items-start gap-3">
                  <Lock className="w-6 h-6 text-amber-ink shrink-0 mt-0.5" />
                  <div className="text-sm sm:text-base text-amber-ink">
                    <strong>{"Palataga chiqishda ekranni tezkor qulflash:"}</strong>
                    {" Hamshira palataga chaqiruvga ketayotganda begona kishilar yoki bemorlar ma'lumotlarni ko'rmasligi uchun klaviaturadagi "}
                    <kbd className="px-2 py-0.5 bg-surface border border-amber-edge rounded font-mono font-bold text-xs">Win + L</kbd>
                    {" tugmalarini birga bosing. Tizim darhol qulflanadi va tibbiy sir himoyalanadi."}
                  </div>
                </div>
              </div>

              {/* TOPIC 3: SICHQONCHA TUZILISHI VA VAZIFALARI (INTERACTIVE GRAPHIC) */}
              <div className="bg-surface p-6 sm:p-8 rounded-2xl border border-line shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl sm:text-2xl font-bold text-fg flex items-center gap-3">
                    <span className="w-2.5 h-7 bg-blue-600 rounded-full inline-block"></span>
                    {"3. Sichqoncha (Manipulyator) tuzilishi va tibbiyotdagi vazifalari"}
                  </h2>
                  <span className="text-xs font-bold text-blue-ink bg-blue-tint px-3 py-1 rounded-lg border border-blue-edge">
                    {"Interaktiv sxema"}
                  </span>
                </div>

                <p className="text-fg-muted text-sm sm:text-base leading-relaxed mb-6">
                  {"Sichqonchaning qismlari ustiga bosing va ularning kasalxona tizimlaridagi aniq vazifalarini bilib oling:"}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  
                  {/* Visual SVG Graphic of Computer Mouse */}
                  <div className="md:col-span-5 flex flex-col items-center justify-center p-6 bg-subtle rounded-2xl border-2 border-line">
                    <svg viewBox="0 0 200 300" className="w-48 h-64 drop-shadow-sm select-none">
                      {/* Mouse Body outline */}
                      <path
                        d="M 40,90 C 40,30 160,30 160,90 L 160,200 C 160,260 40,260 40,200 Z"
                        fill={selectedMousePart === 'body' ? '#e0f2fe' : '#f8fafc'}
                        stroke={selectedMousePart === 'body' ? '#0284c7' : '#94a3b8'}
                        strokeWidth="4"
                        className="cursor-pointer transition-all"
                        onClick={() => setSelectedMousePart('body')}
                      />

                      {/* Left Button */}
                      <path
                        d="M 42,90 C 42,40 95,40 95,40 L 95,120 L 42,120 Z"
                        fill={selectedMousePart === 'left' ? '#0284c7' : '#cbd5e1'}
                        stroke="#475569"
                        strokeWidth="3"
                        className="cursor-pointer transition-all hover:opacity-90"
                        onClick={() => setSelectedMousePart('left')}
                      />

                      {/* Right Button */}
                      <path
                        d="M 105,40 C 105,40 158,40 158,90 L 158,120 L 105,120 Z"
                        fill={selectedMousePart === 'right' ? '#2563eb' : '#cbd5e1'}
                        stroke="#475569"
                        strokeWidth="3"
                        className="cursor-pointer transition-all hover:opacity-90"
                        onClick={() => setSelectedMousePart('right')}
                      />

                      {/* Scroll Wheel */}
                      <rect
                        x="92"
                        y="60"
                        width="16"
                        height="40"
                        rx="8"
                        fill={selectedMousePart === 'wheel' ? '#e11d48' : '#64748b'}
                        stroke="#1e293b"
                        strokeWidth="2"
                        className="cursor-pointer transition-all hover:opacity-90"
                        onClick={() => setSelectedMousePart('wheel')}
                      />

                      {/* Wire / Wireless indicator */}
                      <path d="M 100,40 L 100,10" stroke="#94a3b8" strokeWidth="3" strokeDasharray="3,3" />

                      {/* Text Labels inside SVG */}
                      <text x="50" y="85" fill={selectedMousePart === 'left' ? '#ffffff' : '#1e293b'} fontSize="11" fontWeight="bold">{"Chap"}</text>
                      <text x="115" y="85" fill={selectedMousePart === 'right' ? '#ffffff' : '#1e293b'} fontSize="11" fontWeight="bold">{"O'ng"}</text>
                      <text x="75" y="210" fill="#64748b" fontSize="12" fontWeight="bold">{"Korpus"}</text>
                    </svg>

                    <div className="flex gap-2 mt-4 flex-wrap justify-center">
                      <button
                        onClick={() => setSelectedMousePart('left')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          selectedMousePart === 'left' ? 'bg-blue-600 text-white shadow-2xs' : 'bg-surface border border-line-strong text-fg-muted'
                        }`}
                      >
                        {"Chap tugma"}
                      </button>
                      <button
                        onClick={() => setSelectedMousePart('right')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          selectedMousePart === 'right' ? 'bg-blue-600 text-white shadow-2xs' : 'bg-surface border border-line-strong text-fg-muted'
                        }`}
                      >
                        {"O'ng tugma"}
                      </button>
                      <button
                        onClick={() => setSelectedMousePart('wheel')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          selectedMousePart === 'wheel' ? 'bg-rose-600 text-white shadow-2xs' : 'bg-surface border border-line-strong text-fg-muted'
                        }`}
                      >
                        {"G'ildirakcha (Scroll)"}
                      </button>
                    </div>
                  </div>

                  {/* Explanation card based on active mouse button */}
                  <div className="md:col-span-7 space-y-4">
                    {selectedMousePart === 'left' && (
                      <div className="p-6 bg-blue-tint border-2 border-blue-edge rounded-2xl">
                        <div className="flex items-center gap-2 mb-2 text-blue-ink font-bold text-sm uppercase">
                          <CheckCircle2 className="w-5 h-5 text-blue-ink" />
                          {"Sichqonchaning chap tugmasi (Asosiy ishchi tugma)"}
                        </div>
                        <h4 className="text-xl font-bold text-fg mb-3">
                          {"Bir marta bosish va Ikki marta tez bosish"}
                        </h4>
                        <div className="space-y-3 text-sm sm:text-base text-fg-muted">
                          <p className="flex items-start gap-2">
                            <strong className="text-blue-ink shrink-0">1 marta bosish (Tanlash):</strong>
                            {" Bemorlar ro'yxatidan kerakli bemorni tanlash, qon guruhi katakchasini belgilash yoki tugmani bosish."}
                          </p>
                          <p className="flex items-start gap-2">
                            <strong className="text-blue-ink shrink-0">2 marta tez bosish (Ochish):</strong>
                            {" Bemorning to'liq elektron kasallik tarixi faylini yoki tahlil natijalari varaqasini ochish."}
                          </p>
                        </div>
                      </div>
                    )}

                    {selectedMousePart === 'right' && (
                      <div className="p-6 bg-blue-tint border-2 border-blue-edge rounded-2xl">
                        <div className="flex items-center gap-2 mb-2 text-blue-ink font-bold text-sm uppercase">
                          <Sliders className="w-5 h-5 text-blue-ink" />
                          {"Sichqonchaning o'ng tugmasi (Kontekst menyu)"}
                        </div>
                        <h4 className="text-xl font-bold text-fg mb-3">
                          {"Qo'shimcha amallar va menyularni chaqirish"}
                        </h4>
                        <p className="text-sm sm:text-base text-fg-muted leading-relaxed">
                          {"Bemor fayli ustiga olib borib o'ng tugma bosilganda qo'shimcha buyruqlar ochiladi: "}
                          <strong className="text-fg font-semibold">{"\"Tahrirlash\", \"Chop etish\", \"Nusxa olish\", \"Arxivga yuborish\"."}</strong>
                        </p>
                      </div>
                    )}

                    {selectedMousePart === 'wheel' && (
                      <div className="p-6 bg-rose-tint border-2 border-rose-edge rounded-2xl">
                        <div className="flex items-center gap-2 mb-2 text-rose-ink font-bold text-sm uppercase">
                          <ArrowDown className="w-5 h-5 text-rose-ink" />
                          {"O'rta g'ildirakcha (Scroll / Aylantirish)"}
                        </div>
                        <h4 className="text-xl font-bold text-fg mb-3">
                          {"Uzun hujjatlar va tahlillarni varaqlash"}
                        </h4>
                        <p className="text-sm sm:text-base text-fg-muted leading-relaxed">
                          {"G'ildirakchani oldinga yoki orqaga aylantirish orqali bemorning ko'p sahifali laboratoriya natijalari, reanimatsiya jurnali yoki kardiogramma tasvirini yuqoriga-pastga tezkor varaqlash mumkin."}
                        </p>
                      </div>
                    )}

                    {selectedMousePart === 'body' && (
                      <div className="p-6 bg-subtle border-2 border-line-strong rounded-2xl">
                        <div className="flex items-center gap-2 mb-2 text-fg font-bold text-sm uppercase">
                          <Mouse className="w-5 h-5 text-fg-muted" />
                          {"Sichqonchani to'g'ri ushlash (Ergonomika)"}
                        </div>
                        <h4 className="text-xl font-bold text-fg mb-3">
                          {"Hamshira salomatligi va qulaylik"}
                        </h4>
                        <p className="text-sm sm:text-base text-fg-muted leading-relaxed">
                          {"Sichqonchani butun kaft bilan yumshoq ushlang. Ko'rsatkich barmog'i chap tugmada, o'rta barmoq o'ng tugmada erkin turishi lozim. Bilak egilmasligi tunu-kun navbatchilikda qo'l charchashining oldini oladi."}
                        </p>
                      </div>
                    )}

                    <div className="p-4 bg-canvas rounded-xl border border-line text-xs text-fg-muted">
                      {"💡 Sinab ko'rish: Yuqoridagi sichqoncha qismlarini bosing va har bir qismning mohiyatini eslab qoling."}
                    </div>
                  </div>

                </div>
              </div>

              {/* TOPIC 4: KLAVIATURA TUZILISHI VA 5 TA ASOSIY HUDUD (VISUAL MAP) */}
              <div className="bg-surface p-6 sm:p-8 rounded-2xl border border-line shadow-sm">
                <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                  <h2 className="text-xl sm:text-2xl font-bold text-fg flex items-center gap-3">
                    <span className="w-2.5 h-7 bg-blue-600 rounded-full inline-block"></span>
                    {"4. Klaviatura tuzilishi: 5 ta asosiy hudud va maxsus tugmalar"}
                  </h2>
                  <span className="text-xs font-bold text-blue-ink bg-blue-tint px-3 py-1 rounded-lg border border-blue-edge">
                    {"Interaktiv tugmalar xaritasi"}
                  </span>
                </div>

                <p className="text-fg-muted text-sm sm:text-base leading-relaxed mb-5">
                  {"Klaviaturaning quyidagi 5 ta asosiy hududini sxemada ko'ring yoki tugmalarni bosing. Tanlangan hudud klaviatura rasmida alohida rang bilan ajralib ko'rsatiladi:"}
                </p>

                {/* Interactive Visual SVG Keyboard Diagram */}
                <div className="on-dark bg-slate-900 p-4 sm:p-6 rounded-2xl border-2 border-slate-700 shadow-md mb-6 overflow-x-auto">
                  <div className="min-w-[760px] max-w-[920px] mx-auto">
                    
                    {/* SVG Graphic */}
                    <svg viewBox="0 0 920 310" className="w-full h-auto drop-shadow-lg select-none">
                      {/* Keyboard Base Case */}
                      <rect x="5" y="5" width="910" height="300" rx="18" fill="#0f172a" stroke="#334155" strokeWidth="4" />
                      <rect x="15" y="15" width="890" height="280" rx="12" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />

                      {/* ZONE HIGHLIGHT OVERLAYS */}
                      {/* 1. Functional Zone (Amber) */}
                      <rect
                        x="22" y="22" width="550" height="42" rx="8"
                        fill={selectedKeyboardZone === 'function' ? 'rgba(245, 158, 11, 0.25)' : 'rgba(245, 158, 11, 0.05)'}
                        stroke={selectedKeyboardZone === 'function' ? '#f59e0b' : 'rgba(245, 158, 11, 0.3)'}
                        strokeWidth={selectedKeyboardZone === 'function' ? '2.5' : '1'}
                        strokeDasharray={selectedKeyboardZone === 'function' ? 'none' : '4,3'}
                        className="cursor-pointer transition-all hover:fill-amber-500/20"
                        onClick={() => setSelectedKeyboardZone('function')}
                      />

                      {/* 2. Alphanumeric Zone (Blue) */}
                      <rect
                        x="22" y="70" width="550" height="218" rx="8"
                        fill={selectedKeyboardZone === 'alpha' ? 'rgba(59, 130, 246, 0.25)' : 'rgba(59, 130, 246, 0.05)'}
                        stroke={selectedKeyboardZone === 'alpha' ? '#3b82f6' : 'rgba(59, 130, 246, 0.3)'}
                        strokeWidth={selectedKeyboardZone === 'alpha' ? '2.5' : '1'}
                        strokeDasharray={selectedKeyboardZone === 'alpha' ? 'none' : '4,3'}
                        className="cursor-pointer transition-all hover:fill-blue-500/20"
                        onClick={() => setSelectedKeyboardZone('alpha')}
                      />

                      {/* 3. Special / Modifier Highlight (Purple) - subtle overlay indication */}
                      {selectedKeyboardZone === 'special' && (
                        <rect
                          x="22" y="70" width="550" height="218" rx="8"
                          fill="rgba(168, 85, 247, 0.2)"
                          stroke="#a855f7"
                          strokeWidth="2.5"
                          className="pointer-events-none"
                        />
                      )}

                      {/* 4. Navigation & Arrows Zone (Indigo) */}
                      <rect
                        x="585" y="22" width="125" height="266" rx="8"
                        fill={selectedKeyboardZone === 'arrows' ? 'rgba(99, 102, 241, 0.25)' : 'rgba(99, 102, 241, 0.05)'}
                        stroke={selectedKeyboardZone === 'arrows' ? '#6366f1' : 'rgba(99, 102, 241, 0.3)'}
                        strokeWidth={selectedKeyboardZone === 'arrows' ? '2.5' : '1'}
                        strokeDasharray={selectedKeyboardZone === 'arrows' ? 'none' : '4,3'}
                        className="cursor-pointer transition-all hover:fill-indigo-500/20"
                        onClick={() => setSelectedKeyboardZone('arrows')}
                      />

                      {/* 5. Numpad Zone (Teal) */}
                      <rect
                        x="722" y="22" width="176" height="266" rx="8"
                        fill={selectedKeyboardZone === 'numpad' ? 'rgba(20, 184, 166, 0.3)' : 'rgba(20, 184, 166, 0.06)'}
                        stroke={selectedKeyboardZone === 'numpad' ? '#14b8a6' : 'rgba(20, 184, 166, 0.35)'}
                        strokeWidth={selectedKeyboardZone === 'numpad' ? '2.5' : '1'}
                        strokeDasharray={selectedKeyboardZone === 'numpad' ? 'none' : '4,3'}
                        className="cursor-pointer transition-all hover:fill-teal-500/25"
                        onClick={() => setSelectedKeyboardZone('numpad')}
                      />

                      {/* LED Indicators for Numpad */}
                      <g transform="translate(735, 26)">
                        <g className="cursor-pointer" onClick={() => setNumLockOn(!numLockOn)}>
                          <circle cx="20" cy="8" r="4.5" fill={numLockOn ? '#22c55e' : '#334155'} filter={numLockOn ? 'drop-shadow(0 0 4px #22c55e)' : 'none'} />
                          <text x="20" y="21" fill={numLockOn ? '#4ade80' : '#94a3b8'} fontSize="7" textAnchor="middle" fontWeight="bold">NUM</text>
                        </g>
                        <g className="cursor-pointer" onClick={() => setCapsLockOn(!capsLockOn)}>
                          <circle cx="70" cy="8" r="4.5" fill={capsLockOn ? '#22c55e' : '#334155'} filter={capsLockOn ? 'drop-shadow(0 0 4px #22c55e)' : 'none'} />
                          <text x="70" y="21" fill={capsLockOn ? '#4ade80' : '#94a3b8'} fontSize="7" textAnchor="middle" fontWeight="bold">CAPS</text>
                        </g>
                        <g className="cursor-pointer" onClick={() => setScrollLockOn(!scrollLockOn)}>
                          <circle cx="120" cy="8" r="4.5" fill={scrollLockOn ? '#22c55e' : '#334155'} filter={scrollLockOn ? 'drop-shadow(0 0 4px #22c55e)' : 'none'} />
                          <text x="120" y="21" fill={scrollLockOn ? '#4ade80' : '#94a3b8'} fontSize="7" textAnchor="middle" fontWeight="bold">SCROLL</text>
                        </g>
                      </g>

                      {/* ================= KEYS RENDERING ================= */}
                      
                      {/* ROW 1: Esc, F1-F12 (Functional: Amber) */}
                      <g className="cursor-pointer" onClick={() => setSelectedKeyboardZone('function')}>
                        {/* Esc */}
                        <rect x="30" y="28" width="34" height="30" rx="5" fill={selectedKeyboardZone === 'function' ? '#b45309' : (selectedKeyboardZone === 'special' ? '#7e22ce' : '#334155')} stroke={selectedKeyboardZone === 'function' ? '#fbbf24' : '#475569'} strokeWidth="1" />
                        <text x="47" y="47" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">Esc</text>

                        {/* F1 - F4 */}
                        {['F1', 'F2', 'F3', 'F4'].map((k, i) => (
                          <g key={k} transform={`translate(${80 + i * 36}, 28)`}>
                            <rect width="32" height="30" rx="5" fill={selectedKeyboardZone === 'function' ? '#d97706' : '#334155'} stroke={selectedKeyboardZone === 'function' ? '#fbbf24' : '#475569'} strokeWidth="1" />
                            <text x="16" y="19" fill="#ffffff" fontSize="9.5" fontWeight="bold" textAnchor="middle">{k}</text>
                          </g>
                        ))}

                        {/* F5 - F8 */}
                        {['F5', 'F6', 'F7', 'F8'].map((k, i) => (
                          <g key={k} transform={`translate(${236 + i * 36}, 28)`}>
                            <rect width="32" height="30" rx="5" fill={selectedKeyboardZone === 'function' ? '#d97706' : '#334155'} stroke={selectedKeyboardZone === 'function' ? '#fbbf24' : '#475569'} strokeWidth="1" />
                            <text x="16" y="19" fill="#ffffff" fontSize="9.5" fontWeight="bold" textAnchor="middle">{k}</text>
                          </g>
                        ))}

                        {/* F9 - F12 */}
                        {['F9', 'F10', 'F11', 'F12'].map((k, i) => (
                          <g key={k} transform={`translate(${392 + i * 36}, 28)`}>
                            <rect width="32" height="30" rx="5" fill={selectedKeyboardZone === 'function' ? '#d97706' : '#334155'} stroke={selectedKeyboardZone === 'function' ? '#fbbf24' : '#475569'} strokeWidth="1" />
                            <text x="16" y="19" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">{k}</text>
                          </g>
                        ))}
                      </g>

                      {/* Navigation System top row: PrtSc, ScrLk, Pause (Indigo) */}
                      <g className="cursor-pointer" onClick={() => setSelectedKeyboardZone('arrows')}>
                        {['PrtSc', 'ScrLk', 'Pause'].map((k, i) => (
                          <g key={k} transform={`translate(${593 + i * 38}, 28)`}>
                            <rect width="34" height="30" rx="5" fill={selectedKeyboardZone === 'arrows' ? '#4f46e5' : '#334155'} stroke={selectedKeyboardZone === 'arrows' ? '#a5b4fc' : '#475569'} strokeWidth="1" />
                            <text x="17" y="19" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">{k}</text>
                          </g>
                        ))}
                      </g>

                      {/* ROW 2: Number row (~, 1-0, -, =, Backspace) */}
                      {/* Alphanumeric Number Row */}
                      {['~', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '+'].map((k, i) => (
                        <g key={k} transform={`translate(${30 + i * 35}, 76)`} className="cursor-pointer" onClick={() => setSelectedKeyboardZone('alpha')}>
                          <rect width="32" height="35" rx="5" fill={selectedKeyboardZone === 'alpha' ? '#2563eb' : '#334155'} stroke={selectedKeyboardZone === 'alpha' ? '#93c5fd' : '#475569'} strokeWidth="1" />
                          <text x="16" y="22" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">{k}</text>
                        </g>
                      ))}

                      {/* Backspace (Special / Purple) */}
                      <g transform="translate(485, 76)" className="cursor-pointer" onClick={() => setSelectedKeyboardZone('special')}>
                        <rect width="80" height="35" rx="5" fill={selectedKeyboardZone === 'special' ? '#9333ea' : '#475569'} stroke={selectedKeyboardZone === 'special' ? '#d8b4fe' : '#64748b'} strokeWidth="1.5" />
                        <text x="40" y="22" fill="#ffffff" fontSize="10.5" fontWeight="bold" textAnchor="middle">Backspace ⌫</text>
                      </g>

                      {/* Navigation Block Middle: Ins, Home, PgUp */}
                      <g className="cursor-pointer" onClick={() => setSelectedKeyboardZone('arrows')}>
                        {['Ins', 'Home', 'PgUp'].map((k, i) => (
                          <g key={k} transform={`translate(${593 + i * 38}, 76)`}>
                            <rect width="34" height="35" rx="5" fill={selectedKeyboardZone === 'arrows' ? '#4f46e5' : '#334155'} stroke={selectedKeyboardZone === 'arrows' ? '#a5b4fc' : '#475569'} strokeWidth="1" />
                            <text x="17" y="22" fill="#ffffff" fontSize="8.5" fontWeight="bold" textAnchor="middle">{k}</text>
                          </g>
                        ))}
                      </g>

                      {/* ROW 3: Tab, QWERTY, [, ], \, Del, End, PgDn */}
                      {/* Tab (Special / Purple) */}
                      <g transform="translate(30, 118)" className="cursor-pointer" onClick={() => setSelectedKeyboardZone('special')}>
                        <rect width="52" height="35" rx="5" fill={selectedKeyboardZone === 'special' ? '#9333ea' : '#475569'} stroke={selectedKeyboardZone === 'special' ? '#d8b4fe' : '#64748b'} strokeWidth="1.5" />
                        <text x="26" y="22" fill="#ffffff" fontSize="10.5" fontWeight="bold" textAnchor="middle">Tab ⇥</text>
                      </g>

                      {/* QWERTY Letters (Alpha / Blue) */}
                      {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'].map((k, i) => (
                        <g key={k} transform={`translate(${86 + i * 35}, 118)`} className="cursor-pointer" onClick={() => setSelectedKeyboardZone('alpha')}>
                          <rect width="32" height="35" rx="5" fill={selectedKeyboardZone === 'alpha' ? '#2563eb' : '#334155'} stroke={selectedKeyboardZone === 'alpha' ? '#93c5fd' : '#475569'} strokeWidth="1" />
                          <text x="16" y="22" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">{k}</text>
                        </g>
                      ))}

                      {/* Del, End, PgDn (Navigation / Indigo) */}
                      <g className="cursor-pointer" onClick={() => setSelectedKeyboardZone('arrows')}>
                        {['Del', 'End', 'PgDn'].map((k, i) => (
                          <g key={k} transform={`translate(${593 + i * 38}, 118)`}>
                            <rect width="34" height="35" rx="5" fill={selectedKeyboardZone === 'arrows' ? '#4f46e5' : '#334155'} stroke={selectedKeyboardZone === 'arrows' ? '#a5b4fc' : '#475569'} strokeWidth="1" />
                            <text x="17" y="22" fill="#ffffff" fontSize="8.5" fontWeight="bold" textAnchor="middle">{k}</text>
                          </g>
                        ))}
                      </g>

                      {/* ROW 4: CapsLock, ASDFGHJKL, Enter */}
                      {/* CapsLock (Special / Purple) */}
                      <g transform="translate(30, 160)" className="cursor-pointer" onClick={() => setSelectedKeyboardZone('special')}>
                        <rect width="62" height="35" rx="5" fill={selectedKeyboardZone === 'special' ? '#9333ea' : '#475569'} stroke={selectedKeyboardZone === 'special' ? '#d8b4fe' : '#64748b'} strokeWidth="1.5" />
                        <text x="31" y="22" fill="#ffffff" fontSize="9.5" fontWeight="bold" textAnchor="middle">CapsLock</text>
                      </g>

                      {/* Home Row Letters (Alpha / Blue) */}
                      {['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', '\''].map((k, i) => (
                        <g key={k} transform={`translate(${96 + i * 35}, 160)`} className="cursor-pointer" onClick={() => setSelectedKeyboardZone('alpha')}>
                          <rect width="32" height="35" rx="5" fill={selectedKeyboardZone === 'alpha' ? '#2563eb' : '#334155'} stroke={selectedKeyboardZone === 'alpha' ? '#93c5fd' : '#475569'} strokeWidth="1" />
                          <text x="16" y="22" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">{k}</text>
                        </g>
                      ))}

                      {/* Enter (Special / Purple) */}
                      <g transform="translate(481, 160)" className="cursor-pointer" onClick={() => setSelectedKeyboardZone('special')}>
                        <rect width="84" height="35" rx="5" fill={selectedKeyboardZone === 'special' ? '#9333ea' : '#475569'} stroke={selectedKeyboardZone === 'special' ? '#d8b4fe' : '#64748b'} strokeWidth="1.5" />
                        <text x="42" y="22" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">Enter ↵</text>
                      </g>

                      {/* ROW 5: Left Shift, ZXCVBNM, Right Shift, Arrow UP */}
                      {/* Left Shift (Special / Purple) */}
                      <g transform="translate(30, 202)" className="cursor-pointer" onClick={() => setSelectedKeyboardZone('special')}>
                        <rect width="78" height="35" rx="5" fill={selectedKeyboardZone === 'special' ? '#9333ea' : '#475569'} stroke={selectedKeyboardZone === 'special' ? '#d8b4fe' : '#64748b'} strokeWidth="1.5" />
                        <text x="39" y="22" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">Shift ⇧</text>
                      </g>

                      {/* ZXCVBNM (Alpha / Blue) */}
                      {['Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?'].map((k, i) => (
                        <g key={k} transform={`translate(${112 + i * 35}, 202)`} className="cursor-pointer" onClick={() => setSelectedKeyboardZone('alpha')}>
                          <rect width="32" height="35" rx="5" fill={selectedKeyboardZone === 'alpha' ? '#2563eb' : '#334155'} stroke={selectedKeyboardZone === 'alpha' ? '#93c5fd' : '#475569'} strokeWidth="1" />
                          <text x="16" y="22" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">{k}</text>
                        </g>
                      ))}

                      {/* Right Shift (Special / Purple) */}
                      <g transform="translate(462, 202)" className="cursor-pointer" onClick={() => setSelectedKeyboardZone('special')}>
                        <rect width="103" height="35" rx="5" fill={selectedKeyboardZone === 'special' ? '#9333ea' : '#475569'} stroke={selectedKeyboardZone === 'special' ? '#d8b4fe' : '#64748b'} strokeWidth="1.5" />
                        <text x="51" y="22" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">Shift ⇧</text>
                      </g>

                      {/* Arrow UP (Navigation / Indigo) */}
                      <g transform="translate(631, 202)" className="cursor-pointer" onClick={() => setSelectedKeyboardZone('arrows')}>
                        <rect width="34" height="35" rx="5" fill={selectedKeyboardZone === 'arrows' ? '#4338ca' : '#334155'} stroke={selectedKeyboardZone === 'arrows' ? '#a5b4fc' : '#475569'} strokeWidth="1.5" />
                        <polygon points="17,10 9,24 25,24" fill="#ffffff" />
                      </g>

                      {/* ROW 6: Ctrl, Win, Alt, Space, Alt, Win, Menu, Ctrl, Arrows Left/Down/Right */}
                      {/* Modifiers (Special / Purple) */}
                      <g className="cursor-pointer" onClick={() => setSelectedKeyboardZone('special')}>
                        <g transform="translate(30, 244)">
                          <rect width="45" height="35" rx="5" fill={selectedKeyboardZone === 'special' ? '#9333ea' : '#475569'} stroke={selectedKeyboardZone === 'special' ? '#d8b4fe' : '#64748b'} strokeWidth="1.5" />
                          <text x="22" y="22" fill="#ffffff" fontSize="9.5" fontWeight="bold" textAnchor="middle">Ctrl</text>
                        </g>
                        <g transform="translate(79, 244)">
                          <rect width="40" height="35" rx="5" fill={selectedKeyboardZone === 'special' ? '#9333ea' : '#475569'} stroke={selectedKeyboardZone === 'special' ? '#d8b4fe' : '#64748b'} strokeWidth="1.5" />
                          <text x="20" y="22" fill="#ffffff" fontSize="9.5" fontWeight="bold" textAnchor="middle">⊞</text>
                        </g>
                        <g transform="translate(123, 244)">
                          <rect width="42" height="35" rx="5" fill={selectedKeyboardZone === 'special' ? '#9333ea' : '#475569'} stroke={selectedKeyboardZone === 'special' ? '#d8b4fe' : '#64748b'} strokeWidth="1.5" />
                          <text x="21" y="22" fill="#ffffff" fontSize="9.5" fontWeight="bold" textAnchor="middle">Alt</text>
                        </g>

                        {/* Spacebar */}
                        <g transform="translate(169, 244)">
                          <rect width="248" height="35" rx="5" fill={selectedKeyboardZone === 'special' ? '#7e22ce' : '#334155'} stroke={selectedKeyboardZone === 'special' ? '#d8b4fe' : '#475569'} strokeWidth="1.5" />
                          <text x="124" y="22" fill="#ffffff" fontSize="10.5" fontWeight="bold" textAnchor="middle">{"Bo'sh joy (Spacebar)"}</text>
                        </g>

                        <g transform="translate(421, 244)">
                          <rect width="42" height="35" rx="5" fill={selectedKeyboardZone === 'special' ? '#9333ea' : '#475569'} stroke={selectedKeyboardZone === 'special' ? '#d8b4fe' : '#64748b'} strokeWidth="1.5" />
                          <text x="21" y="22" fill="#ffffff" fontSize="9.5" fontWeight="bold" textAnchor="middle">Alt</text>
                        </g>
                        <g transform="translate(467, 244)">
                          <rect width="40" height="35" rx="5" fill={selectedKeyboardZone === 'special' ? '#9333ea' : '#475569'} stroke={selectedKeyboardZone === 'special' ? '#d8b4fe' : '#64748b'} strokeWidth="1.5" />
                          <text x="20" y="22" fill="#ffffff" fontSize="9.5" fontWeight="bold" textAnchor="middle">⊞</text>
                        </g>
                        <g transform="translate(511, 244)">
                          <rect width="54" height="35" rx="5" fill={selectedKeyboardZone === 'special' ? '#9333ea' : '#475569'} stroke={selectedKeyboardZone === 'special' ? '#d8b4fe' : '#64748b'} strokeWidth="1.5" />
                          <text x="27" y="22" fill="#ffffff" fontSize="9.5" fontWeight="bold" textAnchor="middle">Ctrl</text>
                        </g>
                      </g>

                      {/* Navigation Arrows Left, Down, Right (Indigo) */}
                      <g className="cursor-pointer" onClick={() => setSelectedKeyboardZone('arrows')}>
                        <g transform="translate(593, 244)">
                          <rect width="34" height="35" rx="5" fill={selectedKeyboardZone === 'arrows' ? '#4338ca' : '#334155'} stroke={selectedKeyboardZone === 'arrows' ? '#a5b4fc' : '#475569'} strokeWidth="1.5" />
                          <polygon points="10,17.5 24,10 24,25" fill="#ffffff" />
                        </g>
                        <g transform="translate(631, 244)">
                          <rect width="34" height="35" rx="5" fill={selectedKeyboardZone === 'arrows' ? '#4338ca' : '#334155'} stroke={selectedKeyboardZone === 'arrows' ? '#a5b4fc' : '#475569'} strokeWidth="1.5" />
                          <polygon points="17,25 9,11 25,11" fill="#ffffff" />
                        </g>
                        <g transform="translate(669, 244)">
                          <rect width="34" height="35" rx="5" fill={selectedKeyboardZone === 'arrows' ? '#4338ca' : '#334155'} stroke={selectedKeyboardZone === 'arrows' ? '#a5b4fc' : '#475569'} strokeWidth="1.5" />
                          <polygon points="24,17.5 10,10 10,25" fill="#ffffff" />
                        </g>
                      </g>

                      {/* ================= NUMPAD BLOCK (RIGHT SIDE: TEAL) ================= */}
                      <g className="cursor-pointer" onClick={() => setSelectedKeyboardZone('numpad')}>
                        {/* Row 1: NumLock, /, *, - */}
                        <g transform="translate(732, 60)">
                          <rect width="36" height="35" rx="5" fill={selectedKeyboardZone === 'numpad' ? '#0f766e' : '#334155'} stroke={selectedKeyboardZone === 'numpad' ? '#5eead4' : '#475569'} strokeWidth="1.5" />
                          <text x="18" y="21" fill="#ffffff" fontSize="7.5" fontWeight="bold" textAnchor="middle">NumLock</text>
                        </g>
                        <g transform="translate(772, 60)">
                          <rect width="36" height="35" rx="5" fill={selectedKeyboardZone === 'numpad' ? '#0f766e' : '#334155'} stroke={selectedKeyboardZone === 'numpad' ? '#5eead4' : '#475569'} strokeWidth="1.5" />
                          <text x="18" y="22" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">/</text>
                        </g>
                        <g transform="translate(812, 60)">
                          <rect width="36" height="35" rx="5" fill={selectedKeyboardZone === 'numpad' ? '#0f766e' : '#334155'} stroke={selectedKeyboardZone === 'numpad' ? '#5eead4' : '#475569'} strokeWidth="1.5" />
                          <text x="18" y="24" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">*</text>
                        </g>
                        <g transform="translate(852, 60)">
                          <rect width="36" height="35" rx="5" fill={selectedKeyboardZone === 'numpad' ? '#0f766e' : '#334155'} stroke={selectedKeyboardZone === 'numpad' ? '#5eead4' : '#475569'} strokeWidth="1.5" />
                          <text x="18" y="22" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">-</text>
                        </g>

                        {/* Row 2: 7, 8, 9, + (tall) */}
                        <g transform="translate(732, 106)">
                          <rect width="36" height="35" rx="5" fill={selectedKeyboardZone === 'numpad' ? '#0d9488' : '#334155'} stroke={selectedKeyboardZone === 'numpad' ? '#5eead4' : '#475569'} strokeWidth="1.5" />
                          <text x="18" y="23" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">7</text>
                        </g>
                        <g transform="translate(772, 106)">
                          <rect width="36" height="35" rx="5" fill={selectedKeyboardZone === 'numpad' ? '#0d9488' : '#334155'} stroke={selectedKeyboardZone === 'numpad' ? '#5eead4' : '#475569'} strokeWidth="1.5" />
                          <text x="18" y="23" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">8</text>
                        </g>
                        <g transform="translate(812, 106)">
                          <rect width="36" height="35" rx="5" fill={selectedKeyboardZone === 'numpad' ? '#0d9488' : '#334155'} stroke={selectedKeyboardZone === 'numpad' ? '#5eead4' : '#475569'} strokeWidth="1.5" />
                          <text x="18" y="23" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">9</text>
                        </g>
                        {/* Plus (+) 2-rows tall */}
                        <g transform="translate(852, 106)">
                          <rect width="36" height="81" rx="5" fill={selectedKeyboardZone === 'numpad' ? '#0f766e' : '#334155'} stroke={selectedKeyboardZone === 'numpad' ? '#5eead4' : '#475569'} strokeWidth="1.5" />
                          <text x="18" y="47" fill="#ffffff" fontSize="16" fontWeight="bold" textAnchor="middle">+</text>
                        </g>

                        {/* Row 3: 4, 5, 6 */}
                        <g transform="translate(732, 152)">
                          <rect width="36" height="35" rx="5" fill={selectedKeyboardZone === 'numpad' ? '#0d9488' : '#334155'} stroke={selectedKeyboardZone === 'numpad' ? '#5eead4' : '#475569'} strokeWidth="1.5" />
                          <text x="18" y="23" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">4</text>
                        </g>
                        <g transform="translate(772, 152)">
                          <rect width="36" height="35" rx="5" fill={selectedKeyboardZone === 'numpad' ? '#0d9488' : '#334155'} stroke={selectedKeyboardZone === 'numpad' ? '#5eead4' : '#475569'} strokeWidth="1.5" />
                          <text x="18" y="23" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">5</text>
                        </g>
                        <g transform="translate(812, 152)">
                          <rect width="36" height="35" rx="5" fill={selectedKeyboardZone === 'numpad' ? '#0d9488' : '#334155'} stroke={selectedKeyboardZone === 'numpad' ? '#5eead4' : '#475569'} strokeWidth="1.5" />
                          <text x="18" y="23" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">6</text>
                        </g>

                        {/* Row 4: 1, 2, 3, Enter (tall) */}
                        <g transform="translate(732, 198)">
                          <rect width="36" height="35" rx="5" fill={selectedKeyboardZone === 'numpad' ? '#0d9488' : '#334155'} stroke={selectedKeyboardZone === 'numpad' ? '#5eead4' : '#475569'} strokeWidth="1.5" />
                          <text x="18" y="23" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">1</text>
                        </g>
                        <g transform="translate(772, 198)">
                          <rect width="36" height="35" rx="5" fill={selectedKeyboardZone === 'numpad' ? '#0d9488' : '#334155'} stroke={selectedKeyboardZone === 'numpad' ? '#5eead4' : '#475569'} strokeWidth="1.5" />
                          <text x="18" y="23" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">2</text>
                        </g>
                        <g transform="translate(812, 198)">
                          <rect width="36" height="35" rx="5" fill={selectedKeyboardZone === 'numpad' ? '#0d9488' : '#334155'} stroke={selectedKeyboardZone === 'numpad' ? '#5eead4' : '#475569'} strokeWidth="1.5" />
                          <text x="18" y="23" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">3</text>
                        </g>
                        {/* Numpad Enter 2-rows tall */}
                        <g transform="translate(852, 198)">
                          <rect width="36" height="81" rx="5" fill={selectedKeyboardZone === 'numpad' ? '#0f766e' : '#334155'} stroke={selectedKeyboardZone === 'numpad' ? '#5eead4' : '#475569'} strokeWidth="1.5" />
                          <text x="18" y="47" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">Enter ↵</text>
                        </g>

                        {/* Row 5: 0 (wide), . */}
                        <g transform="translate(732, 244)">
                          <rect width="76" height="35" rx="5" fill={selectedKeyboardZone === 'numpad' ? '#0d9488' : '#334155'} stroke={selectedKeyboardZone === 'numpad' ? '#5eead4' : '#475569'} strokeWidth="1.5" />
                          <text x="38" y="23" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">0</text>
                        </g>
                        <g transform="translate(812, 244)">
                          <rect width="36" height="35" rx="5" fill={selectedKeyboardZone === 'numpad' ? '#0d9488' : '#334155'} stroke={selectedKeyboardZone === 'numpad' ? '#5eead4' : '#475569'} strokeWidth="1.5" />
                          <text x="18" y="23" fill="#ffffff" fontSize="15" fontWeight="bold" textAnchor="middle">.</text>
                        </g>
                      </g>

                    </svg>

                    {/* Zone Legends underneath SVG */}
                    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mt-3 pt-3 border-t border-slate-700/80 text-[11px] sm:text-xs">
                      <div className="flex items-center gap-1.5 cursor-pointer text-amber-300" onClick={() => setSelectedKeyboardZone('function')}>
                        <span className="w-3 h-3 rounded-full bg-amber-500 inline-block"></span>
                        <span className="font-bold">{"1. Funksional (F1-F12)"}</span>
                      </div>
                      <div className="flex items-center gap-1.5 cursor-pointer text-blue-300" onClick={() => setSelectedKeyboardZone('alpha')}>
                        <span className="w-3 h-3 rounded-full bg-blue-500 inline-block"></span>
                        <span className="font-bold">{"2. Alifbo-matnli (Asosiy)"}</span>
                      </div>
                      <div className="flex items-center gap-1.5 cursor-pointer text-purple-300" onClick={() => setSelectedKeyboardZone('special')}>
                        <span className="w-3 h-3 rounded-full bg-purple-500 inline-block"></span>
                        <span className="font-bold">{"3. Boshqaruv (Maxsus)"}</span>
                      </div>
                      <div className="flex items-center gap-1.5 cursor-pointer text-indigo-300" onClick={() => setSelectedKeyboardZone('arrows')}>
                        <span className="w-3 h-3 rounded-full bg-indigo-500 inline-block"></span>
                        <span className="font-bold">{"4. Navigatsiya & Strelkalar"}</span>
                      </div>
                      <div className="flex items-center gap-1.5 cursor-pointer text-teal-300" onClick={() => setSelectedKeyboardZone('numpad')}>
                        <span className="w-3 h-3 rounded-full bg-teal-500 inline-block"></span>
                        <span className="font-bold">{"5. Raqamli blok (Numpad)"}</span>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Keyboard Zone Selector Tabs */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-6">
                  <button
                    onClick={() => setSelectedKeyboardZone('numpad')}
                    className={`p-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex flex-col items-center gap-1 ${
                      selectedKeyboardZone === 'numpad' ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-400' : 'bg-canvas text-fg-muted hover:bg-line'
                    }`}
                  >
                    <span>{"1. Raqamli blok (Numpad)"}</span>
                    <span className="text-[10px] opacity-90 font-medium">{"O'ng tomon • Kalkulyator"}</span>
                  </button>

                  <button
                    onClick={() => setSelectedKeyboardZone('alpha')}
                    className={`p-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex flex-col items-center gap-1 ${
                      selectedKeyboardZone === 'alpha' ? 'bg-blue-700 text-white shadow-sm ring-2 ring-blue-500' : 'bg-canvas text-fg-muted hover:bg-line'
                    }`}
                  >
                    <span>{"2. Alifbo-matnli blok"}</span>
                    <span className="text-[10px] opacity-90 font-medium">{"Markaziy asosiy qism"}</span>
                  </button>

                  <button
                    onClick={() => setSelectedKeyboardZone('special')}
                    className={`p-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex flex-col items-center gap-1 ${
                      selectedKeyboardZone === 'special' ? 'bg-purple-600 text-white shadow-sm ring-2 ring-purple-400' : 'bg-canvas text-fg-muted hover:bg-line'
                    }`}
                  >
                    <span>{"3. Boshqaruv tugmalari"}</span>
                    <span className="text-[10px] opacity-90 font-medium">{"Tab, Enter, Ctrl, Shift"}</span>
                  </button>

                  <button
                    onClick={() => setSelectedKeyboardZone('function')}
                    className={`p-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex flex-col items-center gap-1 ${
                      selectedKeyboardZone === 'function' ? 'bg-amber-600 text-white shadow-sm ring-2 ring-amber-400' : 'bg-canvas text-fg-muted hover:bg-line'
                    }`}
                  >
                    <span>{"4. Funksional (F1-F12)"}</span>
                    <span className="text-[10px] opacity-90 font-medium">{"Yuqori qator"}</span>
                  </button>

                  <button
                    onClick={() => setSelectedKeyboardZone('arrows')}
                    className={`p-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex flex-col items-center gap-1 ${
                      selectedKeyboardZone === 'arrows' ? 'bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-400' : 'bg-canvas text-fg-muted hover:bg-line'
                    }`}
                  >
                    <span>{"5. Yo'nalish strelkalari"}</span>
                    <span className="text-[10px] opacity-90 font-medium">{"Navigatsiya & kursor"}</span>
                  </button>
                </div>

                {/* Keyboard Zone Detail Card */}
                <div className="p-6 bg-subtle border-2 border-line rounded-2xl">
                  {selectedKeyboardZone === 'numpad' && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-blue-ink">
                        <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-lg shadow-sm">
                          {"123"}
                        </div>
                        <div>
                          <h4 className="text-lg sm:text-xl font-bold text-fg">
                            {"Raqamli blok (Numpad) — Hamshiraning eng asosiy quroli"}
                          </h4>
                          <p className="text-xs text-blue-ink font-semibold">{"Klaviaturaning eng o'ng tomonidagi kalkulyatorga o'xshash blok"}</p>
                        </div>
                      </div>

                      <p className="text-sm sm:text-base text-fg-muted leading-relaxed">
                        {"Tibbiyotda bemorning qon bosimi (masalan, 120/80), pulsi (74), tana harorati (36.6) va dori dozasini bir qo'lda tez, xatosiz terish uchun aynan shu raqamli blok ishlatiladi. Blokni yoqish uchun "}
                        <kbd className="px-2.5 py-1 bg-surface border-2 border-blue-edge text-blue-ink rounded-lg font-bold text-xs shadow-2xs">Num Lock</kbd>
                        {" tugmasi bosiladi (klaviatura yuqorisidagi "}
                        <strong className="text-blue-ink">NUM</strong>
                        {" indikator yashil chirog'i yonadi)."}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                        <div className="p-3 bg-surface rounded-xl border border-blue-edge text-xs sm:text-sm">
                          <strong className="text-blue-ink block mb-1">0-9 raqamlari:</strong>
                          {"Vital ko'rsatkichlarni bir qo'l bilan 3 barobar tezroq kiritish."}
                        </div>
                        <div className="p-3 bg-surface rounded-xl border border-blue-edge text-xs sm:text-sm">
                          <strong className="text-blue-ink block mb-1">/ va . (nuqta):</strong>
                          {"Qon bosimini kasr bilan (120/80) va haroratni (36.6) ajratish."}
                        </div>
                        <div className="p-3 bg-surface rounded-xl border border-blue-edge text-xs sm:text-sm">
                          <strong className="text-blue-ink block mb-1">Numpad Enter:</strong>
                          {"Kiritilgan ko'rsatkichni qo'lni ko'tarmasdan tasdiqlash."}
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedKeyboardZone === 'alpha' && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-blue-ink">
                        <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-lg shadow-sm">
                          {"ABC"}
                        </div>
                        <div>
                          <h4 className="text-lg sm:text-xl font-bold text-fg">
                            {"Alifbo-matnli asosiy blok"}
                          </h4>
                          <p className="text-xs text-blue-ink font-semibold">{"Harflar, tinish belgilari va raqamlar qatori"}</p>
                        </div>
                      </div>

                      <p className="text-sm sm:text-base text-fg-muted leading-relaxed">
                        {"Bemorning ism-familiyasi, manzili, shikoyatlari, shifokor tashxislari va dorilar nomlarini matn ko'rinishida to'liq yozish uchun xizmat qiladi."}
                      </p>

                      <div className="p-4 bg-blue-tint border border-blue-edge rounded-xl text-xs sm:text-sm text-blue-ink flex items-start gap-2.5">
                        <span className="text-lg">⌨️</span>
                        <div>
                          <strong>{"Klaviaturada tilni o'zgartirish (O'zbek / Rus / Ingliz):"}</strong>
                          <p className="mt-0.5">
                            {"Matn terish vaqtida tilni almashtirish uchun "}
                            <kbd className="px-2 py-0.5 bg-surface border border-blue-edge rounded font-bold text-xs">Alt + Shift</kbd>
                            {" yoki "}
                            <kbd className="px-2 py-0.5 bg-surface border border-blue-edge rounded font-bold text-xs">Win + Probel</kbd>
                            {" tugmalari bir vaqtda bosiladi."}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedKeyboardZone === 'special' && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-purple-ink">
                        <div className="w-12 h-12 rounded-xl bg-purple-600 text-white flex items-center justify-center font-black text-lg shadow-sm">
                          <CornerDownLeft className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="text-lg sm:text-xl font-bold text-fg">
                            {"Tibbiyotda eng ko'p ishlatiladigan boshqaruv (Maxsus) tugmalari"}
                          </h4>
                          <p className="text-xs text-purple-ink font-semibold">{"O'tish, tasdiqlash va saqlash komandalari"}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                        <div className="p-3.5 bg-surface rounded-xl border border-purple-edge shadow-2xs">
                          <div className="flex items-center gap-2 mb-1">
                            <kbd className="px-2 py-0.5 bg-purple-tint-strong border border-purple-edge text-purple-ink rounded font-bold text-xs">Tab ⇥</kbd>
                            <strong className="text-purple-ink">Keyingi katakka sakrash</strong>
                          </div>
                          <p className="text-fg-muted">{"Bemor anketasida qon bosimidan pulsga yoki harorat katagiga sichqonchasiz o'tish."}</p>
                        </div>

                        <div className="p-3.5 bg-surface rounded-xl border border-purple-edge shadow-2xs">
                          <div className="flex items-center gap-2 mb-1">
                            <kbd className="px-2 py-0.5 bg-purple-tint-strong border border-purple-edge text-purple-ink rounded font-bold text-xs">Enter ↵</kbd>
                            <strong className="text-purple-ink">Tasdiqlash va yangi qator</strong>
                          </div>
                          <p className="text-fg-muted">{"Kiritilgan ko'rsatkichni tasdiqlab, bemor kundaligida yangi satr ochish."}</p>
                        </div>

                        <div className="p-3.5 bg-surface rounded-xl border border-purple-edge shadow-2xs">
                          <div className="flex items-center gap-2 mb-1">
                            <kbd className="px-2 py-0.5 bg-purple-tint-strong border border-purple-edge text-purple-ink rounded font-bold text-xs">Ctrl + S</kbd>
                            <strong className="text-purple-ink">Zudlik bilan saqlash</strong>
                          </div>
                          <p className="text-fg-muted">{"Kiritilgan barcha muhim tahlillarni bazaga xavfsiz saqlash (ma'lumot yo'qolmasligi uchun)."}</p>
                        </div>

                        <div className="p-3.5 bg-surface rounded-xl border border-purple-edge shadow-2xs">
                          <div className="flex items-center gap-2 mb-1">
                            <kbd className="px-2 py-0.5 bg-purple-tint-strong border border-purple-edge text-purple-ink rounded font-bold text-xs">Win + L</kbd>
                            <strong className="text-purple-ink">Ekranni qulflash</strong>
                          </div>
                          <p className="text-fg-muted">{"Palataga chiqishda begona kishilar bemor ma'lumotlarini ko'rmasligi uchun tizimni qulflash."}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedKeyboardZone === 'function' && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-amber-ink">
                        <div className="w-12 h-12 rounded-xl bg-amber-600 text-white flex items-center justify-center font-black text-lg shadow-sm">
                          {"F1"}
                        </div>
                        <div>
                          <h4 className="text-lg sm:text-xl font-bold text-fg">
                            {"Funksional tugmalar (F1 - F12)"}
                          </h4>
                          <p className="text-xs text-amber-ink font-semibold">{"Tezkor amallar va yangilash"}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                        <div className="p-3.5 bg-surface rounded-xl border border-amber-edge">
                          <div className="flex items-center gap-2 mb-1">
                            <kbd className="px-2 py-0.5 bg-amber-tint-strong border border-amber-edge text-amber-ink rounded font-bold text-xs">F5</kbd>
                            <strong className="text-amber-ink">Ekranni yangilash</strong>
                          </div>
                          <p className="text-fg-muted">{"Laboratoriyadan yangi qon tahlillari kelganini darhol ko'rish uchun oynani yangilash."}</p>
                        </div>

                        <div className="p-3.5 bg-surface rounded-xl border border-amber-edge">
                          <div className="flex items-center gap-2 mb-1">
                            <kbd className="px-2 py-0.5 bg-amber-tint-strong border border-amber-edge text-amber-ink rounded font-bold text-xs">F1</kbd>
                            <strong className="text-amber-ink">Yordam (Help)</strong>
                          </div>
                          <p className="text-fg-muted">{"Tibbiy dastur bo'yicha qo'llanma va ma'lumotnoma oynasini ochish."}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedKeyboardZone === 'arrows' && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-indigo-ink">
                        <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black text-lg shadow-sm">
                          {"↑↓"}
                        </div>
                        <div>
                          <h4 className="text-lg sm:text-xl font-bold text-fg">
                            {"Navigatsiya va Harakatlanish (Strelka) tugmalari"}
                          </h4>
                          <p className="text-xs text-indigo-ink font-semibold">{"Kursor va jadvallar bo'ylab yurish"}</p>
                        </div>
                      </div>

                      <p className="text-sm sm:text-base text-fg-muted leading-relaxed">
                        {"Bemorlar ro'yxati va jadval katakchalari bo'ylab yuqoriga (▲), pastga (▼), o'ngga (▶) va chapga (◀) yurish uchun xizmat qiladi. "}
                        <strong className="text-indigo-ink">Page Up</strong>{" va "}
                        <strong className="text-indigo-ink">Page Down</strong>
                        {" tugmalari esa uzun elektron tibbiy varaqalarni bir sahifa yuqoriga yoki pastga tezkor o'tkazadi."}
                      </p>
                    </div>
                  )}
                </div>

                {/* ========================================================================= */}
                {/* DEDICATED SECTION: 3 KEYBOARD INDICATOR LIGHTS (NUM, CAPS, SCROLL)       */}
                {/* ========================================================================= */}
                <div className="mt-8 pt-8 border-t-2 border-line">
                  <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                    <div>
                      <span className="text-xs font-black uppercase tracking-wider text-teal-ink bg-teal-tint px-3 py-1 rounded-md border border-teal-edge">
                        {"Muhim Amaliy Mavzu"}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-black text-fg mt-2 flex items-center gap-2.5">
                        <Sparkles className="w-6 h-6 text-teal-ink" />
                        {"Klaviaturadagi 3 ta Indikator Chirog'i (NUM, CAPS, SCROLL)"}
                      </h3>
                      <p className="text-xs sm:text-sm text-fg-muted mt-1">
                        {"Ularni qanday yoqish/o'chirish va tibbiyotdagi aniq vazifalari bilan tanishing"}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-fg-subtle font-semibold">{"Chiroq holatini tekshirish:"}</span>
                      <span className="on-dark inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-emerald-400 font-mono text-xs font-bold border border-slate-700">
                        <span className={`w-2 h-2 rounded-full ${numLockOn ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'}`}></span>
                        {numLockOn ? 'NUM YONIQ' : 'NUM O\'CHIQ'}
                      </span>
                    </div>
                  </div>

                  {/* REALISTIC PHYSICAL LED INDICATOR PANEL (MATCHING USER PHOTO) */}
                  <div className="on-dark bg-gradient-to-r from-slate-900 via-slate-800 to-slate-950 p-6 rounded-2xl border-2 border-slate-700 shadow-xl mb-6 text-white">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                      
                      {/* Left: Indicator Bezel with Glow LEDs */}
                      <div className="flex flex-col items-center md:items-start">
                        <span className="text-[11px] font-mono tracking-widest text-fg-subtle uppercase mb-2">
                          {"KLAVIATURA INDIKATORLAR PANELI (LED)"}
                        </span>

                        {/* Physical Bezel Box */}
                        <div className="on-dark bg-slate-950/90 border-2 border-slate-700/80 px-6 py-4 rounded-xl flex items-center gap-8 shadow-inner">
                          
                          {/* 1. NUM LED */}
                          <div
                            onClick={() => {
                              setNumLockOn(!numLockOn);
                              setActiveIndicatorCard('num');
                            }}
                            className="flex flex-col items-center gap-2 cursor-pointer group select-none"
                            title="Num Lock holatini o'zgartirish uchun bosing"
                          >
                            <div className="relative flex items-center justify-center">
                              <div
                                className={`on-dark w-5 h-5 rounded-full transition-all duration-300 ${
                                  numLockOn
                                    ? 'bg-emerald-400 shadow-[0_0_14px_4px_rgba(52,211,153,0.9)] scale-110'
                                    : 'bg-slate-700 border border-slate-600'
                                }`}
                              />
                              {numLockOn && (
                                <span className="absolute w-2 h-2 rounded-full bg-surface opacity-80 animate-ping"></span>
                              )}
                            </div>
                            <span className={`text-xs font-black tracking-wider transition-colors ${numLockOn ? 'text-emerald-400 font-mono' : 'text-fg-subtle'}`}>
                              {"NUM"}
                            </span>
                            <span className={`on-dark text-[10px] px-1.5 py-0.5 rounded font-bold uppercase transition-colors ${numLockOn ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-slate-800 text-fg-subtle'}`}>
                              {numLockOn ? 'YONIQ' : 'O\'CHIQ'}
                            </span>
                          </div>

                          {/* Divider */}
                          <div className="on-dark w-px h-12 bg-slate-800"></div>

                          {/* 2. CAPS LED */}
                          <div
                            onClick={() => {
                              setCapsLockOn(!capsLockOn);
                              setActiveIndicatorCard('caps');
                            }}
                            className="flex flex-col items-center gap-2 cursor-pointer group select-none"
                            title="Caps Lock holatini o'zgartirish uchun bosing"
                          >
                            <div className="relative flex items-center justify-center">
                              <div
                                className={`on-dark w-5 h-5 rounded-full transition-all duration-300 ${
                                  capsLockOn
                                    ? 'bg-emerald-400 shadow-[0_0_14px_4px_rgba(52,211,153,0.9)] scale-110'
                                    : 'bg-slate-700 border border-slate-600'
                                }`}
                              />
                              {capsLockOn && (
                                <span className="absolute w-2 h-2 rounded-full bg-surface opacity-80 animate-ping"></span>
                              )}
                            </div>
                            <span className={`text-xs font-black tracking-wider transition-colors ${capsLockOn ? 'text-emerald-400 font-mono' : 'text-fg-subtle'}`}>
                              {"CAPS"}
                            </span>
                            <span className={`on-dark text-[10px] px-1.5 py-0.5 rounded font-bold uppercase transition-colors ${capsLockOn ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-slate-800 text-fg-subtle'}`}>
                              {capsLockOn ? 'YONIQ' : 'O\'CHIQ'}
                            </span>
                          </div>

                          {/* Divider */}
                          <div className="on-dark w-px h-12 bg-slate-800"></div>

                          {/* 3. SCROLL LED */}
                          <div
                            onClick={() => {
                              setScrollLockOn(!scrollLockOn);
                              setActiveIndicatorCard('scroll');
                            }}
                            className="flex flex-col items-center gap-2 cursor-pointer group select-none"
                            title="Scroll Lock holatini o'zgartirish uchun bosing"
                          >
                            <div className="relative flex items-center justify-center">
                              <div
                                className={`on-dark w-5 h-5 rounded-full transition-all duration-300 ${
                                  scrollLockOn
                                    ? 'bg-emerald-400 shadow-[0_0_14px_4px_rgba(52,211,153,0.9)] scale-110'
                                    : 'bg-slate-700 border border-slate-600'
                                }`}
                              />
                              {scrollLockOn && (
                                <span className="absolute w-2 h-2 rounded-full bg-surface opacity-80 animate-ping"></span>
                              )}
                            </div>
                            <span className={`text-xs font-black tracking-wider transition-colors ${scrollLockOn ? 'text-emerald-400 font-mono' : 'text-fg-subtle'}`}>
                              {"SCROLL"}
                            </span>
                            <span className={`on-dark text-[10px] px-1.5 py-0.5 rounded font-bold uppercase transition-colors ${scrollLockOn ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-slate-800 text-fg-subtle'}`}>
                              {scrollLockOn ? 'YONIQ' : 'O\'CHIQ'}
                            </span>
                          </div>

                        </div>
                      </div>

                      {/* Right: Quick Interactive Switch Buttons */}
                      <div className="on-dark flex-1 bg-slate-950/60 p-4 rounded-xl border border-slate-700/70 flex flex-col justify-between w-full">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                            <span className="text-blue-400">⚡</span>
                            {"Interaktiv boshqaruv tugmalari (Bosib sinab ko'ring):"}
                          </span>
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                          <button
                            onClick={() => {
                              setNumLockOn(!numLockOn);
                              setActiveIndicatorCard('num');
                            }}
                            className={`on-dark px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5 border ${
                              numLockOn
                                ? 'bg-teal-700 text-white border-teal-400 shadow-md ring-2 ring-teal-400/40'
                                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                            }`}
                          >
                            <span className="font-mono font-black">[Num Lock]</span>
                            <span className="text-[10px] opacity-90">{numLockOn ? "O'chirish" : "Yoqish"}</span>
                          </button>

                          <button
                            onClick={() => {
                              setCapsLockOn(!capsLockOn);
                              setActiveIndicatorCard('caps');
                            }}
                            className={`on-dark px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5 border ${
                              capsLockOn
                                ? 'bg-teal-700 text-white border-teal-400 shadow-md ring-2 ring-teal-400/40'
                                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                            }`}
                          >
                            <span className="font-mono font-black">[Caps Lock]</span>
                            <span className="text-[10px] opacity-90">{capsLockOn ? "O'chirish" : "Yoqish"}</span>
                          </button>

                          <button
                            onClick={() => {
                              setScrollLockOn(!scrollLockOn);
                              setActiveIndicatorCard('scroll');
                            }}
                            className={`on-dark px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5 border ${
                              scrollLockOn
                                ? 'bg-teal-700 text-white border-teal-400 shadow-md ring-2 ring-teal-400/40'
                                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                            }`}
                          >
                            <span className="font-mono font-black">[Scroll Lock]</span>
                            <span className="text-[10px] opacity-90">{scrollLockOn ? "O'chirish" : "Yoqish"}</span>
                          </button>
                        </div>

                        <div className="on-dark mt-3 text-[11px] text-slate-300 flex items-center gap-1.5 bg-slate-900/90 p-2 rounded-lg border border-slate-800">
                          <span className="text-emerald-400 font-bold">💡 Eslatma:</span>
                          <span>{"Klaviaturadagi haqiqiy tugmalarni bosganda ham aynan shu 3 ta yashil chiroq yonadi yoki o'chadi."}</span>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* 3 DETAILED EXPLANATION CARDS (NUM, CAPS, SCROLL) */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
                    
                    {/* CARD 1: NUM LOCK */}
                    <div
                      onClick={() => setActiveIndicatorCard('num')}
                      className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                        activeIndicatorCard === 'num'
                          ? 'bg-blue-tint/70 border-blue-500 shadow-md ring-2 ring-blue-edge/50'
                          : 'bg-surface border-line hover:border-line-strong'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="w-9 h-9 rounded-xl bg-blue-tint-strong text-blue-ink flex items-center justify-center font-mono font-black text-sm">
                            {"NUM"}
                          </span>
                          <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
                            numLockOn ? 'bg-emerald-tint-strong text-emerald-ink border-emerald-edge' : 'bg-canvas text-fg-muted border-line-strong'
                          }`}>
                            {numLockOn ? '● Hozir Yoniq' : '○ Hozir O\'chiq'}
                          </span>
                        </div>

                        <h4 className="font-black text-fg text-base sm:text-lg mb-1">
                          {"1. NUM (Num Lock) — Raqamli blok qulfi"}
                        </h4>
                        <p className="text-xs text-blue-ink font-bold uppercase tracking-wider mb-3">
                          {"Qanday yoqiladi: [Num Lock] tugmasi"}
                        </p>

                        <div className="space-y-2 text-xs sm:text-sm text-fg-muted">
                          <div className="p-2.5 bg-surface rounded-xl border border-line">
                            <strong className="text-emerald-ink block mb-0.5">{"🟢 Yoniq bo'lsa (Tavsiya etiladi):"}</strong>
                            {"Klaviaturaning o'ng tomonidagi kalkulyator bloki (0-9, +, -, /, *) raqamlarni terish rejimida ishlaydi. Qon bosimi (120/80), puls (74), harorat (36.6) kabilarni bir qo'l bilan 3 barobar tez kiritasiz."}
                          </div>

                          <div className="p-2.5 bg-surface rounded-xl border border-line">
                            <strong className="text-rose-ink block mb-0.5">{"🔴 O'chiq bo'lsa:"}</strong>
                            {"Raqamlar yozilmaydi! Tugmalar strelka va navigatsiya bo'lib qoladi (8 - tepaga, 2 - pastga, 4 - chapga)."}
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-line text-[11px] font-semibold text-blue-ink">
                        {"⚠️ Shifoxonadagi eng ko'p savol: \"Kompyuterim nega raqam yozmayapti?\" — Javob: Num Lock chirog'i o'chgan bo'ladi!"}
                      </div>
                    </div>

                    {/* CARD 2: CAPS LOCK */}
                    <div
                      onClick={() => setActiveIndicatorCard('caps')}
                      className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                        activeIndicatorCard === 'caps'
                          ? 'bg-blue-tint/70 border-blue-500 shadow-md ring-2 ring-blue-edge/50'
                          : 'bg-surface border-line hover:border-line-strong'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="w-9 h-9 rounded-xl bg-indigo-tint-strong text-indigo-ink flex items-center justify-center font-mono font-black text-sm">
                            {"CAPS"}
                          </span>
                          <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
                            capsLockOn ? 'bg-emerald-tint-strong text-emerald-ink border-emerald-edge' : 'bg-canvas text-fg-muted border-line-strong'
                          }`}>
                            {capsLockOn ? '● Hozir Yoniq' : '○ Hozir O\'chiq'}
                          </span>
                        </div>

                        <h4 className="font-black text-fg text-base sm:text-lg mb-1">
                          {"2. CAPS (Caps Lock) — Katta harflar qulfi"}
                        </h4>
                        <p className="text-xs text-indigo-ink font-bold uppercase tracking-wider mb-3">
                          {"Qanday yoqiladi: [Caps Lock] tugmasi"}
                        </p>

                        <div className="space-y-2 text-xs sm:text-sm text-fg-muted">
                          <div className="p-2.5 bg-surface rounded-xl border border-line">
                            <strong className="text-indigo-ink block mb-0.5">{"🟢 Yoniq bo'lsa:"}</strong>
                            {"Yozilayotgan barcha harflar doimiy KATTA (BOSH) harflar bilan yoziladi. Masalan: "}
                            <span className="font-bold text-indigo-ink font-mono">{"ISMOILOV ANVAR, EKG, MRT, COVID-19, O'RVI"}</span>.
                          </div>

                          <div className="p-2.5 bg-surface rounded-xl border border-line">
                            <strong className="text-fg block mb-0.5">{"⚪ O'chiq bo'lsa (Standart holat):"}</strong>
                            {"Barcha harflar kichik shaklda yoziladi. Faqat bir dona bosh harf yozish uchun "}
                            <kbd className="px-1.5 py-0.5 bg-canvas border border-line-strong rounded font-bold text-[10px]">Shift</kbd>
                            {" tugmasi bosib turiladi."}
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-line text-[11px] font-semibold text-indigo-ink">
                        {"💡 Maslahat: Login va parol kiritayotganda Caps Lock yoniq qolmasligiga qat'iy e'tibor bering!"}
                      </div>
                    </div>

                    {/* CARD 3: SCROLL LOCK */}
                    <div
                      onClick={() => setActiveIndicatorCard('scroll')}
                      className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                        activeIndicatorCard === 'scroll'
                          ? 'bg-blue-tint/70 border-blue-500 shadow-md ring-2 ring-blue-edge/50'
                          : 'bg-surface border-line hover:border-line-strong'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="w-9 h-9 rounded-xl bg-purple-tint-strong text-purple-ink flex items-center justify-center font-mono font-black text-sm">
                            {"SCRL"}
                          </span>
                          <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
                            scrollLockOn ? 'bg-emerald-tint-strong text-emerald-ink border-emerald-edge' : 'bg-canvas text-fg-muted border-line-strong'
                          }`}>
                            {scrollLockOn ? '● Hozir Yoniq' : '○ Hozir O\'chiq'}
                          </span>
                        </div>

                        <h4 className="font-black text-fg text-base sm:text-lg mb-1">
                          {"3. SCROLL (Scroll Lock) — Varaqlash qulfi"}
                        </h4>
                        <p className="text-xs text-purple-ink font-bold uppercase tracking-wider mb-3">
                          {"Qanday yoqiladi: [Scroll Lock] yoki [ScrLk]"}
                        </p>

                        <div className="space-y-2 text-xs sm:text-sm text-fg-muted">
                          <div className="p-2.5 bg-surface rounded-xl border border-line">
                            <strong className="text-purple-ink block mb-0.5">{"🟢 Yoniq bo'lsa:"}</strong>
                            {"Excel va tibbiy jadvallarda kursor katakda turgan holda butun jadvalni strelkalar orqali varaqlash (ekran bo'ylab surish) imkonini beradi."}
                          </div>

                          <div className="p-2.5 bg-surface rounded-xl border border-line">
                            <strong className="text-fg block mb-0.5">{"⚪ O'chiq bo'lsa (Standart holat):"}</strong>
                            {"Strelka tugmalari (▲ ▼ ◀ ▶) kursorni bitta-bitta katakdan katakka o'tkazadi."}
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-line text-[11px] font-semibold text-purple-ink">
                        {"📊 Tibbiy jadvallarda: Katta hajmli bemorlar hisobotlarini ko'rishda ishlatiladi."}
                      </div>
                    </div>

                  </div>

                  {/* LIVE TYPING & DEMONSTRATION PLAYGROUND */}
                  <div className="on-dark p-5 bg-slate-900 rounded-2xl border border-slate-700 text-white">
                    <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></span>
                        <span className="font-bold text-sm text-slate-200">{"Jonli sinov maydonchasi (Playground)"}</span>
                      </div>
                      <span className="text-xs text-fg-subtle font-mono">
                        {`NUM: ${numLockOn ? 'ON' : 'OFF'} | CAPS: ${capsLockOn ? 'ON' : 'OFF'} | SCROLL: ${scrollLockOn ? 'ON' : 'OFF'}`}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                      <div>
                        <p className="text-xs text-slate-300 mb-1.5 font-medium">
                          {"Klaviaturada yozib yoki quyidagi tugmalarni bosib tekshirib ko'ring:"}
                        </p>
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          <button
                            onClick={() => handleSimulateKeyClick(capsLockOn ? 'ALIYEV VALI' : 'Aliyev Vali')}
                            className="on-dark px-2.5 py-1 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-md text-xs font-mono cursor-pointer transition-colors"
                          >
                            {"+ Bemor F.I.SH"}
                          </button>
                          <button
                            onClick={() => handleSimulateKeyClick(numLockOn ? '120/80' : '[Strelka tepaga]')}
                            className={`on-dark px-2.5 py-1 border rounded-md text-xs font-mono cursor-pointer transition-colors ${
                              numLockOn ? 'bg-teal-900 text-teal-200 border-teal-600' : 'bg-rose-950 text-rose-300 border-rose-800'
                            }`}
                          >
                            {numLockOn ? '+ 120/80 (Bosim)' : '⚠️ Raqam yozmaydi!'}
                          </button>
                          <button
                            onClick={() => handleSimulateKeyClick(numLockOn ? '36.6' : '[Strelka pastga]')}
                            className={`on-dark px-2.5 py-1 border rounded-md text-xs font-mono cursor-pointer transition-colors ${
                              numLockOn ? 'bg-teal-900 text-teal-200 border-teal-600' : 'bg-rose-950 text-rose-300 border-rose-800'
                            }`}
                          >
                            {numLockOn ? '+ 36.6 °C (Harorat)' : '⚠️ Navigatsiya'}
                          </button>
                        </div>

                        {interactiveTypedKey && (
                          <div className="text-xs text-emerald-400 font-mono flex items-center gap-1.5 animate-bounce">
                            <span>{"⚡ Kiritildi:"}</span>
                            <span className="on-dark font-bold bg-slate-800 px-2 py-0.5 rounded border border-slate-600">{interactiveTypedKey}</span>
                          </div>
                        )}
                      </div>

                      <div className="on-dark bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                        <span className="text-[10px] text-fg-subtle uppercase font-mono block mb-1">
                          {"Chiqarish ekrani:"}
                        </span>
                        <p className={`font-mono text-sm sm:text-base break-words ${capsLockOn ? 'text-amber-300 uppercase font-bold' : 'text-emerald-300'}`}>
                          {capsLockOn ? indicatorTestText.toUpperCase() : indicatorTestText}
                        </p>
                        <div className="mt-2 pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-fg-subtle">
                          <span>{capsLockOn ? "🔠 CAPS YONIQ: Barcha harflar KATTA" : "🔡 CAPS O'CHIQ: Standart harflar"}</span>
                          <span>{numLockOn ? "🔢 NUM YONIQ: Raqamlar faol" : "❌ NUM O'CHIQ: Raqamlar o'chiq"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* TOPIC 5: VIRTUAL NURSE DESK SIMULATOR (LARGE INTERACTIVE WORKSTATION) */}
              <div className="bg-surface p-6 sm:p-8 rounded-2xl border border-line shadow-sm">
                <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                  <h2 className="text-xl sm:text-2xl font-bold text-fg flex items-center gap-3">
                    <span className="w-2.5 h-7 bg-blue-600 rounded-full inline-block"></span>
                    {"5. Interaktiv Amaliyot: Virtual Hamshira Ish Stoli"}
                  </h2>
                  <span className="text-sm font-bold px-3 py-1 rounded-full bg-blue-tint text-blue-ink border border-blue-edge">
                    {"Kasalxona Simulyatori"}
                  </span>
                </div>

                <p className="text-fg-muted text-sm sm:text-base mb-6 leading-relaxed">
                  {"Ushbu maydonda bemorning ko'rsatkichlarini klaviatura orqali kiritib, sichqoncha yordamida muolajani tasdiqlang va ma'lumotlar bazasiga saqlang:"}
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Inputs Form */}
                  <div className="lg:col-span-7 space-y-4 bg-subtle p-5 rounded-xl border border-line">
                    <div>
                      <label className="block text-sm font-bold text-fg mb-1.5">
                        {"Bemor F.I.O"}
                      </label>
                      <input
                        type="text"
                        value={simPatientName}
                        onChange={(e) => setSimPatientName(e.target.value)}
                        className="w-full text-base bg-surface border border-line-strong rounded-xl px-4 py-2.5 text-fg focus:outline-hidden focus:border-blue-500 font-medium"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs sm:text-sm font-bold text-fg mb-1">
                          {"Qon bosimi"}
                        </label>
                        <input
                          type="text"
                          value={simBloodPressure}
                          onChange={(e) => setSimBloodPressure(e.target.value)}
                          className="w-full text-sm sm:text-base font-mono bg-surface border border-line-strong rounded-xl px-3 py-2 text-fg focus:outline-hidden focus:border-blue-500 font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm font-bold text-fg mb-1">
                          {"Puls (ur/daq)"}
                        </label>
                        <input
                          type="text"
                          value={simPulse}
                          onChange={(e) => setSimPulse(e.target.value)}
                          className="w-full text-sm sm:text-base font-mono bg-surface border border-line-strong rounded-xl px-3 py-2 text-fg focus:outline-hidden focus:border-blue-500 font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm font-bold text-fg mb-1">
                          {"Harorat (°C)"}
                        </label>
                        <input
                          type="text"
                          value={simTemp}
                          onChange={(e) => setSimTemp(e.target.value)}
                          className="w-full text-sm sm:text-base font-mono bg-surface border border-line-strong rounded-xl px-3 py-2 text-fg focus:outline-hidden focus:border-blue-500 font-bold"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <input
                        type="checkbox"
                        id="medCheckSim"
                        checked={simMedGiven}
                        onChange={(e) => setSimMedGiven(e.target.checked)}
                        className="w-5 h-5 text-blue-ink rounded-md border-line-strong focus:ring-blue-500 cursor-pointer"
                      />
                      <label htmlFor="medCheckSim" className="text-sm sm:text-base text-fg font-bold cursor-pointer">
                        {"Dori berildi (Sichqoncha chap tugmasi bilan belgilang)"}
                      </label>
                    </div>

                    <div className="pt-2 flex items-center gap-4">
                      <button
                        type="button"
                        onClick={handleSaveSimData}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-sm sm:text-base font-bold shadow-sm transition-colors cursor-pointer"
                      >
                        {"Bazaga saqlash"}
                      </button>
                      {simSuccessMsg && (
                        <span className="text-sm text-emerald-ink font-bold flex items-center gap-1.5">
                          <CheckCircle2 className="w-5 h-5" />
                          {simSuccessMsg}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Live Database Log */}
                  <div className="on-dark lg:col-span-5 bg-slate-900 text-slate-100 p-4 rounded-xl flex flex-col justify-between text-xs sm:text-sm font-mono">
                    <div>
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
                        <span className="text-blue-400 font-bold flex items-center gap-2">
                          <Database className="w-4 h-4" />
                          {"Tizim jurnali (Ma'lumotlar bazasi)"}
                        </span>
                        <span className="on-dark text-xs bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800">
                          {"Jonli"}
                        </span>
                      </div>

                      <div className="space-y-2">
                        {simLog.map((log, idx) => (
                          <div key={idx} className="on-dark bg-slate-800/90 p-2.5 rounded-lg border border-slate-700 text-emerald-300 text-xs leading-relaxed">
                            {log}
                          </div>
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-fg-subtle pt-3 border-t border-slate-800 mt-3">
                      {"Kiritilgan ko'rsatkichlar markaziy serverga xavfsiz yozilmoqda."}
                    </p>
                  </div>
                </div>
              </div>

              {/* ========================================================= */}
              {/* 6-BO'LIM: O'NG TUGMA (ПРАВАЯ КНОПКА МЫШИ) - IMAGE 3       */}
              {/* ========================================================= */}
              <div className="bg-surface p-6 sm:p-8 rounded-2xl border border-line shadow-sm">
                <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                  <h2 className="text-xl sm:text-2xl font-bold text-fg flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                      <Sliders className="w-6 h-6" />
                    </div>
                    <span>{"6-Bo'lim. O'ng tugma (Правая кнопка мыши)"}</span>
                  </h2>
                  <span className="text-xs font-bold text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-lg border border-cyan-500/30">
                    {"Kontekst menyu"}
                  </span>
                </div>

                <p className="text-fg-muted text-sm sm:text-base leading-relaxed mb-6">
                  {"Sichqonchaning o'ng tugmasi qo'shimcha menyuni — "}
                  <strong className="text-fg font-bold">{"Контекстное меню (Kontekst menyu)"}</strong>
                  {" oynasini ochadi. Bu menyu yordamida tezkor buyruqlarni bajarish mumkin (masalan, nusxalash, yangi fayl yaratish yoki xususiyatlarni ko'rish)."}
                </p>

                {/* Simulator Container */}
                <div className="border border-line rounded-2xl bg-subtle/60 p-5 sm:p-6">
                  <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                    <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm sm:text-base">
                      <MousePointer className="w-5 h-5" />
                      <span>{"Interaktiv: Kontekst menyu simulyatori"}</span>
                    </div>
                    {desktopFolders.length > 0 && (
                      <button
                        type="button"
                        onClick={() => {
                          setDesktopFolders([]);
                          setContextSuccessMsg(false);
                        }}
                        className="text-xs font-bold text-fg-muted hover:text-rose-400 flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>{"Maydonni tozalash"}</span>
                      </button>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-fg-muted mb-4">
                    {"Quyidagi ish stoli maydoniga sichqonchaning "}
                    <strong className="text-cyan-400 font-bold">{"o'ng tugmasini"}</strong>
                    {" bosing va yangi papka yarating:"}
                  </p>

                  {/* Desktop Canvas */}
                  <div
                    onContextMenu={(e) => {
                      e.preventDefault();
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = Math.max(10, Math.min(rect.width - 190, e.clientX - rect.left));
                      const y = Math.max(10, Math.min(rect.height - 160, e.clientY - rect.top));
                      setContextMenuPos({ x, y });
                      setContextSubmenuOpen(false);
                    }}
                    onClick={() => {
                      if (contextMenuPos) setContextMenuPos(null);
                    }}
                    className="relative w-full h-72 sm:h-80 rounded-xl border-2 border-cyan-500/30 bg-[#090d16] overflow-hidden select-none cursor-crosshair transition-all"
                    style={{
                      backgroundImage: 'radial-gradient(rgba(56, 189, 248, 0.18) 1.5px, transparent 1.5px)',
                      backgroundSize: '24px 24px',
                    }}
                  >
                    {/* Watermark instructions */}
                    {desktopFolders.length === 0 && !contextMenuPos && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none p-4 text-center">
                        <p className="text-xs sm:text-sm font-semibold text-slate-400 tracking-wide">
                          {"Ish stoli bo'sh maydoni (O'ng tugmani bosing)"}
                        </p>
                        <span className="text-[11px] text-slate-500 mt-1">
                          {"(Sensorli ekranda pastdagi tugmadan foydalaning)"}
                        </span>
                      </div>
                    )}

                    {/* Created Folders on Desktop */}
                    <div className="p-4 flex flex-wrap gap-4 items-start relative z-10">
                      {desktopFolders.map((folderName, idx) => (
                        <div
                          key={idx}
                          className="flex flex-col items-center gap-1.5 p-2 rounded-lg hover:bg-white/10 transition-colors w-24 text-center cursor-pointer animate-in zoom-in-95 duration-200"
                        >
                          <Folder className="w-12 h-12 text-amber-400 fill-amber-400/20 drop-shadow" />
                          <span className="text-[11px] font-bold text-white leading-tight break-words line-clamp-2">
                            {folderName}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Custom Windows-style Context Menu */}
                    {contextMenuPos && (
                      <div
                        style={{ left: contextMenuPos.x, top: contextMenuPos.y }}
                        onClick={(e) => e.stopPropagation()}
                        className="absolute z-30 w-48 rounded-xl border border-slate-700 bg-slate-900/95 backdrop-blur-md shadow-2xl p-1.5 text-xs text-slate-200 animate-in fade-in zoom-in-95 duration-100"
                      >
                        <button
                          type="button"
                          className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-blue-600 hover:text-white transition-colors cursor-pointer flex items-center justify-between"
                          onClick={() => setContextMenuPos(null)}
                        >
                          <span>{"Ko'rinish (Вид)"}</span>
                          <span className="text-[10px] text-slate-400">▸</span>
                        </button>
                        <button
                          type="button"
                          className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-blue-600 hover:text-white transition-colors cursor-pointer flex items-center justify-between"
                          onClick={() => setContextMenuPos(null)}
                        >
                          <span>{"Saralash (Сортировка)"}</span>
                          <span className="text-[10px] text-slate-400">▸</span>
                        </button>
                        <button
                          type="button"
                          className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-blue-600 hover:text-white transition-colors cursor-pointer"
                          onClick={() => setContextMenuPos(null)}
                        >
                          {"Yangilash (Обновить)"}
                        </button>

                        <div className="my-1 border-t border-slate-800" />

                        {/* Yaratish with submenu */}
                        <div className="relative">
                          <button
                            type="button"
                            onMouseEnter={() => setContextSubmenuOpen(true)}
                            onClick={() => setContextSubmenuOpen(!contextSubmenuOpen)}
                            className="w-full text-left px-3 py-1.5 rounded-lg bg-blue-600/20 text-cyan-300 hover:bg-blue-600 hover:text-white font-bold transition-colors cursor-pointer flex items-center justify-between"
                          >
                            <span>{"Yaratish (Создать)"}</span>
                            <span className="text-[10px]">▸</span>
                          </button>

                          {contextSubmenuOpen && (
                            <div className="absolute left-full top-0 ml-1 w-44 rounded-xl border border-slate-700 bg-slate-900/95 backdrop-blur-md shadow-2xl p-1.5 text-xs animate-in fade-in duration-100">
                              <button
                                type="button"
                                onClick={() => {
                                  setDesktopFolders((prev) => [
                                    ...prev,
                                    `Yangi papka ${prev.length > 0 ? `(${prev.length + 1})` : ''}`,
                                  ]);
                                  setContextMenuPos(null);
                                  setContextSubmenuOpen(false);
                                  setContextSuccessMsg(true);
                                }}
                                className="w-full text-left px-3 py-2 rounded-lg bg-emerald-600/30 text-emerald-300 hover:bg-emerald-600 hover:text-white font-bold transition-colors cursor-pointer flex items-center gap-2"
                              >
                                <FolderPlus className="w-4 h-4 text-amber-400" />
                                <span>{"Yangi papka (Папка)"}</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Fallback button for mobile / touch */}
                  <div className="mt-3 flex items-center justify-between flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setContextMenuPos({ x: 30, y: 30 });
                        setContextSubmenuOpen(true);
                      }}
                      className="text-xs font-bold text-cyan-400 hover:text-cyan-300 underline cursor-pointer"
                    >
                      {"🖱️ Sichqonchaning o'ng tugmasini bosishni sinab ko'rish"}
                    </button>

                    {contextSuccessMsg && (
                      <div className="flex items-center gap-2 text-xs font-bold text-emerald-ink bg-emerald-tint px-3 py-1.5 rounded-lg border border-emerald-edge animate-in fade-in">
                        <CheckCircle2 className="w-4 h-4 text-emerald-ink shrink-0" />
                        <span>{"Ajoyib! Kontekst menyu orqali yangi papka yaratildi!"}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* ========================================================= */}
              {/* 7-BO'LIM: G'ILDIRAKCHA (КОЛЕСО МЫШИ) - IMAGE 4            */}
              {/* ========================================================= */}
              <div className="bg-surface p-6 sm:p-8 rounded-2xl border border-line shadow-sm">
                <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                  <h2 className="text-xl sm:text-2xl font-bold text-fg flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                      <ArrowDown className="w-6 h-6" />
                    </div>
                    <span>{"7-Bo'lim. G'ildirakcha (Колесо мыши) bilan ishlash"}</span>
                  </h2>
                  <span className="text-xs font-bold text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-lg border border-cyan-500/30">
                    {"Прокрутка (Scroll)"}
                  </span>
                </div>

                <p className="text-fg-muted text-sm sm:text-base leading-relaxed mb-6">
                  {"Sichqonchaning o'rtasida joylashgan g'ildirakcha ("}
                  <strong className="text-fg font-bold">{"Колесо прокрутки"}</strong>
                  {") sahifalarni, hujjatlarni yoki katta jadvallarni tezkor ravishda yuqoriga yoki pastga aylantirib ko'rish ("}
                  <strong className="text-cyan-400 font-bold">{"Прокрутка"}</strong>
                  {") uchun xizmat qiladi."}
                </p>

                {/* Exercise Box */}
                <div className="border border-line rounded-2xl bg-subtle/60 p-5 sm:p-6">
                  <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                    <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm sm:text-base">
                      <Move className="w-5 h-5" />
                      <span>{"Mashq: G'ildirakcha yordamida bemorni toping"}</span>
                    </div>
                    {targetPatientFound && (
                      <button
                        type="button"
                        onClick={() => setTargetPatientFound(false)}
                        className="text-xs font-bold text-fg-muted hover:text-cyan-400 flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>{"Qayta sinash"}</span>
                      </button>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-fg-muted mb-4">
                    {"Quyidagi varaqani sichqoncha g'ildirakchasi bilan pastga aylantirib, yashil rangdagi "}
                    <strong className="text-emerald-400 font-bold">{"\"Topildi\""}</strong>
                    {" tugmasini bosing:"}
                  </p>

                  <div className="rounded-xl border-2 border-cyan-500/30 bg-[#090d16] p-3 shadow-inner">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-1">
                      {"Bemorlar elektron reyestri (Aylantiring):"}
                    </div>

                    {/* Scrollable List */}
                    <div className="h-56 overflow-y-auto space-y-2 pr-2">
                      {/* Item 1 */}
                      <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/70 text-slate-300 text-xs sm:text-sm">
                        {"1. Karimov Jasur — Qabul bo'limi (Ko'rik kutilmoqda)"}
                      </div>
                      {/* Item 2 */}
                      <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/70 text-slate-300 text-xs sm:text-sm">
                        {"2. Rahimov Bobur — Kardiologiya bo'limi (EKG o'tkazildi)"}
                      </div>
                      {/* Item 3 */}
                      <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/70 text-slate-300 text-xs sm:text-sm">
                        {"3. Yoqubova Shahnoza — Nevrologiya bo'limi (Palatada)"}
                      </div>
                      {/* Item 4 */}
                      <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/70 text-slate-300 text-xs sm:text-sm">
                        {"4. Alimova Malika — Ginekologiya bo'limi (Muolaja xonasida)"}
                      </div>
                      {/* Item 5 */}
                      <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/70 text-slate-300 text-xs sm:text-sm">
                        {"5. Ergashev Sanjar — Travmatologiya bo'limi (Rentgen topshirildi)"}
                      </div>
                      {/* Item 6 */}
                      <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/70 text-slate-300 text-xs sm:text-sm">
                        {"6. Usmonov Dilshod — Xirurgiya bo'limi (Operatsiyaga tayyor)"}
                      </div>
                      {/* Item 7 */}
                      <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/70 text-slate-300 text-xs sm:text-sm">
                        {"7. Qodirov Umid — Terapiya bo'limi (Tahlillar yig'ilmoqda)"}
                      </div>

                      {/* TARGET PATIENT: Napasov Ozodbek */}
                      <div className={`p-3.5 rounded-xl border-2 transition-all flex items-center justify-between gap-3 ${
                        targetPatientFound
                          ? 'border-emerald-500 bg-emerald-950/40 text-emerald-200 shadow-md'
                          : 'border-emerald-500/60 bg-emerald-950/20 text-white'
                      }`}>
                        <div>
                          <div className="font-bold text-sm sm:text-base text-emerald-400">
                            {"8. Bemor: Napasov Ozodbek (1988)"}
                          </div>
                          <div className="text-xs text-slate-400 mt-0.5">
                            {"Holati: Ko'rikdan o'tdi"}
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => setTargetPatientFound(true)}
                          className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer active:scale-95 flex items-center gap-1.5"
                        >
                          <Check className="w-4 h-4" />
                          <span>{"Topildi"}</span>
                        </button>
                      </div>

                      {/* Item 9 */}
                      <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/70 text-slate-300 text-xs sm:text-sm">
                        {"9. Xoliqov Sardor — Reanimatsiya bo'limi (Kuzatuvda)"}
                      </div>
                      {/* Item 10 */}
                      <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/70 text-slate-300 text-xs sm:text-sm">
                        {"10. Murodova Dildora — Pediatriya bo'limi (Sog'lom, javob berildi)"}
                      </div>
                    </div>
                  </div>

                  {targetPatientFound && (
                    <div className="mt-4 p-3 bg-emerald-tint border border-emerald-edge rounded-xl text-xs sm:text-sm font-bold text-emerald-ink flex items-center gap-2.5 animate-in fade-in">
                      <CheckCircle2 className="w-5 h-5 text-emerald-ink shrink-0" />
                      <span>
                        {"Barakalla! Siz sichqoncha g'ildirakchasi (Scroll) yordamida ro'yxatni pastga aylantirib, kerakli bemorni muvaffaqiyatli topdingiz va tasdiqladingiz!"}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* ========================================================= */}
              {/* 8-BO'LIM: DRAG AND DROP - IMAGE 5                          */}
              {/* ========================================================= */}
              <div className="bg-surface p-6 sm:p-8 rounded-2xl border border-line shadow-sm">
                <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                  <h2 className="text-xl sm:text-2xl font-bold text-fg flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                      <Move className="w-6 h-6" />
                    </div>
                    <span>{"8-Bo'lim. Drag and Drop"}</span>
                  </h2>
                  <span className="text-xs font-bold text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-lg border border-cyan-500/30">
                    {"Sudrab tashlash"}
                  </span>
                </div>

                <p className="text-fg-muted text-sm sm:text-base leading-relaxed mb-6">
                  <strong className="text-fg font-bold">{"Drag and Drop (Sudrab tashlash)"}</strong>
                  {" — sichqonchaning chap tugmasini ob'ekt ustida bosib turgan holda, uni ekranning boshqa joyiga sudrab olib borish va tugmani qo'yib yuborish orqali joylashtirish amali."}
                </p>

                {/* Game Box */}
                <div className="border border-line rounded-2xl bg-subtle/60 p-5 sm:p-6">
                  <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                    <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm sm:text-base">
                      <Trash2 className="w-5 h-5" />
                      <span>{"O'yinli mashq: Keraksiz faylni savatga (Корзина) tashlang"}</span>
                    </div>
                    {fileInTrash && (
                      <button
                        type="button"
                        onClick={() => setFileInTrash(false)}
                        className="text-xs font-bold text-fg-muted hover:text-cyan-400 flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>{"Qayta o'ynash"}</span>
                      </button>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-fg-muted mb-4">
                    <code className="text-cyan-300 font-mono bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                      {'"Kasallik_tarixi_xato.docx"'}
                    </code>
                    {" faylini sichqoncha chap tugmasini bosib turgan holda sudrab, "}
                    <strong className="text-fg font-bold">{"\"Корзина\""}</strong>
                    {" ichiga tashlang:"}
                  </p>

                  {/* Drag-and-drop Arena */}
                  <div className="relative rounded-2xl border-2 border-cyan-500/30 bg-[#090d16] p-6 sm:p-8 min-h-[220px] flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden">
                    {/* Source File */}
                    <div className="flex-1 flex justify-center md:justify-start">
                      {!fileInTrash ? (
                        <div
                          draggable
                          onDragStart={(e) => {
                            e.dataTransfer.setData('text/plain', 'xato_fayl');
                            setIsDraggingFile(true);
                          }}
                          onDragEnd={() => setIsDraggingFile(false)}
                          onClick={() => {
                            // Touch click fallback
                            setFileInTrash(true);
                          }}
                          className={`flex items-center gap-3 p-4 rounded-xl border-2 border-rose-500/40 bg-rose-950/20 text-rose-200 cursor-grab active:cursor-grabbing hover:border-rose-400 transition-all select-none shadow-lg ${
                            isDraggingFile ? 'opacity-40 scale-95' : 'hover:scale-105'
                          }`}
                        >
                          <FileText className="w-8 h-8 text-rose-400 shrink-0" />
                          <div>
                            <div className="font-bold text-sm text-white">
                              {"Kasallik_tarixi_xato.docx"}
                            </div>
                            <div className="text-[11px] text-rose-300/80">
                              {"(Sudrang yoki bosing)"}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-xs font-semibold text-slate-500 italic p-4">
                          {"Fayl savatga tashlandi"}
                        </div>
                      )}
                    </div>

                    {/* Trash Drop Zone */}
                    <div
                      onDragOver={(e) => {
                        e.preventDefault();
                        e.dataTransfer.dropEffect = 'move';
                      }}
                      onDrop={(e) => {
                        e.preventDefault();
                        setFileInTrash(true);
                        setIsDraggingFile(false);
                      }}
                      className={`w-full md:w-80 h-36 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-2 p-4 text-center transition-all ${
                        fileInTrash
                          ? 'border-emerald-500 bg-emerald-950/30 text-emerald-300 shadow-lg shadow-emerald-500/10'
                          : isDraggingFile
                          ? 'border-cyan-400 bg-cyan-950/40 scale-105 text-cyan-200'
                          : 'border-slate-700 bg-slate-900/40 text-slate-400 hover:border-slate-500'
                      }`}
                    >
                      <Trash2 className={`w-9 h-9 transition-transform ${
                        fileInTrash ? 'text-emerald-400 scale-110' : 'text-slate-400'
                      }`} />
                      <div className="font-bold text-sm text-white">
                        {fileInTrash ? "Корзина (To'la)" : "Корзина (Bo'sh)"}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {fileInTrash
                          ? "Fayl muvaffaqiyatli o'chirildi"
                          : "Faylni shu yerga sudrab tashlang"}
                      </div>
                    </div>
                  </div>

                  {fileInTrash && (
                    <div className="mt-4 p-3 bg-emerald-tint border border-emerald-edge rounded-xl text-xs sm:text-sm font-bold text-emerald-ink flex items-center gap-2.5 animate-in fade-in">
                      <CheckCircle2 className="w-5 h-5 text-emerald-ink shrink-0" />
                      <span>
                        {"Barakalla! Keraksiz fayl savatga (Корзина) muvaffaqiyatli tashlandi! Drag and Drop amalini to'liq o'zlashtirdingiz."}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Nav Action */}
              <div className="flex justify-between items-center pt-2">
                <button
                  onClick={() => {
                    setActiveTab('theory');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-line hover:bg-line-strong text-fg px-5 py-2.5 rounded-xl text-base font-bold transition-colors cursor-pointer"
                >
                  {"← Nazariyaga qaytish"}
                </button>

                <button
                  onClick={() => {
                    setActiveTab('quiz');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-base font-bold shadow-sm flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <span>{"3-Bo'lim: Bilimni sinash (Test)"}</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 3: BILIMNI SINASH - ikkita mustaqil test banki         */}
          {/* ========================================================= */}
          {activeTab === 'quiz' && (
            <div className="space-y-8">

              {/* Header + bank switcher */}
              <div className="bg-surface p-6 sm:p-8 rounded-2xl border-2 border-blue-edge shadow-sm space-y-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
                  <div>
                    <div className="flex items-center gap-2.5 text-blue-ink font-bold text-xs sm:text-sm uppercase tracking-wider mb-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block animate-pulse"></span>
                      {"Shahrisabz Tibbiyot Texnikumi \u2022 Bilimni sinash"}
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-fg leading-tight">
                      {"1-Dars bo'yicha test sinovlari"}
                    </h2>
                    <p className="text-sm sm:text-base text-fg-muted mt-1">
                      {"Nazariy va amaliy testlar alohida baholanadi. Har bir savoldan keyin to'g'ri javob va izohi darhol ko'rsatiladi."}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 bg-subtle border border-line p-4 rounded-xl shrink-0 w-full md:w-auto justify-between md:justify-start">
                    <div>
                      <span className="text-xs text-fg-subtle font-bold uppercase block">{"Jami yechilgan"}</span>
                      <span className="text-xl font-black text-blue-ink">{answeredCount} / {TOTAL_QUESTIONS}</span>
                    </div>
                    {stats.answered > 0 && (
                      <button
                        onClick={() => handleResetQuiz(quizSet)}
                        className="px-4 py-2 bg-blue-tint text-blue-ink border border-blue-edge rounded-lg text-xs font-bold hover:bg-blue-tint-strong cursor-pointer flex items-center gap-1.5 transition-all"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>{"Qaytadan"}</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* which of the two tests is open */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-subtle border border-line rounded-2xl p-1.5">
                  {QUIZ_BANKS.map((bank) => {
                    const isOpen = quizSet === bank.key;
                    const done = Object.keys(answers[bank.key]).length;
                    const Icon = bank.key === 'theory' ? BookOpen : Laptop;
                    return (
                      <button
                        key={bank.key}
                        type="button"
                        aria-current={isOpen ? 'page' : undefined}
                        onClick={() => setQuizSet(bank.key)}
                        className={`flex items-center justify-between gap-3 px-4 py-3.5 rounded-xl text-sm sm:text-base font-bold transition-all duration-200 cursor-pointer ${
                          isOpen
                            ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25'
                            : 'text-fg-muted hover:bg-surface hover:text-fg'
                        }`}
                      >
                        <span className="flex items-center gap-2.5 min-w-0">
                          <Icon className={`w-5 h-5 shrink-0 ${isOpen ? 'text-white' : 'text-fg-subtle'}`} />
                          <span className="truncate">{bank.label}</span>
                        </span>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-md shrink-0 ${
                          isOpen ? 'bg-white/20 text-white' : 'border border-blue-edge bg-blue-tint-strong text-blue-ink'
                        }`}>
                          {done}/{bank.questions.length}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <p className="text-sm text-fg-muted leading-relaxed">
                  {stats.bank.description}
                </p>

                <p className="flex items-start gap-2.5 rounded-xl border border-amber-edge bg-amber-tint p-3.5 text-sm leading-relaxed text-amber-ink">
                  <Shuffle className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>
                    {"Javob variantlari har safar tasodifiy tartibda chiqadi — javobni harfiga emas, mazmuniga qarab tanlang. «Qaytadan» bosilsa, tartib yana o‘zgaradi."}
                  </span>
                </p>
              </div>

              {/* Questions of the open bank */}
              <div className="space-y-5">
                {stats.bank.questions.map((q, qIndex) => {
                  const selected = answers[quizSet][q.id];
                  const isAnswered = selected !== undefined;
                  const isCorrect = isAnswered && selected === q.correctIndex;

                  return (
                    <div
                      key={q.id}
                      className={`bg-surface p-6 sm:p-7 rounded-2xl border-2 transition-all shadow-sm ${
                        isAnswered
                          ? isCorrect
                            ? 'border-emerald-400 ring-2 ring-emerald-edge'
                            : 'border-rose-400 ring-2 ring-rose-edge'
                          : 'border-line hover:border-blue-edge'
                      }`}
                    >
                      {/* Question header */}
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex items-start gap-3.5">
                          <span className="w-8 h-8 rounded-xl bg-blue-tint-strong text-blue-ink font-bold flex items-center justify-center text-sm shrink-0 mt-0.5 border border-blue-edge">
                            {qIndex + 1}
                          </span>
                          <h4 className="text-base sm:text-lg font-bold text-fg leading-snug">
                            {q.question}
                          </h4>
                        </div>

                        {isAnswered && (
                          <span className={`text-xs font-bold px-3 py-1 rounded-full shrink-0 ${
                            isCorrect ? 'bg-emerald-tint-strong text-emerald-ink border border-emerald-edge' : 'bg-rose-tint-strong text-rose-ink border border-rose-edge'
                          }`}>
                            {isCorrect ? "To'g'ri" : "Noto'g'ri"}
                          </span>
                        )}
                      </div>

                      {/* Options */}
                      <div className="space-y-3 pl-0 sm:pl-11 mt-4">
                        {(orders[quizSet][q.id] ?? q.options.map((_, i) => i)).map((optIdx, pos) => {
                          const isThisSelected = selected === optIdx;
                          const isThisCorrect = optIdx === q.correctIndex;
                          // harf ekrandagi o'ringa qarab beriladi, asl indeksga emas
                          const letter = String.fromCharCode(65 + pos);

                          let optClass = "border-line bg-subtle hover:bg-blue-tint/50 hover:border-blue-edge text-fg";
                          let badgeClass = "border-line bg-surface text-fg-muted";

                          if (isAnswered) {
                            if (isThisCorrect) {
                              optClass = "border-emerald-500 bg-emerald-tint text-emerald-ink font-bold";
                              badgeClass = "border-emerald-edge bg-emerald-tint-strong text-emerald-ink";
                            } else if (isThisSelected && !isThisCorrect) {
                              optClass = "border-rose-500 bg-rose-tint text-rose-ink font-bold";
                              badgeClass = "border-rose-edge bg-rose-tint-strong text-rose-ink";
                            } else {
                              // de-emphasised, but still readable: students
                              // re-read the other options after answering
                              optClass = "border-line bg-subtle/50 text-fg-muted opacity-90";
                            }
                          }

                          return (
                            <button
                              key={optIdx}
                              type="button"
                              disabled={isAnswered}
                              onClick={() => handleSelectAnswer(quizSet, q.id, optIdx)}
                              className={`w-full text-left p-4 rounded-xl border-2 text-sm sm:text-base transition-all flex items-center justify-between gap-3 cursor-pointer ${optClass}`}
                            >
                              <span className="flex items-start gap-3 min-w-0">
                                <span className={`w-7 h-7 shrink-0 rounded-lg border grid place-items-center text-xs font-black ${badgeClass}`}>
                                  {letter}
                                </span>
                                <span>{optionText(q.options[optIdx])}</span>
                              </span>
                              {isAnswered && isThisCorrect && (
                                <CheckCircle2 className="w-5 h-5 text-emerald-ink shrink-0" />
                              )}
                              {isAnswered && isThisSelected && !isThisCorrect && (
                                <XCircle className="w-5 h-5 text-rose-ink shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* Immediate explanation */}
                      {isAnswered && (
                        <div className={`mt-4 sm:ml-11 p-4 rounded-xl border text-sm sm:text-base leading-relaxed ${
                          isCorrect
                            ? 'bg-emerald-tint border-emerald-edge text-emerald-ink'
                            : 'bg-rose-tint border-rose-edge text-rose-ink'
                        }`}>
                          <strong className="block mb-1 font-bold">{"Izoh va xulosa:"}</strong>
                          <p>{q.explanation}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Result card for the open bank */}
              {stats.answered === stats.total && (
                <div className="bg-surface border-2 border-blue-600 rounded-3xl p-6 sm:p-10 shadow-md text-center space-y-5">
                  <div className="w-16 h-16 bg-blue-tint-strong text-blue-ink border-2 border-blue-edge rounded-full mx-auto flex items-center justify-center">
                    <Award className="w-9 h-9" />
                  </div>

                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-ink bg-blue-tint-strong px-3.5 py-1 rounded-full border border-blue-edge">
                      {"Shahrisabz Tibbiyot Texnikumi \u2022 " + stats.bank.label}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-fg mt-3">
                      {stats.bank.label + " yakunlandi!"}
                    </h3>
                    <p className="text-sm sm:text-base text-fg-muted mt-1">
                      {"Fan: Tibbiyotda axborot texnologiyalari \u2022 Hamshiralik ishi"}
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto bg-subtle border border-line p-5 rounded-2xl">
                    <div>
                      <div className="text-xs text-fg-subtle font-bold uppercase">{"To'g'ri"}</div>
                      <div className="text-2xl font-black text-emerald-ink">{stats.correct} / {stats.total}</div>
                    </div>
                    <div>
                      <div className="text-xs text-fg-subtle font-bold uppercase">{"Foiz"}</div>
                      <div className="text-2xl font-black text-blue-ink">{stats.percent}%</div>
                    </div>
                    <div>
                      <div className="text-xs text-fg-subtle font-bold uppercase">{"Baho"}</div>
                      <div className="text-2xl font-black text-fg">{grade(stats.percent)}</div>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-wrap justify-center gap-3">
                    <button
                      onClick={() => handleResetQuiz(quizSet)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-base font-bold shadow-sm inline-flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>{"Bu testni qaytadan yechish"}</span>
                    </button>
                    {otherBank && Object.keys(answers[otherBank.key]).length < otherBank.questions.length && (
                      <button
                        onClick={() => { setQuizSet(otherBank.key); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        className="bg-subtle hover:bg-blue-tint text-blue-ink border border-blue-edge px-6 py-3 rounded-xl text-base font-bold inline-flex items-center gap-2 transition-colors cursor-pointer"
                      >
                        <span>{otherBank.label + "ga o'tish"}</span>
                      </button>
                    )}
                  </div>
                </div>
              )}

            </div>
          )}

        </div>

        {/* ================= BOTTOM METHODOLOGY & GLOSSARY SECTION (FULL WIDTH 3-COL GRID) ================= */}
        <section className="pt-6 border-t-2 border-line grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Metodik Tavsiya */}
          <div className="on-dark bg-teal-900 text-white p-6 rounded-2xl shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-lg mb-2.5 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-teal-300" />
                {"Metodik tavsiya"}
              </h3>
              <p className="text-teal-100 text-sm sm:text-base leading-relaxed mb-5">
                {"Hurmatli talaba! Tibbiyotda axborot texnologiyalari — bu shunchaki kompyuter emas, balki bemor hayotini asrashda tezkor va to'g'ri qaror qabul qilish vositasidir. Avval kirish va nazariyani o'zlashtiring, so'ng amaliyot va testga o'ting."}
              </p>
            </div>
            <button
              onClick={() => {
                if (activeTab === 'intro') setActiveTab('theory');
                else if (activeTab === 'theory') setActiveTab('practice');
                else if (activeTab === 'practice') setActiveTab('quiz');
                else setActiveTab('intro');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-surface hover:bg-blue-tint text-blue-ink px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors cursor-pointer self-start"
            >
              {activeTab === 'intro' ? "Nazariyani boshlash" : activeTab === 'theory' ? "Amaliyotga o'tish" : activeTab === 'practice' ? "Testni topshirish" : "Kirish qismiga o'tish"}
            </button>
          </div>

          {/* Card 2: Lug'at (Glossary in Pure Uzbek) */}
          <div className="bg-surface p-6 rounded-2xl border border-line shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold text-fg mb-4 uppercase tracking-wider flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-ink" />
                {"Muhim tibbiy-IT atamalar"}
              </h3>

              <div className="space-y-3">
                <div className="border-l-3 border-blue-500 pl-3">
                  <p className="text-sm font-bold text-fg">{"Elektron tibbiy karta"}</p>
                  <p className="text-xs text-fg-muted leading-relaxed">
                    {"Bemorning barcha kasallik tarixi va tahlillarining raqamli pasporti."}
                  </p>
                </div>

                <div className="border-l-3 border-blue-500 pl-3">
                  <p className="text-sm font-bold text-fg">{"Kasalxona axborot tizimi"}</p>
                  <p className="text-xs text-fg-muted leading-relaxed">
                    {"Shifoxonadagi qabul, bo'limlar va laboratoriyani birlashtiruvchi dastur."}
                  </p>
                </div>

                <div className="border-l-3 border-blue-500 pl-3">
                  <p className="text-sm font-bold text-fg">{"Raqamli blok (Numpad)"}</p>
                  <p className="text-xs text-fg-muted leading-relaxed">
                    {"Qon bosimi, puls va dori dozasini bir qo'lda tezkor kiritish hududi."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Lesson Progress Indicator */}
          <div className="bg-surface p-6 rounded-2xl border border-line shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold text-fg mb-4 uppercase tracking-wider flex items-center gap-2">
                <Award className="w-4 h-4 text-blue-ink" />
                {"Darsdagi faollik ko'rsatkichi"}
              </h3>
              
              <div className="flex justify-between items-center mb-3">
                <p className="text-xs font-bold text-fg-subtle tracking-wider">{"O'ZLASHTIRISH DARAJASI"}</p>
                <p className="text-base font-bold text-blue-ink">{overallProgress}%</p>
              </div>
              
              <div className="w-full bg-line h-3 rounded-full overflow-hidden">
                <div
                  className="bg-blue-600 h-full rounded-full transition-all duration-300"
                  style={{ width: `${overallProgress}%` }}
                ></div>
              </div>
              
              <p className="text-sm text-fg-muted mt-4 leading-relaxed font-medium">
                {overallProgress < 40
                  ? "Siz kirish va nazariy qismini o'rganmoqdasiz."
                  : overallProgress < 75
                  ? "Siz amaliy mashg'ulotlarni bajaryapsiz."
                  : "Siz bilimingizni test sinovi orqali mustahkamlamoqdasiz."}
              </p>
            </div>

            <div className="pt-4 border-t border-line flex items-center justify-between text-xs font-bold text-fg-subtle">
              <span>{"Mavzu: 1-Dars"}</span>
              <span className="text-blue-ink">{"Hamshiralik ishi"}</span>
            </div>
          </div>

        </section>

      </main>

      <SiteFooter note={`${LESSON.label}: ${LESSON.title}`} />

    </div>
  );
}
