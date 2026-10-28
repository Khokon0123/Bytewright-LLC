type Props = { className?: string };

/** "Byte" in ink, "Wright" in brand blue. Set in Switzer 500, tight. */
export function Wordmark({ className = "" }: Props) {
  return (
    <span
      className={`font-medium tracking-[-0.035em] ${className}`}
      aria-label="ByteWright"
    >
      <span aria-hidden="true">Byte</span>
      <span aria-hidden="true" className="text-accent">
        Wright
      </span>
    </span>
  );
}
