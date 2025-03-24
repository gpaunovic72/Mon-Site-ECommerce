import Link from "next/link";

type ButtonProps = {
  href: string;
  text: string;
  onClick?: () => void;
  className?: string;
};

export default function Button({
  href,
  text,
  className,
  onClick,
}: ButtonProps) {
  return (
    <Link href={href}>
      <button
        onClick={onClick}
        className={`rounded-4xl py-3 px-10 ${className}`}
      >
        {text}
      </button>
    </Link>
  );
}
