import Link from "next/link";

type ButtonProps = {
  href: string;
  text: string;
  className?: string;
};

export default function Button({ href, text, className }: ButtonProps) {
  return (
    <Link href={href}>
      <button className={`rounded-4xl py-3 px-10 ${className}`}>{text}</button>
    </Link>
  );
}
