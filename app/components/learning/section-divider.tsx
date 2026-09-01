type SectionDividerProps = {
  label: string;
};

export function SectionDivider({ label }: SectionDividerProps) {
  return (
    <div className="flex items-center gap-4 px-5 py-4 text-gray-1">
      <span className="h-1 flex-1 rounded-full bg-gray-2" />
      <span className="shrink-0 text-title">{label}</span>
      <span className="h-1 flex-1 rounded-full bg-gray-2" />
    </div>
  );
}
