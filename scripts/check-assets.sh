#!/usr/bin/env bash
#
# Asset guard.
#
# Vite does not validate paths into `public/`: a `src` pointing at a file that
# does not exist builds cleanly and then renders a broken image on the live
# site. Nothing else in the pipeline catches it, because from the bundler's
# point of view the string is just a string.
#
# This walks every "/images/..." reference in src/ and asserts the file is
# actually there. It is the difference between finding out at build time and
# finding out because a recruiter sees five broken images.

set -euo pipefail

if [ ! -d src ] || [ ! -d public ]; then
  echo "check-assets: run this from the repo root." >&2
  exit 1
fi

missing=0
found=0

# -o prints just the matched path; sort -u because the same asset may repeat.
for ref in $(grep -rhoE '"/images/[^"]+"' --include='*.ts' --include='*.tsx' src \
             | tr -d '"' | sort -u); do
  found=$((found + 1))
  if [ ! -f "public${ref}" ]; then
    if [ "$missing" -eq 0 ]; then
      echo ""
      echo "✗ Referenced image files do not exist:"
    fi
    echo "    public${ref}"
    missing=$((missing + 1))
  fi
done

# Orphans: files sitting in public/images that nothing references. These are not
# harmless. Vite copies all of public/ into dist/, so an unreferenced file is
# still published and publicly fetchable by URL — an easy way to accidentally
# ship an unredacted original or a stale draft that no page links to.
orphans=0
while IFS= read -r file; do
  ref="${file#public}"
  case "$(basename "$file")" in .*) continue ;; esac
  if ! grep -rqF "\"${ref}\"" --include='*.ts' --include='*.tsx' src; then
    if [ "$orphans" -eq 0 ]; then
      echo ""
      echo "✗ Unreferenced files in public/images (these still get published):"
    fi
    echo "    ${file}"
    orphans=$((orphans + 1))
  fi
done < <(find public/images -type f 2>/dev/null | sort)

if [ "$orphans" -gt 0 ]; then
  echo ""
  echo "  Reference them from src/content.ts, or delete them. Do not leave"
  echo "  originals or drafts in public/ — everything there is deployed."
  exit 1
fi

if [ "$missing" -gt 0 ]; then
  echo ""
  echo "  $missing of $found referenced image(s) are missing."
  echo "  Save the files to the paths above, or remove the \`src\` from the"
  echo "  matching figure in src/content.ts to fall back to a dev-only"
  echo "  placeholder (which is omitted from production builds)."
  exit 1
fi

echo "✓ Asset guard passed — all $found referenced image(s) exist."
