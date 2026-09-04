import { useState } from "react";
import { useFetcher, useNavigate, useNavigation, useSubmit } from "react-router";

import type { LevelActionData, LevelDefinition } from "~/models/level";

import { LevelFooter } from "./level-footer";
import { LevelHeader } from "./level-header";
import { ProblemFeedback } from "./problem-feedback";
import { ProblemRenderer } from "./problem-renderer";

export function LevelPage({ level }: { level: LevelDefinition }) {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const submit = useSubmit();
  const gradeFetcher = useFetcher<LevelActionData>();
  const [problemIndex, setProblemIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const problem = level.problems[problemIndex];
  const isLastProblem = problemIndex === level.problems.length - 1;
  const progress = ((problemIndex + 1) / level.problems.length) * 100;
  const selectedChoiceId = answers[problem.id] ?? null;
  const grade =
    gradeFetcher.data?.intent === "grade-problem" &&
    gradeFetcher.data.grade.problemId === problem.id
      ? gradeFetcher.data.grade
      : null;
  const isChecking = gradeFetcher.state !== "idle";
  const isSubmitting = navigation.state === "submitting";

  const checkAnswer = () => {
    if (!selectedChoiceId || grade || isChecking) return;
    gradeFetcher.submit(
      { _intent: "grade-problem", problemId: problem.id, choiceId: selectedChoiceId },
      { method: "post" },
    );
  };

  const continueAfterFeedback = () => {
    if (!grade || isSubmitting) return;
    if (isLastProblem) {
      submit(
        { _intent: "finish-level", answers: JSON.stringify(answers) },
        { method: "post" },
      );
      return;
    }
    setProblemIndex((current) => current + 1);
  };

  return (
    <div className="relative flex min-h-0 flex-1 flex-col bg-background text-navy-1">
      <LevelHeader progress={progress} lives={level.lives} onExit={() => navigate("/level")} />

      <main className="min-h-0 flex-1 touch-pan-y overflow-y-auto overscroll-contain px-5 pb-[calc(12rem+env(safe-area-inset-bottom))] [-webkit-overflow-scrolling:touch]">
        <ProblemRenderer
          key={problem.id}
          problem={problem}
          selectedChoiceId={selectedChoiceId}
          grade={grade}
          disabled={Boolean(grade) || isChecking}
          onSelectChoice={(choiceId) =>
            setAnswers((current) => ({
              ...current,
              [problem.id]: choiceId,
            }))
          }
        />
      </main>

      {grade ? (
        <ProblemFeedback grade={grade} isLastProblem={isLastProblem} isSubmitting={isSubmitting} onContinue={continueAfterFeedback} />
      ) : (
        <LevelFooter canCheck={selectedChoiceId !== null} isChecking={isChecking} onCheck={checkAnswer} />
      )}
    </div>
  );
}
