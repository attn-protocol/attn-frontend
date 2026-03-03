"use client";
import { useState, useEffect } from "react";
import { useActiveAccount, useReadContract, useSendTransaction, ConnectButton } from "thirdweb/react";
import { createThirdwebClient, getContract, prepareContractCall } from "thirdweb";
import { polygonAmoy } from "thirdweb/chains";
import { keccak256, toBytes } from "thirdweb/utils";

const CLIENT_ID = "1c1b506450a834a1100bab575c236948";
const CONTRACT_ADDRESS = "0xC9E88Aef2a0790Fa31d0D63F315A15CAeae367c4";

const client = createThirdwebClient({ clientId: CLIENT_ID });
const contract = getContract({ client, chain: polygonAmoy, address: CONTRACT_ADDRESS });

const LEVELS = [
  { name: "Not Verified", color: "gray", multiplier: "0x", icon: "⬜" },
  { name: "Wallet (SIWE)", color: "blue", multiplier: "1x", icon: "🔵" },
  { name: "Human Passport", color: "green", multiplier: "2x", icon: "🟢" },
  { name: "Privado ID (ZK)", color: "purple", multiplier: "3x", icon: "🟣" },
  { name: "World ID (Biometric)", color: "yellow", multiplier: "5x", icon: "🟡" },
];

export default function VerifyPage() {
  const account = useActiveAccount();
  const [level, setLevel] = useState<number>(0);
  const [multiplier, setMultiplier] = useState<string>("0x");
  const [totalUsers, setTotalUsers] = useState<string>("0");
  const [verifying, setVerifying] = useState(false);
  const [txStatus, setTxStatus] = useState<string>("");

  const { mutate: sendTx } = useSendTransaction();

  const { data: levelData, refetch: refetchLevel } = useReadContract({
    contract,
    method: "function getVerificationLevel(address wallet) view returns (uint8)",
    params: account ? [account.address] : ["0x0000000000000000000000000000000000000000"],
  });

  const { data: multiplierData, refetch: refetchMultiplier } = useReadContract({
    contract,
    method: "function getUBIMultiplier(address wallet) view returns (uint256)",
    params: account ? [account.address] : ["0x0000000000000000000000000000000000000000"],
  });

  const { data: totalData, refetch: refetchTotal } = useReadContract({
    contract,
    method: "function totalVerified() view returns (uint256)",
    params: [],
  });

  useEffect(() => {
    if (levelData !== undefined) setLevel(Number(levelData));
    if (multiplierData !== undefined) setMultiplier(`${Number(multiplierData) / 100}x`);
    if (totalData !== undefined) setTotalUsers(totalData.toString());
  }, [levelData, multiplierData, totalData]);

  async function handleVerifyLayer1() {
    if (!account) return;
    setVerifying(true);
    setTxStatus("Preparing transaction...");

    try {
      const sigHash = keccak256(toBytes(`ATTN-SIWE-${account.address}-${Date.now()}`));

      const tx = prepareContractCall({
        contract,
        method: "function verifyWallet(address wallet, bytes32 sigHash)",
        params: [account.address, sigHash as `0x${string}`],
      });

      setTxStatus("Please confirm in your wallet...");

      sendTx(tx, {
        onSuccess: (result) => {
          setTxStatus("Transaction sent! Waiting for confirmation...");
          setTimeout(() => {
            refetchLevel();
            refetchMultiplier();
            refetchTotal();
            setTxStatus("✅ Layer 1 verified! You are now a verified human.");
            setVerifying(false);
          }, 5000);
        },
        onError: (error) => {
          console.error(error);
          const msg = error.message || "Transaction failed";
          if (msg.includes("already")) {
            setTxStatus("❌ Already verified at this level!");
          } else if (msg.includes("caller is not")) {
            setTxStatus("❌ Only the verifier can call this. On testnet, use the deployer wallet.");
          } else {
            setTxStatus("❌ " + msg.slice(0, 100));
          }
          setVerifying(false);
        },
      });
    } catch (err: any) {
      setTxStatus("❌ " + (err.message || "Failed").slice(0, 100));
      setVerifying(false);
    }
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <nav className="flex justify-between items-center px-8 py-6">
        <div className="text-xl font-bold tracking-tight">ATTN</div>
        <div className="flex gap-4 items-center">
          <a href="/" className="text-gray-500 hover:text-white text-sm transition">Home</a>
          <ConnectButton client={client} chain={polygonAmoy} />
        </div>
      </nav>

      <section className="flex flex-col items-center justify-center text-center px-8 pt-12 pb-8">
        <div className="inline-block bg-purple-900 text-purple-300 text-xs px-4 py-2 rounded-full mb-8 tracking-widest uppercase">
          Identity Verification
        </div>
        <h1 className="text-5xl font-bold mb-4">Verify Your Identity</h1>
        <p className="text-gray-400 text-lg max-w-lg mb-2">Higher verification = Higher UBI rewards</p>
      </section>

      {!account ? (
        <section className="max-w-md mx-auto text-center px-8 py-16">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
            <div className="text-4xl mb-4">🔗</div>
            <h2 className="text-xl font-bold mb-2">Connect Your Wallet</h2>
            <p className="text-gray-500 text-sm mb-6">Connect your wallet to see your verification status and upgrade your level.</p>
            <ConnectButton client={client} chain={polygonAmoy} />
          </div>
        </section>
      ) : (
        <section className="max-w-2xl mx-auto px-8 pb-16">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 mb-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-gray-500 text-sm mb-1">Your Verification Level</p>
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{LEVELS[level]?.icon}</span>
                  <h2 className="text-2xl font-bold">{LEVELS[level]?.name}</h2>
                </div>
              </div>
              <div className="text-right">
                <p className="text-gray-500 text-sm mb-1">UBI Multiplier</p>
                <p className="text-3xl font-bold text-purple-400">{multiplier}</p>
              </div>
            </div>
            <div className="mb-4">
              <div className="flex justify-between text-xs text-gray-500 mb-2">
                <span>Level {level} of 4</span>
                <span>{Math.round((level / 4) * 100)}% complete</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-3">
                <div className="bg-purple-500 h-3 rounded-full transition-all duration-500" style={{ width: `${(level / 4) * 100}%` }} />
              </div>
            </div>
            <p className="text-gray-600 text-xs">Wallet: {account.address.slice(0, 6)}...{account.address.slice(-4)}</p>
          </div>

          {txStatus && (
            <div className={`mb-6 p-4 rounded-xl text-sm ${txStatus.startsWith("✅") ? "bg-green-900/30 border border-green-800 text-green-300" : txStatus.startsWith("❌") ? "bg-red-900/30 border border-red-800 text-red-300" : "bg-blue-900/30 border border-blue-800 text-blue-300"}`}>
              {txStatus}
            </div>
          )}

          <h3 className="text-lg font-bold mb-4">Verification Layers</h3>
          <div className="space-y-4">
            {LEVELS.slice(1).map((l, i) => {
              const layerNum = i + 1;
              const isComplete = level >= layerNum;
              const isNext = level === layerNum - 1;

              return (
                <div key={layerNum} className={`border rounded-xl p-6 transition-all ${isComplete ? "bg-green-900/20 border-green-800" : isNext ? "bg-gray-900 border-purple-700 ring-1 ring-purple-500" : "bg-gray-900/50 border-gray-800 opacity-50"}`}>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className={`text-2xl ${isComplete ? "" : "grayscale"}`}>{isComplete ? "✅" : l.icon}</div>
                      <div>
                        <h4 className="font-bold">Layer {layerNum}: {l.name}</h4>
                        <p className="text-gray-500 text-sm">
                          {layerNum === 1 && "Sign a message with your wallet"}
                          {layerNum === 2 && "Collect stamps from identity providers"}
                          {layerNum === 3 && "Provide zero-knowledge proof via Privado ID"}
                          {layerNum === 4 && "Verify via iris scan (Worldcoin Orb)"}
                        </p>
                      </div>
                    </div>
                    <div className="text-right flex flex-col items-end gap-2">
                      <p className="text-sm font-bold text-purple-400">{l.multiplier} UBI</p>
                      {isComplete && <span className="text-green-400 text-xs">Completed</span>}
                      {isNext && layerNum === 1 && (
                        <button
                          onClick={handleVerifyLayer1}
                          disabled={verifying}
                          className="bg-purple-600 hover:bg-purple-500 disabled:bg-gray-700 disabled:cursor-not-allowed text-white text-xs font-bold px-4 py-2 rounded-lg transition-all"
                        >
                          {verifying ? "Verifying..." : "Verify Now"}
                        </button>
                      )}
                      {isNext && layerNum > 1 && <span className="text-purple-300 text-xs">Coming Soon</span>}
                      {!isComplete && !isNext && <span className="text-gray-600 text-xs">Locked</span>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h3 className="font-bold mb-4">Protocol Stats</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold">{totalUsers}</p>
                <p className="text-gray-500 text-xs">Verified Humans</p>
              </div>
              <div>
                <p className="text-2xl font-bold">4</p>
                <p className="text-gray-500 text-xs">Verification Layers</p>
              </div>
              <div>
                <p className="text-2xl font-bold">5x</p>
                <p className="text-gray-500 text-xs">Max Multiplier</p>
              </div>
            </div>
          </div>
        </section>
      )}

      <footer className="text-center py-8 border-t border-gray-900 text-gray-600 text-sm">
        ATTN Protocol · Vienna, Austria · 2026
      </footer>
    </main>
  );
}
