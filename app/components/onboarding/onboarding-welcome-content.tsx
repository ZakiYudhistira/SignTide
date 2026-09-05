export function OnboardingWelcomeContent() {
  return (
    <div className="flex h-full flex-col items-center justify-center px-6 text-center">
      <img
        src="/signtide_character.png"
        alt="Agus, maskot SignTide, melambaikan tangan"
        className="h-[42%] min-h-64 w-full object-contain"
      />

      <div className="mt-10">
        <p className="text-heading font-bold text-ocean">Selamat datang di</p>
        <h2 className="mt-2 text-display text-green-2">SignTide!</h2>
        <p className="mt-12 text-body-large font-semibold text-gray-1">
          *Kakak Ah, Merajuk ... -Lani
        </p>
      </div>
    </div>
  );
}
