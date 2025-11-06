interface IconProps extends React.SVGProps<SVGSVGElement> {
  iconOnly?: boolean;
}

export default function Logo({ iconOnly = false, ...props }: IconProps) {
  return (
    <div className="flex items-center">
      <img
        src="/kedaimaster.jpg"
        alt="Kedai Master Logo"
        className={iconOnly ? "h-6 w-auto" : "h-7 w-auto"}
      />
      {!iconOnly && (
        <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
          KEDAIMASTER
        </span>
      )}
    </div>
  );
}