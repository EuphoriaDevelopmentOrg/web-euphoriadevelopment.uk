import type { Metadata } from "next";
import Link from "next/link";
import { docGroups } from "@/site-pages";
import { getPageMetadata } from "@/utils/metadata";

export const metadata: Metadata = getPageMetadata("/docs");

export default function DocsPage() {
  return (
    <article className="panel">
      <h2>Direct Page Access</h2>
      <p>Open any documentation page in one click.</p>
      <div className="quick-link-groups">
        {docGroups.map((group) => (
          <section key={group.id} id={group.id}>
            <h3>{group.title}</h3>
            <div className="quick-link-list">
              {group.pages.map((page) => (
                <Link key={page.path} className="text-link" href={page.path}>
                  {page.title}
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}
