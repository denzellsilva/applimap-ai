"use client";

import {
  createContext,
  ReactNode,
  useState,
  Dispatch,
  useContext,
} from "react";

interface SelectedJobContextType {
  selectedJob: string | null;
  setSelectedJob: Dispatch<React.SetStateAction<string | null>>;
  openSheet: boolean | undefined;
  setOpenSheet: Dispatch<React.SetStateAction<boolean | undefined>>;
}
const SelectedJobContext = createContext<SelectedJobContextType | null>(null);

export function SelectedJobProvider({ children }: { children: ReactNode }) {
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [openSheet, setOpenSheet] = useState<boolean | undefined>(undefined);

  return (
    <SelectedJobContext.Provider
      value={{ selectedJob, setSelectedJob, openSheet, setOpenSheet }}
    >
      {children}
    </SelectedJobContext.Provider>
  );
}

export function useSelectedJob() {
  const context = useContext(SelectedJobContext);
  if (!context) {
    throw new Error("useSelectedJob must be used within a SelectedJobProvider");
  }
  return context.selectedJob;
}

export function useOpenSheet() {
  const context = useContext(SelectedJobContext);
  if (!context) {
    throw new Error("useOpenSheet must be used within a SelectedJobProvider");
  }
  return context.openSheet;
}

export function useSetSelectedJob() {
  const context = useContext(SelectedJobContext);
  if (!context) {
    throw new Error(
      "useSetSelectedJob must be used within a SelectedJobProvider",
    );
  }
  return context.setSelectedJob;
}

export function useSetOpenSheet() {
  const context = useContext(SelectedJobContext);
  if (!context) {
    throw new Error(
      "useSetOpenSheet must be used within a SelectedJobProvider",
    );
  }
  return context.setOpenSheet;
}
