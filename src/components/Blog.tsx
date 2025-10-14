import BlogCard from "./BlogCard";

const Blog = () => {
  const posts = [
    {
      title: "Building Scalable React Applications",
      excerpt: "Learn best practices for structuring large-scale React applications with proper state management, code splitting, and performance optimization techniques.",
      date: "Oct 10, 2025",
      readTime: "8 min read",
      category: "React"
    },
    {
      title: "The Future of Web Development",
      excerpt: "Exploring emerging trends in web development including AI integration, edge computing, and the evolution of JavaScript frameworks.",
      date: "Oct 5, 2025",
      readTime: "6 min read",
      category: "Technology"
    },
    {
      title: "Mastering TypeScript Patterns",
      excerpt: "Deep dive into advanced TypeScript patterns and techniques to write more maintainable and type-safe code in your projects.",
      date: "Sep 28, 2025",
      readTime: "10 min read",
      category: "TypeScript"
    },
    {
      title: "Understanding Database Optimization",
      excerpt: "Comprehensive guide to optimizing database queries, indexing strategies, and performance monitoring for production applications.",
      date: "Sep 20, 2025",
      readTime: "12 min read",
      category: "Backend"
    },
    {
      title: "Design Systems at Scale",
      excerpt: "How to build and maintain design systems that grow with your product, ensuring consistency across multiple platforms.",
      date: "Sep 15, 2025",
      readTime: "7 min read",
      category: "Design"
    },
    {
      title: "API Design Best Practices",
      excerpt: "Essential principles for designing RESTful APIs that are intuitive, scalable, and easy to maintain over time.",
      date: "Sep 8, 2025",
      readTime: "9 min read",
      category: "API"
    }
  ];

  return (
    <section id="blog" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Latest Blog Posts
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Thoughts on development, design, and technology trends.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <BlogCard key={index} {...post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
