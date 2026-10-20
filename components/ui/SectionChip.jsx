/** Petite editorial section cue. No chapter numbering or extra subtitles. */

export default function SectionChip({ children, className = '' }) {
  return (
    <span className={`mk-section-chip${className ? ` ${className}` : ''}`}>
      <span className="mk-section-chip__mark" aria-hidden="true" />
      <span className="mk-section-chip__label">{children}</span>
    </span>
  );
}
