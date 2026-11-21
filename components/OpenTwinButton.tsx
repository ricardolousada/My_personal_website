"use client";

export function OpenTwinButton({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new Event("open-twin"))}
    >
      {children}
    </button>
  );
}
