
import RandomDiv from "@/components/main-random-div";
import TodaysTasks from "@/components/todays-tasks";
import NewInput from "@/components/new-task";

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="font-serif font-bold text-3xl pointer-events-none select-none m-5">
        My Daily Tasks
      </h1>
      <div className="w-6/12">
        <TodaysTasks>
          <NewInput />
        </TodaysTasks>
        <RandomDiv>
        </RandomDiv>
      </div>
    </main>
  );
}
