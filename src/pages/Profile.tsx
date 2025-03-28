
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarIcon, Mail, MapPin, Phone, User, Book, IdCard } from "lucide-react";
import { motion } from "framer-motion";

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
  const { student } = useAuth();
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading profile data
    //setTimeout(() => {
      // Mock data - in a real application, this would come from an API
      setProfile({
        name: student?.name || "Ram",
        studentId: student?.studentId || "kjhglg",
        email: student?.email || "Ram@fluniversity.edu",
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
    //}, 1000);
  }, [student]);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-muted-foreground">Loading profile...</div>
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
        <Card className="lg:col-span-1">
          <CardHeader className="flex flex-row items-center gap-4 pb-2">
            <Avatar className="h-16 w-16">
              <AvatarImage src="" alt={profile?.name} />
              <AvatarFallback className="text-lg">{profile?.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{profile?.name}</CardTitle>
              <CardDescription>{profile?.studentId}</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Program</h3>
              <p className="text-sm">{profile?.program}</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Batch</h3>
              <p className="text-sm">{profile?.batch}</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Blood Group</h3>
              <p className="text-sm">{profile?.bloodGroup}</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Gender</h3>
              <p className="text-sm">{profile?.gender}</p>
            </div>
          </CardContent>
        </Card>

        {/* Contact & Bio Card */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Your personal and contact details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">{profile?.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Phone</p>
                  <p className="text-sm text-muted-foreground">{profile?.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <CalendarIcon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Date of Birth</p>
                  <p className="text-sm text-muted-foreground">{profile?.dateOfBirth} (Age: {profile?.age})</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <IdCard className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Aadhar Number</p>
                  <p className="text-sm text-muted-foreground">{profile?.aadharNumber}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Book className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Mother Tongue</p>
                  <p className="text-sm text-muted-foreground">{profile?.motherTongue}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Birth Place</p>
                  <p className="text-sm text-muted-foreground">{profile?.birthPlace}</p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-medium">Current Address</h3>
              <p className="mt-1 text-sm text-muted-foreground">{profile?.address}</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Profile;
