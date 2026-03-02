"use client";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);

  return (
    <main className="min-h-screen bg-black text-white">
      <nav className="flex justify-between items-center px-8 py-6">
        <div className="text-xl font-bold tracking-tight">ATTN</div>
        <div className="flex gap-4 items-center">
          <a href="/developers" className="text-gray-500 hover:text-white text-sm transition">Developers</a>
          <a href="/business" className="text-gray-500 hover:text-white text-sm transition">For Business</a>
        </div>
      </nav>

      <section className="flex flex-col items-center justify-center text-center px-8 pt-20 pb-16">
        <div className="inline-block bg-purple-900 text-purple-300 text-xs px-4 py-2 rounded-full mb-8 tracking-widest uppercase">
          Vienna Pilot — Spring 2026
        </div>
        <h1 className="text-6xl font-bold mb-6 leading-tight max-w-2xl">
          Your attention makes billions for Big Tech.<br />
          <span className="text-purple-400">Time to get your share.</span>
        </h1>
        <p className="text-gray-400 text-lg mb-4 max-w-lg">
          ATTN is a new protocol that redirects money from the attention economy back to the people who create it — you.
        </p>
        <p className="text-gray-500 text-sm mb-3 max-w-md">
          We're running our first pilot in Vienna. The more people join, the bigger the monthly payout for everyone.
        </p>
        <p className="text-gray-600 text-xs mb-10">
          Free to join · No crypto knowledge needed · Vienna only for now
        </p>

        {!joined ? (
          <div className="flex gap-3 w-full max-w-md">
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-gray-900 border border-gray-700 rounded-full px-6 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
            />
            <button
              onClick={() => email && setJoined(true)}
              className="bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-gray-200 transition whitespace-nowrap"
            >
              Join Waitlist
            </button>
          </div>
        ) : (
          <div className="bg-green-900 border border-green-500 px-8 py-4 rounded-full text-green-400 font-bold">
            ✅ You're on the list! We'll be in touch soon.
          </div>
        )}
        <p className="text-gray-600 text-xs mt-4">Vienna pilot · Spring 2026 · Limited spots</p>
      </section>

      <section className="max-w-4xl mx-auto px-8 py-16 border-t border-gray-900">
        <h2 className="text-3xl font-bold text-center mb-12">How it works</h2>
        <div className="grid grid-cols-3 gap-8">
          {[
            { emoji: "☕", title: "Visit a partner cafe", desc: "Check in at any ATTN cafe in Vienna. Scan a QR code — takes 5 seconds." },
            { emoji: "📊", title: "Your attention is recorded", desc: "Every check-in is logged on the blockchain. No personal data. Just proof of presence." },
            { emoji: "💸", title: "Get paid monthly", desc: "Every month, the treasury splits equally among all active members. Straight to your wallet." },
          ].map((item) => (
            <div key={item.title} className="text-center">
              <div className="text-4xl mb-4">{item.emoji}</div>
              <div className="font-bold text-lg mb-2">{item.title}</div>
              <div className="text-gray-400 text-sm">{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-2xl mx-auto px-8 py-16 border-t border-gray-900">
        <h2 className="text-3xl font-bold text-center mb-12">Common questions</h2>
        <div className="space-y-6">
          {[
            { q: "Do I need crypto knowledge?", a: "No. Just a smartphone and an email. We handle the technical side." },
            { q: "How much will I earn?", a: "We don't know yet — it depends on how many businesses join and how many members participate. The pilot will set the first real numbers." },
            { q: "Is the money real?", a: "Yes. Payments are in USDC, a digital dollar pegged 1:1 to USD. You can convert to euros anytime." },
            { q: "Why would businesses pay?", a: "Instead of paying Meta or Google for ads, they pay ATTN. The difference: the money goes to their actual customers, not to Big Tech." },
          ].map((item) => (
            <div key={item.q} className="border border-gray-800 rounded-xl p-6">
              <div className="font-bold mb-2">{item.q}</div>
              <div className="text-gray-400 text-sm">{item.a}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-2xl mx-auto px-8 py-16 text-center border-t border-gray-900">
        <h2 className="text-3xl font-bold mb-4">Be part of the first pilot</h2>
        <p className="text-gray-400 mb-8">We're starting small, in Vienna, with real people and real cafes. Join the waitlist and help shape how this works.</p>
        {!joined ? (
          <div className="flex gap-3 w-full max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-gray-900 border border-gray-700 rounded-full px-6 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
            />
            <button
              onClick={() => email && setJoined(true)}
              className="bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-gray-200 transition"
            >
              Join
            </button>
          </div>
        ) : (
          <div className="bg-green-900 border border-green-500 px-8 py-4 rounded-full text-green-400 font-bold inline-block">
            ✅ You're on the list!
          </div>
        )}
      </section>

      <footer className="text-center py-8 border-t border-gray-900 text-gray-600 text-sm">
        ATTN Protocol · Vienna, Austria · 2026
      </footer>
    </main>
  );
}
