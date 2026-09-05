type ChapterBannerProps = {
  label: string;
  title: string;
  color: string;
};

export function ChapterBanner({ label, title, color }: ChapterBannerProps) {
  return (
    <section className="mx-5 rounded-3xl px-6 py-5 text-white" style={{ backgroundColor: color }}>
      <p className="text-title">{label}</p>
      <h1 className="mt-1 text-heading">{title}</h1>
    </section>
  );
}
