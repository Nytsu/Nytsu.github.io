"use client";

import * as Tabs from "@radix-ui/react-tabs";
import type { ReactNode } from "react";

type MediaTabsProps = {
  label: string;
  galleryLabel: string;
  pressLabel: string;
  gallery: ReactNode;
  press: ReactNode;
};

const triggerClass =
  "-mb-px inline-flex min-h-11 items-center border-b-2 border-transparent px-1 text-body text-muted hover:text-ink data-[state=active]:border-accent data-[state=active]:font-semibold data-[state=active]:text-ink";

/** Splits the lead gallery and the press list into two tabs so a project
 * page stays short. Only used when a project has press coverage. */
export function MediaTabs({
  label,
  galleryLabel,
  pressLabel,
  gallery,
  press,
}: MediaTabsProps) {
  return (
    <Tabs.Root defaultValue="gallery">
      <Tabs.List
        aria-label={label}
        className="mb-6 flex gap-6 border-b border-line"
      >
        <Tabs.Trigger value="gallery" className={triggerClass}>
          {galleryLabel}
        </Tabs.Trigger>
        <Tabs.Trigger value="press" className={triggerClass}>
          {pressLabel}
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="gallery">{gallery}</Tabs.Content>
      <Tabs.Content value="press">{press}</Tabs.Content>
    </Tabs.Root>
  );
}
