import Image from "next/image";
import type { WorkTeamMember } from "@/lib/work-content";

/** A logo sits on a fixed white chip rather than the themed `bg-bg` — most
 * org logos are drawn for a white background and would wash out against
 * dark mode's near-black `bg-bg` otherwise. A photo (`avatarFit: "cover"`)
 * skips that chip and padding — it already fills its own frame. */
function Avatar({ member, ring }: { member: WorkTeamMember; ring?: boolean }) {
  const isPhoto = member.avatarFit === "cover";
  return (
    <span
      aria-hidden="true"
      className={`relative flex h-9 w-9 flex-none items-center justify-center overflow-hidden rounded-full text-small font-semibold text-ink ${
        member.avatar && !isPhoto ? "bg-[#fff]" : "bg-subtle"
      } ${ring ? "border-2 border-bg" : ""}`}
    >
      {member.avatar ? (
        <Image
          src={member.avatar}
          alt=""
          fill
          sizes="36px"
          className={isPhoto ? "object-cover" : "object-contain p-1.5"}
        />
      ) : (
        member.initials
      )}
    </span>
  );
}

/** Team's avatar display inside SpecBlock (brief section 6.7). A single
 * member (the common case today) renders inline: avatar, then name. Two or
 * more stack as overlapping circles; hovering or keyboard-focusing one
 * reveals its name in a small label below the row, via opacity only (brief
 * section 7 allows opacity changes, never a sliding entrance — an
 * avatar-shifts-over-to-make-room version was considered and dropped for
 * exactly that reason). Each avatar is a real `<button>` (not a styled
 * `div`) so it's focusable and announces its name via `aria-label` without
 * needing hover at all. */
export function AvatarGroup({ team }: { team: readonly WorkTeamMember[] }) {
  const [first, ...rest] = team;

  if (!first) return null;

  if (rest.length === 0) {
    return (
      <div className="flex items-center gap-2.5">
        <Avatar member={first} />
        <span className="text-nav text-ink">{first.name}</span>
      </div>
    );
  }

  return (
    <div className="relative flex items-center">
      {team.map((member, index) => (
        <button
          key={member.name}
          type="button"
          aria-label={member.name}
          className={`group flex-none ${index > 0 ? "-ml-2.5" : ""}`}
        >
          <Avatar member={member} ring />
          {/* `hidden` until shown: an invisible label would still widen the
              scrollable area on a narrow screen. `starting:` keeps the fade-in. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-full left-0 z-10 mt-2 hidden w-max max-w-[min(18rem,calc(100vw-10rem))] rounded-control border border-line bg-bg px-2 py-1 text-small text-ink opacity-100 transition-opacity duration-150 group-hover:block group-focus-visible:block starting:opacity-0"
          >
            {member.name}
          </span>
        </button>
      ))}
    </div>
  );
}
