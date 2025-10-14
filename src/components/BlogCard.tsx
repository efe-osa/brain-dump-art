import { Calendar, Clock } from "lucide-react";

interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
}

const BlogCard = ({ title, excerpt, date, readTime, category }: BlogCardProps) => {
  return (
    <article className="group bg-card rounded-xl p-6 transition-all duration-300 hover:shadow-[var(--shadow-card-hover)] shadow-[var(--shadow-card)] cursor-pointer animate-fade-in-up">
      <div className="mb-4">
        <span className="px-3 py-1 text-sm rounded-full bg-gradient-to-r from-primary to-accent text-white">
          {category}
        </span>
      </div>
      
      <h3 className="text-2xl font-bold mb-3 text-card-foreground group-hover:text-primary transition-colors">
        {title}
      </h3>
      
      <p className="text-muted-foreground mb-4 line-clamp-3">
        {excerpt}
      </p>
      
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <Calendar className="h-4 w-4" />
          <span>{date}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          <span>{readTime}</span>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
