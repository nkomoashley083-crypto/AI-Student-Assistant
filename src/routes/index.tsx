import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  Mail,
  BookOpen,
  FileText,
  CalendarClock,
  Search,
  Briefcase,
  MessageSquare,
  Sparkles,
  ArrowRight,
  GraduationCap,
  CheckCircle2,
  Moon,
  Sun,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

export const Route = createFileRoute("/")({
  component: Landing,
});

const features = [
  { icon: Mail, title: "AI Email Generator", desc: "Draft professional emails for lecturers, internships and graduate jobs in seconds." },
  { icon: BookOpen, title: "Assignment Assistant", desc: "Break down briefs, plan structure, and get writing recommendations." },
  { icon: FileText, title: "Notes Summarizer", desc: "Turn lecture notes into revision cards, key concepts and exam highlights." },
  { icon: CalendarClock, title: "AI Study Planner", desc: "Weekly plans, priority tasks, and revision roadmaps tuned to your deadlines." },
  { icon: Search, title: "Research Assistant", desc: "Get topic overviews, literature review angles and critical thinking prompts." },
  { icon: Briefcase, title: "Career Preparation", desc: "CV analysis, cover letters, STAR interview prep and employability scoring." },
  { icon: MessageSquare, title: "AI Chatbot", desc: "Ask anything — academic help, career advice or productivity coaching, 24/7." },
  { icon: Sparkles, title: "Smart Recommendations", desc: "Personalized learning suggestions to close skills gaps as you go." },
];

const steps = [
  { n: "01", t: "Sign in", d: "Create your student account in seconds." },
  { n: "02", t: "Pick a tool", d: "Choose from 7 AI-powered study & career tools." },
  { n: "03", t: "Get results", d: "Copy, download, or refine your AI-generated output." },
];

function Landing() {
  const { theme, toggle } = useTheme();
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-border/40 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-primary shadow-soft">
              <GraduationCap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-display text-lg font-bold">AI Student Assistant</span>
          </Link>
          <nav className="hidden items-center gap-8 md:flex">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground">Features</a>
            <a href="#how" className="text-sm text-muted-foreground hover:text-foreground">How it works</a>
            <a href="#faq" className="text-sm text-muted-foreground hover:text-foreground">FAQ</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggle} aria-label="Toggle theme">
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button asChild className="bg-gradient-primary shadow-soft">
              <Link to="/dashboard">Open app</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-subtle" />
        <div
          className="absolute -left-32 top-20 h-96 w-96 rounded-full opacity-30 blur-3xl"
          style={{ background: "var(--gradient-hero)" }}
        />
        <div
          className="absolute right-0 top-40 h-72 w-72 rounded-full opacity-20 blur-3xl"
          style={{ background: "var(--gradient-primary)" }}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              Built for the university-to-workplace journey
            </div>
            <h1 className="font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl">
              Empowering students with{" "}
              <span className="text-gradient">AI-powered learning</span>, productivity, and career success
            </h1>
            <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
              Study smarter, communicate professionally, and prepare for internships and employment with your AI Student Assistant.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" className="bg-gradient-primary shadow-elegant">
                <Link to="/auth">Get started free <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="#features">Explore features</a>
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-success" /> No credit card</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-success" /> 7 AI tools</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-success" /> Dark mode</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Everything a student needs, in one place</h2>
          <p className="mt-4 text-muted-foreground">
            From late-night essays to your first graduate interview — one intelligent assistant that grows with you.
          </p>
        </div>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group rounded-2xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-elegant"
            >
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-soft">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How */}
      <section id="how" className="border-y border-border/60 bg-gradient-subtle">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">Start learning in three steps</h2>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {steps.map((s) => (
              <div key={s.n} className="rounded-2xl border border-border bg-card p-8 shadow-soft">
                <div className="font-display text-4xl font-bold text-gradient">{s.n}</div>
                <h3 className="mt-4 font-display text-xl font-semibold">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-hero p-10 shadow-elegant sm:p-16">
          <div className="relative z-10 mx-auto max-w-2xl text-center text-white">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">Ready to become career-ready?</h2>
            <p className="mt-4 text-white/85">
              Join students building better habits, sharper communication, and stronger employability.
            </p>
            <Button asChild size="lg" variant="secondary" className="mt-8">
              <Link to="/auth">Start learning <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      <footer id="faq" className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-primary">
                <GraduationCap className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-display text-sm font-semibold">AI Student Assistant</span>
            </div>
            <p className="text-xs text-muted-foreground">
              AI-generated content may require human review. Use as a learning aid, not a substitute for academic integrity.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
