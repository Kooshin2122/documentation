export const Vocabulary = ({ words = [] }) => {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <div className="not-prose my-6 grid gap-3 sm:grid-cols-2">
      {words.map((item, index) => {
        const isOpen = openIndex === index
        return (
          <button
            key={item.word}
            type="button"
            onClick={() => setOpenIndex(isOpen ? null : index)}
            className="rounded-xl border border-zinc-950/10 bg-white p-4 text-left transition hover:bg-zinc-950/[0.03] dark:border-zinc-950/80 dark:bg-zinc-950 dark:hover:bg-white/[0.03]"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-zinc-950 dark:text-white">{item.word}</p>
                {item.type ? (
                  <p className="mt-0.5 text-xs uppercase tracking-wide text-zinc-950/50 dark:text-white/50">
                    {item.type}
                  </p>
                ) : null}
              </div>
              <span className="text-xs font-medium text-primary">{isOpen ? "Hide" : "Tap"}</span>
            </div>
            {isOpen ? (
              <div className="mt-3 border-t border-zinc-950/10 pt-3 dark:border-zinc-950/80">
                <p className="text-sm text-zinc-950/80 dark:text-white/80">{item.so}</p>
                {item.example ? (
                  <p className="mt-2 text-sm text-zinc-950/70 dark:text-white/70">“{item.example}”</p>
                ) : null}
              </div>
            ) : (
              <p className="mt-2 text-sm text-zinc-950/70 dark:text-white/70">See Somali meaning and example</p>
            )}
          </button>
        )
      })}
    </div>
  )
}
