import { v4 as uuidv4 } from 'uuid';

export function setNewUserId() {
  const user_id = uuidv4();
  localStorage.setItem('user_id', user_id);
}

export function getUserId() {
  return localStorage.getItem('user_id');
}
