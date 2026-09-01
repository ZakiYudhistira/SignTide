import { useState } from "react";
import { Form, useNavigate, useNavigation } from "react-router";

import type { LevelDefinition } from "~/models/level";

import { LevelFooter } from "./level-footer";
import { LevelHeader } from "./level-header";
import { ProblemRenderer } from "./problem-renderer";

export function LevelPage({ level }: { level: LevelDefinition }) {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const [problemIndex, setProblemIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const problem = level.problems[problemIndex];
  const isLastProblem = problemIndex === level.problems.length - 1;
  const progress = (problemIndex / level.problems.length) * 100;
  const selectedChoiceId = answers[problem.id] ?? null;
  const isSubmitting = navigation.state === "submitting";

  const advance = () => {
    setProblemIndex((current) => current + 1);
  };

  const skip = () => {
    setAnswers((current) => {
      const nextAnswers = { ...current };
      delete nextAnswers[problem.id];
      return nextAnswers;
    });
    advance();
  };

  return (
    <Form method="post" className="relative flex min-h-0 flex-1 flex-col bg-background text-navy-1">
      <input type="hidden" name="answers" value={JSON.stringify(answers)} />

      <LevelHeader progress={progress} lives={level.lives} onExit={() => navigate("/level")} />

      <main className="min-h-0 flex-1 touch-pan-y overflow-y-auto overscroll-contain px-5 pb-[calc(12rem+env(safe-area-inset-bottom))] [-webkit-overflow-scrolling:touch]">
        <ProblemRenderer
          key={problem.id}
          problem={problem}
          selectedChoiceId={selectedChoiceId}
          onSelectChoice={(choiceId) =>
            setAnswers((current) => ({
              ...current,
              [problem.id]: choiceId,
            }))
          }
        />
      </main>

      <LevelFooter
        canContinue={isLastProblem || selectedChoiceId !== null}
        isLastProblem={isLastProblem}
        isSubmitting={isSubmitting}
        onSkip={skip}
        onContinue={advance}
      />
    </Form>
  );
}
