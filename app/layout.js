export const metadata = {
  title: "CD Penalty Calculator | Early Withdrawal Penalty on Certificates of Deposit",
  description: "Calculate the early withdrawal penalty for breaking a CD before maturity. See net proceeds, lost interest, and decide if cashing out is worth it.",
  alternates: { canonical: "https://www.cdpenaltycalc.com" },
  openGraph: {
    title: "CD Penalty Calculator",
    description: "Calculate early withdrawal penalties for breaking a CD before maturity.",
    url: "https://www.cdpenaltycalc.com",
    siteName: "Moneywise Calculators",
    images: [{ url: "https://www.cdpenaltycalc.com/og-image.png", width: 1200, height: 630, alt: "CD Penalty Calculator" }],
    locale: "en_US",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "CD Penalty Calculator", description: "Calculate early withdrawal penalties for CDs." },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  icons: { icon: "/favicon.ico", shortcut: "/favicon.ico", apple: "/apple-touch-icon.png" },
  viewport: { width: "device-width", initialScale: 1, maximumScale: 5 },
  authors: [{ name: "David Graham" }],
  creator: "MoneyWise Calculators",
  publisher: "MoneyWise Calculators",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3475627763908800" crossOrigin="anonymous"></script>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "CD Penalty Calculator", description: "Calculate early withdrawal penalties for CDs", url: "https://www.cdpenaltycalc.com", applicationCategory: "Finance", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } }) }} />
      </head>
      <body>{children}</body>
    </html>
  );
}