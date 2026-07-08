import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  BookOpen,
  FileText,
  CalendarClock,
  Search,
  Briefcase,
  MessageSquare,
  TrendingUp,
  Flame,
  Target,
  Trophy,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { motion } from "motion/react";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: Dashboard,
});

const tools = [
  { icon: Mail, title: "Email Generator", desc: "Craft professional emails", to: "/email" as const },
  { icon: BookOpen, title: "Assignment Assistant", desc: "Plan & structure work", to: "/assignments" as const },
  { icon: FileText, title: "Notes Summarizer", desc: "Turn notes into revision", to: "/notes" as const },
  { icon: CalendarClock, title: "Study Planner", desc: "Build weekly plans", to: "/planner" as const },
  { icon: Search, title: "Research Assistant", desc: "Explore topics & sources", to: "/research" as const },
  { icon: Briefcase, title: "Career Prep", desc: "CV, interviews, employability", to: "/career" as const },
  { icon: MessageSquare, title: "AI Chatbot", desc: "24/7 student support", to: "/chat" as const },
];

function StatCard({ icon: Icon, label, value, sub, tone = "primary" }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string; sub: string; tone?: "primary" | "success" | "warning" }) {
  const toneMap = {
    primary: "bg-gradient-primary text-primary-foreground",
    success: "bg-success text-success-foreground",
    warning: "bg-warning text-warning-foreground",
  };
  return (
    <Card className="shadow-soft">
      <CardContent className="flex items-start gap-4 p-5">
        <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl shadow-soft ${toneMap[tone]}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="font-display text-2xl font-bold">{value}</p>
          <p className="text-xs text-muted-foreground">{sub}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function Dashboard() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:flex sm:flex-wrap sm:justify-between">
        <div className="min-w-0">
          <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs text-primary">
            <Sparkles className="h-3 w-3" /> Ready for a productive day
          </div>
          <h1 className="font-display text-2xl font-bold sm:text-3xl">Welcome back 👋</h1>
          <p className="text-sm text-muted-foreground">Here's your snapshot of study progress and career readiness.</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={TrendingUp} label="Productivity Score" value="82" sub="+6 vs last week" />
        <StatCard icon={Flame} label="Study Streak" value="12 days" sub="Keep it up!" tone="warning" />
        <StatCard icon={Target} label="Assignments" value="7 / 9" sub="78% complete" tone="success" />
        <StatCard icon={Trophy} label="Career Readiness" value="64%" sub="Growing steadily" />
      </div>

      {/* Progress cards */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Weekly Learning Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: "Study Goals", value: 72 },
              { label: "Assignment Completion", value: 78 },
              { label: "Internship Prep", value: 55 },
              { label: "Skills Development", value: 61 },
            ].map((row) => (
              <div key={row.label}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="text-foreground">{row.label}</span>
                  <span className="text-muted-foreground">{row.value}%</span>
                </div>
                <Progress value={row.value} />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Upcoming</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {[
              { t: "Data Structures — Assignment 3", d: "Due in 2 days", tag: "Assignment" },
              { t: "Marketing Midterm", d: "Exam in 5 days", tag: "Exam" },
              { t: "Internship Deadline — Acme", d: "In 8 days", tag: "Career" },
            ].map((e) => (
              <div key={e.t} className="rounded-lg border p-3">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-medium">{e.t}</p>
                  <Badge variant="secondary" className="shrink-0 text-[10px]">{e.tag}</Badge>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{e.d}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* AI Recommendations */}
      <Card className="border-primary/20 bg-gradient-subtle">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Sparkles className="h-4 w-4 text-primary" /> AI Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            "Review yesterday's lecture notes with the Notes Summarizer.",
            "Draft a follow-up email to your career mentor.",
            "Practice 3 STAR interview questions in Career Prep.",
          ].map((r) => (
            <div key={r} className="rounded-lg border bg-card p-3 text-sm">{r}</div>
          ))}
        </CardContent>
      </Card>

      {/* Tools grid */}
      <div>
        <h2 className="mb-4 font-display text-xl font-semibold">Your AI Toolkit</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {tools.map((t, i) => (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <Link
                to={t.to}
                className="group block rounded-2xl border bg-card p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-elegant"
              >
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-soft">
                  <t.icon className="h-5 w-5" />
                </div>
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-semibold">{t.title}</h3>
                  <ArrowRight className="h-4 w-4 -translate-x-1 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{t.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
