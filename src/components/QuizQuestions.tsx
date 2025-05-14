import { FC } from "react"
import { Question, Results, SelectedAnswers } from "../features/quiz/quizSlice"

type Props = {
    questions: Question[];
    selectedAnswers: SelectedAnswers | Results ;
    handleAnswerSelect?: (questionId: string, answer: string) => void
    isResultPage?:boolean;
}

const QuizQuestions:FC<Props> = ({questions, selectedAnswers, handleAnswerSelect, isResultPage}) => {
    const isSelectedAnswers = (obj: SelectedAnswers | Results | null): obj is SelectedAnswers => {
        const keys = Object.keys(obj || {});
        if (keys.length === 0 || obj === null) return !isResultPage;
        const firstValue = obj[keys[0]];
        return !isResultPage && typeof firstValue === "string";
      };


  return (
    <>
    {questions.map((question) => (
        <div key={question.id} className="mb-6">
          <p
            className="text-lg mb-6"
            dangerouslySetInnerHTML={{ __html: question.question }}
          ></p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
          {question.answers.map((answer) => {
              const isSelected = selectedAnswers && (isSelectedAnswers(selectedAnswers)
                ? selectedAnswers[question.id] === answer
                : selectedAnswers[question.id]?.selected === answer);
              const isCorrect = selectedAnswers && !isSelectedAnswers(selectedAnswers)
                ? selectedAnswers[question.id]?.correct === answer
                : false;

              let buttonClass = "bg-white";
              if (!isResultPage && isSelected) {
                buttonClass = "bg-blue-500 text-white";
              } else if (isResultPage) {
                if (isSelected && isCorrect) {
                  buttonClass = "border-green-400 bg-green-400 text-white";
                } else if (isSelected && !isCorrect) {
                  buttonClass = "border-red-500 bg-red-500 text-white";
                } else if (isCorrect) {
                  buttonClass = "border-green-500 bg-green-500 text-white";
                }
              }

              return (
                <button
                  key={answer}
                  className={`${buttonClass} ${isResultPage ? "cursor-not-allowed" : ""} p-4 border rounded-lg`}
                  onClick={
                    !isResultPage && handleAnswerSelect
                      ? () => handleAnswerSelect(question.id, answer)
                      : undefined
                  }
                  dangerouslySetInnerHTML={{ __html: answer }}
                />
              );
            })}
          </div>
        </div>
      ))
    }
    </>
  )
}

export default QuizQuestions