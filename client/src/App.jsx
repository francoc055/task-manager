import { BrowserRouter, Route, Routes, Navigate } from "react-router"
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"
import TasksPage from "./pages/TasksPage"
import ProtectedRoute from "./ProtectedRoute"
import { TasksProvider } from "./context/TaskContext"
import { ToastContainer, toast } from 'react-toastify';

function App(){
  return (
    <TasksProvider>
      <ToastContainer />
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route
            path="/tasks"
            element={
              <ProtectedRoute>
                <TasksPage />
              </ProtectedRoute>
            }
          />
      </Routes>
      </BrowserRouter>
    </TasksProvider>
  )
}

export default App
