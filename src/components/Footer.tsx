const Footer = () => {
  return (
    <footer className="pt-8 pb-32 sm:pb-8 border-t border-border">
      <div className="page-shell flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Efe-osa Jessye Osawaru Oyelade</p>
      </div>
    </footer>
  );
};

export default Footer;
