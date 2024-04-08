export default function Container({ className, children }) {
  return (
    <div className={`mx-auto max-w-[1440px] ${className}`}>{children}</div>
  );
}
