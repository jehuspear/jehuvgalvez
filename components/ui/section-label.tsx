type SectionLabelProps = { index?: string; label: string; divider?: boolean };

export function SectionLabel({ index, label, divider = true }: SectionLabelProps) {
  return (
    <p className="section-label" data-divider={divider}>
      {index && <><span className="section-label-index">{index}</span><span className="section-label-slash" aria-hidden="true">/</span></>}
      <span>{label}</span>
      {divider && <span className="section-label-rule" aria-hidden="true" />}
    </p>
  );
}
