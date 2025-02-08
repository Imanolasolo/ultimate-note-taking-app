// filepath: /pages/dashboard.tsx
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { fetchNotes, createNote, updateNote, deleteNote } from '../services/api';
import styles from '../styles/Dashboard.module.css';

const Dashboard: React.FC = () => {
  const [notes, setNotes] = useState<{ id: number; title: string; content: string }[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editId, setEditId] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadNotes = async () => {
      const data = await fetchNotes();
      setNotes(data);
    };
    loadNotes();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/'); // Navigate back to the login page
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editId !== null) {
      await updateNote(editId, { title, content });
    } else {
      await createNote({ title, content });
    }
    const data = await fetchNotes();
    setNotes(data);
    setTitle('');
    setContent('');
    setEditId(null);
  };

  const handleEdit = (note: { id: number; title: string; content: string }) => {
    setTitle(note.title);
    setContent(note.content);
    setEditId(note.id);
  };

  const handleDelete = async (id: number) => {
    await deleteNote(id);
    const data = await fetchNotes();
    setNotes(data);
  };

  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <h1>Dashboard</h1>
        <p>Welcome to the dashboard! Here you can manage your notes.</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Content:</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          <button type="submit">{editId !== null ? 'Update' : 'Create'} Note</button>
        </form>
      </div>
      <ul>
        {notes.map((note) => (
          <li key={note.id} className={styles.note}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <button onClick={() => handleEdit(note)}>Edit</button>
            <button onClick={() => handleDelete(note.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;