import logo from "../../public/Logo.svg";

interface LogoProps {
  className?: string;
}

function Logo({ className = "h-8 w-8" }: LogoProps) {
  return (
    <img
      src={logo}
      alt="IrisFields Logo"
      className={`dark:transition-colors duration-200 ${className}`}
    />
  );
}

export default Logo;