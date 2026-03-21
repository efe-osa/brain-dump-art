import BlogCard from "./BlogCard";

const posts = [
  {
    title: "Building Scalable React Applications",
    excerpt: "Best practices for structuring large-scale React apps with proper state management and code splitting.",
    date: "Oct 10, 2025",
    readTime: "8 min",
    category: "React",
  },
  {
    title: "Mastering TypeScript Patterns",
    excerpt: "Advanced TypeScript patterns and techniques for more maintainable, type-safe codebases.",
    date: "Sep 28, 2025",
    readTime: "10 min",
    category: "TypeScript",
  },
  {
    title: "API Design Best Practices",
    excerpt: "Essential principles for designing RESTful APIs that are intuitive, scalable, and easy to maintain.",
    date: "Sep 8, 2025",
    readTime: "9 min",
    category: "Backend",
  },
];

const Blog = () => {
  return (
    <section id="blog" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <p className="text-sm font-medium text-primary mb-2 tracking-widest uppercase">Blog</p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 tracking-tight">
          Latest writing
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <BlogCard key={index} {...post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
