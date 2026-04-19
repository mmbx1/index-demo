export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-black text-gray-300" style={{ fontFamily: 'Sora, sans-serif' }}>
      <div className="max-w-3xl mx-auto px-6 py-24">
        <div className="mb-12">
          <a href="/" className="text-xs uppercase tracking-widest text-green-500 hover:text-green-400 transition-colors" style={{ fontFamily: 'JetBrains Mono, monospace' }}>← Back to CryptoIndex.live</a>
        </div>
        <h1 className="text-3xl font-bold text-white mb-2" style={{ letterSpacing: '-0.03em' }}>Terms of Service</h1>
        <p className="text-xs text-gray-600 mb-12" style={{ fontFamily: 'JetBrains Mono, monospace' }}>Last updated: April 2026</p>

        <div className="space-y-8 text-sm leading-relaxed">
          <section>
            <h2 className="text-white font-semibold mb-3">1. Acceptance of Terms</h2>
            <p>By accessing CryptoIndex.live, you agree to be bound by these Terms of Service. If you do not agree, please do not use the platform.</p>
          </section>

          <section>
            <h2 className="text-white font-semibold mb-3">2. Nature of Service</h2>
            <p>CryptoIndex.live is an informational data platform. All data, scores, analysis, and content provided are for informational and educational purposes only. Nothing on this platform constitutes financial advice, investment advice, trading advice, or any other form of advice.</p>
          </section>

          <section>
            <h2 className="text-white font-semibold mb-3">3. No Financial Advice</h2>
            <p>The CryptoIndex Fundamental Score, market data, influencer tracking, and yield information displayed on this platform are not recommendations to buy, sell, or hold any cryptocurrency or financial instrument. Always conduct your own research and consult a qualified financial advisor before making investment decisions.</p>
          </section>

          <section>
            <h2 className="text-white font-semibold mb-3">4. Affiliate Relationships</h2>
            <p>CryptoIndex.live participates in affiliate programs. Certain links on this platform may result in compensation to us if you sign up or transact with a third-party service. This does not affect the integrity of our data or analysis.</p>
          </section>

          <section>
            <h2 className="text-white font-semibold mb-3">5. Data Accuracy</h2>
            <p>While we strive for accuracy, market data is provided by third-party APIs and may be delayed, incomplete, or inaccurate. We make no warranties regarding the accuracy or completeness of any data displayed.</p>
          </section>

          <section>
            <h2 className="text-white font-semibold mb-3">6. Limitation of Liability</h2>
            <p>CryptoIndex.live and its operators shall not be liable for any losses or damages arising from your use of this platform or reliance on any information provided herein.</p>
          </section>

          <section>
            <h2 className="text-white font-semibold mb-3">7. Modifications</h2>
            <p>We reserve the right to modify these terms at any time. Continued use of the platform following any changes constitutes acceptance of the new terms.</p>
          </section>

          <section>
            <h2 className="text-white font-semibold mb-3">8. Governing Law</h2>
            <p>These terms are governed by the laws of the United States. Any disputes shall be resolved in the appropriate courts of the United States.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
