'use client';

import Link from 'next/link';
import { FormEvent, Suspense, useState } from 'react';

export default function AddTopic() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleAddTopic = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/todo/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title,
            description,
        }),
      });
        
      if (response.ok) {
        
        setSuccessMessage('Task added successfully!');
        setErrorMessage('');
        
      } else {
        setErrorMessage('Failed to add task');
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Error occurred while adding task');
      setSuccessMessage('');
    }
  };
  
  function Loading() {
    return <h2>Loading...</h2>
  }

  return (
    
    <form onSubmit={handleAddTopic}>
      <br />
      <input
        className="text-black"
        type="text"
        placeholder="Add Task Name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <input
        className="text-black"
        type="text"
        placeholder="Add Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br />
      <br />
      
      <button type="submit" >Add Task</button>
      <br />
      <Link  href={"/"}>Back to List</Link>
      
      
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </form>
  );
}
