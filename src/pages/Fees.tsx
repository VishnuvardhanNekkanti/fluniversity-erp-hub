
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { CreditCard, Download, History, AlertCircle, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

type FeeType = {
  id: string;
  type: string;
  amount: number;
  dueDate: string;
  status: "paid" | "pending" | "overdue";
};

type TransactionType = {
  id: string;
  date: string;
  amount: number;
  description: string;
  paymentMethod: string;
  transactionId: string;
};

const Fees = () => {
  const [currentFees] = useState<FeeType[]>([
    {
      id: "fee-1",
      type: "Tuition Fee",
      amount: 45000,
      dueDate: "September 30, 2023",
      status: "pending",
    },
    {
      id: "fee-2",
      type: "Library Fee",
      amount: 2000,
      dueDate: "September 30, 2023",
      status: "paid",
    },
    {
      id: "fee-3",
      type: "Laboratory Fee",
      amount: 5000,
      dueDate: "September 30, 2023",
      status: "pending",
    },
    {
      id: "fee-4",
      type: "Transportation Fee",
      amount: 8000,
      dueDate: "October 15, 2023",
      status: "pending",
    },
    {
      id: "fee-5",
      type: "Examination Fee",
      amount: 3500,
      dueDate: "November 10, 2023",
      status: "pending",
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

  // Calculate total pending
  const totalPending = currentFees
    .filter((fee) => fee.status !== "paid")
    .reduce((sum, fee) => sum + fee.amount, 0);

  // Handle payment process
  const handlePayment = (feesSelected: FeeType[]) => {
    const totalAmount = feesSelected.reduce((sum, fee) => sum + fee.amount, 0);
    
    toast.success(`Payment of ₹${totalAmount.toLocaleString()} initiated`, {
      description: "You will be redirected to the payment gateway.",
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
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" /> Fee Summary
            </CardTitle>
            <CardDescription>Current academic year fees</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-lg border bg-card p-4">
                <div className="text-sm text-muted-foreground">Total Fees</div>
                <div className="mt-1 text-2xl font-bold">
                  ₹{(
                    currentFees.reduce((sum, fee) => sum + fee.amount, 0)
                  ).toLocaleString()}
                </div>
              </div>
              <div className="rounded-lg border bg-card p-4">
                <div className="text-sm text-muted-foreground">Paid Amount</div>
                <div className="mt-1 text-2xl font-bold text-green-600">
                  ₹{(
                    currentFees
                      .filter((fee) => fee.status === "paid")
                      .reduce((sum, fee) => sum + fee.amount, 0)
                  ).toLocaleString()}
                </div>
              </div>
              <div className="rounded-lg border bg-card p-4">
                <div className="text-sm text-muted-foreground">Pending Amount</div>
                <div className="mt-1 text-2xl font-bold text-amber-600">
                  ₹{totalPending.toLocaleString()}
                </div>
              </div>
            </div>

            {totalPending > 0 && (
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                <div className="flex gap-3 text-amber-800">
                  <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Payment Due</h4>
                    <p className="text-sm">
                      You have pending fees of ₹{totalPending.toLocaleString()}. Please make the payment before the due date to avoid late fees.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      <Tabs defaultValue="current">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <TabsList className="mb-4">
            <TabsTrigger value="current">Current Fees</TabsTrigger>
            <TabsTrigger value="history">Payment History</TabsTrigger>
          </TabsList>
        </motion.div>

        <TabsContent value="current">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Fee Details (2023-2024)</CardTitle>
                <CardDescription>
                  Current academic year fee structure
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fee Type</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentFees.map((fee) => (
                      <TableRow key={fee.id}>
                        <TableCell className="font-medium">{fee.type}</TableCell>
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
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button size="sm" variant="outline">
                                  Pay Now
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Pay {fee.type}</DialogTitle>
                                  <DialogDescription>
                                    Complete your payment through our secure payment gateway
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                  <div className="rounded-lg border p-4">
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">Fee Type:</span>
                                      <span className="font-medium">{fee.type}</span>
                                    </div>
                                    <div className="mt-2 flex justify-between">
                                      <span className="text-muted-foreground">Amount:</span>
                                      <span className="font-medium">₹{fee.amount.toLocaleString()}</span>
                                    </div>
                                    <div className="mt-2 flex justify-between">
                                      <span className="text-muted-foreground">Due Date:</span>
                                      <span className="font-medium">{fee.dueDate}</span>
                                    </div>
                                  </div>
                                  <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                                    <h4 className="font-medium text-primary">Payment Methods</h4>
                                    <ul className="mt-2 space-y-2 text-sm">
                                      <li>• Credit/Debit Card</li>
                                      <li>• Net Banking</li>
                                      <li>• UPI</li>
                                      <li>• Wallet</li>
                                    </ul>
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button
                                    onClick={() => handlePayment([fee])}
                                    className="w-full sm:w-auto"
                                  >
                                    Proceed to Payment
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
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
                    Total pending: <span className="font-medium">₹{totalPending.toLocaleString()}</span>
                  </p>
                </div>
                {totalPending > 0 && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>Pay All Pending Fees</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Pay All Pending Fees</DialogTitle>
                        <DialogDescription>
                          Complete your payment through our secure payment gateway
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="rounded-lg border p-4">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Total Amount:</span>
                            <span className="font-medium">₹{totalPending.toLocaleString()}</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          {currentFees
                            .filter((fee) => fee.status !== "paid")
                            .map((fee) => (
                              <div key={fee.id} className="flex justify-between text-sm">
                                <span>{fee.type}</span>
                                <span>₹{fee.amount.toLocaleString()}</span>
                              </div>
                            ))}
                        </div>
                        <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                          <h4 className="font-medium text-primary">Payment Methods</h4>
                          <ul className="mt-2 space-y-2 text-sm">
                            <li>• Credit/Debit Card</li>
                            <li>• Net Banking</li>
                            <li>• UPI</li>
                            <li>• Wallet</li>
                          </ul>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          onClick={() => handlePayment(currentFees.filter((fee) => fee.status !== "paid"))}
                          className="w-full sm:w-auto"
                        >
                          Proceed to Payment
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="history">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="h-5 w-5" /> Payment History
                </CardTitle>
                <CardDescription>
                  Record of all previous fee payments
                </CardDescription>
              </CardHeader>
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
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Fees;
