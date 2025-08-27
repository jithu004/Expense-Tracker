import { Outfit } from 'next/font/google';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from 'sonner';
import { ThemeProvider } from './ThemeProvider';

const outfit = Outfit({
  subsets: ['latin'],
});

export const metadata = {
  title: "Trackify",
  description: "Manage your expenses and control your money.",
  icons: {
    icon: "/logo.svg",
  },
};
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.className} antialiased`}>
        <ThemeProvider>
          <ClerkProvider
            publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
          >
            <Toaster />
            {children}
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}