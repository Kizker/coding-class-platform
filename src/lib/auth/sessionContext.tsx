"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type UserRole = "student" | "tutor" | "parent";

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  avatar: string;
  email: string;
  subtitle: string;
}

export interface StudentProgress {
  currentWeek: number;
  totalWeeks: number;
  completedAssignments: number;
  totalAssignments: number;
  streakDays: number;
  xpPoints: number;
  badges: Array<{ id: string; name: string; icon: string; unlockedAt: string }>;
  weeklyNote: string;
  attendanceCount: number;
  totalSessions: number;
}

interface SessionContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  currentUser: UserProfile;
  progress: StudentProgress;
  updateProgress: (partial: Partial<StudentProgress>) => void;
  pushedCode: string | null;
  pushCodeToStudent: (code: string) => void;
  studentLiveCode: string;
  updateStudentLiveCode: (code: string) => void;
}

const USERS: Record<UserRole, UserProfile> = {
  student: {
    id: "user-student-1",
    name: "Andi Pratama",
    role: "student",
    avatar: "👦",
    email: "andi.pratama@student.id",
    subtitle: "Siswa Les Private (Python Track)",
  },
  tutor: {
    id: "user-tutor-1",
    name: "Kak Tutor (Andri)",
    role: "tutor",
    avatar: "👨‍🏫",
    email: "andri@codingclass.id",
    subtitle: "Senior Fullstack Mentor & Lead Tutor",
  },
  parent: {
    id: "user-parent-1",
    name: "Pak Bambang (Orang Tua Andi)",
    role: "parent",
    avatar: "👨‍💼",
    email: "bambang.p@parent.id",
    subtitle: "Wali Murid Andi Pratama",
  },
};

const DEFAULT_PROGRESS: StudentProgress = {
  currentWeek: 4,
  totalWeeks: 12,
  completedAssignments: 15,
  totalAssignments: 48,
  streakDays: 5,
  xpPoints: 340,
  badges: [
    { id: "b1", name: "First Code Champion", icon: "🚀", unlockedAt: "Minggu 1" },
    { id: "b2", name: "Logic Master (if-else)", icon: "🧠", unlockedAt: "Minggu 2" },
    { id: "b3", name: "Loop Sorcerer", icon: "🔁", unlockedAt: "Minggu 3" },
    { id: "b4", name: "5-Day Streak Flame", icon: "🔥", unlockedAt: "Minggu 4" },
  ],
  weeklyNote: "Andi memiliki daya tangkap logika yang sangat kuat pada materi if-else dan perulangan. Nalar berpikir analitisnya berkembang pesat, dan ia sangat antusias saat berhasil membuat simulasi game tebak angka.",
  attendanceCount: 7,
  totalSessions: 24,
};

const SessionContext = createContext<SessionContextType | null>(null);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = useState<UserRole>("student");
  const [progress, setProgress] = useState<StudentProgress>(DEFAULT_PROGRESS);
  const [pushedCode, setPushedCode] = useState<string | null>(null);
  const [studentLiveCode, setStudentLiveCode] = useState<string>(
    "panjang = 10\nlebar = 5\nluas = panjang * lebar\nprint(f\"Luas Persegi Panjang: {luas}\")"
  );

  // Sync role with localStorage
  useEffect(() => {
    const saved = localStorage.getItem("active_role") as UserRole | null;
    if (saved && (saved === "student" || saved === "tutor" || saved === "parent")) {
      setRoleState(saved);
    }
  }, []);

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    localStorage.setItem("active_role", newRole);
  };

  const updateProgress = (partial: Partial<StudentProgress>) => {
    setProgress((prev) => ({ ...prev, ...partial }));
  };

  const pushCodeToStudent = (code: string) => {
    setPushedCode(code);
    setStudentLiveCode(code);
  };

  const updateStudentLiveCode = (code: string) => {
    setStudentLiveCode(code);
  };

  return (
    <SessionContext.Provider
      value={{
        role,
        setRole,
        currentUser: USERS[role],
        progress,
        updateProgress,
        pushedCode,
        pushCodeToStudent,
        studentLiveCode,
        updateStudentLiveCode,
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
