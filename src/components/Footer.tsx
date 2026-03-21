const Footer = () => {
  return (
    <footer className="py-8 border-t border-border">
      <div className="container mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Your Name
        </p>
        <p className="text-sm text-muted-foreground">
          Built with React & TypeScript
        </p>
      </div>
    </footer>
  );
};

export default Footer;
