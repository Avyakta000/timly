import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Task } from "../types/task";
import { addTask, editTask } from "../store/slices/taskSlice";
import { AppDispatch } from "../store";
import { IoMdClose } from "react-icons/io";  // Close icon from React Icons

// Format a Date object to match "yyyy-MM-ddThh:mm"
const formatDateTime = (date: Date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

interface TaskFormProps {
  isOpen: boolean;
  onClose: () => void;
  taskData?: Task | null; // Optional task for editing
}

const TaskForm: React.FC<TaskFormProps> = ({ isOpen, onClose, taskData }) => {
  const dispatch = useDispatch<AppDispatch>();

  // Form state
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState(1);
  const [status, setStatus] = useState<"PENDING" | "FINISHED">("PENDING");
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");

  // Populate form for editing
  useEffect(() => {
    if (taskData) {
      setTitle(taskData.title);
      setPriority(taskData.priority);
      setStatus(taskData.status);
      setStartTime(formatDateTime(new Date(taskData.startTime)));
      setEndTime(formatDateTime(new Date(taskData.endTime)));
    }
  }, [taskData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
   
    const taskPayload = { title, priority, status, startTime, endTime };
    console.log(taskPayload, 'task payload')
    if (taskData) {
      dispatch(editTask({ id: taskData.id, ...taskPayload })); // Edit task
    } else {
      dispatch(addTask(taskPayload)); // Add task
    }

    onClose(); // Close modal
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">
              {taskData ? "Edit Task" : "Add New Task"}
            </h2>
            <button onClick={onClose} className="text-gray-500">
              <IoMdClose size={24} />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter task title"
              />
            </div>
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700">Priority</label>
              <input
                type="number"
                value={priority}
                onChange={(e) => setPriority(Number(e.target.value))}
                min="1"
                max="5"
                placeholder="Priority (1-5)"
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as "PENDING" | "FINISHED")}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="PENDING">Pending</option>
                <option value="FINISHED">Finished</option>
              </select>
            </div>
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700">Start Time</label>
              <input
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700">End Time</label>
              <input
                type="datetime-local"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="flex justify-between mt-6">
              <button
                type="submit"
                className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                {taskData ? "Save Changes" : "Add Task"}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default TaskForm;
