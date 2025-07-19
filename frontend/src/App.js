import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PublicLayout from "./layouts/public/index";
import Landing from "./pages/Home/HomePage";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import TodoDashboard from "./pages/TodoList/TodoDashboard";
import SecureRoute from "./components/protectedRoutes/RouteProtected";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public layout */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Protected dashboard route */}
        <Route
          path="/"
          element={
            <SecureRoute>
              <TodoDashboard />
            </SecureRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
