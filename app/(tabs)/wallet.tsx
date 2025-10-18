import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert, FlatList, TextInput, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useWallet } from "../contexts/WalletContext";
import { BarCodeScanner } from 'expo-barcode-scanner';

const HISTORY_VIEW = 10;
const HISTORY_CAP = 50;

export default function WalletScreen() {
  const { balance, transactions, topUp, quickPay } = useWallet();
  const [processingTopUp, setProcessingTopUp] = useState(false);
  const [processingPay, setProcessingPay] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState<string>("20.00");
  const [qrVisible, setQrVisible] = useState(false);
  const [nfcVisible, setNfcVisible] = useState(false);
  const [nfcAmountInput, setNfcAmountInput] = useState<string>('5.50');
  const [hasBarcodePermission, setHasBarcodePermission] = useState<boolean | null>(null);
  const [confirmTopUpVisible, setConfirmTopUpVisible] = useState(false);
  const [qrAmountPromptVisible, setQrAmountPromptVisible] = useState(false);
  const [qrScannedAmount, setQrScannedAmount] = useState<number | null>(null);
  const [qrAmountInput, setQrAmountInput] = useState<string>('5.50');

  const handleTopUp = () => {
    const amount = parseFloat(topUpAmount) || 0;
    if (amount <= 0) {
      Alert.alert('Invalid amount', 'Please enter a top-up amount greater than 0');
      return;
    }
    setConfirmTopUpVisible(true);
  };

  const performTopUp = async () => {
    const amount = parseFloat(topUpAmount) || 0;
    setConfirmTopUpVisible(false);
    setProcessingTopUp(true);
    try {
      await topUp(amount);
      Alert.alert("Top-up successful", `+€${amount.toFixed(2)} added to wallet`);
    } catch (e: any) {
      Alert.alert("Top-up failed", e.message || "Error processing payment");
    } finally {
      setProcessingTopUp(false);
    }
  };

  // handleQuickPay is no longer used because QR/NFC flows are handled via modals/scanner

  // Request permissions for barcode scanner when QR modal is opened
  useEffect(() => {
    if (!qrVisible) return;
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasBarcodePermission(status === 'granted');
    })();
  }, [qrVisible]);

  const handleBarCodeScanned = async ({ data }: { data: string }) => {
    // Data could be a simple amount or a URL containing amount parameter.
    // Try to extract a number from scanned data.
    const m = data.match(/([0-9]+(?:\.[0-9]{1,2})?)/);
    let amount = 5.5;
    if (m) {
      amount = parseFloat(m[1]);
    } else {
      // show modal to enter amount manually
      setQrScannedAmount(null);
      setQrAmountInput(amount.toFixed(2));
      setQrVisible(false);
      setQrAmountPromptVisible(true);
      return;
    }
    setProcessingPay(true);
    try {
      await quickPay(amount, 'qr', 'Scanned Merchant');
      Alert.alert('Payment sent', `-€${amount.toFixed(2)} via QR`);
    } catch (e: any) {
      Alert.alert('Payment failed', e.message || 'Error during QR payment');
    } finally {
      setProcessingPay(false);
    }
  };

  const handleSimulateNfc = async () => {
    const amount = parseFloat(nfcAmountInput) || 5.5;
    setNfcVisible(false);
    setProcessingPay(true);
    try {
      await quickPay(amount, 'nfc', 'NFC Merchant');
      Alert.alert('Payment sent', `-€${amount.toFixed(2)} via NFC`);
    } catch (e: any) {
      Alert.alert('Payment failed', e.message || 'Error during NFC payment');
    } finally {
      setProcessingPay(false);
    }
  };

  const handleQrAmountConfirm = async () => {
    const amount = parseFloat(qrAmountInput) || 0;
    setQrAmountPromptVisible(false);
    if (amount <= 0) {
      Alert.alert('Invalid amount', 'Please enter a valid amount');
      return;
    }
    setProcessingPay(true);
    try {
      await quickPay(amount, 'qr', 'Scanned Merchant');
      Alert.alert('Payment sent', `-€${amount.toFixed(2)} via QR`);
    } catch (e: any) {
      Alert.alert('Payment failed', e.message || 'Error during QR payment');
    } finally {
      setProcessingPay(false);
    }
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#fff" }}
      contentContainerStyle={{ padding: 20 }}
    >
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 25,
        }}
      >
        <Text style={{ fontSize: 22, fontWeight: "600", color: "#009688" }}>
          Wallet
        </Text>
        <Ionicons name="card-outline" size={28} color="#009688" />
      </View>

      {/* Balance Card */}
      <View
        style={{
          backgroundColor: "#009688",
          borderRadius: 18,
          padding: 20,
          alignItems: "center",
          marginBottom: 25,
        }}
      >
        <Text style={{ color: "#fff", fontSize: 14 }}>Available Balance</Text>
        <Text
          style={{
            color: "#fff",
            fontSize: 36,
            fontWeight: "bold",
            marginVertical: 6,
          }}
        >
          €{balance.toFixed(2)}
        </Text>
        <View style={{ width: '100%', marginTop: 12, alignItems: 'center' }}>
          <TextInput
            value={topUpAmount}
            onChangeText={setTopUpAmount}
            keyboardType="decimal-pad"
            placeholder="Amount"
            style={{ backgroundColor: '#fff', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, width: 160, textAlign: 'center' }}
          />

          <TouchableOpacity
            onPress={handleTopUp}
            style={{
              backgroundColor: '#fff',
              borderRadius: 8,
              paddingVertical: 8,
              paddingHorizontal: 20,
              marginTop: 10,
            }}
          >
            <Text style={{ color: '#009688', fontWeight: '600' }}>{processingTopUp ? 'Processing…' : 'Top Up'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Quick Pay */}
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 8 }}>Quick Pay</Text>
        <View style={{ flexDirection: "row", gap: 12 }}>
          <TouchableOpacity
            onPress={() => setQrVisible(true)}
            style={{ flex: 1, backgroundColor: "#e0f2f1", padding: 12, borderRadius: 8, alignItems: "center" }}
          >
            <Text style={{ color: "#009688", fontWeight: "600" }}>{processingPay ? 'Processing…' : 'Pay with QR'}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setNfcVisible(true)}
            style={{ flex: 1, backgroundColor: "#e0f2f1", padding: 12, borderRadius: 8, alignItems: "center" }}
          >
            <Text style={{ color: "#009688", fontWeight: "600" }}>{processingPay ? 'Processing…' : 'Pay with NFC'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* QR Scanner Modal */}
      <Modal visible={qrVisible} animationType="slide">
        <View style={{ flex: 1, backgroundColor: '#000' }}>
          {hasBarcodePermission === false && (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: '#fff' }}>Camera permission is required to scan QR codes.</Text>
              <TouchableOpacity onPress={() => setQrVisible(false)} style={{ marginTop: 12 }}>
                <Text style={{ color: '#fff' }}>Close</Text>
              </TouchableOpacity>
            </View>
          )}
          {hasBarcodePermission === null && (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: '#fff' }}>Requesting camera permission…</Text>
            </View>
          )}
          {hasBarcodePermission === true && (
            <BarCodeScanner
              onBarCodeScanned={handleBarCodeScanned}
              style={{ flex: 1 }}
            />
          )}
        </View>
      </Modal>

      {/* NFC Modal (simulated) */}
      <Modal visible={nfcVisible} animationType="slide" transparent>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.6)' }}>
          <View style={{ width: 320, backgroundColor: '#fff', padding: 16, borderRadius: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 8 }}>Simulate NFC tag</Text>
            <TextInput
              keyboardType='decimal-pad'
              placeholder='Amount'
              value={nfcAmountInput}
              onChangeText={setNfcAmountInput}
              style={{ borderWidth: 1, borderColor: '#ddd', padding: 8, borderRadius: 8, marginBottom: 12 }}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <TouchableOpacity onPress={() => setNfcVisible(false)} style={{ padding: 10 }}>
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSimulateNfc} style={{ padding: 10 }}>
                <Text style={{ color: '#009688', fontWeight: '600' }}>Simulate Pay</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Top-up Confirmation Modal */}
      <Modal visible={confirmTopUpVisible} animationType="fade" transparent>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.6)' }}>
          <View style={{ width: 320, backgroundColor: '#fff', padding: 16, borderRadius: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 8 }}>Confirm Top Up</Text>
            <Text style={{ marginBottom: 12 }}>Add €{(parseFloat(topUpAmount) || 0).toFixed(2)} to your wallet?</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <TouchableOpacity onPress={() => setConfirmTopUpVisible(false)} style={{ padding: 10 }}>
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={performTopUp} style={{ padding: 10 }}>
                <Text style={{ color: '#009688', fontWeight: '600' }}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* QR Amount Prompt Modal (if QR payload has no amount) */}
      <Modal visible={qrAmountPromptVisible} animationType="fade" transparent>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.6)' }}>
          <View style={{ width: 320, backgroundColor: '#fff', padding: 16, borderRadius: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 8 }}>Enter Amount</Text>
            <TextInput
              value={qrAmountInput}
              onChangeText={setQrAmountInput}
              keyboardType='decimal-pad'
              style={{ borderWidth: 1, borderColor: '#ddd', padding: 8, borderRadius: 8, marginBottom: 12 }}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <TouchableOpacity onPress={() => setQrAmountPromptVisible(false)} style={{ padding: 10 }}>
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleQrAmountConfirm} style={{ padding: 10 }}>
                <Text style={{ color: '#009688', fontWeight: '600' }}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Transaction History */}
      <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 10 }}>Recent Transactions</Text>

      <FlatList
        data={transactions.slice(0, HISTORY_VIEW)}
        keyExtractor={(t) => t.id}
        renderItem={({ item }) => (
          <View style={{ backgroundColor: "#f5f5f5", borderRadius: 10, padding: 15, marginBottom: 8, flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ color: "#333" }}>{item.title}</Text>
            <Text style={{ color: item.type === "in" ? '#009688' : 'red', fontWeight: '500' }}>{item.type === 'in' ? `+€${item.amount.toFixed(2)}` : `-€${Math.abs(item.amount).toFixed(2)}`}</Text>
          </View>
        )}
      />

      <TouchableOpacity
        onPress={() => Alert.alert('Full history', `Showing up to ${HISTORY_CAP} items`)}
        style={{ backgroundColor: "#009688", borderRadius: 10, paddingVertical: 12, alignItems: "center", marginTop: 10 }}
      >
        <Text style={{ color: "#fff", fontWeight: "600" }}>View Full History</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
