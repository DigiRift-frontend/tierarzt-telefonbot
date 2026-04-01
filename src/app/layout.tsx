import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/CookieBanner";

export const metadata: Metadata = {
  title: {
    default: "KI-Telefonbot für Tierärzte | tierarzt-telefonbot.de",
    template: "%s | tierarzt-telefonbot.de",
  },
  description:
    "Der KI-Telefonbot für Ihre Tierarztpraxis. Notfall-Triage, Terminbuchung, Rezeptbestellungen — wir kümmern uns um alles. Full-Service von DigiRift.",
  metadataBase: new URL("https://tierarzt-telefonbot.de"),
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "tierarzt-telefonbot.de",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "tierarzt-telefonbot.de — KI-Telefonbot fuer Tierarztpraxen",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KI-Telefonbot fuer Tieraerzte | tierarzt-telefonbot.de",
    description:
      "Der KI-Telefonbot fuer Ihre Tierarztpraxis. Notfall-Triage, Terminbuchung, Rezeptbestellungen — Full-Service von DigiRift.",
    images: ["/opengraph-image"],
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: "./",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://tierarzt-telefonbot.de/#organization",
                  name: "DigiRift GmbH",
                  url: "https://tierarzt-telefonbot.de",
                  logo: "https://tierarzt-telefonbot.de/icon.svg",
                  sameAs: ["https://digirift.com"],
                  contactPoint: {
                    "@type": "ContactPoint",
                    contactType: "customer service",
                    email: "info@digirift.com",
                    availableLanguage: "German",
                  },
                  address: {
                    "@type": "PostalAddress",
                    streetAddress: "Rothenbaumchaussee 17",
                    addressLocality: "Hamburg",
                    postalCode: "20148",
                    addressCountry: "DE",
                  },
                },
                {
                  "@type": "WebSite",
                  "@id": "https://tierarzt-telefonbot.de/#website",
                  url: "https://tierarzt-telefonbot.de",
                  name: "tierarzt-telefonbot.de",
                  publisher: { "@id": "https://tierarzt-telefonbot.de/#organization" },
                  inLanguage: "de-DE",
                },
                {
                  "@type": "Service",
                  "@id": "https://tierarzt-telefonbot.de/#service",
                  name: "KI-Telefonbot fuer Tierarztpraxen",
                  description:
                    "Intelligenter KI-Telefonbot fuer Tierarztpraxen. Notfall-Triage, Terminbuchung, Rezeptbestellungen, Impf-Erinnerungen — 24/7, DSGVO-konform, Full-Service.",
                  provider: { "@id": "https://tierarzt-telefonbot.de/#organization" },
                  serviceType: "KI-Telefonie",
                  areaServed: { "@type": "Country", name: "Germany" },
                  hasOfferCatalog: {
                    "@type": "OfferCatalog",
                    name: "KI-Telefonbot Pakete",
                    itemListElement: [
                      {
                        "@type": "Offer",
                        itemOffered: {
                          "@type": "Service",
                          name: "KI-Telefonbot Full-Service",
                          description:
                            "Komplettloesung: Einrichtung, Training, laufende Optimierung, DSGVO-Dokumentation, AV-Vertrag inklusive.",
                        },
                      },
                    ],
                  },
                },
              ],
            }),
          }}
        />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
