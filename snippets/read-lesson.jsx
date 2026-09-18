export const ReadLesson = ({
  title = "Read lesson",
  description = "Read this short text to improve your English reading.",
  passageTitle = "Reading",
  level = "Beginner",
  minutes = 2,
  paragraphs = [],
  autoOpen = true,
}) => {
  const [open, setOpen] = useState(autoOpen)
  const [index, setIndex] = useState(0)
  const [showHelp, setShowHelp] = useState(false)
  const total = paragraphs.length
  const current = paragraphs[index] || {}
  const isLast = total === 0 || index >= total - 1
  const progress = total === 0 ? 0 : Math.round(((index + 1) / total) * 100)

  useEffect(() => {
    if (!open) return undefined
    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false)
      if (event.key === "ArrowRight") setIndex((value) => Math.min(total - 1, value + 1))
      if (event.key === "ArrowLeft") setIndex((value) => Math.max(0, value - 1))
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [open, total])

  const openReader = () => {
    setIndex(0)
    setShowHelp(false)
    setOpen(true)
  }

  return (
    <div className="not-prose my-6">
      <button
        type="button"
        onClick={openReader}
        className="flex w-full items-start gap-3 rounded-xl border border-zinc-950/10 bg-white p-4 text-left transition hover:bg-zinc-950/[0.03] dark:border-zinc-950/80 dark:bg-zinc-950 dark:hover:bg-white/[0.03]"
      >
        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M5 4h9a3 3 0 0 1 3 3v13H8a3 3 0 0 0-3 3V4z" />
            <path d="M8 4v16" />
          </svg>
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-semibold text-zinc-950 dark:text-white">{title}</span>
          <span className="mt-1 block text-sm text-zinc-950/70 dark:text-white/70">{description}</span>
          <span className="mt-2 block text-xs text-zinc-950/50 dark:text-white/50">
            {level} · {minutes} min read · {total} paragraphs
          </span>
          <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
            Read lesson
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
        </span>
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-zinc-950/40 p-4 sm:items-center dark:bg-black/60"
          onClick={() => setOpen(false)}
          role="presentation"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="read-lesson-title"
            className="flex max-h-[88vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-zinc-950/10 bg-white shadow-xl dark:border-zinc-950/80 dark:bg-zinc-950"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="border-b border-zinc-950/10 px-5 py-4 dark:border-zinc-950/80">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-zinc-950/50 dark:text-white/50">
                    Read lesson
                  </p>
                  <h3 id="read-lesson-title" className="mt-1 text-base font-semibold text-zinc-950 dark:text-white">
                    {passageTitle}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="rounded-lg p-1.5 text-zinc-950/60 hover:bg-zinc-950/5 dark:text-white/60 dark:hover:bg-white/5"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </div>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-zinc-950/10 dark:bg-white/10">
                <div className="h-full rounded-full bg-primary" style={{ width: `${progress}%` }} />
              </div>
              <p className="mt-2 text-xs text-zinc-950/50 dark:text-white/50">
                Paragraph {Math.min(index + 1, total)} of {total}
              </p>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-6">
              <p className="text-lg leading-8 text-zinc-950 dark:text-white">{current.en}</p>
              {showHelp && current.so ? (
                <p className="mt-4 rounded-xl border border-zinc-950/10 bg-zinc-950/[0.03] p-3 text-sm leading-6 text-zinc-950/70 dark:border-zinc-950/80 dark:bg-white/5 dark:text-white/70">
                  {current.so}
                </p>
              ) : null}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-zinc-950/10 px-5 py-3 dark:border-zinc-950/80">
              <button
                type="button"
                onClick={() => setShowHelp((value) => !value)}
                className="rounded-lg border border-zinc-950/10 px-3 py-1.5 text-sm font-medium text-zinc-950 hover:bg-zinc-950/[0.03] dark:border-zinc-950/80 dark:text-white dark:hover:bg-white/5"
              >
                {showHelp ? "Hide Somali" : "Need help?"}
              </button>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowHelp(false)
                    setIndex((value) => Math.max(0, value - 1))
                  }}
                  disabled={index === 0}
                  className="rounded-lg border border-zinc-950/10 px-3 py-1.5 text-sm font-medium text-zinc-950 hover:bg-zinc-950/[0.03] disabled:opacity-40 dark:border-zinc-950/80 dark:text-white dark:hover:bg-white/5"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (isLast) {
                      setOpen(false)
                      return
                    }
                    setShowHelp(false)
                    setIndex((value) => value + 1)
                  }}
                  className="rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-white hover:opacity-90"
                >
                  {isLast ? "I finished reading" : "Next paragraph"}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
