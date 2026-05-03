import { SignIn, SignOut } from "@/ui/components/auth";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

const Page = async () => {
  const session = await auth();
  let user = null;
  if (session) {
    user = await prisma.user.findUnique({
      where: {
        id: session.user?.id,
      },
    });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black p-4">
      <div className="w-full max-w-xl rounded-lg bg-neutral-800 p-6">
        <h1 className="mb-4 text-center text-xl text-white">
          Auth.js + Prisma
        </h1>

        {!session ? (
          <div className="text-center">
            <SignIn provider="github" />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-gray-300">Signed in as:</p>
              <p className="text-white">{session.user?.email}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-300">Data fetched from DB with Prisma:</p>
            </div>
            <div className="rounded bg-neutral-900 p-3">
              {" "}
              <pre className="text-xs text-gray-300">
                {" "}
                {JSON.stringify(user, null, 2)}
              </pre>{" "}
            </div>{" "}
            <div className="text-center">
              <SignOut />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
