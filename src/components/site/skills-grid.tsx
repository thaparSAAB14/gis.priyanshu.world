const skillGroups = [
  {
    title: "GIS Platforms",
    skills: ["ArcGIS Pro", "QGIS", "ArcGIS Online"],
  },
  {
    title: "Spatial Analysis",
    skills: ["Geoprocessing", "Overlay Analysis", "Projections"],
  },
  {
    title: "Data & Web",
    skills: ["Survey123", "QA/QC", "Python", "Web GIS"],
  },
];

export function SkillsGrid() {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold">Core Skills</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {skillGroups.map((group) => (
          <article key={group.title} className="rounded-2xl border border-foreground/10 bg-card/40 p-4">
            <h3 className="text-base font-semibold">{group.title}</h3>
            <ul className="mt-3 space-y-2 text-sm text-foreground/75">
              {group.skills.map((skill) => (
                <li key={skill}>• {skill}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
