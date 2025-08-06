import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tworzenie Stron Internetowych dla Firm | Softnami - Profesjonalne Strony WWW",
  description: "Tworzymy nowoczesne, responsywne strony internetowe dla małych i średnich firm. Kompleksowe usługi web development, firmowe emaile, logo. Sprawdź ofertę Softnami.",
  keywords: "tworzenie stron internetowych, strony www dla firm, projektowanie stron, responsywne strony, sklepy internetowe, firmowe strony, web development Polska",
  authors: [{ name: "Softnami" }],
  creator: "Softnami",
  publisher: "Softnami",
  robots: "index, follow",
  category: "Technology",
  openGraph: {
    title: "Tworzenie Stron Internetowych dla Firm | Softnami",
    description: "Profesjonalne strony internetowe dla Twojego biznesu. Responsywne, szybkie i dostosowane do Twoich potrzeb.",
    url: "https://softnami.pl",
    siteName: "Softnami",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/softnami-logo.png",
        width: 1200,
        height: 630,
        alt: "Softnami - Tworzenie Stron Internetowych",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tworzenie Stron Internetowych dla Firm | Softnami",
    description: "Profesjonalne strony internetowe dla Twojego biznesu",
    images: ["/softnami-logo.png"],
  },
  alternates: {
    canonical: "https://softnami.pl",
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
