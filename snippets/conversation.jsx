export const Conversation = ({ title = "Conversation", scene, messages = [] }) => {
  const [visibleCount, setVisibleCount] = useState(messages.length > 0 ? 1 : 0)
  const speakers = [...new Set(messages.map((item) => item.speaker))]
  const visibleMessages = messages.slice(0, visibleCount)
  const isComplete = visibleCount >= messages.length

  const avatarColor = (name) => {
    const palette = ["bg-primary", "bg-zinc-700", "bg-sky-700", "bg-violet-700", "bg-amber-700"]
    const index = name.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0)
    return palette[index % palette.length]
  }

  const renderLine = (text, highlights = []) => {
    if (!highlights.length) return text
    const pattern = new RegExp(`(${highlights.join("|")})`, "gi")
    return text.split(pattern).map((part, index) => {
      const isHit = highlights.some((word) => word.toLowerCase() === part.toLowerCase())
      if (!isHit) return part
      return (
        <span
          key={`${part}-${index}`}
          className="rounded-md bg-primary/10 px-1 py-0.5 font-semibold text-primary"
        >
          {part}
        </span>
      )
    })
  }

  return (
    <div className="not-prose my-6 overflow-hidden rounded-xl border border-zinc-950/10 bg-white dark:border-zinc-950/80 dark:bg-zinc-950">
      <div className="flex items-start justify-between gap-4 border-b border-zinc-950/10 px-4 py-3 dark:border-zinc-950/80">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-950/50 dark:text-white/50">
            Dialogue
          </p>
          <h3 className="mt-1 text-sm font-semibold text-zinc-950 dark:text-white">{title}</h3>
          {scene ? <p className="mt-1 text-sm text-zinc-950/70 dark:text-white/70">{scene}</p> : null}
        </div>
        <div className="hidden sm:flex -space-x-2">
          {speakers.map((speaker) => (
            <div
              key={speaker}
              className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-white text-[11px] font-bold text-white dark:border-zinc-950 ${avatarColor(speaker)}`}
              title={speaker}
            >
              {speaker.slice(0, 1)}
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4 px-4 py-5">
        {visibleMessages.map((item, index) => {
          const isRight = index % 2 === 1
          return (
            <div key={`${item.speaker}-${index}`} className={`flex ${isRight ? "justify-end" : "justify-start"}`}>
              <div className={`flex max-w-[92%] items-end gap-2 sm:max-w-[80%] ${isRight ? "flex-row-reverse" : ""}`}>
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white ${avatarColor(item.speaker)}`}
                >
                  {item.speaker.slice(0, 1)}
                </div>
                <div>
                  <p className={`mb-1 text-[11px] font-medium text-zinc-950/50 dark:text-white/50 ${isRight ? "text-right" : ""}`}>
                    {item.speaker}
                  </p>
                  <div
                    className={`rounded-xl px-3.5 py-2.5 text-sm leading-6 ${
                      isRight
                        ? "bg-primary text-white"
                        : "border border-zinc-950/10 bg-zinc-950/[0.03] text-zinc-950 dark:border-zinc-950/80 dark:bg-white/5 dark:text-white"
                    }`}
                  >
                    <p>{renderLine(item.text, item.highlights)}</p>
                    {item.so ? (
                      <p className={`mt-2 text-xs ${isRight ? "text-white/80" : "text-zinc-950/70 dark:text-white/70"}`}>
                        {item.so}
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-zinc-950/10 px-4 py-3 dark:border-zinc-950/80">
        <p className="text-xs text-zinc-950/70 dark:text-white/70">
          Line {Math.min(visibleCount, messages.length)} of {messages.length}
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setVisibleCount(1)}
            className="rounded-lg border border-zinc-950/10 px-3 py-1.5 text-xs font-medium text-zinc-950 hover:bg-zinc-950/[0.03] dark:border-zinc-950/80 dark:text-white dark:hover:bg-white/5"
          >
            Replay
          </button>
          <button
            type="button"
            onClick={() => setVisibleCount(messages.length)}
            className="rounded-lg border border-zinc-950/10 px-3 py-1.5 text-xs font-medium text-zinc-950 hover:bg-zinc-950/[0.03] dark:border-zinc-950/80 dark:text-white dark:hover:bg-white/5"
          >
            Show all
          </button>
          <button
            type="button"
            onClick={() => setVisibleCount((count) => Math.min(messages.length, count + 1))}
            disabled={isComplete}
            className="rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isComplete ? "Done" : "Next line"}
          </button>
        </div>
      </div>
    </div>
  )
}
