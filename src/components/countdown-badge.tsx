import clsx from 'clsx'

export function CountdownBadge({ className }: { className?: string }) {
  return (
    <span
      className={clsx(
        'inline-block text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full bg-white text-black',
        className
      )}
    >
      Instant Download
    </span>
  )
}
