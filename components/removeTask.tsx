  import { useRouter } from 'next/navigation';
import { useState } from 'react';

type RemoveTaskProps = {
  taskId: number;
  onDelete: () => void;
};

const RemoveTask: React.FC<RemoveTaskProps> = ({ taskId, onDelete }) => {
  const router = useRouter();
  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/todo/add?taskId=${taskId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        onDelete();
        router.refresh();
      } else {
        console.error('Failed to delete task');
      }
    } catch (error) {
      console.error('Error deleting task', error);
    }

  };

  return (
    <button onClick={handleDelete}>Delete</button>
  );
};

export default RemoveTask;
