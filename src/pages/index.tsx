import { useEffect, useState } from 'react';

import { useTheme } from 'next-themes';

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div />;
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button
        type="button"
        className="rounded border bg-gradient-to-r from-brand-gradient-start to-brand-gradient-end p-[5px]"
        onClick={() => {
          setTheme(theme === 'light' ? 'dark' : 'light');
        }}
      >
        {theme === 'light' ? 'light' : 'dark'}
      </button>
      <p className="font-bold">
        This is Main this is pretendard hahaha <br />
        안녕하세요 한글 폰트는 어떨까요?
      </p>
      <p className="text-4xl font-bold text-brand-primary hover:bg-interaction-hover">
        bold
      </p>
      <p className="text-3xl font-bold text-brand-primary">bold</p>
      <p className="text-2xl font-bold text-brand-primary">bold</p>
      <p className="text-xl font-bold text-brand-primary">bold</p>
    </main>
  );
}
