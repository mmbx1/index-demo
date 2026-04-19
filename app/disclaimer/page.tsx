export default function Disclaimer() {
  return (
    <div className="min-h-screen bg-black text-gray-300" style={{ fontFamily: 'Sora, sans-serif' }}>
      <div className="max-w-3xl mx-auto px-6 py-24">
        <div className="mb-12">
          <a href="/" className="text-xs uppercase tracking-widest text-green-500 hover:text-green-400 transition-colors" style={{ fontFamily: 'JetBrains Mono, monospace' }}>← Back to CryptoIndex.live</a>
        </div>
        <h1 className="text-3xl font-bold text-white mb-2" style={{ letterSpacing: '-0.03em' }}>Financial Disclaimer</h1>
        <p className="text-xs text-gray-600 mb-12" style={{ fontFamily: 'JetBrains Mono, monospace' }}>Last updated: April 2026</p>

        <div className="space-y-8 text-sm leading-relaxed">
          <div className="p-4 rounded-xl border border-green-500/20 bg-green-500/5">
            <p className="text-green-400 font-semibold text-base">NOT FINANCIAL ADVICE</p>
            <p className="mt-2">All content on CryptoIndex.live is provided for informational purposes only and does not constitute financial, investment, legal, or tax advice.</p>
          </div>

          <section>
            <h2 className="text-white font-semibold mb-3">Investment Risk</h2>
            <p>Cryptocurrency investments involve substantial risk of loss. The value of cryptocurrencies can decrease rapidly and you may lose your entire investment. Past performance of any asset, score, or strategy referenced on this platform is not indicative of future results.</p>
          </section>

          <section>
            <h2 className="text-white font-semibold mb-3">The CryptoIndex Fundamental Score</h2>
            <p>The CryptoIndex Fundamental Score is a proprietary analytical tool based on publicly available data and editorial judgment. It is not a guarantee of future performance and should not be used as the sole basis for any investment decision. Scores are updated periodically and may not reflect the most current information.</p>
          </section>

          <section>
            <h2 className="text-white font-semibold mb-3">Influencer Tracking</h2>
            <p>The Influencer Alpha Index tracks publicly available calls made by crypto commentators for informational purposes only. Inclusion in this index does not constitute an endorsement of any individual or their recommendations. Historical win rates do not predict future accuracy.</p>
          </section>

          <section>
            <h2 className="text-white font-semibold mb-3">Yield Data</h2>
            <p>DeFi yield rates displayed on this platform are sourced from third-party APIs and change constantly. Displayed APY figures are not guaranteed and may differ materially from actual returns. DeFi protocols carry additional risks including smart contract risk, liquidity risk, and protocol risk.</p>
          </section>

          <section>
            <h2 className="text-white font-semibold mb-3">Do Your Own Research</h2>
            <p>Before making any financial decision, conduct thorough independent research and consult with a qualified financial professional who understands your personal financial situation and risk tolerance.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
