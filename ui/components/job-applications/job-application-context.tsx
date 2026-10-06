"use client";

import { createContext, ReactNode, useContext, useReducer } from "react";
import {
  createJobApplication,
  updateJobApplication,
} from "@/actions/jobApplication";
import type { JobApplicationAction } from "@/actions/jobApplication";

interface IKanbanState {
  selectedJob?: string | null;
  openSheet: boolean;
  action: JobApplicationAction;
  formKey?: number;
}

type KanbanAction =
  | { type: "create" }
  | { type: "edit"; selectedJob: string }
  | { type: "close" };

const KanbanActionContext = createContext<IKanbanState | null>(null);
const KanbanActionDispatchContext =
  createContext<React.Dispatch<KanbanAction> | null>(null);

const initialKanbanAction: IKanbanState = {
  selectedJob: null,
  openSheet: false,
  action: createJobApplication,
  formKey: 0,
};

export function KanbanActionProvider({ children }: { children: ReactNode }) {
  const [kanbanAction, dispatch] = useReducer(
    kanbanActionReducer,
    initialKanbanAction,
  );

  return (
    <KanbanActionContext value={kanbanAction}>
      <KanbanActionDispatchContext value={dispatch}>
        {children}
      </KanbanActionDispatchContext>
    </KanbanActionContext>
  );
}

export function useKanbanAction() {
  const context = useContext(KanbanActionContext);
  if (!context) {
    throw new Error(
      "useKanbanAction must be used within a KanbanActionProvider",
    );
  }
  return context;
}

export function useKanbanActionDispatch() {
  const context = useContext(KanbanActionDispatchContext);
  if (!context) {
    throw new Error(
      "useKanbanActionDispatch must be used within a KanbanActionProvider",
    );
  }
  return context;
}

function kanbanActionReducer(
  state: IKanbanState,
  action: KanbanAction,
): IKanbanState {
  switch (action.type) {
    case "create":
      return {
        selectedJob: null,
        openSheet: true,
        action: createJobApplication,
      };
    case "edit":
      return {
        selectedJob: action.selectedJob,
        openSheet: true,
        action: updateJobApplication.bind(null, action.selectedJob),
      };
    case "close":
      return {
        selectedJob: null,
        openSheet: false,
        action: createJobApplication,
        formKey: (state.formKey ?? 0) + 1,
      };
    default:
      throw Error("Unknown kanban action");
  }
}
