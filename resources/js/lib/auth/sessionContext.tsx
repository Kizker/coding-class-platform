"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";

export type UserRole = "student" | "tutor" | "parent";

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  initials: string;
  email: string;
  roleLabel: string;
  subtitle: string;
}

export interface StudentProgress {
  currentWeek: number;
  totalWeeks: number;
  completedAssignments: number;
  totalAssignments: number;
  streakDays: number;
  xpPoints: number;
  badges: Array<{ id: string; code: string; name: string; unlockedAt: string }>;
  weeklyNote: string;
  attendanceCount: number;
  totalSessions: number;
  completedTasks: Record<string, boolean>; // e.g. "4-senin": true
}

export interface LiveSessionSyncData {
  currentStep: number; // 1: Tantangan Awal, 2: Pembelajaran Interaktif, 3: Kuis Logika (10 Soal), 4: Refleksi & Penuntasan
  subStep: number;
  tutorStepTitle: string;
  pushedCode: string | null;
  tutorNote: string;
  studentLiveCode: string;
  studentExecutionOutput: string;
  studentOutputSuccess: boolean | null;
  studentQuizAnswers: Record<number, number>;
  studentQuizScore: number;
  quizSubmitted: boolean;
  quizScores?: Record<number, boolean>;
  quizTotalAnswered?: number;
  quizCorrectCount?: number;
  helpRequested: boolean;
  sessionCompleted: boolean;
  lastUpdated: number;
}

export function sanitizeCodeString(raw: string): string {
  if (!raw) return "";
  if (raw.includes("\\n") || raw.includes('\\"')) {
    return raw
      .replace(/\\r\\n/g, "\n")
      .replace(/\\n/g, "\n")
      .replace(/\\t/g, "\t")
      .replace(/\\"/g, '"');
  }
  return raw;
}

export const DEFAULT_STUDENT_CODE = `# Tantangan Awal Pekan 1: Buat Kartu Pelajar Digital
nama = "Andi Pratama"
hobi = "Koding Python"
cita_cita = "Game Developer"

# Lengkapi dan cetak kartumu di bawah:
print("===============================")
print("     KARTU IDENTITAS KODING    ")
print("===============================")
print(f"Nama       : {nama}")
print(f"Hobi       : {hobi}")
print(f"Cita-cita  : {cita_cita}")
print("===============================")
`;

export const DEFAULT_LIVE_SYNC: LiveSessionSyncData = {
  currentStep: 1,
  subStep: 1,
  tutorStepTitle: "Tahap 1: Tantangan Uji Coba Awal",
  pushedCode: null,
  tutorNote: "Silakan coba selesaikan tantangan awal di bawah. Mentor memantau caramu berpikir dan menulis kode.",
  studentLiveCode: DEFAULT_STUDENT_CODE,
  studentExecutionOutput: "",
  studentOutputSuccess: null,
  studentQuizAnswers: {},
  studentQuizScore: 0,
  quizSubmitted: false,
  helpRequested: false,
  sessionCompleted: false,
  lastUpdated: Date.now(),
};

export interface RoleCredentials {
  email: string;
  secret: string; // PIN or Password
  label: string;
  description: string;
}

export const ROLE_ACCOUNTS: Record<UserRole, RoleCredentials> = {
  student: {
    email: "andi.pratama@student.id",
    secret: "123456",
    label: "Akun Siswa (Andi Pratama)",
    description: "Akses Split-Screen Studio, Monaco Editor, PR Harian, dan Proyek Capstone.",
  },
  tutor: {
    email: "andri@codingclass.id",
    secret: "tutor123",
    label: "Akun Pengajar (Andricha Dea Mitra)",
    description: "Akses Flight Deck Mengajar 2 Jam, Push Code Realtime, dan Meja Penilaian Kualitatif.",
  },
  parent: {
    email: "bambang.p@parent.id",
    secret: "987654",
    label: "Akun Wali Murid (Bambang Pratama)",
    description: "Akses Executive Briefing Pemantauan Belajar, Log Kehadiran, dan Galeri Portofolio Anak.",
  },
};

interface SessionContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  currentUser: UserProfile;
  isAuthenticated: boolean;
  login: (role: UserRole, email?: string, secret?: string) => { success: boolean; message: string };
  logout: () => void;
  progress: StudentProgress;
  updateProgress: (partial: Partial<StudentProgress>) => void;
  isTaskCompleted: (week: number, day: string) => boolean;
  setTaskCompleted: (week: number, day: string, completed: boolean) => void;
  toggleTaskCompleted: (week: number, day: string) => void;
  pushedCode: string | null;
  pushCodeToStudent: (code: string) => void;
  studentLiveCode: string;
  updateStudentLiveCode: (code: string) => void;
  isMounted: boolean;
  liveSync: LiveSessionSyncData;
  updateLiveSync: (partial: Partial<LiveSessionSyncData>) => Promise<void>;
  tutorAdvanceStep: (step: number, subStep?: number, title?: string, note?: string) => Promise<void>;
  isDevelopmentUnlocked: boolean;
}

export const USERS: Record<UserRole, UserProfile> = {
  student: {
    id: "user-student-1",
    name: "Andi Pratama",
    role: "student",
    initials: "AP",
    email: "andi.pratama@student.id",
    roleLabel: "SISWA PRIVATE",
    subtitle: "Python Track (Pekan 01)",
  },
  tutor: {
    id: "user-tutor-1",
    name: "Andricha Dea Mitra",
    role: "tutor",
    initials: "AM",
    email: "andri@codingclass.id",
    roleLabel: "LEAD TUTOR",
    subtitle: "Senior Systems Architect & Private Mentor",
  },
  parent: {
    id: "user-parent-1",
    name: "Bambang Pratama",
    role: "parent",
    initials: "BP",
    email: "bambang.p@parent.id",
    roleLabel: "WALI MURID",
    subtitle: "Pemantauan Eksekutif Andi Pratama",
  },
};

const DEFAULT_PROGRESS: StudentProgress = {
  currentWeek: 1,
  totalWeeks: 12,
  completedAssignments: 3,
  totalAssignments: 48,
  streakDays: 3,
  xpPoints: 65,
  badges: [
    { id: "b1", code: "CORE-01", name: "Fondasi Sintaks & IPO", unlockedAt: "Pekan 1" },
  ],
  weeklyNote: "Andi menunjukkan antusiasme yang sangat baik di pekan pertama. Pemahaman terhadap print() dan konsep kotak memori (variabel) terbangun dengan cepat.",
  attendanceCount: 0,
  totalSessions: 24,
  completedTasks: {
    // Week 1 (Aktif Saat Ini)
    "1-senin": true,  // Selesai (20/20) -> HIJAU
    "1-selasa": true, // Selesai (20/20) -> HIJAU
    "1-rabu": true,   // Selesai (25/25) -> HIJAU
    "1-kamis": false, // Belum dikerjakan -> MERAH (Terlewat)
    "1-jumat": false, // Live tatap muka hari ini -> BIRU / AKTIF
    "1-sabtu": false, // Live pertemuan 2 besok -> NETRAL / MENDATANG
    "1-minggu": false,
  },
};

const SessionContext = createContext<SessionContextType | null>(null);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = useState<UserRole>("student");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [progress, setProgress] = useState<StudentProgress>(DEFAULT_PROGRESS);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [pushedCode, setPushedCode] = useState<string | null>(null);
  const [studentLiveCode, setStudentLiveCode] = useState<string>(DEFAULT_STUDENT_CODE);

  useEffect(() => {
    setIsMounted(true);
    const savedRole = localStorage.getItem("auth_role") as UserRole | null;
    const savedAuth = localStorage.getItem("auth_status");
    const savedProgress = localStorage.getItem("student_progress");

    if (savedRole && (savedRole === "student" || savedRole === "tutor" || savedRole === "parent")) {
      setRoleState(savedRole);
    }
    if (savedAuth !== null) {
      setIsAuthenticated(savedAuth === "true");
    }
    if (savedProgress) {
      try {
        const parsed = JSON.parse(savedProgress);
        // If savedProgress is an old test state (e.g. week 4), reset to week 1 baseline
        if (parsed.currentWeek && parsed.currentWeek > 1) {
          localStorage.removeItem("student_progress");
        } else {
          setProgress((prev) => ({ ...prev, ...parsed }));
        }
      } catch {}
    }
  }, []);

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    localStorage.setItem("auth_role", newRole);
  };

  const login = (targetRole: UserRole, email?: string, secret?: string) => {
    const account = ROLE_ACCOUNTS[targetRole];
    // Allow demo quick-fill or credential check
    if (
      !email ||
      !secret ||
      (email.trim().toLowerCase() === account.email.toLowerCase() && secret.trim() === account.secret)
    ) {
      setRoleState(targetRole);
      setIsAuthenticated(true);
      localStorage.setItem("auth_role", targetRole);
      localStorage.setItem("auth_status", "true");
      return { success: true, message: "Autentikasi berhasil" };
    }

    return {
      success: false,
      message: `Kredensial tidak valid untuk ${account.label}. Gunakan email ${account.email} dan kata sandi/PIN yang sesuai.`,
    };
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.setItem("auth_status", "false");
  };

  const updateProgress = (partial: Partial<StudentProgress>) => {
    setProgress((prev) => {
      const updated = { ...prev, ...partial };
      localStorage.setItem("student_progress", JSON.stringify(updated));
      return updated;
    });
  };

  const isTaskCompleted = (week: number, day: string): boolean => {
    const key = `${week}-${day.toLowerCase()}`;
    return Boolean(progress.completedTasks && progress.completedTasks[key]);
  };

  const setTaskCompleted = (week: number, day: string, completed: boolean) => {
    const key = `${week}-${day.toLowerCase()}`;
    setProgress((prev) => {
      const updatedTasks = { ...prev.completedTasks, [key]: completed };
      const updated = { ...prev, completedTasks: updatedTasks };
      localStorage.setItem("student_progress", JSON.stringify(updated));
      return updated;
    });
  };

  const toggleTaskCompleted = (week: number, day: string) => {
    const key = `${week}-${day.toLowerCase()}`;
    setProgress((prev) => {
      const current = Boolean(prev.completedTasks && prev.completedTasks[key]);
      const updatedTasks = { ...prev.completedTasks, [key]: !current };
      const updated = { ...prev, completedTasks: updatedTasks };
      localStorage.setItem("student_progress", JSON.stringify(updated));
      return updated;
    });
  };

  const [liveSync, setLiveSync] = useState<LiveSessionSyncData>(DEFAULT_LIVE_SYNC);
  const lastUpdatedRef = useRef<number>(0);
  const lastPushedRef = useRef<string | null>(null);

  // Cross-window realtime synchronization polling
  useEffect(() => {
    let isCancelled = false;

    const fetchSync = async () => {
      try {
        const res = await fetch("/api/v1/sync/live-session", { cache: "no-store" });
        if (res.ok && !isCancelled) {
          const json = await res.json();
          if (json.success && json.data) {
            if (json.data.lastUpdated !== lastUpdatedRef.current) {
              lastUpdatedRef.current = json.data.lastUpdated;
              setLiveSync(json.data);

              if (json.data.pushedCode && json.data.pushedCode !== lastPushedRef.current) {
                const sanitized = sanitizeCodeString(json.data.pushedCode);
                lastPushedRef.current = json.data.pushedCode;
                setPushedCode(sanitized);
              }

              if (json.data.studentLiveCode && role === "tutor") {
                setStudentLiveCode(sanitizeCodeString(json.data.studentLiveCode));
              }
            }
          }
        }
      } catch {}
    };

    fetchSync();
    const interval = setInterval(fetchSync, 1200);
    return () => {
      isCancelled = true;
      clearInterval(interval);
    };
  }, [role]);

  const updateLiveSync = useCallback(async (partial: Partial<LiveSessionSyncData>) => {
    setLiveSync((prev) => ({ ...prev, ...partial }));
    try {
      await fetch("/api/v1/sync/live-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(partial),
      });
    } catch {}
  }, []);

  const tutorAdvanceStep = useCallback(
    async (step: number, subStep = 1, title = "", note = "") => {
      await updateLiveSync({
        currentStep: step,
        subStep,
        tutorStepTitle: title,
        tutorNote: note,
      });
    },
    [updateLiveSync]
  );

  const pushCodeToStudent = useCallback(
    (code: string) => {
      setPushedCode(code);
      lastPushedRef.current = code;
      setStudentLiveCode(code);
      updateLiveSync({ pushedCode: code, studentLiveCode: code });
    },
    [updateLiveSync]
  );

  const updateStudentLiveCode = useCallback(
    (code: string) => {
      setStudentLiveCode(code);
      updateLiveSync({ studentLiveCode: code });
    },
    [updateLiveSync]
  );

  return (
    <SessionContext.Provider
      value={{
        role,
        setRole,
        currentUser: USERS[role],
        isAuthenticated,
        login,
        logout,
        progress,
        updateProgress,
        isTaskCompleted,
        setTaskCompleted,
        toggleTaskCompleted,
        pushedCode,
        pushCodeToStudent,
        studentLiveCode,
        updateStudentLiveCode,
        isMounted,
        liveSync,
        updateLiveSync,
        tutorAdvanceStep,
        isDevelopmentUnlocked: true,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return ctx;
}
