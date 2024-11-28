// src/types/task.ts
export interface Task {
  id: string;
  title: string;
  description: string | null;
  startTime: string;
  endTime: string;
  priority: number;
  status: "PENDING" | "FINISHED";
  userId: string;
  createdAt: string;
  updatedAt: string;
  }
  
  export interface AddTaskPayload {
    title: string;
    priority: number;
    status: "PENDING" | "FINISHED";
    startTime: string;
    endTime: string;
  }
  
  export interface EditTaskPayload extends AddTaskPayload {
    id: string;
  }
  