
import RandomDiv from "@/components/main-random-div";

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="font-serif font-bold pointer-events-none m-5">
        My Daily Tasks
      </h1>
      <RandomDiv>
        Hello World!
      </RandomDiv>
    </main>
  );
}
