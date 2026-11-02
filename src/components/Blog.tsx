import { ArrowUpRight } from "lucide-react";

const posts = [
  {
    title: "i18n vs l10n are the same, or are they?",
    category: "Web Development",
    readTime: "5 min",
    url: "https://medium.com/@Efe-osa/i18n-vs-l10n-whats-the-difference-and-why-should-you-care-5987c75363cb",
  },
  {
    title: "The Journey to a Better You",
    category: "Personal Growth",
    readTime: "5 min",
    url: "https://medium.com/@Efe-osa/the-journey-to-a-better-you-b316c259b404",
  },
  {
    title: "Making the Move to Web Development: A Programming Beginner's Guide",
    category: "Web Development",
    readTime: "7 min",
    url: "https://medium.com/@Efe-osa/making-the-move-to-web-development-programming-beginners-guide-50800e3a37a3",
  },
];

const Blog = () => {
  return (
    <section id="blog" className="py-24">
      <div className="page-shell page-shell--read">
        <p className="text-sm font-medium text-primary-strong mb-2 tracking-widest uppercase">My Scribbles</p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10 tracking-tight">Latest writing</h2>

        <ul className="divide-y divide-border border-y border-border">
          {posts.map((post) => (
            <li key={post.title}>
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-4 py-5"
              >
                <div>
                  <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {post.category} · {post.readTime} read
                  </p>
                </div>
                <ArrowUpRight
                  className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary transition-colors"
                  aria-hidden="true"
                />
              </a>
            </li>
          ))}
        </ul>

        <a
          href="https://medium.com/@Efe-osa"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 mt-8 text-sm font-medium text-primary-strong hover:underline underline-offset-4"
        >
          Read more on Medium
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
};

export default Blog;
