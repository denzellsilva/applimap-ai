import { quantico } from "../ui/fonts";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-svh items-center justify-center bg-gray-100 p-8">
      <div className="overflow-hidden rounded-2xl shadow-lg md:flex md:w-full md:max-w-4xl">
        <div className="hidden flex-1 items-center justify-center gap-0 bg-emerald-50 md:flex">
          <h1 className={`${quantico.className} text-4xl`}>
            <span className="font-bold text-green-800">Appli</span>Map
          </h1>
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </main>
  );
}
