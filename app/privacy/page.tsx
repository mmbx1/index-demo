export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-black text-gray-300" style={{ fontFamily: 'Sora, sans-serif' }}>
      <div className="max-w-3xl mx-auto px-6 py-24">
        <div className="mb-12">
          <a href="/" className="text-xs uppercase tracking-widest text-green-500 hover:text-green-400 transition-colors" style={{ fontFamily: 'JetBrains Mono, monospace' }}>← Back to CryptoIndex.live</a>
        </div>
        <h1 className="text-3xl font-bold text-white mb-2" style={{ letterSpacing: '-0.03em' }}>Privacy Policy</h1>
        <p className="text-xs text-gray-600 mb-12" style={{ fontFamily: 'JetBrains Mono, monospace' }}>Last updated: April 2026</p>

        <div className="space-y-8 text-sm leading-relaxed">
          <section>
            <h2 className="text-white font-semibold mb-3">1. Information We Collect</h2>
            <p>CryptoIndex.live ("we", "us", "our") collects minimal information necessary to operate the platform. This includes email addresses provided voluntarily for newsletter signup, and anonymous usage data collected through standard web analytics.</p>
          </section>

          <section>
            <h2 className="text-white font-semibold mb-3">2. How We Use Your Information</h2>
            <p>Email addresses are used solely to deliver the CryptoIndex Intelligence newsletter and platform updates. We do not sell, rent, or share your personal information with third parties for marketing purposes.</p>
          </section>

          <section>
            <h2 className="text-white font-semibold mb-3">3. Data Storage</h2>
            <p>User data is stored securely using Supabase, which operates on industry-standard encrypted infrastructure. We retain email addresses until you request removal.</p>
          </section>

          <section>
            <h2 className="text-white font-semibold mb-3">4. Cookies</h2>
            <p>We use essential cookies only — those required for the platform to function. We do not use tracking cookies or third-party advertising cookies.</p>
          </section>

          <section>
            <h2 className="text-white font-semibold mb-3">5. Third-Party Services</h2>
            <p>We use the following third-party services to operate the platform: Vercel (hosting), Supabase (database), CoinGecko (market data), and DeFiLlama (yield data). Each operates under their own privacy policies.</p>
          </section>

          <section>
            <h2 className="text-white font-semibold mb-3">6. Your Rights</h2>
            <p>You may request deletion of your data at any time by contacting us. We will process all removal requests within 30 days.</p>
          </section>

          <section>
            <h2 className="text-white font-semibold mb-3">7. Contact</h2>
            <p>For privacy-related inquiries, contact us at: <span className="text-green-500">privacy@cryptoindex.live</span></p>
          </section>
        </div>
      </div>
    </div>
  );
}
