export function OnboardingHelpContent() {
  return (
    <div className="relative h-full overflow-hidden bg-background">
      <div className="absolute inset-x-5 top-[22%] z-10">
        <p className="text-heading font-bold text-navy-1">Kalian Bantuin Juga Yaa!! :D</p>
      </div>

      <span
        className="absolute left-[45%] top-[29%] z-10 block h-24 w-1.5 origin-top rotate-[30deg] rounded-full bg-navy-2"
        aria-hidden="true"
      />

      <img
        src="/Rini/Rini_leaning.png"
        alt="Lani sedang membungkuk untuk membantu memasak"
        className="absolute -bottom-2 -left-[12%] z-0 h-[68%] w-[78%] object-contain object-bottom"
      />

      <p className="absolute bottom-[13%] right-3 z-10 max-w-[72%] text-right text-title font-bold leading-tight text-biru-2">
        Carilah Bahan-Bahan Yang
        <br />
        Tersebar Untuk Membantu
        <br />
        <span className="text-green-2">Lani</span> Memasak!
      </p>
    </div>
  );
}
