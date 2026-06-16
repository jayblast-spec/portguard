import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PortGuard | Network exposure',
  description: 'see risky open ports before attackers turn them into doors',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}