"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
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
import { Checkbox } from "@/components/ui/checkbox";

type CalculationResult = {
    principal: number;
    totalInterest: number;
    fees: {
        processing: number;
        sticker?: number;
        total: number;
    };
    repayment: {
        total: number;
        monthlyBase: number;
        first: number;
    };
    meta: {
        rateUsed: number;
        feeUsed: number;
        isMotorPolicy: boolean;
        minDeposit?: number;
    };
};

export default function PremiumShieldCalculatorPage() {
    const [isMotorPolicy, setIsMotorPolicy] = useState(false);
    const [amount, setAmount] = useState<number | "">("");
    const [tenure, setTenure] = useState<number | "">(1);
    const [isCustomTenure, setIsCustomTenure] = useState(false);
    const [userDeposit, setUserDeposit] = useState<number | "">("");

    // --- PremiumShield Logic ---

    // Rates based on amount brackets
    const getPremiumShieldRates = (amt: number) => {
        if (amt >= 5001) return { rate: 0.025, fee: 0.02 };
        if (amt >= 2001) return { rate: 0.03, fee: 0.02 };
        if (amt >= 531) return { rate: 0.035, fee: 0.02 };
        if (amt <= 530) return { rate: 0.04, fee: 0.02 }; // Updated fee to 0.02 based on table
        // Default fallback
        return { rate: 0.04, fee: 0.02 };
    };

    const results: CalculationResult | null = useMemo(() => {
        const principal = Number(amount);
        const months = Number(tenure);

        if (!principal || !months) return null;

        // PremiumShield logic
        // See LOAN_CALCULATION.md for the exact formulas

        const { rate, fee } = getPremiumShieldRates(principal);
        const r_proc = fee;
        const r_mo = rate;

        // Symbols from spec
        const P = principal;
        const N = months;
        const S = isMotorPolicy ? 52 : 0;
        const D_user = typeof userDeposit === "number" ? userDeposit : 0;

        // Step 1: Calculate Minimum Required Deposit
        // I_1 = P / N
        const I_1 = P / N;

        // F_proc_init = P * r_proc (Processing fee on Total Premium)
        const F_proc_init = P * r_proc;

        // D_min = I_1 + S + F_proc_init (Safe Net)
        const D_min = I_1 + S + F_proc_init;

        // Step 2: Determine Actual First Instalment (Initial Deposit)
        // D_actual = Math.max(D_min, D_user)
        const D_actual = Math.max(D_min, D_user);

        // Step 3: Determine Financed Amount (Actual Loan Amount)
        // L_financed = P - D_actual
        const L_financed = P - D_actual;

        // Step 4: Calculate Actual Fees and Interest based on Financed Amount

        // F_proc = L_financed * r_proc (Actual processing fee on financed amount)
        const F_proc = L_financed * r_proc;

        // V_int = L_financed * r_mo * N (Interest on financed amount)
        const V_int = L_financed * r_mo * N;

        // T_repay = L_financed + V_int
        const T_repay = L_financed + V_int;

        // I_reg = T_repay / N
        const I_reg = T_repay / N;

        return {
            principal,
            totalInterest: V_int,
            fees: {
                processing: F_proc,
                sticker: S > 0 ? S : undefined,
                total: F_proc + S,
            },
            repayment: {
                total: T_repay,
                monthlyBase: I_reg,
                first: D_actual,
            },
            meta: {
                rateUsed: r_mo,
                feeUsed: r_proc,
                isMotorPolicy: isMotorPolicy,
                minDeposit: D_min,
            },
        };
    }, [amount, tenure, isMotorPolicy, userDeposit]);

    const currencyFormatter = new Intl.NumberFormat("en-GH", {
        style: "currency",
        currency: "GHS",
    });

    const formatMoney = (val: number) => currencyFormatter.format(val);

    return (
        <div className="bg-background-secondary min-h-screen pt-28 pb-80 lg:pt-[120px] lg:pb-40">
            <WidthConstraint>
                <div className="flex flex-col gap-4 mb-8 text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-primary">PremiumShield Calculator</h1>
                    <p className="text-muted-foreground text-lg">
                        Estimate your monthly insurance premium repayments and view a breakdown of fees.
                    </p>
                    {/* Disclaimer Added */}
                    <p className="text-xs text-muted-foreground/80 max-w-2xl mx-auto">
                        Disclaimer: The figures provided by this calculator are estimates only and are subject to change based on final approval and verification. Rate and fees are subject to change.
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-8">
                    {/* Input Section */}
                    <div className="lg:col-span-5 flex flex-col gap-6">
                        <Card className="border-border shadow-md">
                            <CardHeader>
                                <CardTitle>Configure PremiumShield</CardTitle>
                                <CardDescription>Enter your premium details and terms.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">

                                {/* Motor Policy Checkbox */}
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

                                {/* Amount Input */}
                                <div className="space-y-2">
                                    <label htmlFor="amount" className="text-sm font-medium leading-none">
                                        Premium Amount (GHS)
                                    </label>
                                    <Input
                                        id="amount"
                                        type="number"
                                        placeholder="e.g. 5000"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value === "" ? "" : Number(e.target.value))}
                                        className="h-12 text-base rounded-lg"
                                    />
                                </div>

                                {/* User Initial Deposit */}
                                <div className="space-y-2 pt-2">
                                    <div className="flex justify-between items-center">
                                        <label htmlFor="userDeposit" className="text-sm font-medium leading-none">
                                            Initial Deposit (Optional)
                                        </label>
                                        {results?.meta.minDeposit && (
                                            <span className="text-xs text-primary font-medium bg-primary/10 px-2 py-1 rounded">
                                                Min Required: {formatMoney(results.meta.minDeposit)}
                                            </span>
                                        )}
                                    </div>
                                    <Input
                                        id="userDeposit"
                                        type="number"
                                        placeholder={results?.meta.minDeposit ? `Min: ${results.meta.minDeposit.toFixed(2)}` : "e.g. 1000"}
                                        min={results?.meta.minDeposit || 0}
                                        value={userDeposit}
                                        onChange={(e) => setUserDeposit(e.target.value === "" ? "" : Number(e.target.value))}
                                        onBlur={() => {
                                            if (results?.meta.minDeposit && (userDeposit === "" || (typeof userDeposit === "number" && userDeposit < results.meta.minDeposit))) {
                                                setUserDeposit(results.meta.minDeposit);
                                            }
                                        }}
                                        className="h-12 text-base rounded-lg"
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        Increase your initial deposit to lower your monthly payments.
                                    </p>
                                </div>

                                {/* Tenure Input - Custom Selector with Manual Mode */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium leading-none">
                                        Duration (Months)
                                    </label>

                                    {!isCustomTenure ? (
                                        <div className="grid grid-cols-4 gap-2 mt-1">
                                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((m) => (
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
                                                onChange={(e) => setTenure(e.target.value === "" ? "" : Number(e.target.value))}
                                                className="h-12 text-base"
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

                        {/* PremiumShield Info Card - Desktop Only */}
                        <div className="hidden lg:block">
                            <Card className="bg-muted/30 border shadow-sm">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-base">PremiumShield Info</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4 text-sm">
                                    <div>
                                        <p className="font-semibold text-primary mb-1">Tiered Interest Rates</p>
                                        <ul className="text-muted-foreground text-xs leading-relaxed space-y-1">
                                            <li>• GHS 530: 4.0% / month</li>
                                            <li>• GHS 531 – 2,000: 3.5% / month</li>
                                            <li>• GHS 2,001 – 5,000: 3.0% / month</li>
                                            <li>• GHS 5,001+: 2.5% / month</li>
                                        </ul>
                                    </div>
                                    <div className="border-t border-dashed border-border pt-4">
                                        <p className="font-semibold text-primary mb-1">Motor Policy</p>
                                        <p className="text-muted-foreground text-xs leading-relaxed">
                                            Includes a fixed GHS 52 Sticker Fee added to your first instalment.
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
                                        <CardTitle className="text-4xl font-bold">
                                            {formatMoney(results.repayment.monthlyBase)}
                                            <span className="text-lg font-normal opacity-70 ml-2">(Standard)</span>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="mt-2 text-sm bg-white/10 p-2 px-3 rounded inline-block">
                                            Initial Deposit: <span className="font-bold">{formatMoney(results.repayment.first)}</span>
                                        </div>
                                        {/* Total Repayment and Interest hidden as per request */}
                                        {/* <div className="mt-8 pt-6 border-t border-primary-foreground/20 grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-sm opacity-70">Total Repayment</p>
                                                <p className="text-xl font-bold">{formatMoney(results.repayment.total)}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm opacity-70">Total Interest</p>
                                                <p className="text-lg font-semibold">{formatMoney(results.totalInterest)}</p>
                                            </div>
                                        </div> */}
                                    </CardContent>
                                </Card>

                                {/* Breakdown Details */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Details</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="flex justify-between items-center py-2 border-b border-dashed border-border">
                                            <span className="text-muted-foreground">Principal Amount</span>
                                            <span className="font-semibold">{formatMoney(results.principal)}</span>
                                        </div>

                                        <div className="flex justify-between items-center py-2 border-b border-dashed border-border">
                                            <span className="text-muted-foreground">
                                                Processing Fee ({(results.meta.feeUsed * 100).toFixed(0)}%)
                                            </span>
                                            <span>{formatMoney(results.fees.processing)}</span>
                                        </div>
                                        <div className="flex justify-between items-center py-2 border-b border-dashed border-border">
                                            <span className="text-muted-foreground">
                                                Sticker Fee
                                            </span>
                                            <span>{formatMoney(results.fees.sticker || 0)}</span>
                                        </div>
                                        <div className="flex justify-between items-center py-2 border-b border-dashed border-border">
                                            <span className="text-muted-foreground">
                                                Interest Rate Applied
                                            </span>
                                            <span>{(results.meta.rateUsed * 100).toFixed(1)}% / month</span>
                                        </div>

                                        <div className="flex justify-between items-center pt-2">
                                            <span className="font-bold text-foreground">Total Fees</span>
                                            <span className="font-bold">{formatMoney(results.fees.total)}</span>
                                        </div>
                                    </CardContent>
                                </Card>

                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center p-10 text-center text-muted-foreground border-2 border-dashed border-border rounded-xl min-h-[400px]">
                                <div className="w-24 h-24 bg-muted/50 rounded-full flex items-center justify-center mb-4 p-5">
                                    <Image
                                        src="/assets/logo.svg"
                                        alt="Globafin Logo"
                                        width={64}
                                        height={64}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Ready to Calculate</h3>
                                <p className="text-sm">Enter your premium amount and duration to get started.</p>
                            </div>
                        )}

                        {/* PremiumShield Info Card - Mobile Only (Below Results) */}
                        <div className="block lg:hidden mt-8">
                            <Card className="bg-muted/30 border shadow-sm">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-base">PremiumShield Info</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4 text-sm">
                                    <div>
                                        <p className="font-semibold text-primary mb-1">Tiered Interest Rates</p>
                                        <ul className="text-muted-foreground text-xs leading-relaxed space-y-1">
                                            <li>• GHS 530: 4.0% / month</li>
                                            <li>• GHS 531 – 2,000: 3.5% / month</li>
                                            <li>• GHS 2,001 – 5,000: 3.0% / month</li>
                                            <li>• GHS 5,001+: 2.5% / month</li>
                                        </ul>
                                    </div>
                                    <div className="border-t border-dashed border-border pt-4">
                                        <p className="font-semibold text-primary mb-1">Motor Policy</p>
                                        <p className="text-muted-foreground text-xs leading-relaxed">
                                            Includes a fixed GHS 52 Sticker Fee added to your first instalment.
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Explicit extra spacer for mobile */}
                            <div className="h-20 w-full" aria-hidden="true" />
                        </div>
                    </div>
                </div>
            </WidthConstraint>
        </div>
    );
}
