#!/usr/bin/env bash
#
# Brand guard.
#
# Why this exists: wiping Tailwind's --color-* and --text-* namespaces in
# src/index.css means off-brand utilities like `bg-red-500` or `text-lg` emit no
# CSS at all — but Tailwind does NOT fail the build on them. It ignores unknown
# utilities silently. So the wipe alone gives you a broken-looking page rather
# than a red CI run.
#
# This script supplies the hard failure. It fails the build when source files
# reach outside the token system, which is the one thing that erodes a design
# system over time.
#
# Source of truth for what is allowed: the @theme block in src/index.css.
# src/index.css is not scanned — it is where the literal values legitimately live.

set -euo pipefail

if [ ! -d src ]; then
  echo "check-brand: no src/ directory — run this from the repo root." >&2
  exit 1
fi

fail=0

report() {
  local label="$1"
  local pattern="$2"
  local hint="$3"
  local hits

  # Recursive grep with --include works on both BSD (macOS) and GNU grep.
  # A non-match exits 1, which must not abort the script under `set -e`.
  hits=$(grep -REnH --include='*.ts' --include='*.tsx' "$pattern" src || true)

  if [ -n "$hits" ]; then
    echo ""
    echo "✗ $label"
    echo "  $hint"
    printf '%s\n' "$hits" | sed 's/^/    /'
    fail=1
  fi
}

# Literal colour values. All colour must come from a --color-* token so the
# contrast guarantees documented in index.css actually hold.
report "Hard-coded hex colour" \
  '#[0-9a-fA-F]{6}([0-9a-fA-F]{2})?\b' \
  "Use a --color-* token instead. Defined in src/index.css."

# Arbitrary-value escape hatches that bypass the token namespaces entirely.
report "Arbitrary colour value" \
  '\[#[0-9a-fA-F]+\]|\[(color|background|background-color|border-color|fill|stroke):' \
  "Arbitrary colour bypasses the token system. Add a token if the need is real."

# Tailwind's default palette. These emit nothing after the --color-*: initial
# wipe, so they are silent no-ops rather than visible errors — exactly the kind
# of drift that survives review.
report "Tailwind default palette colour" \
  '\b(bg|text|border|ring|from|via|to|decoration|outline|fill|stroke|divide|accent|caret|placeholder)-(slate|gray|grey|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-[0-9]{2,3}\b' \
  "Default palette is removed. Use bg/text/border with a brand token."

# Pure black and white are forbidden outright by the guidelines (section 2).
report "Pure black or white" \
  '\b(bg|text|border|ring|decoration|outline|fill|stroke)-(black|white)\b' \
  "Never pure #000 or #FFF. Use --color-ink and --color-bg."

# Tailwind's default type scale. The brand scale is name/h2/body/desc/tagline/
# nav/label — anything else is off-system.
report "Tailwind default type scale" \
  '\btext-(xs|sm|base|lg|xl|[2-9]xl)\b' \
  "Use text-name, text-h2, text-body, text-desc, text-tagline, text-nav, text-label."

# Two fonts only, never a third (guidelines section 3).
report "Off-system font family" \
  '\bfont-serif\b' \
  "Two fonts only: font-sans/font-display (Bricolage) and font-mono (IBM Plex Mono)."

if [ "$fail" -eq 1 ]; then
  echo ""
  echo "Brand guard failed. See brand-guidelines.md, or add a token to the"
  echo "@theme block in src/index.css if the new value is a real brand decision."
  exit 1
fi

echo "✓ Brand guard passed — all colour and type values come from the token system."
