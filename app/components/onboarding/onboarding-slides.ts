export type OnboardingSlide = {
  id: number;
  main: boolean;
  illustration: {
    src: string;
    alt: string;
  };
  title: string;
  description: string;
};

export const onboardingSlides: OnboardingSlide[] = [
  {
    id: 1,
    main: true,
    illustration: {
      src: "Agus/Agus_main.png",
      alt: "SignTide character celebrating on a purple star",
    },
    title: "SignTide",
    description: "Aplikasi pembelajaran Bahasa Isyarat berbasis gamifikasi",
  },
  {
    id: 2,
    main: false,
    illustration: {
      src: "Rini/Rini_Cooking.png",
      alt: "A child happily preparing chocolate batter",
    },
    title: "Cara mudah dan asik untuk mempelajari",
    description: "Sistem Isyarat Bahasa Indonesia (SIBI).",
  },
  {
    id: 3,
    main: false,
    illustration: {
      src: "Xavier/Xavier_Surfing.png",
      alt: "A child surfing in a blue ocean wave",
    },
    title: "Belajar Bahasa Isyarat Kapan pun, dimana pun!",
    description: "Nikmati pembelajaran yang fleksibel dan menyenangkan.",
  },
];
