interface SearchPageProps {
  onSearch: (query: string) => void;
  query: string;
}

const suggestions = [
  'What is the best architecture for a Web3 desktop browser?',
  'How do dApps detect injected Ethereum providers?',
  'Which search API should power Freman Search?',
  'How to load verified extensions in Electron safely?'
];

export default function SearchPage({ onSearch, query }: SearchPageProps) {
  return (
    <div className="h-full flex items-center justify-center p-8">
      <div className="w-full max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">Freman</h1>
          <p className="text-slate-400">Web3 desktop browser — Brave Search ready</p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const input = e.currentTarget.querySelector('input');
            if (input) onSearch(input.value);
          }}
          className="mb-8"
        >
          <div className="flex gap-2">
            <input
              type="text"
              defaultValue={query}
              placeholder="Search or enter URL"
              className="flex-1 rounded-lg border border-slate-700 bg-slate-950/70 px-4 py-3 text-slate-200 outline-none focus:border-brand-500"
            />
            <button
              type="submit"
              className="rounded-lg bg-brand-500 px-6 py-3 font-medium text-white hover:bg-brand-600"
            >
              Search
            </button>
          </div>
        </form>

        <div className="grid gap-3">
          {suggestions.map((sugg, idx) => (
            <button
              key={idx}
              onClick={() => onSearch(sugg)}
              className="rounded-lg border border-slate-800 bg-slate-900/50 p-3 text-left text-sm text-slate-300 hover:bg-slate-800 hover:text-slate-100"
            >
              {sugg}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
