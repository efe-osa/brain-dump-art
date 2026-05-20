const Footer = () => {
  return (
    <footer className="py-8 border-t border-border">
      <div className="container mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Efe-osa Jessye Osawaru Oyelade</p>
        <span>
          Built with
          <a
            href="https://lovable.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground flex items-center gap-2 hover:text-foreground transition-colors"
          >
            <img
              src="https://mintlify.s3.us-west-1.amazonaws.com/lovable-f9060f1e/logo/light.svg"
              alt="Lovable"
              className="h-4 dark:hidden"
            />
            <img
              src="https://mintlify.s3.us-west-1.amazonaws.com/lovable-f9060f1e/logo/dark.svg"
              alt="Lovable"
              className="h-4 hidden dark:block"
            />
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
