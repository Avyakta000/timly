import React, { useEffect, useState } from "react";
import { FaTrashAlt, FaSort, FaPen } from "react-icons/fa";
import TaskForm from "../components/TaskForm";
import { Task } from "../types/task";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import {
  deleteTasks,
  deselectAllTasks,
  fetchTasks,
  selectAllTasks,
  toggleTaskSelection,
} from "../store/slices/taskSlice";


const Tasks: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    tasks,
    selectedTasks,
    loading,
    error,
  } = useSelector((state: RootState) => state.task);

  const [statusFilter, setStatusFilter] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("priority");
  const [order, setOrder] = useState<string>("asc");
  
  useEffect(() => {
   
      dispatch(fetchTasks({ status: statusFilter, sortBy: sortBy, order: order }));
  
  }, [dispatch, statusFilter, sortBy, order]);
  

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
        <h1 className="text-3xl font-bold text-gray-700 mb-6">
          Your Task List
        </h1>

        {(error) && (
          <p className="text-red-500">
            {error || "An unknown error occurred."}
          </p>
        )}

        <TaskForm
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          taskData={currentTask}
        />

        {/* Filter and Sort UI */}
        <div className="flex flex-col space-y-4 py-2 bg-gray-50 rounded-md shadow-sm">
          <div className="flex justify-end gap-2">
            {/* Filter by Status */}
            <div className="flex flex-col w-1/5">
              <label
                htmlFor="statusFilter"
                className="text-sm font-medium text-gray-600 mb-2"
              >
                Filter by Status
              </label>
              <select
                id="statusFilter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="p-1 border border-gray-300 rounded-md focus:ring-2 outline-none focus:ring-indigo-500"
              >
                <option value="">All</option>
                <option value="PENDING">Pending</option>
                <option value="FINISHED">Completed</option>
              </select>
            </div>

            {/* Sort by */}
            <div className="flex flex-col w-1/5">
              <label
                htmlFor="sortBy"
                className="text-sm font-medium text-gray-600 mb-2"
              >
                Sort by
              </label>
              <select
                id="sortBy"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="p-1 border border-gray-300 rounded-md focus:ring-2 outline-none focus:ring-indigo-500"
              >
                <option value="title">Title</option>
                <option value="priority">Priority</option>
                <option value="startTime">Start Time</option>
                <option value="endTime">End Time</option>
                <option value="createdAt">Created At</option>
                <option value="updatedAt">Updated At</option>
              </select>
            </div>

            {/* Order */}
            <div className="flex flex-col w-1/5">
              <label
                htmlFor="order"
                className="text-sm font-medium text-gray-600 mb-2"
              >
                Order
              </label>
              <select
                id="order"
                value={order}
                onChange={(e) => setOrder(e.target.value)}
                className="p-1 border border-gray-300 rounded-md focus:ring-2 outline-none focus:ring-indigo-500"
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
          </div>
        </div>

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
                <th className="px-4 py-2">Update</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task: Task) => (
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

// import React, { useEffect, useState } from "react";
// import { useQuery, gql } from "@apollo/client";
// import { FaTrashAlt, FaSort, FaPen } from "react-icons/fa";
// import TaskForm from "../components/TaskForm";
// import { Task } from "../types/task";
// import client from "../services/taskService";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "../store";
// import {
//   deleteTasks,
//   deselectAllTasks,
//   fetchTasks,
//   selectAllTasks,
//   toggleTaskSelection,
// } from "../store/slices/taskSlice";



// const Tasks: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const {
//     tasks: reduxTasks,
//     selectedTasks,
//     loading: reduxLoading,
//     error: reduxError,
//   } = useSelector((state: RootState) => state.task);

//   const [statusFilter, setStatusFilter] = useState<string>("");
//   const [sortBy, setSortBy] = useState<string>("priority");
//   const [order, setOrder] = useState<string>("asc");

//   const {
//     loading: apolloLoading,
//     error: apolloError,
//     data,
//   } = useQuery(GET_TASKS, {
//     client,
//     variables: { status: statusFilter || undefined, sortBy, order },
//   });

//   // Combine GraphQL and Redux data
//   const tasks = data?.tasks || reduxTasks;

//   // useEffect(() => {
//   //   if (reduxTasks.length === 0 && !data) {
//   //     dispatch(fetchTasks());
//   //   }
//   // }, [dispatch, reduxTasks.length, data]);

//   const handleDelete = () => {
//     dispatch(deleteTasks(selectedTasks)).unwrap();
//   };

//   const handleSelectAll = (isChecked: boolean) => {
//     if (isChecked) {
//       dispatch(selectAllTasks());
//     } else {
//       dispatch(deselectAllTasks());
//     }
//   };

//   const handleToggleTask = (taskId: string) => {
//     dispatch(toggleTaskSelection(taskId));
//   };

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [currentTask, setCurrentTask] = useState<Task | null>(null);

//   const openAddTaskModal = () => {
//     setCurrentTask(null);
//     setIsModalOpen(true);
//   };

//   const openEditTaskModal = (task: Task) => {
//     setCurrentTask(task);
//     setIsModalOpen(true);
//   };

//   if (apolloLoading || reduxLoading) {
//     return <div className="p-6 bg-gray-50 min-h-screen">Loading Tasks...</div>;
//   }

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-3xl font-bold text-gray-700 mb-6">
//           Your Task List
//         </h1>

//         {(apolloError || reduxError) && (
//           <p className="text-red-500">
//             {apolloError?.message || reduxError || "An unknown error occurred."}
//           </p>
//         )}

//         <TaskForm
//           isOpen={isModalOpen}
//           onClose={() => setIsModalOpen(false)}
//           taskData={currentTask}
//         />

//         {/* Filter and Sort UI */}
//         <div className="flex flex-col space-y-4 py-2 bg-gray-50 rounded-md shadow-sm">
//           <div className="flex justify-end gap-2">
//             {/* Filter by Status */}
//             <div className="flex flex-col w-1/5">
//               <label
//                 htmlFor="statusFilter"
//                 className="text-sm font-medium text-gray-600 mb-2"
//               >
//                 Filter by Status
//               </label>
//               <select
//                 id="statusFilter"
//                 value={statusFilter}
//                 onChange={(e) => setStatusFilter(e.target.value)}
//                 className="p-1 border border-gray-300 rounded-md focus:ring-2 outline-none focus:ring-indigo-500"
//               >
//                 <option value="">All</option>
//                 <option value="PENDING">Pending</option>
//                 <option value="FINISHED">Completed</option>
//               </select>
//             </div>

//             {/* Sort by */}
//             <div className="flex flex-col w-1/5">
//               <label
//                 htmlFor="sortBy"
//                 className="text-sm font-medium text-gray-600 mb-2"
//               >
//                 Sort by
//               </label>
//               <select
//                 id="sortBy"
//                 value={sortBy}
//                 onChange={(e) => setSortBy(e.target.value)}
//                 className="p-1 border border-gray-300 rounded-md focus:ring-2 outline-none focus:ring-indigo-500"
//               >
//                 <option value="title">Title</option>
//                 <option value="priority">Priority</option>
//                 <option value="startTime">Start Time</option>
//                 <option value="endTime">End Time</option>
//                 <option value="createdAt">Created At</option>
//                 <option value="updatedAt">Updated At</option>
//               </select>
//             </div>

//             {/* Order */}
//             <div className="flex flex-col w-1/5">
//               <label
//                 htmlFor="order"
//                 className="text-sm font-medium text-gray-600 mb-2"
//               >
//                 Order
//               </label>
//               <select
//                 id="order"
//                 value={order}
//                 onChange={(e) => setOrder(e.target.value)}
//                 className="p-1 border border-gray-300 rounded-md focus:ring-2 outline-none focus:ring-indigo-500"
//               >
//                 <option value="asc">Ascending</option>
//                 <option value="desc">Descending</option>
//               </select>
//             </div>
//           </div>
//         </div>

//         <div className="flex items-center justify-between mb-4">
//           <button
//             onClick={openAddTaskModal}
//             className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
//           >
//             + Add Task
//           </button>
//           <button
//             onClick={handleDelete}
//             className={`px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 ${
//               selectedTasks.length === 0 ? "opacity-50 cursor-not-allowed" : ""
//             }`}
//             disabled={selectedTasks.length === 0}
//           >
//             <FaTrashAlt className="inline mr-2" />
//             Delete Selected
//           </button>
//         </div>

//         <div className="overflow-x-auto bg-white shadow-md rounded-lg">
//           <table className="min-w-full table-auto text-sm">
//             <thead>
//               <tr className="bg-gray-200 text-left">
//                 <th className="px-4 py-2">
//                   <input
//                     type="checkbox"
//                     onChange={(e) => handleSelectAll(e.target.checked)}
//                     checked={selectedTasks.length === data.tasks.length}
//                   />
//                 </th>
//                 <th className="px-4 py-2">Task ID</th>
//                 <th className="px-4 py-2">Title</th>
//                 <th className="px-4 py-2 cursor-pointer flex items-center">
//                   Priority <FaSort className="ml-2" />
//                 </th>
//                 <th className="px-4 py-2">Status</th>
//                 <th className="px-4 py-2">Start Time</th>
//                 <th className="px-4 py-2">End Time</th>
//                 <th className="px-4 py-2">Update</th>
//               </tr>
//             </thead>
//             <tbody>
//               {tasks.map((task: Task) => (
//                 <tr key={task.id} className="border-b">
//                   <td className="px-4 py-2">
//                     <input
//                       type="checkbox"
//                       checked={selectedTasks.includes(task.id)}
//                       onChange={() => handleToggleTask(task.id)}
//                     />
//                   </td>
//                   <td className="px-4 py-2">{task.id}</td>
//                   <td className="px-4 py-2">{task.title}</td>
//                   <td className="px-4 py-2">{task.priority}</td>
//                   <td className="px-4 py-2">
//                     <span
//                       className={`px-3 py-1 rounded-full text-white ${
//                         task.status === "PENDING"
//                           ? "bg-yellow-500"
//                           : "bg-green-500"
//                       }`}
//                     >
//                       {task.status}
//                     </span>
//                   </td>
//                   <td className="px-4 py-2">
//                     {new Date(task.startTime).toLocaleString()}
//                   </td>
//                   <td className="px-4 py-2">
//                     {new Date(task.endTime).toLocaleString()}
//                   </td>
//                   <td className="px-4 py-2">
//                     <button
//                       onClick={() => openEditTaskModal(task)}
//                       className="text-indigo-600 hover:text-indigo-800"
//                     >
//                       <FaPen />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Tasks;
