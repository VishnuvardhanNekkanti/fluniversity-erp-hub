
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, GraduationCap, CreditCard, Bell, BookOpen } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const Dashboard = () => {
  const { student } = useAuth();
  const [announcements] = useState([
    {
      id: 1,
      title: "Mid-Semester Examinations",
      date: "October 15, 2023",
      message: "Mid-semester examinations will commence from October 15, 2023.",
    },
    {
      id: 2,
      title: "Fee Payment Deadline",
      date: "September 30, 2023",
      message: "Last date for payment of tuition fees is September 30, 2023.",
    },
    {
      id: 3,
      title: "Annual Sports Meet",
      date: "November 5, 2023",
      message: "Annual sports meet will be held on November 5, 2023.",
    },
  ]);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-2"
      >
        <h2 className="text-3xl font-bold tracking-tight">Welcome back, {student?.name}</h2>
        <p className="text-muted-foreground">
          Here's an overview of your academic progress and important information.
        </p>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <motion.div
          custom={0}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          <Link to="/attendance" className="block">
            <Card className="hover:border-primary/50 hover:shadow-md transition-all duration-200">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Attendance</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">86%</div>
                <Progress value={86} className="mt-2 h-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  4 classes missed this semester
                </p>
              </CardContent>
            </Card>
          </Link>
        </motion.div>
        
        <motion.div
          custom={1}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          <Link to="/cgpa" className="block">
            <Card className="hover:border-primary/50 hover:shadow-md transition-all duration-200">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">CGPA</CardTitle>
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8.7/10</div>
                <Progress value={87} className="mt-2 h-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  Top 15% in your batch
                </p>
              </CardContent>
            </Card>
          </Link>
        </motion.div>
        
        <motion.div
          custom={2}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          <Link to="/fees" className="block">
            <Card className="hover:border-primary/50 hover:shadow-md transition-all duration-200">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Fee Status</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹15,000</div>
                <Progress value={25} className="mt-2 h-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  Next payment due in 15 days
                </p>
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      </div>

      {/* Course Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Current Courses (2023-2024)</CardTitle>
            <CardDescription>Your enrolled courses for this academic year</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Data Structures and Algorithms", code: "CS301", progress: 65 },
                { name: "Database Management Systems", code: "CS302", progress: 80 },
                { name: "Computer Networks", code: "CS303", progress: 45 },
                { name: "Operating Systems", code: "CS304", progress: 70 },
              ].map((course, index) => (
                <div key={index} className="flex items-center">
                  <BookOpen className="mr-3 h-5 w-5 text-primary" />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium leading-none">{course.name}</p>
                        <p className="text-xs text-muted-foreground">{course.code}</p>
                      </div>
                      <span className="text-xs font-medium">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-1" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Announcements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" /> Announcements
            </CardTitle>
            <CardDescription>Latest updates and notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {announcements.map((announcement, index) => (
                <div
                  key={announcement.id}
                  className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm"
                >
                  <div className="flex justify-between gap-4">
                    <div>
                      <h3 className="font-semibold">{announcement.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {announcement.message}
                      </p>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {announcement.date}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Dashboard;
