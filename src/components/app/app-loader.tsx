import Image from "next/image";

const AppLoader = () => {
  return (
    <main className="fixed left-0 top-0 z-20 flex h-screen w-full flex-col items-center justify-center bg-primary">
      <Image
        src={"/logo.svg"}
        alt="logo"
        width={180}
        height={180}
        className="mx-auto mt-6 pl-2 drop-shadow-md"
      />
    </main>
  );
};

export { AppLoader };
