"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";

export default function BeforeAfterSlider({
  before,
  after,
  label,
}: {
  before: string;
  after: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const [width, setWidth] = useState(0);
  const dragging = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const update = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, pct)));
  }, []);

  return (
    <div>
      <div
        ref={ref}
        className="relative aspect-[4/3] w-full cursor-ew-resize select-none overflow-hidden rounded-[8px] bg-paper-2 md:aspect-[16/9]"
        onMouseDown={(e) => {
          dragging.current = true;
          update(e.clientX);
        }}
        onMouseMove={(e) => dragging.current && update(e.clientX)}
        onMouseUp={() => (dragging.current = false)}
        onMouseLeave={() => (dragging.current = false)}
        onTouchStart={(e) => update(e.touches[0].clientX)}
        onTouchMove={(e) => update(e.touches[0].clientX)}
      >
        <Image src={after} alt={`${label} — after`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
        <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${pos}%` }}>
          {width > 0 && (
            <div className="absolute inset-y-0 left-0" style={{ width }}>
              <Image
                src={before}
                alt={`${label} — before`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          )}
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-4 flex justify-between px-4 text-xs font-semibold uppercase tracking-[0.1em] text-paper">
          <span className="rounded-full bg-ink/70 px-3 py-1.5">Before</span>
          <span className="rounded-full bg-ink/70 px-3 py-1.5">After</span>
        </div>

        <div
          className="pointer-events-none absolute inset-y-0 w-0.5 bg-paper"
          style={{ left: `${pos}%` }}
        >
          <div className="absolute left-1/2 top-1/2 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-paper text-ink shadow-lg">
            ↔
          </div>
        </div>
      </div>
      <p className="mt-3 text-sm text-muted">{label}</p>
    </div>
  );
}
