
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarIcon, Mail, MapPin, Phone, User, Book, IdCard, Pencil, Save } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface StudentProfile {
  name: string;
  studentId: string;
  email: string;
  dateOfBirth: string;
  age: number;
  phone: string;
  aadharNumber: string;
  motherTongue: string;
  birthPlace: string;
  address: string;
  program: string;
  batch: string;
  bloodGroup: string;
  gender: string;
}

const Profile = () => {
  const { student, updateProfile } = useAuth();
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");

  useEffect(() => {
    // Simulate loading profile data
    setTimeout(() => {
      // Mock data - in a real application, this would come from an API
      setProfile({
        name: student?.name || "John Doe",
        studentId: student?.studentId || "FL2023001",
        email: student?.email || "john.doe@fluniversity.edu",
        dateOfBirth: "15-08-2002",
        age: 22,
        phone: "9876543210",
        aadharNumber: "XXXX XXXX 1234",
        motherTongue: "English",
        birthPlace: "Bangalore",
        address: "123 University St, Bangalore, Karnataka, 560001",
        program: "B.Tech Computer Science",
        batch: "2022-2026",
        bloodGroup: "O+",
        gender: "Male"
      });
      setLoading(false);
    }, 1000);
  }, [student]);

  useEffect(() => {
    if (profile) {
      setEditName(profile.name);
    }
  }, [profile]);

  const handleSaveName = () => {
    if (editName.trim() && editName !== profile?.name) {
      updateProfile({ name: editName });
      
      // Update local profile state too
      if (profile) {
        setProfile({
          ...profile,
          name: editName
        });
      }
    }
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-muted-foreground dark:text-gray-400">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 gap-6 lg:grid-cols-3"
      >
        {/* Personal Info Card */}
        <Card className="lg:col-span-1 dark:border-gray-700 dark:bg-gray-800">
          <CardHeader className="flex flex-row items-center gap-4 pb-2">
            <Avatar className="h-16 w-16">
              <AvatarImage src="" alt={profile?.name} />
              <AvatarFallback className="text-lg">{profile?.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
            </Avatar>
            <div className="flex flex-1 flex-col">
              {isEditing ? (
                <div className="flex items-center gap-2">
                  <Input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="h-8"
                  />
                  <Button size="sm" variant="ghost" onClick={handleSaveName}>
                    <Save className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <CardTitle>{profile?.name}</CardTitle>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => setIsEditing(true)}
                    className="ml-2 h-6 w-6 p-0"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                </div>
              )}
              <CardDescription>{profile?.studentId}</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground dark:text-gray-400">Program</h3>
              <p className="text-sm dark:text-white">{profile?.program}</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground dark:text-gray-400">Batch</h3>
              <p className="text-sm dark:text-white">{profile?.batch}</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground dark:text-gray-400">Blood Group</h3>
              <p className="text-sm dark:text-white">{profile?.bloodGroup}</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground dark:text-gray-400">Gender</h3>
              <p className="text-sm dark:text-white">{profile?.gender}</p>
            </div>
          </CardContent>
        </Card>

        {/* Contact & Bio Card */}
        <Card className="lg:col-span-2 dark:border-gray-700 dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="dark:text-white">Personal Information</CardTitle>
            <CardDescription className="dark:text-gray-400">Your personal and contact details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 dark:bg-primary/20">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium dark:text-white">Email</p>
                  <p className="text-sm text-muted-foreground dark:text-gray-400">{profile?.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 dark:bg-primary/20">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium dark:text-white">Phone</p>
                  <p className="text-sm text-muted-foreground dark:text-gray-400">{profile?.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 dark:bg-primary/20">
                  <CalendarIcon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium dark:text-white">Date of Birth</p>
                  <p className="text-sm text-muted-foreground dark:text-gray-400">{profile?.dateOfBirth} (Age: {profile?.age})</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 dark:bg-primary/20">
                  <IdCard className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium dark:text-white">Aadhar Number</p>
                  <p className="text-sm text-muted-foreground dark:text-gray-400">{profile?.aadharNumber}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 dark:bg-primary/20">
                  <Book className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium dark:text-white">Mother Tongue</p>
                  <p className="text-sm text-muted-foreground dark:text-gray-400">{profile?.motherTongue}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 dark:bg-primary/20">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium dark:text-white">Birth Place</p>
                  <p className="text-sm text-muted-foreground dark:text-gray-400">{profile?.birthPlace}</p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-medium dark:text-white">Current Address</h3>
              <p className="mt-1 text-sm text-muted-foreground dark:text-gray-400">{profile?.address}</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Profile;
