import { cn } from "@/lib/utils";

interface HeadingProps {
  title: string;
  subtitle?: string;
  
  titleClass?: string;
  subtitleClass?: string;
}

const Heading: React.FC<HeadingProps> = ({ title, subtitle, titleClass, subtitleClass }) => {
  return (
    <div className="flex flex-col">
      <h1 className={cn("text-4xl", subtitle && "mb-1", titleClass)}>{title}</h1>
      <h2 className={cn("text-lg font-medium text-black/50 dark:font-normal dark:text-white/50", subtitleClass)}>{subtitle}</h2>
    </div>
  );
};
export default Heading;