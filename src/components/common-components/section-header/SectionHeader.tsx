import React from "react";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  fromColor?: string; // gradient start color
  toColor?: string; // gradient end color
  align?: "left" | "center" | "right";
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  description,
  fromColor = "#96f7e4",
  toColor = "#0092b8",
  align = "center",
}) => {
  const alignment =
    align === "left"
      ? "text-left mx-0"
      : align === "right"
      ? "text-right mx-0"
      : "text-center mx-auto";

  return (
    <div className={`${alignment} mb-10 sm:mb-12 md:mb-16 lg:mb-20`}>
      {subtitle && (
        <p className="text-gray-700 max-w-2xl mx-auto text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl md:max-w-2xl">
          {subtitle}
        </p>
      )}

      <h2
        className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold mb-3   leading-tight  text-sky-800`}
        // style={{
        //   backgroundImage: `linear-gradient(to right, ${fromColor}, ${toColor})`,
        // }}
      >
        {title}
      </h2>

      {description && (
        <p className="text-gray-700 max-w-2xl mx-auto text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl md:max-w-4xl">
          {description}
        </p>
      )}

      <div
        className="mt-4 sm:mt-6 h-1 mx-auto rounded-full"
        style={{
          width: "8rem",
          backgroundImage: `linear-gradient(to right, #96f7e4, #0092b8)`,
        }}
      ></div>
    </div>
  );
};

export default SectionHeader;
