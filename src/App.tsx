/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Users, 
  GraduationCap, 
  CheckCircle2, 
  Download, 
  ChevronRight, 
  ChevronLeft,
  Trophy,
  Library,
  Info,
  Star,
  Sparkles,
  X,
  ShieldCheck,
  Award,
  Zap,
  Globe,
  BarChart3,
  PieChart,
  TrendingUp,
  Coins,
  Clock,
  Search
} from 'lucide-react';

import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import confetti from 'canvas-confetti';
import { 
  librarianLevels, 
  teacherLevels, 
  principalLevels, 
  fourPillars,
  TaxonomyLevel 
} from './data/taxonomies';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Role = 'librarian' | 'teacher' | 'principal';
type PillarId = 'mik' | 'reading' | 'culture' | 'democracy';

interface KPI {
  id: string;
  label: string;
  unit: string;
  description: string;
  why: string;
  icon: React.ReactNode;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

export default function App() {
  const [role, setRole] = useState<Role | null>(null);
  const [activePillar, setActivePillar] = useState<PillarId | null>(null);
  const [scores, setScores] = useState<Record<Role, number>>({
    librarian: 0,
    teacher: 0,
    principal: 0
  });
  const [practiceStates, setPracticeStates] = useState<Record<PillarId, boolean[]>>({
    mik: new Array(16).fill(false),
    reading: new Array(16).fill(false),
    culture: new Array(16).fill(false),
    democracy: new Array(16).fill(false)
  });
  const [schoolName, setSchoolName] = useState('');
  const [kpiValues, setKpiValues] = useState<Record<string, string>>({
    coPlanned: '',
    activeBorrowers: '',
    mikSessions: '',
    collectionFreshness: '',
    staffedHours: '',
    staffingDensity: '',
    mediaBudget: '',
    perceivedValue: ''
  });
  const [celebration, setCelebration] = useState<{ title: string; subtitle: string; icon: React.ReactNode } | null>(null);
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);
  const [nextQuests, setNextQuests] = useState<{ title: string; description: string }[]>([]);
  const exportRef = useRef<HTMLDivElement>(null);

  // Scroll to top when switching views
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [role, activePillar]);

  // Check achievements when state changes
  useEffect(() => {
    const newUnlocked = [...unlockedAchievements];
    let newlyUnlockedThisTurn = false;

    const getProg = (pId: PillarId) => (practiceStates[pId].filter(Boolean).length / 16) * 100;

    // Läsfrämjande Nav: reading > 75% AND culture > 75%
    if (!newUnlocked.includes('reading_hub') && getProg('reading') >= 75 && getProg('culture') >= 75) {
      newUnlocked.push('reading_hub');
      newlyUnlockedThisTurn = true;
    }

    // Demokratisk Mötesplats: democracy > 75% AND culture > 50%
    if (!newUnlocked.includes('democracy_hub') && getProg('democracy') >= 75 && getProg('culture') >= 50) {
      newUnlocked.push('democracy_hub');
      newlyUnlockedThisTurn = true;
    }

    // Digitalt Kunskapscenter: mik > 90%
    if (!newUnlocked.includes('digital_center') && getProg('mik') >= 90) {
      newUnlocked.push('digital_center');
      newlyUnlockedThisTurn = true;
    }

    // Pedagogisk Kraftsamling: All roles >= Level 5
    if (!newUnlocked.includes('pedagogical_force') && scores.librarian >= 5 && scores.teacher >= 5 && scores.principal >= 5) {
      newUnlocked.push('pedagogical_force');
      newlyUnlockedThisTurn = true;
    }

    if (newlyUnlockedThisTurn) {
      const latestId = newUnlocked[newUnlocked.length - 1];
      const ach = achievements.find(a => a.id === latestId);
      if (ach) {
        setCelebration({
          title: "Ny Titel Tilldelad!",
          subtitle: ach.title,
          icon: ach.icon
        });
        triggerConfetti();
      }
      setUnlockedAchievements(newUnlocked);
    }
  }, [scores, practiceStates]);

  const generateNextQuests = () => {
    const quests: { title: string; description: string }[] = [];

    // Role Quests
    const roles: Role[] = ['librarian', 'teacher', 'principal'];
    for (const r of roles) {
      const levels = getLevelsByRole(r);
      const currentLevel = scores[r];
      if (currentLevel < levels.length) {
        const nextLevelData = levels.find(l => l.level === currentLevel + 1);
        if (nextLevelData) {
          quests.push({
            title: `Uppdrag: ${getRoleTitle(r)}`,
            description: `Sikta på Nivå ${nextLevelData.level}: ${nextLevelData.title}. ${nextLevelData.description}`
          });
        }
      }
    }

    // Practice Quests
    const pillars: PillarId[] = ['mik', 'reading', 'culture', 'democracy'];
    const uncheckedItems: { pillar: string; item: string }[] = [];
    
    pillars.forEach(pId => {
      const pillar = fourPillars.find(p => p.id === pId);
      practiceStates[pId].forEach((checked, idx) => {
        if (!checked && pillar?.criteria[idx]) {
          uncheckedItems.push({ pillar: pillar.title, item: pillar.criteria[idx] });
        }
      });
    });

    // Pick 2 random practice quests if available
    const shuffled = uncheckedItems.sort(() => 0.5 - Math.random());
    const selectedPractices = shuffled.slice(0, 2);
    
    selectedPractices.forEach(item => {
      quests.push({
        title: `Utmaning: ${item.pillar}`,
        description: `Etablera praktik för: "${item.item}"`
      });
    });

    setNextQuests(quests.slice(0, 3)); // Max 3 quests
    
    setCelebration({
      title: "Nya Uppdrag!",
      subtitle: "Dina nästa steg har genererats",
      icon: <Sparkles className="w-12 h-12 text-indigo-400" />
    });
    triggerConfetti();
  };

  const achievements: Achievement[] = [
    { 
      id: 'reading_hub', 
      title: 'Läsfrämjande Nav', 
      description: 'Hög nivå av läsfrämjande och kulturverksamhet', 
      icon: <Award className="w-6 h-6" />,
      color: 'text-amber-400'
    },
    { 
      id: 'democracy_hub', 
      title: 'Demokratisk Mötesplats', 
      description: 'Starkt fokus på demokrati och kultur', 
      icon: <ShieldCheck className="w-6 h-6" />,
      color: 'text-indigo-400'
    },
    { 
      id: 'digital_center', 
      title: 'Digitalt Kunskapscenter', 
      description: 'Framstående MIK-verksamhet', 
      icon: <Zap className="w-6 h-6" />,
      color: 'text-emerald-400'
    },
    { 
      id: 'pedagogical_force', 
      title: 'Pedagogisk Kraftsamling', 
      description: 'Hög pedagogisk nivå hos alla roller', 
      icon: <Globe className="w-6 h-6" />,
      color: 'text-violet-400'
    }
  ];

  const kpiDefinitions: KPI[] = [
    {
      id: 'coPlanned',
      label: 'Samplanering',
      unit: '%',
      description: 'Procent av bibliotekariens arbetstid som utgörs av planering och undervisning med ämneslärare.',
      why: 'Visar bibliotekets roll som integrerad del av undervisningen snarare än en isolerad utlåningscentral.',
      icon: <Users className="w-5 h-5" />
    },
    {
      id: 'activeBorrowers',
      label: 'Aktiva låntagare',
      unit: '%',
      description: 'Procentandel av elever som gjort minst ett lån under de senaste 30 dagarna.',
      why: 'Visar hur väl biblioteket lyckas nå alla elever på skolan, inte bara "bokslukarna".',
      icon: <PieChart className="w-5 h-5" />
    },
    {
      id: 'mikSessions',
      label: 'MIK-insatser',
      unit: 'st',
      description: 'Antal schemalagda tillfällen under läsåret där skolbibliotekarien undervisat i enlighet med skolbiblioteksplanen.',
      why: 'Säkerställer att skolans uppdrag inom digital kompetens når alla elever likvärdigt.',
      icon: <Search className="w-5 h-5" />
    },
    {
      id: 'collectionFreshness',
      label: 'Beståndets aktualitet',
      unit: '%',
      description: 'Andel av facklitteraturen utgiven de senaste 5 åren eller utgallringsgrad.',
      why: 'Ett inaktuellt bestånd minskar trovärdigheten. Driver kvalitet framför kvantitet.',
      icon: <TrendingUp className="w-5 h-5" />
    },
    {
      id: 'staffedHours',
      label: 'Bemannad tillgänglighet',
      unit: 'h/elev',
      description: 'Antal timmar/vecka biblioteket är bemannat av fackutbildad personal, dividerat med elevantal.',
      why: 'Synliggör elevernas faktiska tillgång till bibliotekariens kompetens under skoldagen.',
      icon: <Clock className="w-5 h-5" />
    },
    {
      id: 'staffingDensity',
      label: 'Bemanningstäthet',
      unit: 'elev/bibl',
      description: 'Antal elever per bibliotekarie.',
      why: 'Konkretiserar hur mycket tid som finns för pedagogiskt arbete vs enbart utlåning.',
      icon: <BarChart3 className="w-5 h-5" />
    },
    {
      id: 'mediaBudget',
      label: 'Medieanslag',
      unit: 'kr/elev',
      description: 'Budget för inköp av medier utslaget per elev.',
      why: 'Visar de ekonomiska förutsättningarna för att stimulera läslust med ett aktuellt utbud.',
      icon: <Coins className="w-5 h-5" />
    },
    {
      id: 'perceivedValue',
      label: 'Upplevd samverkan',
      unit: '1-5',
      description: 'Resultat från enkäter/intervjuer om bibliotekets bidrag till undervisningen.',
      why: 'Kvalitativa mått som fångar upp hur elever och lärare faktiskt upplever bibliotekets värde.',
      icon: <Star className="w-5 h-5" />
    }
  ];

  const calculateXP = () => {
    const roleXP = (scores.librarian + scores.teacher + scores.principal) * 100;
    const practiceXP = Object.values(practiceStates).flat().filter(Boolean).length * 25;
    return roleXP + practiceXP;
  };

  const currentXP = calculateXP();
  const maxXP = (11 + 8 + 8) * 100 + (4 * 16 * 25);

  const getGlobalLevel = (xp: number) => {
    if (xp >= 3500) return { level: 5, title: "Biblioteksmästare", color: "text-amber-400", bg: "bg-amber-400/20", border: "border-amber-400/50" };
    if (xp >= 2000) return { level: 4, title: "Kunskapsarkitekt", color: "text-emerald-400", bg: "bg-emerald-400/20", border: "border-emerald-400/50" };
    if (xp >= 1000) return { level: 3, title: "Pedagogisk Navigatör", color: "text-indigo-400", bg: "bg-indigo-400/20", border: "border-indigo-400/50" };
    if (xp >= 500) return { level: 2, title: "Läsambassadör", color: "text-violet-400", bg: "bg-violet-400/20", border: "border-violet-400/50" };
    return { level: 1, title: "Bokvaktare", color: "text-slate-400", bg: "bg-slate-400/20", border: "border-slate-400/50" };
  };

  const globalLevel = getGlobalLevel(currentXP);
  const totalProgress = (currentXP / maxXP) * 100;

  const triggerConfetti = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  const handleLevelClick = (role: Role, level: number) => {
    if (level > scores[role]) {
      const roleTitle = getRoleTitle(role);
      setCelebration({
        title: "Nivå Uppnådd!",
        subtitle: `${roleTitle} har nått nivå ${level}`,
        icon: <Star className="w-12 h-12 text-amber-400" />
      });
      triggerConfetti();
    }
    setScores(prev => ({ ...prev, [role]: level }));
  };

  const togglePracticeItem = (pillarId: PillarId, index: number) => {
    setPracticeStates(prev => {
      const newState = [...prev[pillarId]];
      const wasChecked = newState[index];
      newState[index] = !wasChecked;
      
      const newCount = newState.filter(Boolean).length;
      const oldCount = prev[pillarId].filter(Boolean).length;

      if (newCount > oldCount) {
        const milestones = [4, 8, 12, 16];
        if (milestones.includes(newCount)) {
          const pillar = fourPillars.find(p => p.id === pillarId);
          const milestoneTitles: Record<number, string> = {
            4: "Bra start!",
            8: "Halvvägs!",
            12: "Nästan där!",
            16: "Mästarnivå!"
          };
          
          setCelebration({
            title: milestoneTitles[newCount],
            subtitle: `${pillar?.title}: ${newCount}/16 kriterier uppfyllda`,
            icon: <Sparkles className="w-12 h-12 text-emerald-400" />
          });
          triggerConfetti();
        }
      }
      
      return { ...prev, [pillarId]: newState };
    });
  };

  const getPillarProgress = (pillarId: PillarId) => {
    const checkedCount = practiceStates[pillarId].filter(Boolean).length;
    return (checkedCount / 16) * 100;
  };

  const getProgressColor = (progress: number) => {
    if (progress === 100) return '#10b981'; // Emerald Green
    if (progress >= 75) return '#fbbf24'; // Amber/Gold
    if (progress >= 50) return '#8b5cf6'; // Purple
    if (progress >= 25) return '#6366f1'; // Indigo
    return '#3b82f6'; // Blue
  };

  const downloadPDF = async () => {
    if (exportRef.current) {
      const canvas = await html2canvas(exportRef.current, {
        scale: 2,
        backgroundColor: '#f8fafc',
        logging: false,
        useCORS: true
      });
      
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });
      
      pdf.addImage(imgData, 'JPEG', 0, 0, canvas.width, canvas.height);
      pdf.save(`biblioteksresan-${schoolName || 'skola'}.pdf`);
    }
  };

  const getLevelsByRole = (r: Role) => {
    switch (r) {
      case 'librarian': return librarianLevels;
      case 'teacher': return teacherLevels;
      case 'principal': return principalLevels;
    }
  };

  const getRoleTitle = (r: Role) => {
    switch (r) {
      case 'librarian': return 'Bibliotekariens roll';
      case 'teacher': return 'Lärarens samverkan';
      case 'principal': return 'Rektorns ledarskap';
    }
  };

  const getRoleIcon = (r: Role) => {
    switch (r) {
      case 'librarian': return <Library className="w-6 h-6" />;
      case 'teacher': return <Users className="w-6 h-6" />;
      case 'principal': return <GraduationCap className="w-6 h-6" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0f111a] text-slate-100 font-sans pb-20 selection:bg-indigo-500/30">
      {/* Celebration Modal */}
      <AnimatePresence>
        {celebration && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.5, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.5, opacity: 0, y: 20 }}
              className="bg-[#1c2237] border border-white/10 p-10 rounded-[3rem] max-w-sm w-full text-center relative shadow-[0_0_50px_rgba(99,102,241,0.3)]"
            >
              <button 
                onClick={() => setCelebration(null)}
                className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="flex justify-center mb-6">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 10, 0], scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
                >
                  {celebration.icon}
                </motion.div>
              </div>
              
              <h2 className="text-3xl font-black text-white mb-2 uppercase italic tracking-tight">
                {celebration.title}
              </h2>
              <p className="text-slate-400 font-medium mb-8">
                {celebration.subtitle}
              </p>
              
              <button
                onClick={() => setCelebration(null)}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black py-4 rounded-2xl uppercase tracking-[0.2em] text-xs shadow-lg shadow-indigo-600/20 transition-all active:scale-95"
              >
                Fortsätt resan
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="bg-[#161b2b]/80 backdrop-blur-md border-b border-white/5 py-4 px-4 sticky top-0 z-30 shadow-2xl">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <motion.div 
              whileHover={{ rotate: 5 }}
              className="bg-gradient-to-br from-indigo-600 to-violet-700 p-2.5 rounded-xl text-white shadow-lg shadow-indigo-500/20"
            >
              <BookOpen className="w-8 h-8" />
            </motion.div>
            <div>
              <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-2">
                Bibblan - the game
              </h1>
              <div className="flex items-center gap-2 mt-0.5">
                <div className={cn("text-xs font-black uppercase tracking-widest", globalLevel.color)}>
                  {globalLevel.title}
                </div>
                <div className="w-1 h-1 rounded-full bg-slate-600" />
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Level {globalLevel.level}</div>
              </div>
            </div>
          </div>

          <div className="flex-1 max-w-md">
            <div className="flex items-center justify-between mb-1.5 px-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total XP: {currentXP}</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{Math.round((currentXP / maxXP) * 100)}% mot nästa nivå</span>
            </div>
            <div className="h-2.5 bg-white/5 rounded-full overflow-hidden border border-white/5 p-0.5">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ 
                  width: `${(currentXP / maxXP) * 100}%`,
                  backgroundColor: getProgressColor((currentXP / maxXP) * 100)
                }}
                className="h-full rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-indigo-400 ml-1">Skolans namn</label>
            <input 
              type="text" 
              placeholder="Skriv skolans namn här..." 
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
              className="bg-indigo-500/10 border-2 border-indigo-500/30 rounded-xl px-4 py-2 text-sm focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none w-full md:w-64 text-white placeholder:text-slate-600 transition-all shadow-lg shadow-indigo-500/5"
            />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Journey Map Overview */}
        {!role && !activePillar ? (
          <div className="space-y-20">
            {/* Library Garden - Visual Growth */}
            <section className="relative bg-[#1c2237] rounded-[3rem] p-12 border border-white/5 overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-32 -mt-32" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -ml-32 -mb-32" />
              
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1 text-center md:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-4">
                    <Sparkles className="w-3 h-3" /> Biblioteksträdgården
                  </div>
                  <h2 className="text-4xl font-black text-white mb-4 tracking-tight uppercase italic">
                    Se er verksamhet <span className="text-emerald-400">blomstra</span>
                  </h2>
                  <p className="text-slate-400 font-medium max-w-md leading-relaxed mb-8">
                    Ju fler framsteg ni gör i kartläggningen, desto mer växer ert kunskapsträd. Varje löv representerar en insats för elevernas lärande.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                      <div className="text-[10px] font-black uppercase text-slate-500 mb-1">Tillväxt</div>
                      <div className="text-2xl font-black text-white">{Math.round(totalProgress)}%</div>
                    </div>
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                      <div className="text-[10px] font-black uppercase text-slate-500 mb-1">Status</div>
                      <div className={cn("text-xs font-black uppercase", globalLevel.color)}>{globalLevel.title}</div>
                    </div>
                  </div>
                </div>

                <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
                  <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                    {/* Trunk */}
                    <motion.path
                      d="M100 180 L100 140 Q100 120 110 110"
                      stroke="#4b3621"
                      strokeWidth="8"
                      fill="none"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                    />
                    <motion.path
                      d="M100 160 Q90 140 85 120"
                      stroke="#4b3621"
                      strokeWidth="6"
                      fill="none"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                    />
                    
                    {/* Branches & Leaves based on progress */}
                    {[...Array(20)].map((_, i) => {
                      const angle = (i / 20) * Math.PI * 2;
                      const distance = 40 + (totalProgress / 100) * 40;
                      const x = 100 + Math.cos(angle) * distance;
                      const y = 100 + Math.sin(angle) * distance;
                      const scale = i < (totalProgress / 5) ? 1 : 0;
                      
                      return (
                        <motion.g key={i} animate={{ scale }} transition={{ delay: i * 0.05 }}>
                          <circle cx={x} cy={y} r="6" fill={i % 3 === 0 ? "#10b981" : i % 3 === 1 ? "#34d399" : "#059669"} opacity="0.8" />
                          {totalProgress > 80 && i % 5 === 0 && (
                            <circle cx={x} cy={y} r="3" fill="#fbbf24" />
                          )}
                        </motion.g>
                      );
                    })}
                    
                    {/* Core Glow */}
                    <circle cx="100" cy="120" r="30" fill="url(#treeGradient)" opacity="0.3" />
                    <defs>
                      <radialGradient id="treeGradient">
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="100%" stopColor="transparent" />
                      </radialGradient>
                    </defs>
                  </svg>
                  
                  {/* Floating particles */}
                  <AnimatePresence>
                    {totalProgress > 10 && [...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-emerald-400 rounded-full"
                        animate={{
                          y: [-20, -100],
                          x: [Math.random() * 40 - 20, Math.random() * 100 - 50],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 2 + Math.random() * 2,
                          repeat: Infinity,
                          delay: Math.random() * 5,
                        }}
                        style={{ bottom: '20%', left: '50%' }}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </section>

            {/* Role Quest Lines */}
            <section>
              <div className="flex items-center gap-3 mb-10">
                <div className="bg-indigo-500/10 p-2 rounded-lg text-indigo-400 border border-indigo-500/20">
                  <Users className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-black tracking-tight text-white uppercase italic">Rollernas Uppdrag</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {(['librarian', 'teacher', 'principal'] as Role[]).map((r) => {
                  const progress = (scores[r] / (r === 'librarian' ? 11 : 8)) * 100;
                  return (
                    <motion.button
                      key={r}
                      whileHover={{ y: -8, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setRole(r)}
                      className="group relative bg-[#1c2237] p-8 rounded-[2rem] border border-white/5 flex flex-col items-center text-center gap-6 transition-all hover:bg-[#232a45] hover:border-indigo-500/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
                    >
                      <div className="absolute top-4 right-4">
                        <div className="text-[10px] font-black bg-white/5 px-2 py-1 rounded-md text-slate-500 uppercase tracking-widest">Quest</div>
                      </div>
                      
                      <div className="bg-gradient-to-br from-indigo-500/20 to-violet-500/20 p-5 rounded-2xl text-indigo-400 border border-indigo-500/20 group-hover:scale-110 transition-transform">
                        {getRoleIcon(r)}
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-black text-white mb-2">{getRoleTitle(r)}</h3>
                        <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Loertschers taxonomi</p>
                      </div>

                      <div className="w-full space-y-2">
                        <div className="flex justify-between text-[10px] font-black uppercase text-slate-500">
                          <span>Nivå {scores[r]}</span>
                          <span>{Math.round(progress)}%</span>
                        </div>
                        <div className="h-2 bg-black/40 rounded-full overflow-hidden p-0.5">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            className="h-full bg-indigo-500 rounded-full"
                          />
                        </div>
                      </div>

                      <div className="mt-2 flex items-center text-indigo-400 font-black text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                        Fortsätt resan <ChevronRight className="w-4 h-4 ml-1" />
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </section>

            {/* Nyckeltal - Verksamhetsdata */}
            <section className="bg-[#161b2b] rounded-[3rem] p-12 border border-white/5 shadow-2xl">
              <div className="flex items-center gap-3 mb-10">
                <div className="bg-emerald-500/10 p-2 rounded-lg text-emerald-400 border border-emerald-500/20">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-black tracking-tight text-white uppercase italic">Verksamhetsmätning</h2>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Från passivt bokrum till aktivt Learning Commons</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {kpiDefinitions.map((kpi) => (
                  <div key={kpi.id} className="bg-[#1c2237] p-6 rounded-3xl border border-white/5 flex flex-col gap-4 group hover:border-emerald-500/30 transition-all">
                    <div className="flex items-center justify-between">
                      <div className="bg-emerald-500/10 p-3 rounded-xl text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                        {kpi.icon}
                      </div>
                      <div className="flex items-center gap-1">
                        <input 
                          type="text"
                          value={kpiValues[kpi.id]}
                          onChange={(e) => setKpiValues(prev => ({ ...prev, [kpi.id]: e.target.value }))}
                          placeholder="0"
                          className="w-16 bg-black/20 border border-white/10 rounded-lg px-2 py-1 text-right text-sm font-black text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                        />
                        <span className="text-[10px] font-black text-slate-500 uppercase">{kpi.unit}</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-white mb-1">{kpi.label}</h4>
                      <p className="text-[10px] text-slate-500 font-medium leading-tight mb-3">{kpi.description}</p>
                      <div className="p-3 bg-black/20 rounded-xl border border-white/5">
                        <div className="text-[8px] font-black uppercase text-emerald-500 mb-1">Varför det är viktigt:</div>
                        <p className="text-[9px] text-slate-400 leading-relaxed italic">{kpi.why}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Practice Skill Trees */}
            <section>
              <div className="flex items-center gap-3 mb-10">
                <div className="bg-emerald-500/10 p-2 rounded-lg text-emerald-400 border border-emerald-500/20">
                  <Trophy className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-black tracking-tight text-white uppercase italic">Praktikens Färdighetsträd</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {fourPillars.map((pillar) => {
                  const progress = getPillarProgress(pillar.id as PillarId);
                  return (
                    <motion.div 
                      key={pillar.id}
                      whileHover={{ y: -5 }}
                      onClick={() => setActivePillar(pillar.id as PillarId)}
                      className={cn(
                        "p-6 rounded-3xl border cursor-pointer transition-all flex flex-col gap-6 group relative overflow-hidden",
                        progress > 0
                          ? "bg-[#1c2237] border-white/10" 
                          : "bg-[#161b2b] border-white/5 hover:border-white/20"
                      )}
                    >
                      {progress === 100 && (
                        <div className="absolute -top-2 -right-2 bg-amber-400 p-3 rounded-bl-2xl shadow-lg rotate-12">
                          <Trophy className="w-4 h-4 text-amber-900" />
                        </div>
                      )}

                      <div className={cn(
                        "w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-500 group-hover:rotate-6",
                        progress > 0 ? "" : "bg-white/5 text-slate-600"
                      )} style={{ 
                        backgroundColor: progress > 0 ? getProgressColor(progress) : undefined, 
                        color: progress > 0 ? 'white' : undefined,
                        boxShadow: progress > 0 ? `0 10px 20px ${getProgressColor(progress)}33` : 'none'
                      }}>
                        {progress === 100 ? <CheckCircle2 className="w-7 h-7" /> : <ChevronRight className="w-7 h-7" />}
                      </div>

                      <div className="flex-1">
                        <h4 className={cn(
                          "font-black text-lg mb-4 leading-tight",
                          progress > 0 ? "text-white" : "text-slate-500"
                        )}>
                          {pillar.title}
                        </h4>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-[10px] font-black uppercase text-slate-500">
                            <span>Framsteg</span>
                            <span>{Math.round(progress)}%</span>
                          </div>
                          <div className="h-2 bg-black/40 rounded-full overflow-hidden p-0.5">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ 
                                width: `${progress}%`,
                                backgroundColor: getProgressColor(progress),
                                boxShadow: progress === 100 ? '0 0 10px rgba(16, 185, 129, 0.5)' : 'none'
                              }}
                              transition={{ duration: 0.5, ease: "easeOut" }}
                              className="h-full rounded-full"
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </section>
          </div>
        ) : role ? (
          <div className="space-y-8">
            <button 
              onClick={() => setRole(null)}
              className="flex items-center text-xs font-black uppercase tracking-widest text-slate-500 hover:text-indigo-400 transition-colors"
            >
              <ChevronLeft className="w-4 h-4 mr-1" /> Tillbaka till kartan
            </button>

            <div className="bg-[#1c2237] rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/5">
              <div className="bg-gradient-to-r from-indigo-600 to-violet-700 p-10 text-white relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl" />
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-md border border-white/10">
                      {getRoleIcon(role)}
                    </div>
                    <h2 className="text-3xl font-black uppercase italic tracking-tight">{getRoleTitle(role)}</h2>
                  </div>
                  <p className="text-indigo-100 font-medium max-w-2xl">Välj den nivå som bäst beskriver er nuvarande verksamhet för att låsa upp nästa steg i resan.</p>
                </div>
              </div>

              <div className="p-6 md:p-10">
                <div className="space-y-4">
                  {getLevelsByRole(role).map((item) => {
                    const isAchieved = scores[role] >= item.level;
                    const isSelected = scores[role] === item.level;
                    
                    return (
                      <motion.div
                        key={item.level}
                        initial={false}
                        animate={{
                          backgroundColor: isAchieved ? '#232a45' : '#161b2b',
                          borderColor: isSelected ? '#6366f1' : isAchieved ? '#312e81' : '#1e293b',
                          scale: isSelected ? 1.01 : 1
                        }}
                        transition={{ 
                          delay: isAchieved ? item.level * 0.02 : 0,
                          duration: 0.2
                        }}
                        onClick={() => handleLevelClick(role, item.level)}
                        className={cn(
                          "p-6 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-6 group relative overflow-hidden",
                          isSelected ? "shadow-[0_0_30px_rgba(99,102,241,0.2)]" : "hover:border-white/10"
                        )}
                      >
                        {isAchieved && !isSelected && (
                          <div className="absolute inset-0 bg-indigo-500/5 pointer-events-none" />
                        )}
                        
                        <div className={cn(
                          "w-12 h-12 rounded-xl flex items-center justify-center font-black text-xl shrink-0 transition-all duration-500",
                          isAchieved ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30" : "bg-white/5 text-slate-600 group-hover:bg-white/10"
                        )}>
                          {item.level}
                        </div>
                        <div className="flex-1">
                          <h4 className={cn(
                            "font-black text-xl mb-1.5 transition-colors duration-300",
                            isAchieved ? "text-white" : "text-slate-500"
                          )}>
                            {item.title}
                          </h4>
                          <p className="text-sm text-slate-400 leading-relaxed font-medium">{item.description}</p>
                        </div>
                        {isAchieved && (
                          <motion.div
                            initial={{ scale: 0, rotate: -45 }}
                            animate={{ scale: 1, rotate: 0 }}
                            className="bg-indigo-500/20 p-2 rounded-full border border-indigo-500/30"
                          >
                            <CheckCircle2 className="w-6 h-6 text-indigo-400 shrink-0" />
                          </motion.div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ) : activePillar ? (
          <div className="space-y-8">
            <button 
              onClick={() => setActivePillar(null)}
              className="flex items-center text-xs font-black uppercase tracking-widest text-slate-500 hover:text-emerald-400 transition-colors"
            >
              <ChevronLeft className="w-4 h-4 mr-1" /> Tillbaka till kartan
            </button>

            {(() => {
              const pillar = fourPillars.find(p => p.id === activePillar)!;
              const progress = getPillarProgress(activePillar);
              const pColor = getProgressColor(progress);
              
              return (
                <div className="bg-[#1c2237] rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/5">
                  <div className="p-10 text-white relative" style={{ backgroundColor: pColor }}>
                    <div className="absolute inset-0 bg-black/10" />
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                      <div>
                        <h2 className="text-3xl font-black uppercase italic tracking-tight mb-2">{pillar.title}</h2>
                        <p className="text-white/80 font-medium max-w-xl">{pillar.question}</p>
                      </div>
                      <div className="flex flex-col items-end gap-3">
                        <div className="w-64 h-5 bg-black/30 rounded-full relative overflow-hidden border border-white/10 p-1">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            className="h-full bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                          />
                          <div className="absolute inset-0 flex justify-evenly pointer-events-none">
                            <div className="w-px h-full bg-white/10" />
                            <div className="w-px h-full bg-white/10" />
                            <div className="w-px h-full bg-white/10" />
                          </div>
                        </div>
                        <div className="text-[10px] uppercase tracking-[0.2em] font-black text-white/60">Färdighetsnivå: {Math.round(progress)}%</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 md:p-10 bg-[#161b2b]">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {pillar.criteria?.map((text, idx) => {
                        const isChecked = practiceStates[activePillar][idx];
                        return (
                          <motion.div
                            key={idx}
                            whileTap={{ scale: 0.9 }}
                            whileHover={{ scale: 1.05, y: -5 }}
                            animate={{ 
                              scale: isChecked ? [1, 1.1, 1] : 1,
                              backgroundColor: isChecked ? '#4f46e5' : '#1c2237',
                              borderColor: isChecked ? '#818cf8' : 'rgba(255,255,255,0.05)'
                            }}
                            transition={{ 
                              type: "spring", 
                              stiffness: 400, 
                              damping: 17,
                              backgroundColor: { duration: 0.2 }
                            }}
                            onClick={() => togglePracticeItem(activePillar, idx)}
                            className={cn(
                              "aspect-square p-5 rounded-3xl border-2 flex items-center justify-center text-center text-xs md:text-sm font-black cursor-pointer transition-all shadow-lg",
                              isChecked
                                ? "text-white shadow-[0_10px_20px_rgba(79,70,229,0.3)]"
                                : "text-slate-500 hover:text-slate-300"
                            )}
                          >
                            {text}
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        ) : null}

        {/* Summary / Export Area */}
        {!role && !activePillar && (
          <section className="mt-32">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-amber-500/10 p-2 rounded-lg text-amber-400 border border-amber-500/20">
                  <Trophy className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-black tracking-tight text-white uppercase italic">Skolbibliotekets Nuläge</h2>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={generateNextQuests}
                  className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl px-6 py-3 text-xs font-black uppercase tracking-widest transition-all active:scale-95"
                >
                  <Sparkles className="w-4 h-4 text-indigo-400" /> Generera Nästa Uppdrag
                </button>
                <button 
                  onClick={downloadPDF}
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl px-8 py-3 text-xs font-black uppercase tracking-widest shadow-lg shadow-indigo-600/20 transition-all active:scale-95"
                >
                  <Download className="w-4 h-4" /> Exportera PDF
                </button>
              </div>
            </div>

            <div 
              ref={exportRef}
              className="bg-[#1c2237] p-12 rounded-[3rem] shadow-2xl border border-white/5 relative overflow-hidden"
              style={{ backgroundColor: '#1c2237', color: '#f8fafc' }}
            >
              {/* Background Decorative Elements */}
              <div className="absolute top-0 right-0 w-96 h-96 rounded-full -mr-48 -mt-48 opacity-10 blur-3xl" style={{ backgroundColor: '#6366f1' }} />
              <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full -ml-48 -mb-48 opacity-10 blur-3xl" style={{ backgroundColor: '#10b981' }} />

              <div className="relative z-10">
                <div className="text-center mb-16">
                  <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-[0.3em] mb-4">
                    Slutrapport
                  </div>
                  <h3 className="text-5xl font-black mb-4 tracking-tighter" style={{ color: '#ffffff' }}>
                    {schoolName || 'Skolans namn - fyll i högst upp'}
                  </h3>
                  <div className="flex items-center justify-center gap-4">
                    <div className={cn("text-lg font-black uppercase tracking-widest", globalLevel.color)}>
                      {globalLevel.title}
                    </div>
                    <div className="w-2 h-2 rounded-full bg-slate-700" />
                    <div className="text-lg font-black text-slate-400 uppercase tracking-widest">Level {globalLevel.level}</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                  {(['librarian', 'teacher', 'principal'] as Role[]).map((r) => {
                    const maxLevel = r === 'librarian' ? 11 : 8;
                    const isMax = scores[r] === maxLevel;
                    return (
                      <div key={r} className="p-8 rounded-[2.5rem] border text-center relative overflow-hidden" style={{ backgroundColor: '#161b2b', borderColor: '#1e293b' }}>
                        {isMax && (
                          <div className="absolute top-0 right-0 bg-amber-400 text-amber-900 p-3 rounded-bl-2xl shadow-lg">
                            <Trophy className="w-5 h-5" />
                          </div>
                        )}
                        <div className="mb-4 flex justify-center" style={{ color: '#6366f1' }}>{getRoleIcon(r)}</div>
                        <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-3" style={{ color: '#94a3b8' }}>{getRoleTitle(r)}</h4>
                        <div className="text-5xl font-black mb-6" style={{ color: '#ffffff' }}>{scores[r]}<span className="text-xl text-slate-600 ml-1">/{maxLevel}</span></div>
                        <div className="h-3 bg-black/40 rounded-full overflow-hidden p-1">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ 
                              width: `${(scores[r] / maxLevel) * 100}%`,
                              backgroundColor: getProgressColor((scores[r] / maxLevel) * 100)
                            }}
                            className="h-full rounded-full"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="border-t border-white/5 pt-12">
                  <h4 className="text-center text-xs font-black uppercase tracking-[0.3em] mb-10" style={{ color: '#64748b' }}>Färdighetsträd (Framsteg)</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
                    {fourPillars.map((p) => {
                      const progress = getPillarProgress(p.id as PillarId);
                      return (
                        <div key={p.id} className="text-center">
                          <div 
                            className="w-full h-4 bg-black/40 rounded-full overflow-hidden mb-4 p-1"
                            style={{ opacity: progress > 0 ? 1 : 0.3 }}
                          >
                            <div 
                              className="h-full rounded-full" 
                              style={{ 
                                width: `${progress}%`,
                                backgroundColor: getProgressColor(progress)
                              }}
                            />
                          </div>
                          <div className="flex items-center justify-center gap-2">
                            <div className="text-[10px] font-black uppercase tracking-wider" style={{ color: '#94a3b8' }}>{p.title}</div>
                            {progress === 100 && <Trophy className="w-3 h-3 text-amber-500" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Nyckeltal i rapporten */}
                  <div className="border-t border-white/5 pt-12 mt-12">
                    <h4 className="text-center text-xs font-black uppercase tracking-[0.3em] mb-10" style={{ color: '#64748b' }}>Verksamhetsdata (Nyckeltal)</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      {kpiDefinitions.map(kpi => (
                        <div key={kpi.id} className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                          <div className="text-[8px] font-black uppercase text-slate-500 mb-1">{kpi.label}</div>
                          <div className="text-xl font-black text-white">
                            {kpiValues[kpi.id] || '0'}
                            <span className="text-[10px] ml-1 text-slate-500">{kpi.unit}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {unlockedAchievements.length > 0 && (
                    <div className="border-t border-white/5 pt-12">
                      <h4 className="text-center text-xs font-black uppercase tracking-[0.3em] mb-10" style={{ color: '#64748b' }}>Erhållna Titlar & Certifieringar</h4>
                      <div className="flex flex-wrap justify-center gap-8">
                        {unlockedAchievements.map(id => {
                          const ach = achievements.find(a => a.id === id);
                          if (!ach) return null;
                          return (
                            <div key={id} className="relative group">
                              <div className="absolute inset-0 bg-white/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                              <div className="relative flex flex-col items-center gap-3 p-6 rounded-full border-2 border-dashed w-48 h-48 justify-center text-center transition-transform hover:scale-105" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                                <div className={cn("p-2 rounded-full bg-white/5 mb-1", ach.color)}>
                                  {ach.icon}
                                </div>
                                <div className="text-[11px] font-black uppercase tracking-tighter text-white leading-tight px-2">{ach.title}</div>
                                <div className="w-8 h-px bg-white/10 my-1" />
                                <div className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Verifierad</div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {nextQuests.length > 0 && (
                    <div className="border-t border-white/5 pt-12 mt-12">
                      <h4 className="text-center text-xs font-black uppercase tracking-[0.3em] mb-10" style={{ color: '#64748b' }}>Dina Nästa Uppdrag</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {nextQuests.map((q, i) => (
                          <div key={i} className="p-6 rounded-[2rem] bg-indigo-500/5 border border-indigo-500/10 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                              <Sparkles className="w-12 h-12 text-indigo-400" />
                            </div>
                            <h5 className="text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-2">{q.title}</h5>
                            <p className="text-xs font-bold text-white leading-relaxed">{q.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-20 text-center">
                  <div className="inline-flex items-center gap-3 bg-white/5 px-6 py-3 rounded-2xl border border-white/5 text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: '#64748b' }}>
                    <Info className="w-4 h-4" /> Baserat på David Loertschers taxonomier för skolbibliotek
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer Info */}
      <footer className="max-w-6xl mx-auto px-4 py-16 text-center border-t border-white/5 mt-20">
        <p className="text-slate-600 text-xs font-black uppercase tracking-[0.3em]">
          Ett verktyg för att visualisera och utveckla skolbibliotekets pedagogiska roll.
        </p>
      </footer>
    </div>
  );
}
