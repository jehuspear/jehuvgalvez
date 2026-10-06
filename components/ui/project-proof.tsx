type ProjectProofProps = {
  title: string;
  proof: {
    readonly problem: string;
    readonly contribution: string;
    readonly delivered: string;
  };
};

/** Static, readable proof alongside the cinematic project narrative. */
export function ProjectProof({ title, proof }: ProjectProofProps) {
  return (
    <dl className="project-proof" aria-label={`${title} project proof`}>
      <div><dt>Problem</dt><dd>{proof.problem}</dd></div>
      <div><dt>My role</dt><dd>{proof.contribution}</dd></div>
      <div><dt>Delivered</dt><dd>{proof.delivered}</dd></div>
    </dl>
  );
}
