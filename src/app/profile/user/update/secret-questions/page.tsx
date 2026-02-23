// app/profile/user/update/secret-questions/page.tsx
"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  AuthService,
  SecretQuestion,
  UpdateSecretQuestionsRequest,
  UserSecretQuestion,
} from "@/services/authService";
import SecretQuestionsLoading from "@/components/user-profile-components/Loadings/SecretQuestionsLoading";

const SecretQuestionUpdatePage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [existingQuestions, setExistingQuestions] = useState<
    UserSecretQuestion[]
  >([]);
  const [availableQuestions, setAvailableQuestions] = useState<
    SecretQuestion[]
  >([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Form state - simple array of questions
  const [questions, setQuestions] = useState<
    { questionId: number; question: string; answer: string }[]
  >([]);
  const [newQuestionId, setNewQuestionId] = useState<number | "">("");
  const [newAnswer, setNewAnswer] = useState("");

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    try {
      setLoading(true);
      setError(null);

      // Load existing user questions
      const userQuestions = await AuthService.getSecretQuestionsByUser();
      setExistingQuestions(userQuestions);

      // Load all available questions
      const allQuestions = await AuthService.getSecretQuestions();
      setAvailableQuestions(allQuestions);

      // Initialize form with existing questions
      const initialQuestions = userQuestions.map((q) => ({
        questionId: q.secretQuestionId,
        question: q.secretQuestion,
        answer: q.answer,
      }));

      setQuestions(initialQuestions);
    } catch (err) {
      console.error("Failed to load questions:", err);
      setError("Failed to load security questions");
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (index: number, value: string) => {
    setQuestions((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], answer: value };
      return updated;
    });
  };

  const handleRemoveQuestion = (index: number) => {
    setQuestions((prev) => {
      const updated = [...prev];
      updated.splice(index, 1);
      return updated;
    });
    setError(null);
  };

  const handleAddQuestion = () => {
    if (!newQuestionId || !newAnswer.trim()) {
      setError("Please select a question and provide an answer");
      return;
    }

    if (questions.length >= 3) {
      setError("Maximum 3 security questions allowed");
      return;
    }

    const selectedQuestion = availableQuestions.find(
      (q) => q.questionId === newQuestionId,
    );
    if (!selectedQuestion) {
      setError("Invalid question selected");
      return;
    }

    // Check if question already exists
    if (questions.some((q) => q.questionId === newQuestionId)) {
      setError("This question is already added");
      return;
    }

    const newQuestion = {
      questionId: newQuestionId,
      question: selectedQuestion.question,
      answer: newAnswer.trim(),
    };

    setQuestions((prev) => [...prev, newQuestion]);
    setNewQuestionId("");
    setNewAnswer("");
    setError(null);
  };

  const prepareUpdateRequest = (): UpdateSecretQuestionsRequest => {
    // Find questions to update (existing questions with changed answers)
    const updateQuestions = questions
      .filter((q) =>
        existingQuestions.some(
          (eq) =>
            eq.secretQuestionId === q.questionId && eq.answer !== q.answer,
        ),
      )
      .map((q) => ({
        question: q.questionId,
        answer: q.answer,
      }));

    // Find new questions (questions not in existingQuestions)
    const addQuestions = questions
      .filter(
        (q) =>
          !existingQuestions.some((eq) => eq.secretQuestionId === q.questionId),
      )
      .map((q) => ({
        question: q.questionId,
        answer: q.answer,
      }));

    // Find questions to remove (existing questions not in current questions)
    const removeQuestionsIds = existingQuestions
      .filter(
        (eq) => !questions.some((q) => q.questionId === eq.secretQuestionId),
      )
      .map((eq) => eq.secretQuestionId);

    return { addQuestions, updateQuestions, removeQuestionsIds };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (questions.length !== 3) {
      setError("You must have exactly 3 security questions");
      return;
    }

    const updateRequest = prepareUpdateRequest();

    // Check if there are any changes
    if (
      updateRequest.addQuestions.length === 0 &&
      updateRequest.updateQuestions.length === 0 &&
      updateRequest.removeQuestionsIds.length === 0
    ) {
      setError("No changes detected");
      return;
    }

    try {
      setSaving(true);
      setError(null);

      const message = await AuthService.updateSecretQuestions(updateRequest);
      setSuccess(message || "Security questions updated successfully!");

      // Reload questions after successful update
      setTimeout(() => {
        loadQuestions();
      }, 2000);
    } catch (err) {
      console.error("Failed to update questions:", err);
      setError("Failed to update security questions");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    router.push("/profile/user/update");
  };

  const getUnusedQuestions = () => {
    return availableQuestions.filter(
      (aq) => !questions.some((q) => q.questionId === aq.questionId),
    );
  };

  if (loading) {
    return <SecretQuestionsLoading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-teal-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-sky-600 to-teal-600 bg-clip-text text-transparent mb-2">
                Security Questions
              </h1>
              <p className="text-sky-700">
                Update your secret questions for account recovery
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1.5 bg-gradient-to-r from-sky-100 to-teal-100 text-sky-700 rounded-lg text-sm font-medium border border-sky-200">
                {questions.length}/3 questions
              </span>
              <button
                onClick={handleCancel}
                className="px-4 py-2 border border-sky-300 text-sky-700 rounded-lg hover:bg-sky-50 transition-colors"
              >
                Back
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-red-500 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-red-700">{error}</span>
              </div>
            </div>
          )}

          {success && (
            <div className="mb-4 p-4 bg-teal-50 border border-teal-200 rounded-lg">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-teal-500 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-teal-700">{success}</span>
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          {/* Current Questions */}
          <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-sm border border-sky-200 p-6 mb-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-sky-500 to-teal-500 rounded-lg flex items-center justify-center mr-3">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-sky-800">
                  Security Questions
                </h3>
                <p className="text-sky-600 text-sm">
                  You must have exactly 3 questions
                </p>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              {questions.map((question, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-r from-sky-50 to-teal-50 rounded-lg border border-sky-200 p-4"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-gradient-to-r from-sky-500 to-teal-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-medium">
                          {index + 1}
                        </span>
                      </div>
                      <span className="text-xs font-medium bg-gradient-to-r from-sky-100 to-teal-100 text-sky-700 px-2 py-1 rounded-full border border-sky-200">
                        {existingQuestions.some(
                          (eq) => eq.secretQuestionId === question.questionId,
                        )
                          ? "Existing"
                          : "New"}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveQuestion(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>

                  <h4 className="font-medium text-sky-800 mb-3">
                    {question.question}
                  </h4>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-sky-700">
                      Your Answer
                    </label>
                    <input
                      type="text"
                      value={question.answer}
                      onChange={(e) =>
                        handleAnswerChange(index, e.target.value)
                      }
                      className="w-full px-3 py-2 border border-sky-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none text-gray-700 bg-white"
                      placeholder="Enter your answer"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Add New Question Form */}
            <div className="bg-gradient-to-r from-sky-50 to-teal-50 border border-sky-200 rounded-lg p-5">
              <h4 className="font-semibold text-sky-800 mb-4 flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-sky-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Add New Question
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-sky-700 mb-2">
                    Select Question
                  </label>
                  <select
                    value={newQuestionId}
                    onChange={(e) =>
                      setNewQuestionId(
                        e.target.value ? Number(e.target.value) : "",
                      )
                    }
                    className="w-full px-3 py-2 border border-sky-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none text-gray-700 bg-white"
                  >
                    <option value="" className="text-gray-500">
                      Choose a question...
                    </option>
                    {getUnusedQuestions().map((q) => (
                      <option
                        key={q.questionId}
                        value={q.questionId}
                        className="text-gray-700"
                      >
                        {q.question}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-sky-700 mb-2">
                    Your Answer
                  </label>
                  <input
                    type="text"
                    value={newAnswer}
                    onChange={(e) => setNewAnswer(e.target.value)}
                    className="w-full px-3 py-2 border border-sky-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none text-gray-700 bg-white"
                    placeholder="Enter your answer"
                  />
                </div>

                <div className="md:col-span-2">
                  <button
                    type="button"
                    onClick={handleAddQuestion}
                    disabled={
                      questions.length >= 3 ||
                      !newQuestionId ||
                      !newAnswer.trim()
                    }
                    className="w-full px-4 py-2 bg-gradient-to-r from-sky-500 to-teal-500 text-white rounded-lg hover:from-sky-600 hover:to-teal-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
                  >
                    Add Question
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Rules & Info */}
          <div className="bg-gradient-to-r from-sky-50 to-teal-50 border border-sky-200 rounded-lg p-5 mb-6">
            <div className="flex items-start">
              <div className="w-8 h-8 bg-gradient-to-r from-sky-500 to-teal-500 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-sky-800 mb-2">
                  Important Guidelines
                </h4>
                <ul className="space-y-2 text-sm text-sky-700">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-gradient-to-r from-sky-500 to-teal-500 rounded-full mr-2 mt-2"></div>
                    You must have exactly 3 security questions
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-gradient-to-r from-sky-500 to-teal-500 rounded-full mr-2 mt-2"></div>
                    Remove one question to add a new one (maximum 3 questions)
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-gradient-to-r from-sky-500 to-teal-500 rounded-full mr-2 mt-2"></div>
                    Answers are case-sensitive and should be memorable
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-gradient-to-r from-sky-500 to-teal-500 rounded-full mr-2 mt-2"></div>
                    These questions are used for account recovery
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-sm border border-sky-200 p-6">
            <div className="flex flex-col sm:flex-row justify-end gap-4">
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 border border-sky-300 text-sky-700 rounded-lg hover:bg-sky-50 disabled:opacity-50 transition-colors"
                disabled={saving}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving || questions.length !== 3}
                className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                  saving || questions.length !== 3
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-sky-500 to-teal-500 text-white hover:from-sky-600 hover:to-teal-600 shadow-sm hover:shadow-md"
                }`}
              >
                {saving ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Saving...
                  </span>
                ) : (
                  "Update Security Questions"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SecretQuestionUpdatePage;
