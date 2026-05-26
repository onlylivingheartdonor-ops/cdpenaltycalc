export const metadata = {
  title: "CD Penalty Calculator | Calculate Early Withdrawal Penalties on Certificates of Deposit",
  description: "Calculate the true cost of breaking a CD before maturity. See your interest earned, penalty amount, net proceeds, and decide if cashing out early is worth it.",

  alternates: {
    canonical: "https://www.cdpenaltycalc.com",
  },

  openGraph: {
    title: "CD Penalty Calculator | Calculate Early Withdrawal Penalties on CDs",
    description: "Calculate early withdrawal penalties, see net proceeds, and decide if breaking your CD is worth the cost.",
    url: "https://www.cdpenaltycalc.com",
    siteName: "MoneyWise Calculators",
    images: [
      {
        url: "https://www.cdpenaltycalc.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "CD Penalty Calculator -- Calculate Early Withdrawal Penalties",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "CD Penalty Calculator | Calculate Early Withdrawal Penalties",
    description: "Calculate early withdrawal penalties and net proceeds when breaking a CD before maturity.",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  authors: [{ name: "David Graham" }],
  creator: "MoneyWise Calculators",
  publisher: "MoneyWise Calculators",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3475627763908800"
          crossOrigin="anonymous"
        ></script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "CD Penalty Calculator",
              description: "Free tool to calculate early withdrawal penalties on Certificates of Deposit (CDs). See interest earned, penalty amount, and net proceeds.",
              url: "https://www.cdpenaltycalc.com",
              applicationCategory: "FinanceApplication",
              operatingSystem: "All",
              browserRequirements: "Requires JavaScript",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD"
              },
              author: {
                "@type": "Organization",
                name: "MoneyWise Calculators",
                url: "https://moneywisecalculator.com"
              }
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}