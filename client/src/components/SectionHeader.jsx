function SectionHeader({ eyebrow, title, highlight, subtitle, align = "center" }) {
  const alignClass =
    align === "left" ? "items-start text-left" : "items-center text-center";

  return (
    <div className={`flex flex-col ${alignClass} gap-2 mb-8`}>
      {eyebrow && (
        <span className="text-xs font-semibold tracking-widest uppercase text-[#6366f1]">
          {eyebrow}
        </span>
      )}

      <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
        {title}{" "}
        {highlight && (
          <span className="bg-gradient-to-r from-[#6366f1] via-[#a855f7] to-[#ec4899] bg-clip-text text-transparent">
            {highlight}
          </span>
        )}
      </h2>

      {subtitle && (
        <p className="text-slate-600 max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default SectionHeader;