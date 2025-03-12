
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
  DialogClose,
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
import { Label } from "@/components/ui/label";
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
  ChevronDown,
  IndianRupee,
  Receipt,
  Calendar,
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

type PaymentMethodType = "credit_card" | "debit_card" | "net_banking" | "upi";

const Fees = () => {
  const [selectedSemester, setSelectedSemester] = useState<string>("current");
  const [selectedFees, setSelectedFees] = useState<string[]>([]);
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [selectedFeeForPayment, setSelectedFeeForPayment] = useState<FeeType | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>("credit_card");
  const [cardNumber, setCardNumber] = useState<string>("");
  const [expiryDate, setExpiryDate] = useState<string>("");
  const [cvv, setCvv] = useState<string>("");
  const [nameOnCard, setNameOnCard] = useState<string>("");
  const [upiId, setUpiId] = useState<string>("");
  const [bankAccount, setBankAccount] = useState<string>("");
  const [transactions, setTransactions] = useState<TransactionType[]>([
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
  const [showReceipt, setShowReceipt] = useState<boolean>(false);
  const [currentReceipt, setCurrentReceipt] = useState<TransactionType | null>(null);

  const semesters: SemesterType[] = [
    { id: "current", name: "Current Semester (2023-2024)" },
    { id: "prev1", name: "Previous Semester (2022-2023)" },
    { id: "prev2", name: "Previous Semester (2021-2022)" },
  ];

  const [currentFees, setCurrentFees] = useState<FeeType[]>([
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

  // Open payment dialog for a specific fee
  const openPaymentDialog = (fee: FeeType) => {
    setSelectedFeeForPayment(fee);
    // Reset payment form
    setPaymentMethod("credit_card");
    setCardNumber("");
    setExpiryDate("");
    setCvv("");
    setNameOnCard("");
    setUpiId("");
    setBankAccount("");
  };

  // Handle payment process for multiple fees
  const handleBulkPayment = () => {
    const feesToPay = currentFees.filter(fee => selectedFees.includes(fee.id));
    
    if (feesToPay.length === 0) {
      toast.error("Please select at least one fee to pay");
      return;
    }
    
    // Take the first fee as the "representative" fee for the bulk payment
    openPaymentDialog({
      ...feesToPay[0],
      amount: feesToPay.reduce((sum, fee) => sum + fee.amount, 0),
      type: `Multiple Fees (${feesToPay.length})`,
    });
  };

  // Handle payment submission
  const handlePaymentSubmit = () => {
    if (!selectedFeeForPayment) return;

    // Validate payment information based on payment method
    if (paymentMethod === "credit_card" || paymentMethod === "debit_card") {
      if (!cardNumber || !expiryDate || !cvv || !nameOnCard) {
        toast.error("Please fill in all card details");
        return;
      }
    } else if (paymentMethod === "upi") {
      if (!upiId) {
        toast.error("Please enter UPI ID");
        return;
      }
    } else if (paymentMethod === "net_banking") {
      if (!bankAccount) {
        toast.error("Please enter bank account number");
        return;
      }
    }

    // Generate a random transaction ID
    const transactionId = "TXN" + Math.floor(Math.random() * 1000000000);
    
    // Create a new transaction record
    const newTransaction: TransactionType = {
      id: `trans-${transactions.length + 1}`,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      amount: selectedFeeForPayment.amount,
      description: selectedFeeForPayment.type,
      paymentMethod: paymentMethod === "credit_card" ? "Credit Card" : 
                     paymentMethod === "debit_card" ? "Debit Card" : 
                     paymentMethod === "upi" ? "UPI" : "Net Banking",
      transactionId: transactionId,
    };
    
    // Add transaction to history
    setTransactions([newTransaction, ...transactions]);
    
    // Update fee status if it's a single fee payment
    if (selectedFeeForPayment.id !== undefined) {
      const updatedFees = currentFees.map(fee => {
        if (selectedFeeForPayment.id === fee.id) {
          return { ...fee, status: "paid" as const };
        }
        return fee;
      });
      setCurrentFees(updatedFees);
    }
    
    // If it was a bulk payment (multiple fees)
    if (selectedFeeForPayment.type.includes("Multiple Fees")) {
      const updatedFees = currentFees.map(fee => {
        if (selectedFees.includes(fee.id)) {
          return { ...fee, status: "paid" as const };
        }
        return fee;
      });
      setCurrentFees(updatedFees);
      setSelectedFees([]);
    }
    
    // Show success message
    toast.success(`Payment of ₹${selectedFeeForPayment.amount.toLocaleString()} successful`, {
      description: `Transaction ID: ${transactionId}`,
    });
    
    // Show receipt
    setCurrentReceipt(newTransaction);
    setShowReceipt(true);
    
    // Reset payment dialog
    setSelectedFeeForPayment(null);
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

  // Close receipt dialog
  const closeReceipt = () => {
    setShowReceipt(false);
    setCurrentReceipt(null);
  };

  // Function to download receipt as PDF (simulated)
  const downloadReceipt = () => {
    if (!currentReceipt) return;
    
    toast.success("Receipt downloaded successfully", {
      description: "The receipt has been saved to your downloads folder.",
    });
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
                          {fee.status !== "paid" ? (
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button size="sm" variant="outline" onClick={() => openPaymentDialog(fee)}>
                                  Pay Now
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                  <DialogTitle className="flex items-center gap-2">
                                    {fee.icon}
                                    {fee.type} Payment
                                  </DialogTitle>
                                  <DialogDescription>
                                    Enter payment details to complete the transaction
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                  <div className="grid gap-2">
                                    <Label htmlFor="amount">Amount</Label>
                                    <div className="flex items-center rounded-md border px-3 py-2 bg-muted/50">
                                      <IndianRupee className="h-4 w-4 text-muted-foreground mr-2" />
                                      <span className="font-medium">{fee.amount.toLocaleString()}</span>
                                    </div>
                                  </div>
                                  <div className="grid gap-2">
                                    <Label htmlFor="payment-method">Payment Method</Label>
                                    <Select 
                                      value={paymentMethod} 
                                      onValueChange={(value) => setPaymentMethod(value as PaymentMethodType)}
                                    >
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select payment method" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="credit_card">Credit Card</SelectItem>
                                        <SelectItem value="debit_card">Debit Card</SelectItem>
                                        <SelectItem value="net_banking">Net Banking</SelectItem>
                                        <SelectItem value="upi">UPI</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>

                                  {(paymentMethod === "credit_card" || paymentMethod === "debit_card") && (
                                    <>
                                      <div className="grid gap-2">
                                        <Label htmlFor="card-number">Card Number</Label>
                                        <Input 
                                          id="card-number" 
                                          placeholder="1234 5678 9012 3456" 
                                          value={cardNumber}
                                          onChange={(e) => setCardNumber(e.target.value)}
                                        />
                                      </div>
                                      <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                          <Label htmlFor="expiry">Expiry Date</Label>
                                          <Input 
                                            id="expiry" 
                                            placeholder="MM/YY" 
                                            value={expiryDate}
                                            onChange={(e) => setExpiryDate(e.target.value)}
                                          />
                                        </div>
                                        <div className="grid gap-2">
                                          <Label htmlFor="cvv">CVV</Label>
                                          <Input 
                                            id="cvv" 
                                            placeholder="123" 
                                            value={cvv}
                                            onChange={(e) => setCvv(e.target.value)}
                                          />
                                        </div>
                                      </div>
                                      <div className="grid gap-2">
                                        <Label htmlFor="card-name">Name on Card</Label>
                                        <Input 
                                          id="card-name" 
                                          placeholder="John Doe" 
                                          value={nameOnCard}
                                          onChange={(e) => setNameOnCard(e.target.value)}
                                        />
                                      </div>
                                    </>
                                  )}

                                  {paymentMethod === "upi" && (
                                    <div className="grid gap-2">
                                      <Label htmlFor="upi-id">UPI ID</Label>
                                      <Input 
                                        id="upi-id" 
                                        placeholder="yourname@upi" 
                                        value={upiId}
                                        onChange={(e) => setUpiId(e.target.value)}
                                      />
                                    </div>
                                  )}

                                  {paymentMethod === "net_banking" && (
                                    <div className="grid gap-2">
                                      <Label htmlFor="bank-account">Bank Account Number</Label>
                                      <Input 
                                        id="bank-account" 
                                        placeholder="Enter account number" 
                                        value={bankAccount}
                                        onChange={(e) => setBankAccount(e.target.value)}
                                      />
                                    </div>
                                  )}
                                </div>
                                <DialogFooter>
                                  <DialogClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                  </DialogClose>
                                  <Button type="submit" onClick={handlePaymentSubmit}>Pay Now</Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          ) : (
                            <Button size="sm" variant="outline" onClick={() => {
                              const transaction = transactions.find(t => t.description === fee.type);
                              if (transaction) {
                                setCurrentReceipt(transaction);
                                setShowReceipt(true);
                              }
                            }}>
                              <Receipt className="mr-1 h-3.5 w-3.5" /> Receipt
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
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        disabled={selectedFees.length === 0}
                        onClick={handleBulkPayment}
                      >
                        Pay Selected Fees (₹{selectedFeesTotal.toLocaleString()})
                      </Button>
                    </DialogTrigger>
                  </Dialog>
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
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="h-8" 
                            onClick={() => {
                              setCurrentReceipt(transaction);
                              setShowReceipt(true);
                            }}
                          >
                            <Receipt className="mr-1 h-3.5 w-3.5" /> View
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

      {/* Receipt Dialog */}
      <Dialog open={showReceipt} onOpenChange={setShowReceipt}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Receipt className="h-5 w-5" /> Payment Receipt
            </DialogTitle>
            <DialogDescription>
              Receipt for payment made on {currentReceipt?.date}
            </DialogDescription>
          </DialogHeader>
          {currentReceipt && (
            <div className="border rounded-lg p-6 space-y-4">
              <div className="flex justify-between items-center border-b pb-4">
                <div className="font-semibold text-lg">University Payment Receipt</div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" /> {currentReceipt.date}
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Receipt No:</span>
                  <span className="font-medium">{currentReceipt.id.replace("trans-", "RCP-")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Student Name:</span>
                  <span className="font-medium">John Doe</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Student ID:</span>
                  <span className="font-medium">STU123456</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Fee Type:</span>
                  <span className="font-medium">{currentReceipt.description}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payment Method:</span>
                  <span className="font-medium">{currentReceipt.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Transaction ID:</span>
                  <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
                    {currentReceipt.transactionId}
                  </code>
                </div>
              </div>
              
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between text-lg">
                  <span className="font-medium">Total Amount Paid:</span>
                  <span className="font-bold">₹{currentReceipt.amount.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="border-t pt-4 mt-4 text-center text-xs text-muted-foreground">
                <p>This is a computer generated receipt and does not require a signature.</p>
                <p>For any queries, please contact the accounts department.</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={closeReceipt}>Close</Button>
            <Button onClick={downloadReceipt}>
              <Download className="mr-2 h-4 w-4" /> Download Receipt
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Fees;
