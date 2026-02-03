
# Premium Financing Calculations  
**Monthly Period – Breakdown**

## Calculation Table

| Item | Value | Description |
|-----|------:|-------------|
| **Premium Net** | 530 | Premium Amount |
| **Sticker Fee** | 52 | — |
| **Processing Fee** | 0.02 | — |
| **Number of Installments** | 7 | — |
| **1st Installment** | 75.714286 | — |
| **Initial Processing Fee** | 10.6 | — |
| **Minimum Deposit (Safe Net)** | 138.314286 | — |
| **Initial Loan Amount** | 402.285714 | Processing fee is not part of the loan amount |
| **Actual Processing Fee** | 7.6 | — |
| **Actual Initial Deposit** | 150 | — |
| **Actual Loan Amount** | 380 | — |
| **Interest per Month** | 0.04 | — |
| **Interest over Installments** | 0.28 | — |
| **Interest Value** | 106.4 | — |
| **Total Repayment** | 486.4 | — |
| **Regular Installment** | 69.485714 | — |

---

## Constraints

> **Actual Initial Deposit cannot be less than the Minimum Deposit (Safe Net).**

**Status:** ✅ Please Proceed

---

## Interest Rate Rules

| Loan Amount | Condition | Rate |
|------------:|:---------:|-----:|
| 5000 | `>` | 0.025 |
| 2000 | `>` | 0.030 |
| 530 | `>` | 0.035 |
| 530 | `<=` | 0.040 |

---

## Interest Rate Conversion (Days & Weeks)

| Period | Rate |
|------|------:|
| **Days** | 0.001315 |
| **Weeks** | 0.009206 |

---

### Notes
- Processing fees are **not included** in the loan principal.
- Interest is calculated on the **actual loan amount**, not the premium.
- Installments are evenly distributed after the initial deposit.
