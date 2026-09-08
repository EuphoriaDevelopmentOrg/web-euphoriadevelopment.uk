import { Link } from "react-router-dom";
import { docGroups } from "../../site-pages";
export function Home() {
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
                <Link key={page.path} className="text-link" to={page.path}>
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
