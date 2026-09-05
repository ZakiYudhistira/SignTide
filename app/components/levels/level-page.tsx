import { useState } from "react";
import { useFetcher, useNavigate, useNavigation, useSubmit } from "react-router";

import type { LevelActionData, LevelDefinition } from "~/models/level";

import { LevelFooter } from "./level-footer";
import { LevelHeader } from "./level-header";
import { ProblemFeedback } from "./problem-feedback";
import { ProblemRenderer } from "./problem-renderer";

function hasCompleteAnswer(
  problem: LevelDefinition["problems"][number],
  selectedChoiceId: string | null,
) {
  if (selectedChoiceId === null) return false;

  if (problem.type === "sign-to-word-order") {
    try {
      const answer = JSON.parse(selectedChoiceId);
      return Array.isArray(answer) && answer.length === problem.wordChoices.length;
    } catch {
      return false;
    }
  }

  if (problem.type === "line-match") {
    try {
      const answer = JSON.parse(selectedChoiceId);
      return Array.isArray(answer) && answer.length === problem.images.length;
    } catch {
      return false;
    }
  }

  return true;
}

export function LevelPage({ level, returnTo = "/level" }: { level: LevelDefinition; returnTo?: string }) {
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
    if (
      !selectedChoiceId ||
      !hasCompleteAnswer(problem, selectedChoiceId) ||
      grade ||
      isChecking
    ) return;
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
      <LevelHeader progress={progress} lives={level.lives} onExit={() => navigate(returnTo)} />

      <main className="min-h-0 flex-1 touch-pan-y overflow-y-auto overscroll-contain px-5 pb-[calc(12rem+env(safe-area-inset-bottom))] [-webkit-overflow-scrolling:touch]">
        <ProblemRenderer
          key={problem.id}
          problem={problem}
          selectedChoiceId={selectedChoiceId}
          grade={grade}
          disabled={Boolean(grade) || isChecking}
          onSelectChoice={(choiceId) => {
            if (grade || isChecking) return;
            setAnswers((current) => ({
              ...current,
              [problem.id]: choiceId,
            }));
          }}
        />
      </main>

      {grade ? (
        <ProblemFeedback
          grade={grade}
          isLastProblem={isLastProblem}
          isSubmitting={isSubmitting}
          onContinue={continueAfterFeedback}
          showCorrectAnswer={problem.type !== "line-match"}
        />
      ) : (
        <LevelFooter
          canCheck={hasCompleteAnswer(problem, selectedChoiceId)}
          isChecking={isChecking}
          onCheck={checkAnswer}
        />
      )}
    </div>
  );
}
