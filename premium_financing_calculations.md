# Premium Financing Calculations

## Core Formulas

The following formulas are used to calculate the repayment schedule and fees.

### 1. Minimum Deposit (Safe Net)

$$ D_{min} = \left(\frac{P}{N}\right) + S + (P \times r_{fee}) $$

### 2. Loan Amount (Financed Amount)

$$ L = P - D_{actual} $$

### 3. Actual Processing Fee

$$ Fee_{proc} = L \times r_{fee} $$

### 4. Total Interest

$$ Interest = L \times r_{rate} \times N $$

### 5. Total Repayment

$$ Repayment = L + Interest $$

---

## Detailed Calculation Table (Example)

**Scenario**: Premium=530, Tenure=7 Months, Motor Policy=Yes, Deposit=150.

| Item | Value | Description |
| :--- | :--- | :--- |
| **Premium Net** | 530 | Total Premium Amount |
| **Sticker Fee** | 52 | Motor Policy Sticker |
| **Processing Fee Rate** | 0.02 | 2% |
| **Number of Installments** | 7 | Months |
| **1st Installment (Base)** | 75.714286 | $P / N$ |
| **Initial Processing Fee** | 10.6 | $P \times 0.02$ |
| **Minimum Deposit (Safe Net)** | 138.314286 | Base + Sticker + Initial Fee |
| **Initial Loan Amount** | 402.285714 | $P - (P/N) - Sticker$ |
| **Actual Processing Fee** | 7.6 | $L \times 0.02$ |
| **Actual Initial Deposit** | 150 | User Input (Must be $\ge Min$) |
| **Actual Loan Amount** | 380 | $P - 150$ |
| **Interest per Month** | 0.04 | 4.0% |
| **Interest over Installments** | 0.28 | $0.04 \times 7$ |
| **Interest Value** | 106.4 | $380 \times 0.28$ |
| **Total Repayment** | 486.4 | $380 + 106.4$ |
| **Regular Installment** | 69.485714 | $486.4 / 7$ |

---

## Interest Rate Rules

| Loan Amount | Condition | Rate per Month | Processing Fee |
|------------:|:---------:|---------------:|---------------:|
| 5000 | `>` | 2.5% | 2.0% |
| 2000 | `>` | 3.0% | 2.0% |
| 530 | `>` | 3.5% | 2.0% |
| 530 | `<=` | 4.0% | 2.0% |

---

## Interest Rate Conversion (Days & Weeks)

| Period | Rate |
| :--- | :--- |
| **Days** | 0.001315 |
| **Weeks** | 0.009206 |

---

## Implementation Code reference

```typescript
/**
 * Calculates Premium Financing details based on the standard logic.
 *
 * @param P - Premium Amount (e.g., 530)
 * @param N - Number of Installments (Months) (e.g., 7)
 * @param S - Sticker Fee (default 52 for Motor Policy)
 * @param userDeposit - User's proposed initial deposit (default 0)
 */
export function calculatePremiumFinancing(P: number, N: number, S: number = 52, userDeposit: number = 0) {
    // 1. Determine Rates based on Premium Amount
    let rate = 0.04; // Default 4.0%
    let feeRate = 0.02; // Default 2.0%

    // Rate Logic Table
    if (P >= 5001) {
        rate = 0.025; // 2.5%
        feeRate = 0.02;
    } else if (P >= 2001) {
        rate = 0.030; // 3.0%
        feeRate = 0.02;
    } else if (P >= 531) {
        rate = 0.035; // 3.5%
        feeRate = 0.02;
    } else {
        // P <= 530
        rate = 0.040; // 4.0%
        feeRate = 0.02;
    }

    // 2. Minimum Deposit (Safe Net)
    // Formula: (P/N) + Sticker + (P * FeeRate)
    const baseInstallment = P / N;
    const initialFee = P * feeRate; // Fee on total premium
    const minDeposit = baseInstallment + S + initialFee;

    // 3. Actual Deposit
    // Must be at least the minimum required
    const actualDeposit = Math.max(minDeposit, userDeposit);

    // 4. Financed Amount (Loan Amount)
    // The amount effectively being borrowed
    const financedAmount = P - actualDeposit;

    // 5. Actual Processing Fee
    // Charged on the financed amount
    const actualProcessingFee = financedAmount * feeRate;

    // 6. Total Interest
    // Calculated on the financed amount over the full tenure
    const totalInterest = financedAmount * rate * N;

    // 7. Total Repayment
    const totalRepayment = financedAmount + totalInterest;

    // 8. Monthly Installment (Regular Installment)
    const monthlyInstallment = totalRepayment / N;

    return {
        minDeposit,
        actualDeposit,
        financedAmount,
        actualProcessingFee,
        totalInterest,
        totalRepayment,
        monthlyInstallment,
        rates: { rate, feeRate }
    };
}
```
