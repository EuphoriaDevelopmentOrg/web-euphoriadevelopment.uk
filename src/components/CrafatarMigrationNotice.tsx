import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Callout } from "fumadocs-ui/components/callout";

export function CrafatarMigrationNotice() {
  return (
    <Callout title="Crafatar has moved to NitroCraft" type="warn">
      <p>
        Use NitroCraft for current API access and new deployments. The Crafatar
        documentation below is kept as a legacy reference for existing
        installations.
      </p>
      <div className="mt-3 flex flex-wrap gap-4 text-sm font-medium">
        <a
          className="text-fd-primary hover:text-fd-primary/80 inline-flex items-center gap-1 underline"
          href="https://nitrocraft.uk"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open NitroCraft
          <ExternalLink className="size-3.5" aria-hidden="true" />
        </a>
        <Link
          className="text-fd-primary hover:text-fd-primary/80 underline"
          href="/docs/community/nitrocraft-api"
        >
          NitroCraft API Docs
        </Link>
        <Link
          className="text-fd-primary hover:text-fd-primary/80 underline"
          href="/docs/community/nitrocraft-setup"
        >
          NitroCraft Setup Guide
        </Link>
      </div>
    </Callout>
  );
}
