export default function DashboardLoading() {
  return (
    <article className="mt-4">
      <section className="flex flex-col items-center py-2 px-1 border-b gap-1">
        <aside className="w-96 h-7 bg-30 rounded animate-pulse"></aside>
        <aside className="w-96 bg-30 rounded animate-pulse h-7"></aside>
      </section>
    </article>
  );
}
