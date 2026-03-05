'use client';

import { useCallback } from 'react';
import { useRouter, usePathname } from '@/i18n/navigation';
import { usePathnameOverrides } from '@/components/PathnameOverrides';

/** Returns a stable callback that switches the active locale while preserving translated slug overrides. */
export function useLocaleSwitch() {
  const router = useRouter();
  const pathname = usePathname();
  const overrides = usePathnameOverrides();

  return useCallback(
    (newLocale: string) => {
      const target = overrides[newLocale] ?? pathname;
      router.replace(target, { locale: newLocale as 'fr' | 'en' | 'es' | 'de' });
    },
    [router, pathname, overrides]
  );
}
