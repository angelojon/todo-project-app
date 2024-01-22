'use client';

import { useState } from 'react';

type Task = {
    todoid: number;
    task: string;
    description: string;
  };

type EditTopicFormProps = {
  task: Task;
  onCancel: () => void;
  onUpdate: (updatedTask: { title: string; description: string }) => void;
};

const EditTopicForm: React.FC<EditTopicFormProps> = ({ task, onCancel, onUpdate }) => {
  const [editedTask, setEditedTask] = useState({
    title: '',
    description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTask((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(editedTask);
  };

  return (
    <form onSubmit={handleSubmit}>
        <br />
      <input
        className="text-black"
        type="text"
        name="title"
        placeholder="New Task Name"
        value={editedTask.title}
        onChange={handleChange}
      />
      <br />
      <input
        className="text-black"
        type="text"
        name="description"
        placeholder="New Task Description"
        value={editedTask.description}
        onChange={handleChange}
      />
      <br />
      <button type="submit" className='text-blue-700 font-semibold rounded'>Update Task</button>
      <br />
      <button type="button" onClick={onCancel} className='text-red-700 font-semibold  rounded'>
        Cancel
      </button>
    </form>
  );
};

export default EditTopicForm;
