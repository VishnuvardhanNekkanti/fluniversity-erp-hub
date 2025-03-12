
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { GraduationCap, BarChart } from "lucide-react";

// Import recharts components for the chart
import { 
  BarChart as ReBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

// Mock GPA/CGPA data
const mockData = {
  // Semester-wise GPA data
  semesters: [
    { name: "Sem 1", gpa: 8.2 },
    { name: "Sem 2", gpa: 8.4 },
    { name: "Sem 3", gpa: 8.7 },
    { name: "Sem 4", gpa: 8.5 },
    { name: "Sem 5", gpa: 8.9 },
    { name: "Sem 6", gpa: 9.1 },
  ],
  
  // Subject-wise grades for current semester
  current: {
    odd: [
      { subject: "Data Structures and Algorithms", code: "CS301", internalMarks: 28, midtermMarks: 40, assignmentMarks: 18, grade: "A", gradePoint: 9 },
      { subject: "Database Management Systems", code: "CS302", internalMarks: 26, midtermMarks: 38, assignmentMarks: 19, grade: "A", gradePoint: 9 },
      { subject: "Computer Networks", code: "CS303", internalMarks: 22, midtermMarks: 35, assignmentMarks: 16, grade: "B+", gradePoint: 8 },
      { subject: "Operating Systems", code: "CS304", internalMarks: 27, midtermMarks: 42, assignmentMarks: 18, grade: "A+", gradePoint: 10 },
    ],
    even: [
      { subject: "Artificial Intelligence", code: "CS401", internalMarks: 25, midtermMarks: 38, assignmentMarks: 17, grade: "A", gradePoint: 9 },
      { subject: "Web Technologies", code: "CS402", internalMarks: 28, midtermMarks: 43, assignmentMarks: 19, grade: "A+", gradePoint: 10 },
      { subject: "Software Engineering", code: "CS403", internalMarks: 24, midtermMarks: 36, assignmentMarks: 16, grade: "B+", gradePoint: 8 },
      { subject: "Computer Graphics", code: "CS404", internalMarks: 26, midtermMarks: 40, assignmentMarks: 18, grade: "A", gradePoint: 9 },
    ],
  },
  
  // Cumulative GPA (CGPA) value
  cgpa: 8.7,
};

const CGPA = () => {
  const [semester, setSemester] = useState("odd");
  
  // Get current semester grades
  const currentGrades = mockData.current[semester as "odd" | "even"] || [];
  
  // Calculate semester GPA
  const semesterGPA = currentGrades.reduce((sum, subject) => sum + subject.gradePoint, 0) / currentGrades.length;
  
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Academic Performance</h2>
          <p className="text-muted-foreground">
            Track your grades, GPA, and academic progress
          </p>
        </div>
        <div>
          <Select value={semester} onValueChange={setSemester}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Semester" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="odd">Odd Semester</SelectItem>
              <SelectItem value="even">Even Semester</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" /> CGPA Overview
              </CardTitle>
              <CardDescription>Your cumulative grade point average</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-center">
                <div className="relative flex h-44 w-44 items-center justify-center rounded-full border-8 border-primary/20">
                  <div className="text-center">
                    <p className="text-5xl font-bold">{mockData.cgpa}</p>
                    <p className="text-sm text-muted-foreground">CGPA</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <div>
                    <p className="font-medium">Current Semester GPA</p>
                    <p className="text-xl font-bold">{semesterGPA.toFixed(1)}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">Credits Completed</p>
                    <p className="text-xl font-bold">96</p>
                  </div>
                </div>
                
                <div className="h-px bg-border" />
                
                <div className="text-sm">
                  <p className="font-medium mb-2">CGPA Scale: 0.0 - 10.0</p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <div className="flex flex-col items-center rounded-md bg-muted px-2 py-1">
                      <span className="font-semibold">A+</span>
                      <span>9.0-10.0</span>
                    </div>
                    <div className="flex flex-col items-center rounded-md bg-muted px-2 py-1">
                      <span className="font-semibold">A</span>
                      <span>8.0-8.9</span>
                    </div>
                    <div className="flex flex-col items-center rounded-md bg-muted px-2 py-1">
                      <span className="font-semibold">B+</span>
                      <span>7.0-7.9</span>
                    </div>
                    <div className="flex flex-col items-center rounded-md bg-muted px-2 py-1">
                      <span className="font-semibold">B</span>
                      <span>6.0-6.9</span>
                    </div>
                    <div className="flex flex-col items-center rounded-md bg-muted px-2 py-1">
                      <span className="font-semibold">C</span>
                      <span>5.0-5.9</span>
                    </div>
                    <div className="flex flex-col items-center rounded-md bg-muted px-2 py-1">
                      <span className="font-semibold">F</span>
                      <span>0.0-4.9</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="h-5 w-5" /> GPA Trend
              </CardTitle>
              <CardDescription>Your GPA across semesters</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="bar">
                <TabsList className="mb-4">
                  <TabsTrigger value="bar">Bar Chart</TabsTrigger>
                  <TabsTrigger value="line">Line Chart</TabsTrigger>
                </TabsList>
                
                <TabsContent value="bar" className="h-[240px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <ReBarChart data={mockData.semesters}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis domain={[0, 10]} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          border: "1px solid #e2e8f0",
                          borderRadius: "0.375rem",
                        }}
                      />
                      <Bar dataKey="gpa" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </ReBarChart>
                  </ResponsiveContainer>
                </TabsContent>
                
                <TabsContent value="line" className="h-[240px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockData.semesters}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis domain={[0, 10]} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          border: "1px solid #e2e8f0",
                          borderRadius: "0.375rem",
                        }}
                      />
                      <Line type="monotone" dataKey="gpa" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Current Semester Grades</CardTitle>
            <CardDescription>
              {semester === "odd" ? "Odd" : "Even"} Semester Performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Subject</TableHead>
                  <TableHead className="w-[100px] text-center">Internal (30)</TableHead>
                  <TableHead className="w-[100px] text-center">Midterm (50)</TableHead>
                  <TableHead className="w-[100px] text-center">Assignment (20)</TableHead>
                  <TableHead className="w-[80px] text-center">Grade</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentGrades.map((grade) => (
                  <TableRow key={grade.code}>
                    <TableCell className="font-medium">
                      <div>{grade.subject}</div>
                      <div className="text-xs text-muted-foreground">{grade.code}</div>
                    </TableCell>
                    <TableCell className="text-center">{grade.internalMarks}</TableCell>
                    <TableCell className="text-center">{grade.midtermMarks}</TableCell>
                    <TableCell className="text-center">{grade.assignmentMarks}</TableCell>
                    <TableCell className="text-center font-semibold">{grade.grade}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default CGPA;
