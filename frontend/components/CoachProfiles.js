import { CoachCard } from "@/components/CoachCard";

const coaches = [
  {
    name: "Coach R. Iyer",
    initials: "RI",
    specialization: "Footwork & Defense",
    experience: 8,
    programs: 3,
  },
  {
    name: "Coach S. Kapoor",
    initials: "SK",
    specialization: "Smash & Attack",
    experience: 6,
    programs: 2,
  },
  {
    name: "Coach A. Verma",
    initials: "AV",
    specialization: "Conditioning",
    experience: 10,
    programs: 4,
  },
  {
    name: "Coach P. Nair",
    initials: "PN",
    specialization: "Tactics & Match-play",
    experience: 7,
    programs: 3,
  },
];

export function CoachProfiles() {
  return (
    <section className="space-y-3">
      <div>
        <h2 className="text-lg font-semibold text-slate-100">Coach Profiles</h2>
        <p className="text-sm text-slate-400">
          At-a-glance specialization and experience across the coaching team.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {coaches.map((c) => (
          <CoachCard key={c.name} coach={c} />
        ))}
      </div>
    </section>
  );
}

