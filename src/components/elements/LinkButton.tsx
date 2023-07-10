import Link from "next/link";
import { twMerge } from "tailwind-merge";

interface LinkButtonprops {
  children: React.ReactNode;
  className?: string;
  href: string;
}

const LinkButton: React.FC<LinkButtonprops> = ({ children, className, href }) => {
  return (
    <Link href={href} className={twMerge(`bg-primary inline-block border font-semibold text-white py-2 px-2 text-sm min-w-[120px] text-center ${className}`)}>
      {children}
    </Link>
  );
};

export default LinkButton;
