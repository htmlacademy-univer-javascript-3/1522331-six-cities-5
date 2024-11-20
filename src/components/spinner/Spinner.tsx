interface SpinnerProps {
  caption?: string;
}

export function Spinner({ caption }: SpinnerProps) {
  return (
    <>
      <div className="spinner"></div>
      {caption && <span>{caption}</span>}
    </>
  );
}
