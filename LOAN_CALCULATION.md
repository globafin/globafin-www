# PremiumShield Loan Calculation Logic

This document details the exact calculation logic for **PremiumShield** loans, aligned with the application's interface.

## 1. Input Parameters

| Parameter | Symbol | Example Value | Description |
| :--- | :--- | :--- | :--- |
| **Premium Amount** | $P$ | 5000 | The base amount for the insurance premium. |
| **Sticker Fee** | $S$ | 52 | Fixed administrative fee. |
| **Processing Fee Rate** | $r_{proc}$ | 2% (0.02) | Percentage rate for processing fees, determined by loan tier. |
| **Number of Installments** | $N$ | 10 | Total number of repayment installments (tenure). |
| **Monthly Interest Rate** | $r_{mo}$ | 4% (0.04) | Monthly interest rate, determined by loan tier. |
| **User Initial Deposit** | $D_{user}$ | 0 (Optional) | Custom amount the user wishes to pay upfront. |

## 2. Calculation Steps

### Step 1: Calculate Minimum Required Deposit

The minimum deposit is dynamic. It balances the first installment requirement against the processing fee adjustment.

1. **1st Installment Portion** ($I_1$)
    $$I_1 = \frac{P}{N}$$
    *Example: $5000 / 10 = 500$*

2. **Initial Processing Fee** ($F_{proc\_init}$)
    $$F_{proc\_init} = P \times r_{proc}$$
    *Example: $5000 \times 0.02 = 100$*

3. **Initial Loan Amount** ($L_{init}$)
    $$L_{init} = P - I_1 - S$$
    *Example: $5000 - 500 - 52 = 4448$*

4. **Actual Processing Fee** ($F_{proc}$)
    $$F_{proc} = L_{init} \times r_{proc}$$
    *Example: $4448 \times 0.02 = 88.96$*

5. **Fee Adjustment** ($\Delta_{fee}$)
    $$\Delta_{fee} = F_{proc\_init} - F_{proc}$$
    *Example: $100 - 88.96 = 11.04$*

6. **Minimum Initial Deposit** ($D_{min}$)
    $$D_{min} = I_1 + S + \Delta_{fee}$$
    *Example: $500 + 52 + 11.04 = 563.04$*

---

### Step 2: Determine Actual First Instalment

The user may choose to pay more than the minimum. The *Actual First Instalment* (or Initial Deposit) is the greater of the computed minimum or the user's input.

* **First Instalment** ($D_{actual}$)
    $$D_{actual} = \max(D_{min}, D_{user})$$
    *Example (assuming no custom input): $563.04$*

---

### Step 3: Determine Financed Amount

The amount actually financed is the Premium Amount minus the Actual First Instalment.

* **Financed Amount** ($L_{financed}$)
    $$L_{financed} = P - D_{actual}$$
    *Example: $5000 - 563.04 = 4436.96$*

---

### Step 4: Repayment Schedule

We now derive the repayment terms based on the *Financed Amount*.

1. **Total Interest Rate** ($R_{total}$)
    $$R_{total} = r_{mo} \times N$$
    *Example: $0.04 \times 10 = 0.40$ (40%)*

2. **Total Interest** ($V_{int}$)
    $$V_{int} = L_{financed} \times R_{total}$$
    *Example: $4436.96 \times 0.40 = 1774.784$*

3. **Total Repayment** ($T_{repay}$)
    $$T_{repay} = L_{financed} + V_{int}$$
    *Example: $4436.96 + 1774.784 = 6211.744$*

4. **Monthly Instalment** ($I_{reg}$)
    $$I_{reg} = \frac{T_{repay}}{N}$$
    *Example: $6211.744 / 10 = 621.17$*

## 3. Summary of Output Terms

| UI Term | Calculation Ref | Value (Example) |
| :--- | :--- | :--- |
| **Premium Amount** | $P$ | 5000.00 |
| **Sticker Fee** | $S$ | 52.00 |
| **Processing Fee** | $F_{proc}$ | 88.96 |
| **Financed Amount** | $L_{financed}$ | 4436.96 |
| **Total Interest** | $V_{int}$ | 1774.78 |
| **Total Repayment** | $T_{repay}$ | 6211.74 |
| **Monthly Instalment** | $I_{reg}$ | 621.17 |
| **First Instalment** | $D_{actual}$ | 563.04 |

## 4. Custom Deposit Scenario

If the user sets a custom **First Instalment** of **1000**:

* **First Instalment** ($D_{actual}$): 1000
  * *Calculation:* $\max(563.04, 1000) = 1000$
* **Financed Amount** ($L_{financed}$): 4000
  * *Calculation:* $5000 - 1000$
* **Total Interest** ($V_{int}$): 1600
  * *Calculation:* $4000 \times 40\%$
* **Total Repayment** ($T_{repay}$): 5600
  * *Calculation:* $4000 + 1600$
* **Monthly Instalment** ($I_{reg}$): 560
  * *Calculation:* $5600 / 10$
