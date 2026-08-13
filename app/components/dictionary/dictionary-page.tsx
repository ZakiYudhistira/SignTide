import { DictionaryCell, type DictionaryCellColor } from "./dictionary-cell";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const words = [
  "Saya", "Kamu", "Nama", "Siapa", "Guru", "Siswa", "Teman", "Kelas",
  "Halo", "Selamat Pagi", "Terimakasih", "Maaf", "Permisi", "Sampai Jumpa",
  "Umur", "Tinggal", "Sekolah", "Alamat", "Asal", "Suka", "Tidak Suka",
  "Hobi", "Membaca", "Bermain",
];
const affixes = ["Ber-", "Me-", "Di-", "Se-", "Ke-", "Pe-", "Ter-", "-I", "-An", "-Nya", "-Kan"];

function Section({ title, items, color }: { title: string; items: string[]; color: DictionaryCellColor }) {
  return (
    <section className="mt-8 border-t-4 border-[#ffd278] pt-3">
      <h2 className="mb-4 text-heading-small text-navy-1">{title}</h2>
      <div className="grid grid-cols-4 gap-x-4 gap-y-6 sm:grid-cols-5">
        {items.map((item) => <DictionaryCell key={item} label={item} color={color} />)}
      </div>
    </section>
  );
}

export function DictionaryPage() {
  return (
    <div className="min-h-full bg-background px-5 pb-32 pt-8">
      <header className="text-center">
        <h1 className="text-heading text-navy-1">Ayo Belajar SIBI!</h1>
        <p className="mt-2 text-title text-ocean">Panduan Menghafal Materi SignTide!</p>
      </header>
      <Section title="Alphabet" items={alphabet} color="blue" />
      <Section title="Kata" items={words} color="blue" />
      <Section title="Kata Imbuhan" items={affixes} color="sky" />
    </div>
  );
}
