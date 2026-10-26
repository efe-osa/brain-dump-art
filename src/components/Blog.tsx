import BlogCard from "./BlogCard";

const posts = [
  {
    title: "The Journey to a Better You",
    excerpt: "Reflections on personal growth, self-improvement, and the mindset shifts that help you become the best version of yourself.",
    date: "Medium",
    readTime: "5 min",
    category: "Personal Growth",
    url: "https://medium.com/@Efe-osa/the-journey-to-a-better-you-b316c259b404",
  },
  {
    title: "Making the Move to Web Development: A Programming Beginner's Guide",
    excerpt: "A practical guide for beginners taking their first steps into web development—what to learn, where to start, and how to stay motivated.",
    date: "Medium",
    readTime: "7 min",
    category: "Web Development",
    url: "https://medium.com/@Efe-osa/making-the-move-to-web-development-programming-beginners-guide-50800e3a37a3",
  },
];

const Blog = () => {
  return (
    <section id="blog" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <p className="text-sm font-medium text-primary-strong mb-2 tracking-widest uppercase">My Scribbles</p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 tracking-tight">
          Latest writing
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post, index) => (
            <BlogCard key={index} {...post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
