import lumberjack from "@/assets/notes-ink/drwal-pointing-v1.png";
import arrow from "@/assets/notes-ink/arrow.svg";

export function NotesMascot({ className = "" }: { className?: string }) {
  return (
    <div className="notes-hero-art" aria-hidden="true">
      <img className="notes-arrow" src={arrow} alt="" />
      <img className={className} src={lumberjack} alt="" />
    </div>
  );
}
