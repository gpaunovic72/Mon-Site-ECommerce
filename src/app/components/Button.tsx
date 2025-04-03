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
    <Link href={href} className="w-full">
      <button
        onClick={onClick}
        className={`w-full rounded-4xl py-2 px-4 text-center ${className}`}
      >
        {text}
      </button>
    </Link>
  );
}
