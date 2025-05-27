import { Routes, Route } from 'react-router-dom';
import UsersView from './UserView';
import UserForm from './UserForm';

export default function UsersModule() {
  return (
    <Routes>
      <Route path="/" element={<UsersView />} />
      <Route path="/crear" element={<UserForm />} />
      <Route path="/editar/:id" element={<UserForm />} />
    </Routes>
  );
}