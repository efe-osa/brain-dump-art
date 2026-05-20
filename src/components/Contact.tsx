import { Github, Linkedin, Mail } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const contactSchema = z.object({
  email: z.string().trim().email({ message: "Please enter a valid email" }).max(255),
  subject: z.string().trim().nonempty({ message: "Subject is required" }).max(150),
  message: z.string().trim().nonempty({ message: "Message is required" }).max(1000),
});

const Contact = () => {
  const [form, setForm] = useState({ email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((i) => {
        if (i.path[0]) fieldErrors[i.path[0] as string] = i.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    const { email, subject, message } = result.data;
    window.location.href = `mailto:eosawaruoyelade@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(`${message}\n\nFrom: ${email}`)}`;
    toast({ title: "Opening your email client", description: "Thanks for reaching out!" });
    setForm({ email: "", subject: "", message: "" });
  };

  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-sm font-medium text-primary mb-2 tracking-widest uppercase">Contact</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">
              Let's connect
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              I'm currently open to new opportunities. Drop me a note and I'll get back to you.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 mb-10" noValidate>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
                maxLength={255}
                aria-invalid={!!errors.email}
              />
              {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                placeholder="What's this about?"
                maxLength={150}
                aria-invalid={!!errors.subject}
              />
              {errors.subject && <p className="text-sm text-destructive">{errors.subject}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">What do you want to talk about today?</Label>
              <Textarea
                id="message"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell me a little about your idea, role, or question…"
                rows={5}
                maxLength={1000}
                aria-invalid={!!errors.message}
              />
              {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
            </div>

            <Button type="submit" className="rounded-full px-8">
              <Mail className="h-4 w-4" />
              Send Message
            </Button>
          </form>

          <div className="flex items-center justify-center gap-6">
            {[
              { icon: Github, href: "https://github.com/efe-osa", label: "GitHub" },
              { icon: Linkedin, href: "https://linkedin.com/in/efe-osa-osawaru-oyelade", label: "LinkedIn" },
            ].map(({ icon: Icon, href, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label={label}>
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
