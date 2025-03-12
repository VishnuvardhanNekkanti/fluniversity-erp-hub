
import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type Student = {
  id: string;
  name: string;
  email: string;
  studentId: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  student: Student | null;
  login: (studentId: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedStudent = localStorage.getItem("student");
    if (storedStudent) {
      try {
        setStudent(JSON.parse(storedStudent));
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Failed to parse stored student data:", error);
        localStorage.removeItem("student");
      }
    }
    setLoading(false);
  }, []);

  const login = async (studentId: string, password: string): Promise<void> => {
    setLoading(true);
    
    try {
      // For demo purposes, we'll use a mock login
      // In a real application, this would be an API call
      if (studentId === "FL2023001" && password === "password") {
        const mockStudent: Student = {
          id: "1",
          name: "John Doe",
          email: "john.doe@fluniversity.edu",
          studentId: "FL2023001",
        };
        
        setStudent(mockStudent);
        setIsAuthenticated(true);
        localStorage.setItem("student", JSON.stringify(mockStudent));
        
        toast.success("Login successful");
        navigate("/dashboard");
      } else {
        toast.error("Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setStudent(null);
    setIsAuthenticated(false);
    localStorage.removeItem("student");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, student, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
