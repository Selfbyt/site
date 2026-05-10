export default function SiteSegmentLoading() {
  return (
    <div className="container py-20 md:py-28">
      <div className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-2">
          <p className="label-mono">Loading</p>
        </div>
        <div className="md:col-span-10 lg:col-span-9 space-y-4">
          <div className="h-3 w-24 animate-pulse bg-muted" />
          <div className="h-10 w-3/4 animate-pulse bg-muted" />
          <div className="h-10 w-2/3 animate-pulse bg-muted" />
          <div className="mt-6 h-4 w-1/2 animate-pulse bg-muted" />
          <div className="h-4 w-2/5 animate-pulse bg-muted" />
        </div>
      </div>
    </div>
  )
}
