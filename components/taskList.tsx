'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import RemoveTask from './removeTask';
import EditTopicForm from './editTopicForm';

type Task = {
  todoid: number;
  task: string;
  description: string;
};

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);


  const fetchTasks = async () => {
    try {
      const response = await fetch('/api/todo/add', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = (await response.json()) as { data: Task[] };
        setTasks(data.data);
      } else {
        console.error('Failed to fetch tasks');
      }
    } catch (error) {
      console.error('Error fetching tasks', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleEdit = (task: Task) => {
    setEditingTask(task);
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  const handleUpdate = async (taskId: number, updatedTask: { title: string; description: string }) => {
    try {
      const response = await fetch(`/api/todo/add?taskId=${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask),
      });

      if (response.ok) {
        fetchTasks();
        setEditingTask(null); 
      } else {
        console.error('Failed to update task');
      }
    } catch (error) {
      console.error('Error updating task', error);
    }
  };

  const handleDelete = () => {
    fetchTasks();
  };

  
  return (
    <main >
      <nav className="flex justify-between items-center bg-blue-700 px-8 py-3 rounded">
            <Link className="text-white font-bold hover:text-blue-400" href={"/"}>TO DO APP</Link>
            <Link className="text-white font-bold hover:text-blue-400" href={"/addTopic"}>ADD TASK</Link>
        </nav>
    <div>
      {tasks.map(task => (
        <div key={task.todoid} className='p-4  border border-slate-300 my-3 flex justify-between rounded'>
          <div >
            <h2 className='font-bold text-2xl'>Task: {task.task}</h2>
            <div>Description: {task.description}</div>
          </div>

          <div>
            <RemoveTask taskId={task.todoid} onDelete={handleDelete} />
            <br/>
            <button onClick={() => handleEdit(task)}>Edit</button>

            {editingTask && editingTask.todoid === task.todoid && (
            <EditTopicForm
              task={editingTask}
              onCancel={handleCancelEdit}
              onUpdate={(updatedTask) => handleUpdate(task.todoid, updatedTask)}
            />
          )}
          </div>
        </div>
      ))}
      
    </div>
    </main>
  );
}


