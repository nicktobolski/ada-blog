import Search from "@/components/Search";

export const metadata = { title: "Search" };

export default function SearchPage() {
  return (
    <div>
      <section className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Search</h1>
        <p className="mt-2 text-muted">
          Find stories across every digest.
        </p>
      </section>

      <Search />
    </div>
  );
}
