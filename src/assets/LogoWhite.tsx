import Logowhite from "../../public/LogoWhite.svg";

interface LogoProps {
  className?: string;
}

function LogoWhite({ className = "h-8 w-8" }: LogoProps) {
  return (
    <img
      src={Logowhite}
      alt="IrisFields Logo"
      className={`dark:transition-colors duration-200 ${className}`}
    />
  );
}

export default LogoWhite;