import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import ThreeBackground from "@/components/ThreeBackground";

import { ThemeProvider } from "@/components/context/ThemeContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata = {
  title: "Nalvia - Solutions Énergétiques Solaires",
  description: "Installation et maintenance de panneaux solaires en Tunisie. Passez au vert avec Nalvia.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${inter.variable} ${poppins.variable}`}>
      <body>
        <ThemeProvider>
          <ThreeBackground />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
