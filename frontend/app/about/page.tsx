import { Navbar } from "@/components/navbar";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="space-y-6">
        <h1 className="text-3xl font-semibold">About the Academy</h1>
        <section className="rounded-lg bg-card p-6 text-sm text-slate-200 space-y-3">
          <p>
            Our badminton academy focuses on long-term player development,
            combining strong technical foundations with physical conditioning
            and tactical awareness.
          </p>
          <p>
            Training is structured into clear programs for different age groups
            and skill levels, from beginners to high performance athletes.
          </p>
        </section>
      </main>
    </>
  );
}

