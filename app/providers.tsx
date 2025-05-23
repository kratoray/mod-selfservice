'use client';

import { useEffect, useState } from 'react';

import { Session } from 'next-auth';
import { SessionProvider, signIn, useSession } from 'next-auth/react';

const RefreshTokenHandler = ({ children }: { children: React.ReactNode }) => {
  const { update } = useSession();
  const [isRefreshing, setIsRefreshing] = useState(true);

  const handleVisibilityChange = () => {
    if (document.visibilityState === 'visible') {
      update();
    }
  };

  useEffect(() => {
    window.setTimeout(async () => {
      await update();
      setIsRefreshing(false);
    }, 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      update();
    }, 50 * 1000);

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  });

  if (isRefreshing) {
    return null;
  }

  return children;
};

export const Providers = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) => {
  useEffect(() => {
    if (
      !session ||
      session.error === 'RefreshAccessTokenError' ||
      Date.now() >= session.refreshTokenExpiresAt
    ) {
      signIn('keycloak');
    }
  }, [session]);

  return (
    <SessionProvider session={session}>
      <RefreshTokenHandler>{children}</RefreshTokenHandler>
    </SessionProvider>
  );
};
