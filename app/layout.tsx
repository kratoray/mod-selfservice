import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import localFont from 'next/font/local';

import { AppLayout } from '@/components/templates/app-layout';
import { ThemeProvider } from '@/components/templates/theme-provider';
import { Toaster } from '@/components/ui/sonner';

import { authOptions } from '@/auth.config';

import './globals.css';
import { Providers } from './providers';

const fontRijksoverheidSans = localFont({
  src: [
    {
      path: './fonts/rijksoverheid-sans-web_regular.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/rijksoverheid-sans-web_bold.woff',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/rijksoverheid-sans-web_italic.woff',
      weight: '400',
      style: 'italic',
    },
  ],
  variable: '--font-rijksoverheid-sans',
});

const fontRijksoverheidSerif = localFont({
  src: [
    {
      path: './fonts/rijksoverheid-serif-web_regular.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/rijksoverheid-serif-web_bold.woff',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/rijksoverheid-serif-web_italic.woff',
      weight: '400',
      style: 'italic',
    },
  ],
  variable: '--font-rijksoverheid-serif',
});

export const metadata: Metadata = {
  title: 'DBDAAP Selfservice 2.0',
  description: 'Start met Innoveren',
};

export const fetchCache = 'default-cache';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  const hasActiveSession = session && Date.now() < session.refreshTokenExpiresAt!;

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontRijksoverheidSans.variable} ${fontRijksoverheidSerif.variable} bg-background text-foreground antialiased`}
      >
        <Providers session={session}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            themes={['light', 'dark', 'system']}
          >
            {hasActiveSession && (
              <>
                <AppLayout>{children}</AppLayout>
              </>
            )}
            <Toaster />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
