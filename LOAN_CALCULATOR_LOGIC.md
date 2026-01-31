# Loan Calculator Logic & Documentation

This document outlines the business logic and calculation formulas used in the Loan Calculator system. The calculator supports two distinct loan types: **CAGD Salary Loan** and **PremiumShield Loan**.

## 1. CAGD Salary Loan

The CAGD (Controller and Accountant General's Department) Salary Loan follows a structured fee and interest model applicable to all loan amounts.

### Constants & Rates

- **Interest Rate:** Flat **3.0%** per month.
- **Insurance Fee:** **0.6%** of the principal loan amount.
- **Processing Fee:** **7.0%** of the principal loan amount.
- **CAGD Fee:** **3.0%** of the *Subtotal Repayment*.
- **Standard Tenures:** 3, 6, 12, 24, 36 months (Custom tenures are also supported).

### Calculation Steps

1. **Calculate Total Interest:**

    ```
    Total Interest = Principal × (Monthly Interest Rate / 100) × Tenure (months)
    ```

2. **Calculate Upfront Fees:**

    ```
    Insurance Fee = Principal × 0.006
    Processing Fee = Principal × 0.07
    Total Upfront Fees = Insurance Fee + Processing Fee
    ```

3. **Calculate Subtotal Repayment:**

    ```
    Subtotal Repayment = Principal + Total Interest + Total Upfront Fees
    ```

4. **Calculate CAGD Fee:**

    ```
    CAGD Fee = Subtotal Repayment × 0.03
    ```

5. **Calculate Final Repayment & Instalments:**

    ```
    Final Total Repayment = Subtotal Repayment + CAGD Fee
    Monthly Instalment = Final Total Repayment / Tenure
    ```

### Example Calculation

*Loan Amount: 10,000 | Tenure: 12 Months*

1. **Interest:** 10,000 × 0.03 × 12 = **3,600**
2. **Fees:**
    - Insurance: 10,000 × 0.006 = **60**
    - Processing: 10,000 × 0.07 = **700**
3. **Subtotal:** 10,000 + 3,600 + 60 + 700 = **14,360**
4. **CAGD Fee:** 14,360 × 0.03 = **430.8**
5. **Final Total:** 14,360 + 430.8 = **14,790.8**
6. **Monthly Instalment:** 14,790.8 / 12 = **1,232.57**

---

## 2. PremiumShield Loan

PremiumShield Loans use a tiered system where interest rates and processing fees depend on the loan amount bracket.

### Tiers (Amount Ranges)

| Min Amount (GHS) | Max Amount (GHS) | Monthly Rate | Processing Fee |
| :--- | :--- | :--- | :--- |
| 5,001 | Infinity | **2.5%** | **2%** |
| 2,001 | 5,000 | **3.0%** | **2%** |
| 531 | 2,000 | **3.5%** | **2%** |
| 530 | 530 (Min) | **4.0%** | **4%** |

*Default fallback (if no match found): Rate 4.0%, Fee 4%.*

### Constants

- **Standard Tenures:** 1 to 10 months (Custom tenures supported).

### Calculation Steps

1. **Determine Tier:**
    Find the applicable `Interest Rate` and `Processing Fee Rate` based on the loan amount table above.

2. **Calculate Fees & Interest:**

    ```
    Processing Fee = Principal × (Processing Fee Rate / 100)
    Total Interest = Principal × (Monthly Interest Rate / 100) × Tenure
    Total Fees = Processing Fee
    ```

3. **Calculate Total Repayment:**

    ```
    Total Repayment = Principal + Total Interest + Processing Fee
    ```

4. **Calculate Monthly Instalment:**
    *Note: The standard monthly instalment covers the principal and interest.*

    ```
    Monthly Instalment = (Principal + Total Interest) / Tenure
    ```

5. **Calculate First Instalment:**
    *Note: The processing fee is added entirely to the first month's payment.*

    ```
    First Instalment = Monthly Instalment + Processing Fee
    ```

### Example Calculation

*Loan Amount: 3,000 (Tier 2) | Tenure: 6 Months*
*Tier details: Rate 3.0%, Processing Fee 2%*

1. **Fees:**
    - Processing Fee: 3,000 × 0.02 = **60**
2. **Interest:**
    - Total Interest: 3,000 × 0.03 × 6 = **540**
3. **Totals:**
    - Total Repayment: 3,000 + 540 + 60 = **3,600**
4. **Instalments:**
    - Base Monthly Instalment: (3,000 + 540) / 6 = **590**
    - **First Instalment:** 590 + 60 = **650**
    - **Subsequent Instalments:** **590**
