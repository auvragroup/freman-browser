export default function TabContent({ url }: { url: string }) {
  return (
    <div className="h-full flex flex-col">
      <div className="border-b border-slate-800 bg-slate-900/50 px-4 py-2">
        <p className="text-xs text-slate-400">Loading: {url}</p>
      </div>
      <div className="flex-1 flex items-center justify-center text-slate-400">
        <p>Tab content would render here. Real page rendering via Electron WebContentsView.</p>
      </div>
    </div>
  );
}
