export default function DashboardLoading() {
  return (
    <article>
      <section className="flex flex-col gap-2">
        <aside className="w-36 rounded bg-30 animate-pulse"></aside>
        <aside className="w-72 rounded bg-30 animate-pulse"></aside>
      </section>
    </article>
  );
}
