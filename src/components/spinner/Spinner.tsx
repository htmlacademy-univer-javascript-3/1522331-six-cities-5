interface SpinnerProps {
  caption?: string;
  small?: boolean;
}

export function Spinner({ caption, small }: SpinnerProps) {
  return (
    <div className="spinner_container">
      <div className={`spinner ${small && 'spinner_small'}`}></div>
      {caption && <span>{caption}</span>}
    </div>
  );
}
