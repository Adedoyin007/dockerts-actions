"use client";

import { useEffect, useState } from "react";
import { BiodataApp } from "@/components/biodata-app";

const THEME_STORAGE_KEY = "biodata-theme";

export default function Home() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const nextTheme = storedTheme ? storedTheme === "dark" : prefersDark;
    setIsDark(nextTheme);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    document.documentElement.style.colorScheme = isDark ? "dark" : "light";
    window.localStorage.setItem(THEME_STORAGE_KEY, isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <div className={isDark ? "dark" : ""}>
      <main className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
        <header className="mb-8 rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 shadow-sm backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/80">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] text-indigo-600 uppercase dark:text-indigo-400">
                Biodata intake
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-balance text-slate-900 sm:text-4xl dark:text-slate-50">
                Record a person&rsquo;s biodata
              </h1>
            </div>

            <button
              type="button"
              onClick={() => setIsDark((current) => !current)}
              className="inline-flex items-center rounded-full border border-slate-300 bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-200 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark ? "☀️ Light" : "🌙 Dark"}
            </button>
          </div>

          <p className="mt-3 max-w-2xl text-pretty text-slate-600 dark:text-slate-400">
            Fill in the details below. Age and BMI are calculated as you type, and
            each submission is saved exactly once — retrying after a network hiccup
            will never create a duplicate record.
          </p>
        </header>

        <BiodataApp />

        <footer className="mt-10 text-xs text-slate-400 dark:text-slate-500">
          Data is stored on the records service; this page never talks to it
          directly.
        </footer>
      </main>
    </div>
  );
}
