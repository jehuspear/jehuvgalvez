type ProjectHeadingProps = {
  index: string; category: string; title: string; subtitle: string;
  period: string; role: string; summary: string;
};

export function ProjectHeading({ index, category, title, subtitle, period, role, summary }: ProjectHeadingProps) {
  return (
    <header className="project-heading">
      <p className="project-eyebrow"><span aria-hidden="true">{index}</span><span>{category}</span></p>
      <h3 id={`project-${index}-title`}>{title}</h3>
      <p className="project-subtitle">{subtitle}</p>
      <p className="project-summary">{summary}</p>
      <dl className="project-meta">
        <div><dt>Period</dt><dd>{period}</dd></div>
        <div><dt>Role</dt><dd>{role}</dd></div>
      </dl>
    </header>
  );
}

export function ProjectTags({ tags }: { tags: readonly string[] }) {
  return <ul className="project-tags" aria-label="Project technologies and practices">{tags.map(tag => <li key={tag}>{tag}</li>)}</ul>;
}
