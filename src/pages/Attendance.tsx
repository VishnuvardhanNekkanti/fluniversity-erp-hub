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
import { Progress } from "@/components/ui/progress";
import { Calendar, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Attendance = () => {
  const [academicYear, setAcademicYear] = useState("2023-2024");
  const [semester, setSemester] = useState("odd");

  // Mock attendance data
  const mockAttendance = {
    "2023-2024": {
      odd: [
        { subject: "Data Structures and Algorithms", code: "CS301", present: 35, total: 40, percentage: 87.5 },
        { subject: "Database Management Systems", code: "CS302", present: 32, total: 38, percentage: 84.2 },
        { subject: "Computer Networks", code: "CS303", present: 30, total: 36, percentage: 83.3 },
        { subject: "Operating Systems", code: "CS304", present: 28, total: 32, percentage: 87.5 },
      ],
      even: [
        { subject: "Artificial Intelligence", code: "CS401", present: 22, total: 26, percentage: 84.6 },
        { subject: "Web Technologies", code: "CS402", present: 24, total: 28, percentage: 85.7 },
        { subject: "Software Engineering", code: "CS403", present: 18, total: 20, percentage: 90.0 },
        { subject: "Computer Graphics", code: "CS404", present: 26, total: 30, percentage: 86.7 },
      ],
    },
    "2022-2023": {
      odd: [
        { subject: "Discrete Mathematics", code: "CS201", present: 34, total: 38, percentage: 89.5 },
        { subject: "Data Communication", code: "CS202", present: 30, total: 36, percentage: 83.3 },
        { subject: "Digital Logic Design", code: "CS203", present: 32, total: 35, percentage: 91.4 },
        { subject: "Object Oriented Programming", code: "CS204", present: 28, total: 32, percentage: 87.5 },
      ],
      even: [
        { subject: "Computer Architecture", code: "CS205", present: 30, total: 32, percentage: 93.8 },
        { subject: "Algorithm Design", code: "CS206", present: 28, total: 34, percentage: 82.4 },
        { subject: "Probability and Statistics", code: "CS207", present: 26, total: 30, percentage: 86.7 },
        { subject: "System Programming", code: "CS208", present: 25, total: 28, percentage: 89.3 },
      ],
    },
  };

  // Get current attendance data based on selected filters
  const currentAttendance = mockAttendance[academicYear as keyof typeof mockAttendance]?.[semester as "odd" | "even"] || [];
  
  // Calculate overall attendance
  const totalClasses = currentAttendance.reduce((sum, item) => sum + item.total, 0);
  const totalPresent = currentAttendance.reduce((sum, item) => sum + item.present, 0);
  const overallPercentage = totalClasses ? (totalPresent / totalClasses) * 100 : 0;
  
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Attendance</h2>
          <p className="text-muted-foreground">
            Monitor your class attendance across all subjects
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Select value={academicYear} onValueChange={setAcademicYear}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Academic Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2023-2024">2023-2024</SelectItem>
              <SelectItem value="2022-2023">2022-2023</SelectItem>
            </SelectContent>
          </Select>
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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" /> Overall Attendance
            </CardTitle>
            <CardDescription>
              {academicYear} • {semester === "odd" ? "Odd" : "Even"} Semester
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-4xl font-bold">{overallPercentage.toFixed(1)}%</p>
                  <p className="text-sm text-muted-foreground">
                    {totalPresent} present out of {totalClasses} classes
                  </p>
                </div>
                
                {overallPercentage < 75 && (
                  <Alert variant="destructive" className="max-w-md border border-red-200 bg-red-50">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Warning</AlertTitle>
                    <AlertDescription>
                      Your attendance is below the required 75%. Please attend classes regularly.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
              
              <Progress value={overallPercentage} className="h-2" />
              
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0%</span>
                <span className="font-medium text-destructive">75% (Required)</span>
                <span>100%</span>
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
        <Card>
          <CardHeader>
            <CardTitle>Subject-wise Attendance</CardTitle>
            <CardDescription>Detailed attendance for each subject</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {currentAttendance.map((subject, index) => (
                <motion.div
                  key={subject.code}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.3 }}
                  className="space-y-2"
                >
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-medium">{subject.subject}</h3>
                      <p className="text-sm text-muted-foreground">{subject.code}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{subject.percentage.toFixed(1)}%</p>
                      <p className="text-sm text-muted-foreground">
                        {subject.present}/{subject.total} classes
                      </p>
                    </div>
                  </div>
                  <Progress
                    value={subject.percentage}
                    className="h-2"
                  />
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Attendance;
