import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EPC-QR",
  description: "EPC-QR code generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className='flex justify-center h-screen'>
        <main className='w-3/4 m-4'>
        {children}
        </main>
      </body>
    </html>
  );
}
