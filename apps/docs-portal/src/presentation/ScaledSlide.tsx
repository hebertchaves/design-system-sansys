import { useLayoutEffect, useRef, useState, type ReactNode } from 'react';

export function ScaledSlide({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  useLayoutEffect(() => {
    const host = ref.current;
    if (!host) return;
    const observer = new ResizeObserver(([entry]) => {
      if (entry) setScale(Math.min(entry.contentRect.width / 1920, entry.contentRect.height / 1080));
    });
    observer.observe(host);
    return () => observer.disconnect();
  }, []);
  return <div className="deck-scale-host" ref={ref}><div className="deck-scale-slide" style={{ transform: `scale(${scale})` }}>{children}</div></div>;
}