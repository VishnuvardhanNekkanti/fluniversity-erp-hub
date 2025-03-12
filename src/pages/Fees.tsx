
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  CreditCard, 
  Download, 
  History, 
  AlertCircle, 
  CheckCircle2, 
  Bus, 
  GraduationCap, 
  Library, 
  Trophy, 
  FileText,
  Filter,
  ChevronDown
} from "lucide-react";
import { toast } from "sonner";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

type FeeType = {
  id: string;
  type: string;
  amount: number;
  dueDate: string;
  status: "paid" | "pending" | "overdue";
  icon: React.ReactNode;
  category: "tuition" | "transport" | "sports" | "certification" | "other";
};

type TransactionType = {
  id: string;
  date: string;
  amount: number;
  description: string;
  paymentMethod: string;
  transactionId: string;
};

type SemesterType = {
  id: string;
  name: string;
};

const Fees = () => {
  const [selectedSemester, setSelectedSemester] = useState<string>("current");
  const [selectedFees, setSelectedFees] = useState<string[]>([]);
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [showHistory, setShowHistory] = useState<boolean>(false);

  const semesters: SemesterType[] = [
    { id: "current", name: "Current Semester (2023-2024)" },
    { id: "prev1", name: "Previous Semester (2022-2023)" },
    { id: "prev2", name: "Previous Semester (2021-2022)" },
  ];

  const [currentFees] = useState<FeeType[]>([
    {
      id: "fee-1",
      type: "Tuition Fee",
      amount: 45000,
      dueDate: "September 30, 2023",
      status: "pending",
      icon: <GraduationCap className="h-4 w-4" />,
      category: "tuition"
    },
    {
      id: "fee-2",
      type: "Library Fee",
      amount: 2000,
      dueDate: "September 30, 2023",
      status: "paid",
      icon: <Library className="h-4 w-4" />,
      category: "other"
    },
    {
      id: "fee-3",
      type: "Laboratory Fee",
      amount: 5000,
      dueDate: "September 30, 2023",
      status: "pending",
      icon: <FileText className="h-4 w-4" />,
      category: "other"
    },
    {
      id: "fee-4",
      type: "Transportation Fee",
      amount: 8000,
      dueDate: "October 15, 2023",
      status: "pending",
      icon: <Bus className="h-4 w-4" />,
      category: "transport"
    },
    {
      id: "fee-5",
      type: "Examination Fee",
      amount: 3500,
      dueDate: "November 10, 2023",
      status: "pending",
      icon: <FileText className="h-4 w-4" />,
      category: "other"
    },
    {
      id: "fee-6",
      type: "Sports Fee",
      amount: 2500,
      dueDate: "October 30, 2023",
      status: "pending",
      icon: <Trophy className="h-4 w-4" />,
      category: "sports"
    },
    {
      id: "fee-7",
      type: "Certification Fee",
      amount: 1500,
      dueDate: "December 15, 2023",
      status: "pending",
      icon: <FileText className="h-4 w-4" />,
      category: "certification"
    },
  ]);

  const [transactions] = useState<TransactionType[]>([
    {
      id: "trans-1",
      date: "August 15, 2023",
      amount: 2000,
      description: "Library Fee",
      paymentMethod: "Net Banking",
      transactionId: "TXN123456789",
    },
    {
      id: "trans-2",
      date: "July 20, 2023",
      amount: 45000,
      description: "Tuition Fee (Previous Semester)",
      paymentMethod: "Credit Card",
      transactionId: "TXN987654321",
    },
    {
      id: "trans-3",
      date: "July 20, 2023",
      amount: 5000,
      description: "Laboratory Fee (Previous Semester)",
      paymentMethod: "Credit Card",
      transactionId: "TXN987654322",
    },
  ]);

  // Calculate totals
  const totalFees = currentFees.reduce((sum, fee) => sum + fee.amount, 0);
  const paidFees = currentFees
    .filter((fee) => fee.status === "paid")
    .reduce((sum, fee) => sum + fee.amount, 0);
  const pendingFees = currentFees
    .filter((fee) => fee.status !== "paid")
    .reduce((sum, fee) => sum + fee.amount, 0);

  // Calculate selected fees total
  const selectedFeesTotal = currentFees
    .filter((fee) => selectedFees.includes(fee.id) && fee.status !== "paid")
    .reduce((sum, fee) => sum + fee.amount, 0);

  // Handle select/deselect all
  const handleSelectAll = () => {
    const filteredFees = filterCategory === "all" 
      ? currentFees.filter(fee => fee.status !== "paid")
      : currentFees.filter(fee => fee.status !== "paid" && fee.category === filterCategory);
    
    if (selectedFees.length === filteredFees.length) {
      setSelectedFees([]);
    } else {
      setSelectedFees(filteredFees.map(fee => fee.id));
    }
  };

  // Handle checkbox change
  const handleCheckboxChange = (feeId: string) => {
    if (selectedFees.includes(feeId)) {
      setSelectedFees(selectedFees.filter(id => id !== feeId));
    } else {
      setSelectedFees([...selectedFees, feeId]);
    }
  };

  // Handle payment process
  const handlePayment = () => {
    const feesToPay = currentFees.filter(fee => selectedFees.includes(fee.id));
    const totalAmount = feesToPay.reduce((sum, fee) => sum + fee.amount, 0);
    
    if (feesToPay.length === 0) {
      toast.error("Please select at least one fee to pay");
      return;
    }
    
    toast.success(`Payment of ₹${totalAmount.toLocaleString()} initiated`, {
      description: "You will be redirected to the payment gateway.",
    });
  };

  // Get filtered fees
  const getFilteredFees = () => {
    if (filterCategory === "all") {
      return currentFees;
    }
    return currentFees.filter(fee => fee.category === filterCategory);
  };

  // Toggle payment history view
  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-3xl font-bold tracking-tight">Fees & Payments</h2>
        <p className="text-muted-foreground">
          Manage your fee payments and view transaction history
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" /> Fee Summary
              </CardTitle>
              <CardDescription>Current academic year fees</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Select 
                value={selectedSemester} 
                onValueChange={setSelectedSemester}
              >
                <SelectTrigger className="w-[240px]">
                  <SelectValue placeholder="Select semester" />
                </SelectTrigger>
                <SelectContent>
                  {semesters.map(semester => (
                    <SelectItem key={semester.id} value={semester.id}>
                      {semester.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-lg border bg-card p-4">
                <div className="text-sm text-muted-foreground">Total Fees</div>
                <div className="mt-1 text-2xl font-bold">
                  ₹{totalFees.toLocaleString()}
                </div>
              </div>
              <div className="rounded-lg border bg-card p-4">
                <div className="text-sm text-muted-foreground">Paid Amount</div>
                <div className="mt-1 text-2xl font-bold text-green-600">
                  ₹{paidFees.toLocaleString()}
                </div>
              </div>
              <div className="rounded-lg border bg-card p-4">
                <div className="text-sm text-muted-foreground">Pending Amount</div>
                <div className="mt-1 text-2xl font-bold text-amber-600">
                  ₹{pendingFees.toLocaleString()}
                </div>
              </div>
            </div>

            {pendingFees > 0 && (
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                <div className="flex gap-3 text-amber-800">
                  <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Payment Due</h4>
                    <p className="text-sm">
                      You have pending fees of ₹{pendingFees.toLocaleString()}. Please make the payment before the due date to avoid late fees.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Fee Details (2023-2024)</CardTitle>
              <CardDescription>
                Current academic year fee structure
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={toggleHistory}
              >
                <History className="mr-2 h-4 w-4" />
                {showHistory ? "Hide History" : "Payment History"}
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    {filterCategory === "all" ? "All Categories" : 
                      filterCategory.charAt(0).toUpperCase() + filterCategory.slice(1)} 
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuItem onClick={() => setFilterCategory("all")}>
                    All Categories
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterCategory("tuition")}>
                    <GraduationCap className="mr-2 h-4 w-4" /> Tuition
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterCategory("transport")}>
                    <Bus className="mr-2 h-4 w-4" /> Transport
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterCategory("sports")}>
                    <Trophy className="mr-2 h-4 w-4" /> Sports
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterCategory("certification")}>
                    <FileText className="mr-2 h-4 w-4" /> Certification
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterCategory("other")}>
                    <Library className="mr-2 h-4 w-4" /> Other
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>

          <Collapsible open={!showHistory} className="w-full">
            <CollapsibleContent>
              <CardContent>
                <div className="mb-4 flex justify-between items-center">
                  <Button 
                    variant="outline" 
                    onClick={handleSelectAll}
                    size="sm"
                  >
                    {selectedFees.length === getFilteredFees().filter(fee => fee.status !== "paid").length 
                      ? "Deselect All" 
                      : "Select All"}
                  </Button>
                  <div className="text-sm text-muted-foreground">
                    Selected: <span className="font-medium">₹{selectedFeesTotal.toLocaleString()}</span>
                  </div>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">Select</TableHead>
                      <TableHead>Fee Type</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getFilteredFees().map((fee) => (
                      <TableRow key={fee.id}>
                        <TableCell>
                          {fee.status !== "paid" && (
                            <Checkbox 
                              checked={selectedFees.includes(fee.id)}
                              onCheckedChange={() => handleCheckboxChange(fee.id)}
                            />
                          )}
                        </TableCell>
                        <TableCell className="font-medium flex items-center gap-2">
                          {fee.icon}
                          {fee.type}
                        </TableCell>
                        <TableCell className="capitalize">{fee.category}</TableCell>
                        <TableCell>₹{fee.amount.toLocaleString()}</TableCell>
                        <TableCell>{fee.dueDate}</TableCell>
                        <TableCell>
                          {fee.status === "paid" ? (
                            <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                              <CheckCircle2 className="mr-1 h-3 w-3" /> Paid
                            </Badge>
                          ) : fee.status === "overdue" ? (
                            <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50">
                              Overdue
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-50">
                              Pending
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          {fee.status !== "paid" && (
                            <Button size="sm" variant="outline">
                              Details
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="flex justify-between border-t px-6 py-4">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Total pending: <span className="font-medium">₹{pendingFees.toLocaleString()}</span>
                  </p>
                </div>
                {pendingFees > 0 && (
                  <Button 
                    disabled={selectedFees.length === 0}
                    onClick={handlePayment}
                  >
                    Pay Selected Fees (₹{selectedFeesTotal.toLocaleString()})
                  </Button>
                )}
              </CardFooter>
            </CollapsibleContent>
          </Collapsible>

          <Collapsible open={showHistory} className="w-full">
            <CollapsibleContent>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Payment Method</TableHead>
                      <TableHead>Transaction ID</TableHead>
                      <TableHead className="text-right">Receipt</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>{transaction.date}</TableCell>
                        <TableCell>{transaction.description}</TableCell>
                        <TableCell>₹{transaction.amount.toLocaleString()}</TableCell>
                        <TableCell>{transaction.paymentMethod}</TableCell>
                        <TableCell>
                          <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
                            {transaction.transactionId}
                          </code>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button size="sm" variant="outline" className="h-8">
                            <Download className="mr-1 h-3.5 w-3.5" /> Receipt
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>
      </motion.div>
    </div>
  );
};

export default Fees;
