import { ArrowUpRight } from "lucide-react";

interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
}

const BlogCard = ({ title, excerpt, date, readTime, category }: BlogCardProps) => {
  return (
    <article className="group p-6 rounded-xl bg-card shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-medium)] transition-all duration-300 cursor-pointer">
      <span className="inline-block px-3 py-1 text-xs rounded-full bg-secondary text-secondary-foreground font-medium mb-4">
        {category}
      </span>

      <h3 className="text-lg font-semibold text-card-foreground mb-2 group-hover:text-primary transition-colors flex items-start gap-1">
        {title}
        <ArrowUpRight className="h-4 w-4 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity mt-0.5" />
      </h3>

      <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-2">{excerpt}</p>

      <p className="text-xs text-muted-foreground">
        {date} · {readTime}
      </p>
    </article>
  );
};

export default BlogCard;
