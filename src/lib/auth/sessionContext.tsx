"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

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
    initials: "AP",
    email: "andi.pratama@student.id",
    roleLabel: "STUDENT",
    subtitle: "Siswa Private — Python Track (Pekan 4)",
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
    roleLabel: "OBSERVER",
    subtitle: "Wali Murid Andi Pratama (Read-Only)",
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
    { id: "b1", code: "CORE-01", name: "Fondasi Sintaks & IPO", unlockedAt: "Pekan 1" },
    { id: "b2", code: "LOGIC-02", name: "Percabangan Kondisional", unlockedAt: "Pekan 2" },
    { id: "b3", code: "LOOP-03", name: "Otomasi Iterasi & List", unlockedAt: "Pekan 3" },
    { id: "b4", code: "HABIT-04", name: "Konsistensi PR 5 Hari", unlockedAt: "Pekan 4" },
  ],
  weeklyNote: "Andi memiliki daya tangkap logika yang sangat kuat pada materi if-else dan perulangan. Nalar berpikir analitisnya berkembang pesat, dan ia mampu merancang alur game tebak angka tanpa kesalahan sintaksis.",
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
