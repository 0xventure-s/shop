interface Props {
  tittle: string;
  subtitle?: string;
  className?: string;
}

export default function TittlePage({ tittle, subtitle, className }: Props) {
  return (
    <div className={`mt-3 ${className}`}>
      <h1 className={`antialiased text-4xl font-semibold my-10`}>{tittle}</h1>

      {subtitle && <h3 className="text-xl mb-5">{subtitle}</h3>}
    </div>
  );
}
