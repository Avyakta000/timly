import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { FaTrashAlt, FaSort, FaPen } from "react-icons/fa";
import {
  fetchTasks,
  deleteTasks,
  toggleTaskSelection,
  selectAllTasks,
  deselectAllTasks,
} from "../store/slices/taskSlice";
import TaskForm from "../components/TaskForm";
import { Task } from "../types/task";

const Tasks: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, selectedTasks, loading, error } = useSelector(
    (state: RootState) => state.task
  );

  useEffect(() => {
    if(tasks.length===0){
      dispatch(fetchTasks());
    }
  }, [dispatch, tasks.length]);

  const handleDelete = () => {
    dispatch(deleteTasks(selectedTasks)).unwrap();
  };

  const handleSelectAll = (isChecked: boolean) => {
    if (isChecked) {
      dispatch(selectAllTasks());
    } else {
      dispatch(deselectAllTasks());
    }
  };

  const handleToggleTask = (taskId: string) => {
    dispatch(toggleTaskSelection(taskId));
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);

  const openAddTaskModal = () => {
    console.log("add task");
    setCurrentTask(null);
    setIsModalOpen(true);
  };

  const openEditTaskModal = (task: Task) => {
    setCurrentTask(task);
    setIsModalOpen(true);
  };

  if (loading) {
    return <div className="p-6 bg-gray-50 min-h-screen">Loading Tasks...</div>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-700 mb-6">Task List</h1>

        {error && <p className="text-red-500">{error}</p>}

        <TaskForm
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          taskData={currentTask}
        />

        <div className="flex items-center justify-between mb-4">
          <button
            onClick={openAddTaskModal}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            + Add Task
          </button>
          <button
            onClick={handleDelete}
            className={`px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 ${
              selectedTasks.length === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={selectedTasks.length === 0}
          >
            <FaTrashAlt className="inline mr-2" />
            Delete Selected
          </button>
        </div>

        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full table-auto text-sm">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="px-4 py-2">
                  <input
                    type="checkbox"
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    checked={selectedTasks.length === tasks.length}
                  />
                </th>
                <th className="px-4 py-2">Task ID</th>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2 cursor-pointer flex items-center">
                  Priority <FaSort className="ml-2" />
                </th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Start Time</th>
                <th className="px-4 py-2">End Time</th>
                <th className="px-4 py-2">Total Time to Finish (hrs)</th>
                <th className="px-4 py-2">Edit</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id} className="border-b">
                  <td className="px-4 py-2">
                    <input
                      type="checkbox"
                      checked={selectedTasks.includes(task.id)}
                      onChange={() => handleToggleTask(task.id)}
                    />
                  </td>
                  <td className="px-4 py-2">{task.id}</td>
                  <td className="px-4 py-2">{task.title}</td>
                  <td className="px-4 py-2">{task.priority}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-3 py-1 rounded-full text-white ${
                        task.status === "PENDING"
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }`}
                    >
                      {task.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    {new Date(task.startTime).toLocaleString()}
                  </td>
                  <td className="px-4 py-2">
                    {new Date(task.endTime).toLocaleString()}
                  </td>
                  <td className="px-4 py-2">
                    {(
                      (new Date(task.endTime).getTime() -
                        new Date(task.startTime).getTime()) /
                      (1000 * 60 * 60)
                    ).toFixed(2)}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => openEditTaskModal(task)}
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      <FaPen />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
