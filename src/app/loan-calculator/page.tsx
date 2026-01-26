"use client";

import { useState, useMemo } from "react";
import WidthConstraint from "@/components/ui/width-constraint";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";


type LoanType = "CAGD" | "PremiumShield";

type CalculationResult =
    | {
        type: "CAGD";
        principal: number;
        totalInterest: number;
        fees: {
            insurance: number;
            processing: number;
            cagd: number;
            total: number;
        };
        repayment: {
            total: number;
            monthly: number;
        };
    }
    | {
        type: "PremiumShield";
        principal: number;
        totalInterest: number;
        fees: {
            processing: number;
            sticker?: number; // Present if Motor Policy is checked
            total: number;
        };
        repayment: {
            total: number;
            monthlyBase: number;
            first: number;
            totalInterest?: never;
        };
        meta: {
            rateUsed: number;
            feeUsed: number;
            isMotorPolicy: boolean;
        };
    };

export default function LoanCalculatorPage() {
    const [loanType, setLoanType] = useState<LoanType>("CAGD");
    const [isMotorPolicy, setIsMotorPolicy] = useState(false);
    const [amount, setAmount] = useState<number | "">("");
    const [tenure, setTenure] = useState<number | "">(1);
    const [isCustomTenure, setIsCustomTenure] = useState(false);

    // --- Constants & Logic ---

    // CAGD Constants
    const CAGD_RATE = 0.03; // 3.0%
    const CAGD_INSURANCE_RATE = 0.006; // 0.6%
    const CAGD_PROCESSING_RATE = 0.07; // 7.0%
    const CAGD_FEE_RATE = 0.03; // 3.0% of Subtotal

    // PremiumShield Logic
    // Rates based on amount brackets
    const getPremiumShieldRates = (amt: number) => {
        if (amt >= 5001) return { rate: 0.025, fee: 0.02 };
        if (amt >= 2001) return { rate: 0.03, fee: 0.02 };
        if (amt >= 531) return { rate: 0.035, fee: 0.02 };
        if (amt === 530) return { rate: 0.04, fee: 0.04 };
        // Default fallback
        return { rate: 0.04, fee: 0.04 };
    };

    const results: CalculationResult | null = useMemo(() => {
        const principal = Number(amount);
        const months = Number(tenure);

        if (!principal || !months) return null;

        if (loanType === "CAGD") {
            const totalInterest = principal * CAGD_RATE * months;

            const insuranceFee = principal * CAGD_INSURANCE_RATE;
            const processingFee = principal * CAGD_PROCESSING_RATE;
            const totalUpfrontFees = insuranceFee + processingFee;

            const subtotalRepayment = principal + totalInterest + totalUpfrontFees;
            const cagdFee = subtotalRepayment * CAGD_FEE_RATE;

            const finalTotalRepayment = subtotalRepayment + cagdFee;
            const monthlyInstalment = finalTotalRepayment / months;

            return {
                type: "CAGD",
                principal,
                totalInterest,
                fees: {
                    insurance: insuranceFee,
                    processing: processingFee,
                    cagd: cagdFee,
                    total: totalUpfrontFees + cagdFee,
                },
                repayment: {
                    total: finalTotalRepayment,
                    monthly: monthlyInstalment,
                },
            };
        } else {
            // PremiumShield logic
            const { rate, fee } = getPremiumShieldRates(principal);

            const processingFee = principal * fee;
            const totalInterest = principal * rate * months;

            // Motor Policy Sticker Fee logic (Only if PremiumShield + Checked)
            const stickerFee = isMotorPolicy ? 52 : 0;

            const totalFees = processingFee + stickerFee;
            const totalRepayment = principal + totalInterest + totalFees;

            const baseMonthly = (principal + totalInterest) / months;
            const firstInstalment = baseMonthly + processingFee + stickerFee;

            return {
                type: "PremiumShield",
                principal,
                totalInterest,
                fees: {
                    processing: processingFee,
                    sticker: stickerFee > 0 ? stickerFee : undefined,
                    total: totalFees,
                },
                repayment: {
                    total: totalRepayment,
                    monthlyBase: baseMonthly,
                    first: firstInstalment,
                },
                meta: {
                    rateUsed: rate,
                    feeUsed: fee,
                    isMotorPolicy: isMotorPolicy,
                },
            };
        }
    }, [loanType, amount, tenure, isMotorPolicy]);

    const currencyFormatter = new Intl.NumberFormat("en-GH", {
        style: "currency",
        currency: "GHS",
    });

    const formatMoney = (val: number) => currencyFormatter.format(val);

    return (
        <div className="bg-background-secondary min-h-screen py-10 lg:pt-[120px]">
            <WidthConstraint>
                <div className="flex flex-col gap-4 mb-8 text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-primary">Loan Calculator</h1>
                    <p className="text-muted-foreground text-lg">
                        Estimate your monthly repayments and view a breakdown of fees.
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-8">
                    {/* Input Section */}
                    <div className="lg:col-span-5 flex flex-col gap-6">
                        <Card className="border-border shadow-md">
                            <CardHeader>
                                <CardTitle>Configure Loan</CardTitle>
                                <CardDescription>Select your loan type and terms.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">

                                {/* Loan Type Selector */}
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                            Loan Product
                                        </label>
                                        <div className="grid grid-cols-2 gap-2 p-1 bg-muted rounded-lg">
                                            {(["CAGD", "PremiumShield"] as const).map((type) => (
                                                <button
                                                    key={type}
                                                    onClick={() => {
                                                        setLoanType(type);
                                                        // Reset specific states if needed when switching
                                                        if (type === "CAGD") setIsMotorPolicy(false);
                                                    }}
                                                    className={cn(
                                                        "py-2 px-2 rounded-md text-sm font-medium transition-all whitespace-nowrap",
                                                        loanType === type
                                                            ? "bg-white text-primary shadow-sm"
                                                            : "text-muted-foreground hover:text-foreground"
                                                    )}
                                                >
                                                    {type === "CAGD" ? "CAGD Loan" : "PremiumShield"}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Motor Policy Checkbox (Only for PremiumShield) */}
                                    {loanType === "PremiumShield" && (
                                        <div className="flex items-center space-x-2 border rounded-lg p-3 bg-muted/20">
                                            <Checkbox
                                                id="motor-policy"
                                                checked={isMotorPolicy}
                                                onCheckedChange={(checked) => setIsMotorPolicy(checked as boolean)}
                                            />
                                            <div className="flex flex-col">
                                                <label
                                                    htmlFor="motor-policy"
                                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                    Include Motor Policy
                                                </label>
                                                <span className="text-xs text-muted-foreground mt-1">Adds GHS 52.00 Sticker Fee to first instalment</span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Amount Input */}
                                <div className="space-y-2">
                                    <label htmlFor="amount" className="text-sm font-medium leading-none">
                                        Loan Amount (GHS)
                                    </label>
                                    <Input
                                        id="amount"
                                        type="number"
                                        placeholder="e.g. 5000"
                                        value={amount}
                                        onChange={(e) => setAmount(Number(e.target.value))}
                                        className="h-12 text-lg rounded-lg"
                                    />
                                </div>

                                {/* Tenure Input - Custom Selector with Manual Mode */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium leading-none">
                                        Duration (Months)
                                    </label>

                                    {!isCustomTenure ? (
                                        <div className="grid grid-cols-4 gap-2">
                                            {[1, 2, 3, 4, 5, 6, 9, 12, 18, 24, 36, 48].map((m) => (
                                                <Button
                                                    key={m}
                                                    variant={Number(tenure) === m ? "default" : "outline"}
                                                    onClick={() => setTenure(m)}
                                                    className={cn(
                                                        "h-10 rounded-lg transition-all",
                                                        Number(tenure) === m && "ring-2 ring-primary ring-offset-1"
                                                    )}
                                                >
                                                    {m}
                                                </Button>
                                            ))}
                                            <Button
                                                variant="outline"
                                                onClick={() => setIsCustomTenure(true)}
                                                className="h-10 rounded-lg border-dashed"
                                            >
                                                Custom
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="flex gap-2">
                                            <Input
                                                type="number"
                                                placeholder="Enter months..."
                                                value={tenure}
                                                onChange={(e) => setTenure(Number(e.target.value))}
                                                className="h-12 text-lg"
                                                autoFocus
                                            />
                                            <Button
                                                variant="outline"
                                                className="h-12 px-6"
                                                onClick={() => setIsCustomTenure(false)}
                                            >
                                                Preset
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Loan Definitions Card - Desktop Only */}
                        <div className="hidden lg:block">
                            <Card className="bg-muted/30 border shadow-sm">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-base">Loan Types Guide</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4 text-sm">
                                    <div>
                                        <p className="font-semibold text-primary mb-1">CAGD Loan</p>
                                        <p className="text-muted-foreground text-xs leading-relaxed">
                                            Designed specifically for government workers (Fixed 3.0% rate, + insurance coverage).
                                        </p>
                                    </div>
                                    <div className="border-t border-dashed border-border pt-4">
                                        <p className="font-semibold text-primary mb-1">PremiumShield Insurance Loan</p>
                                        <p className="text-muted-foreground text-xs leading-relaxed">
                                            Tiered rates (4.0% - 2.5%) based on volume. <br />Motor Policy includes a fixed GHS 52 Sticker Fee.
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Results Section */}
                    <div className="lg:col-span-7">
                        {results ? (
                            <div className="space-y-6">

                                {/* Main Summary Card */}
                                <Card className="bg-primary text-primary-foreground border-none shadow-lg overflow-hidden relative">
                                    <div className="absolute top-0 right-0 p-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
                                    <CardHeader className="pb-2">
                                        <CardDescription className="text-primary-foreground/80">Estimated Monthly Payment</CardDescription>
                                        <CardTitle className="text-5xl font-bold">
                                            {results.type === "CAGD"
                                                ? formatMoney(results.repayment.monthly)
                                                : formatMoney(results.repayment.monthlyBase)
                                            }
                                            {results.type === "PremiumShield" && <span className="text-lg font-normal opacity-70 ml-2">(Standard)</span>}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        {results.type === "PremiumShield" && (
                                            <div className="mt-2 text-sm bg-white/10 p-2 px-3 rounded inline-block">
                                                First Month: <span className="font-bold">{formatMoney(results.repayment.first)}</span>
                                            </div>
                                        )}
                                        <div className="mt-8 pt-6 border-t border-primary-foreground/20 grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-sm opacity-70">Total Repayment</p>
                                                <p className="text-2xl font-bold">{formatMoney(results.repayment.total)}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm opacity-70">Total Interest</p>
                                                <p className="text-xl font-semibold">{formatMoney(results.totalInterest)}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Breakdown Details */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Fee Breakdown</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="flex justify-between items-center py-2 border-b border-dashed border-border">
                                            <span className="text-muted-foreground">Principal Amount</span>
                                            <span className="font-semibold">{formatMoney(results.principal)}</span>
                                        </div>

                                        {results.type === "CAGD" && (
                                            <>
                                                <div className="flex justify-between items-center py-2 border-b border-dashed border-border">
                                                    <span className="text-muted-foreground">Insurance Fee ({(CAGD_INSURANCE_RATE * 100).toFixed(1)}%)</span>
                                                    <span>{formatMoney(results.fees.insurance)}</span>
                                                </div>
                                                <div className="flex justify-between items-center py-2 border-b border-dashed border-border">
                                                    <span className="text-muted-foreground">Processing Fee ({(CAGD_PROCESSING_RATE * 100).toFixed(1)}%)</span>
                                                    <span>{formatMoney(results.fees.processing)}</span>
                                                </div>
                                                <div className="flex justify-between items-center py-2 border-b border-dashed border-border">
                                                    <span className="text-muted-foreground">CAGD Service Fee</span>
                                                    <span>{formatMoney(results.fees.cagd)}</span>
                                                </div>
                                            </>
                                        )}

                                        {results.type === "PremiumShield" && (
                                            <>
                                                <div className="flex justify-between items-center py-2 border-b border-dashed border-border">
                                                    <span className="text-muted-foreground">
                                                        Processing Fee ({(results.meta.feeUsed * 100).toFixed(0)}%)
                                                    </span>
                                                    <span>{formatMoney(results.fees.processing)}</span>
                                                </div>
                                                {results.fees.sticker && (
                                                    <div className="flex justify-between items-center py-2 border-b border-dashed border-border">
                                                        <span className="text-muted-foreground">
                                                            Sticker Fee
                                                        </span>
                                                        <span>{formatMoney(results.fees.sticker)}</span>
                                                    </div>
                                                )}
                                                <div className="flex justify-between items-center py-2 border-b border-dashed border-border">
                                                    <span className="text-muted-foreground">
                                                        Interest Rate Applied
                                                    </span>
                                                    <span>{(results.meta.rateUsed * 100).toFixed(1)}% / month</span>
                                                </div>
                                            </>
                                        )}

                                        <div className="flex justify-between items-center pt-2">
                                            <span className="font-bold text-foreground">Total Fees</span>
                                            <span className="font-bold">{formatMoney(results.fees.total)}</span>
                                        </div>
                                    </CardContent>
                                </Card>

                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center p-10 text-center text-muted-foreground border-2 border-dashed border-border rounded-xl min-h-[400px]">
                                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                                    <span className="text-2xl">🧮</span>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Ready to Calculate</h3>
                            </div>
                        )}

                        {/* Loan Definitions Card - Mobile Only (Below Results) */}
                        <div className="block lg:hidden mt-8">
                            <Card className="bg-muted/30 border shadow-sm">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-base">Loan Types Guide</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4 text-sm">
                                    <div>
                                        <p className="font-semibold text-primary mb-1">CAGD Loan</p>
                                        <p className="text-muted-foreground text-xs leading-relaxed">
                                            Designed specifically for government workers (Fixed 3.0% rate, + insurance coverage).
                                        </p>
                                    </div>
                                    <div className="border-t border-dashed border-border pt-4">
                                        <p className="font-semibold text-primary mb-1">PremiumShield Insurance Loan</p>
                                        <p className="text-muted-foreground text-xs leading-relaxed">
                                            Tiered rates (4.0% - 2.5%) based on volume. <br />Motor Policy includes a fixed GHS 52 Sticker Fee.
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </WidthConstraint>
        </div>
    );

}
