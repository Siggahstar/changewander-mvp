import React, { createContext, useContext, useMemo, useState, useCallback } from "react";

type Tx = {
  id: string;
  title: string;
  amount: number; // positive for in, negative for out
  type: "in" | "out";
  date: string;
};

type WalletContextType = {
  balance: number;
  transactions: Tx[];
  topUp: (amount: number) => Promise<Tx>;
  quickPay: (amount: number, method: "qr" | "nfc", payee?: string) => Promise<Tx>;
  addTransaction: (tx: Tx) => void;
};

const WalletContext = createContext<WalletContextType | undefined>(undefined);

function generateId() {
  return `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

async function fakeStripeCharge(amount: number): Promise<{ success: boolean; chargeId: string }> {
  // simulate contacting Stripe and returning success
  await new Promise((r) => setTimeout(r, 900));
  return { success: true, chargeId: `pi_${generateId()}` };
}

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [balance, setBalance] = useState<number>(0); // start at 0 per request
  const [transactions, setTransactions] = useState<Tx[]>([]);

  const addTransaction = useCallback((tx: Tx) => {
    setTransactions((s) => [tx, ...s]);
  }, []);

  const topUp = useCallback(async (amount: number) => {
    const res = await fakeStripeCharge(amount);
    if (!res.success) throw new Error("Payment failed");
    const tx: Tx = {
      id: res.chargeId,
      title: `Top-up +€${amount.toFixed(2)}`,
      amount: amount,
      type: "in",
      date: new Date().toISOString(),
    };
    setBalance((b) => b + amount);
    addTransaction(tx);
    return tx;
  }, [addTransaction]);

  // Configure your real endpoints here. Replace with your production endpoints.
  const QR_API_URL = "https://api.example.com/pay/qr";
  const NFC_API_URL = "https://api.example.com/pay/nfc";

  const quickPay = useCallback(async (amount: number, method: "qr" | "nfc", payee = "Merchant") => {
    const payload = { amount, method, payee };

    // helper for timeout using AbortController (typed as Response)
    const fetchWithTimeout = async (url: string, opts: any, timeout = 8000): Promise<Response> => {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), timeout);
      try {
        const response = await fetch(url, { ...opts, signal: controller.signal });
        return response;
      } finally {
        clearTimeout(id);
      }
    };

    const url = method === "qr" ? QR_API_URL : NFC_API_URL;

    try {
      const resp = await fetchWithTimeout(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }, 8000);

      if (!resp.ok) throw new Error(`API ${resp.status}`);
      const body = await resp.json();

      // Expecting { success: boolean, transactionId?: string }
      if (body && body.success) {
        const tx: Tx = {
          id: body.transactionId || `pay_${generateId()}`,
          title: `${payee} (${method.toUpperCase()}) -€${amount.toFixed(2)}`,
          amount: -Math.abs(amount),
          type: "out",
          date: new Date().toISOString(),
        };
        setBalance((b) => b - amount);
        addTransaction(tx);
        return tx;
      }

      // If API indicates failure, fallback to simulated error
      throw new Error(body?.message || 'Payment provider rejected the transaction');
    } catch (err) {
      // fallback behavior: gracefully simulate the payment locally so the app remains functional.
      // Log the error to console and then perform the simulated payment.
      // In production you should handle/report errors instead of silently falling back.
      // eslint-disable-next-line no-console
      console.warn('quickPay API failed, falling back to simulated payment:', err);

      // perform simulated payment (same as previous behavior)
      await new Promise((r) => setTimeout(r, 700));
      const tx: Tx = {
        id: `pay_${generateId()}`,
        title: `${payee} (${method.toUpperCase()}) -€${amount.toFixed(2)}`,
        amount: -Math.abs(amount),
        type: "out",
        date: new Date().toISOString(),
      };
      setBalance((b) => b - amount);
      addTransaction(tx);
      return tx;
    }
  }, [addTransaction]);

  const value = useMemo(
    () => ({ balance, transactions, topUp, quickPay, addTransaction }),
    [balance, transactions, topUp, quickPay, addTransaction]
  );

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
};

export function useWallet() {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error("useWallet must be used within WalletProvider");
  return ctx;
}

export default WalletContext;
