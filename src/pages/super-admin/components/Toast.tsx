export function Toast({ message }: { message: string | null }) {
  if (!message) return null;

  return (
    <div
      role="status"
      className="fixed bottom-5 right-5 z-[80] rounded-control border border-border bg-surface px-4 py-3 text-sm text-text"
    >
      {message}
    </div>
  );
}
