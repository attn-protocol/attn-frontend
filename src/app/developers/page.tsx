export default function Developers() {
  return (
    <main className="min-h-screen bg-black text-white">
      <nav className="flex justify-between items-center px-8 py-6 border-b border-gray-800">
        <a href="/" className="text-2xl font-bold">ATTN Protocol</a>
        <a href="/" className="border border-gray-600 px-6 py-2 rounded-full hover:border-white transition">← Back</a>
      </nav>

      <section className="max-w-4xl mx-auto px-8 py-16">
        <div className="text-sm text-purple-400 mb-4 tracking-widest uppercase">For Developers</div>
        <h1 className="text-5xl font-bold mb-6">Build on ATTN Protocol</h1>
        <p className="text-gray-400 text-xl mb-16 max-w-2xl">
          Integrate your app with ATTN and let your users earn UBI from their attention. 
          Instead of paying Meta for ads, pay ATTN — and the value goes directly to your users.
        </p>

        {/* Contract Addresses */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Contract Addresses</h2>
          <div className="text-sm text-gray-500 mb-4">Network: Polygon Amoy Testnet (Chain ID: 80002)</div>
          <div className="space-y-3">
            {[
              { name: "ATTNIdentity", address: "0xB21F9dCDFdf88832Ae0C8ae7F8E28Ff20b52c2C8", desc: "Human verification" },
              { name: "ATTNRegistry", address: "0x6721376d8435307Db7C6F0969182C3669bc14E65", desc: "Attention event logging" },
              { name: "ATTNTreasury", address: "0x9F78b6670283f36867DFE2b851dA93c68BF3776b", desc: "UBI treasury" },
              { name: "ATTNDistributor", address: "0x9B7C601ec46C325Ee0554A1D69c866abF069B9E9", desc: "UBI distribution" },
            ].map((c) => (
              <div key={c.name} className="border border-gray-800 rounded-xl p-4 flex justify-between items-center hover:border-purple-500 transition">
                <div>
                  <div className="font-bold">{c.name} <span className="text-gray-500 font-normal text-sm">— {c.desc}</span></div>
                  <div className="text-purple-400 font-mono text-sm mt-1">{c.address}</div>
                </div>
                <a href={`https://amoy.polygonscan.com/address/${c.address}`} target="_blank" className="text-gray-500 hover:text-white text-sm transition">
                  View on Polygonscan →
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* How to integrate */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">How to Integrate</h2>
          <div className="grid grid-cols-3 gap-6">
            {[
              { step: "01", title: "Register your app", desc: "Contact us to whitelist your app address in ATTNRegistry." },
              { step: "02", title: "Log attention events", desc: "Call logAttention() when users engage with your app." },
              { step: "03", title: "Users earn UBI", desc: "Every month, active users automatically receive their share." },
            ].map((item) => (
              <div key={item.step} className="border border-gray-800 rounded-xl p-6">
                <div className="text-purple-400 text-sm font-bold mb-3">{item.step}</div>
                <div className="font-bold mb-2">{item.title}</div>
                <div className="text-gray-400 text-sm">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Code example */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Example</h2>
          <div className="bg-gray-900 rounded-xl p-6 font-mono text-sm">
            <div className="text-gray-500 mb-2">// Log a user attention event</div>
            <div className="text-purple-400">const</div> <div className="text-white inline">registry = getContract{"({"}</div>
            <br />
            <div className="text-white ml-4">address: <span className="text-green-400">"0x6721...14E65"</span>,</div>
            <br />
            <div className="text-white ml-4">abi: ATTNRegistryABI</div>
            <br />
            <div className="text-white">{"})"}</div>
            <br /><br />
            <div className="text-gray-500">// Call when user engages</div>
            <br />
            <div className="text-white"><span className="text-purple-400">await</span> registry.logAttention(userAddress, appId, timestamp)</div>
          </div>
        </div>

        {/* CTA */}
        <div className="border border-purple-500 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">Want to build on ATTN?</h2>
          <p className="text-gray-400 mb-6">We're looking for our first integration partners in Vienna.</p>
          <a href="mailto:hello@attn-protocol.xyz" className="bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-gray-200 transition">
            Get in Touch →
          </a>
        </div>
      </section>

      <footer className="text-center py-8 border-t border-gray-800 text-gray-600">
        ATTN Protocol · Built on Polygon · 2026
      </footer>
    </main>
  );
}
