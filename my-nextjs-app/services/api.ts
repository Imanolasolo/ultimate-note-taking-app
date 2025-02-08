// filepath: /services/api.ts
const API_URL = 'http://127.0.0.1:8000/api/api/notes/';

const getToken = () => localStorage.getItem('token');

export const fetchNotes = async () => {
  const response = await fetch(API_URL, {
    headers: {
      'Authorization': `Bearer ${getToken()}`,
    },
  });
  const data = await response.json();
  return Array.isArray(data) ? data : [];
};

export const createNote = async (note: { title: string; content: string }) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`,
    },
    body: JSON.stringify(note),
  });
  return response.json();
};

export const updateNote = async (id: number, note: { title: string; content: string }) => {
  const response = await fetch(`${API_URL}${id}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`,
    },
    body: JSON.stringify(note),
  });
  return response.json();
};

export const deleteNote = async (id: number) => {
  await fetch(`${API_URL}${id}/`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${getToken()}`,
    },
  });
};