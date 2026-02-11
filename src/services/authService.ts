import { ApiResponse } from "@/context/AuthContext";
import {
  GET_ACTIVE_SECRET_QUESTIONS_DATA_FE,
  GET_SECRET_QUESTIONS_BY_USER_DATA_FE,
  RESET_PASSWORD_DATA_FE,
  UPDATE_PASSWORD_DATA_FE,
  UPDATE_SECRET_QUESTIONS_DATA_FE,
  USERNAME_PASSWORD_VALIDATION_DATA_FE,
} from "@/utils/frontEndConstant";

export type ResetPasswordRequest = {
  username: string;
  secretQuestion1: number;
  secretQuestion1Answer: string;
  secretQuestion2: number;
  secretQuestion2Answer: string;
  secretQuestion3: number;
  secretQuestion3Answer: string;
  newPassword: string;
  confirmPassword: string;
};

export type ChangePasswordRequest = {
  username: string;
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

export type SecretQuestion = {
  questionId: number;
  question: string;
};

export type UpdateSecretQuestionsRequest = {
  addQuestions: { question: number; answer: string }[];
  updateQuestions: { question: number; answer: string }[];
  removeQuestionsIds: number[];
};

export type UserSecretQuestion = {
  secretQuestionId: number;
  secretQuestion: string;
  answer: string;
};

export class AuthService {
  // Reset password
  static async resetPassword(request: ResetPasswordRequest): Promise<string> {
    const res = await fetch(RESET_PASSWORD_DATA_FE, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message);
    }

    const data: ApiResponse<{ message: string }> = await res.json();
    return data.data.message;
  }

  // Change password
  static async changePassword(request: ChangePasswordRequest): Promise<string> {
    const res = await fetch(UPDATE_PASSWORD_DATA_FE, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message);
    }

    const data: ApiResponse<{ message: string }> = await res.json();
    return data.data.message;
  }

  // Get secret questions
  static async getSecretQuestions(): Promise<SecretQuestion[]> {
    const res = await fetch(GET_ACTIVE_SECRET_QUESTIONS_DATA_FE, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch secret questions");
    }

    const data: ApiResponse<SecretQuestion[]> = await res.json();
    return data.data;
  }

  // Update secret questions
  static async updateSecretQuestions(
    request: UpdateSecretQuestionsRequest,
  ): Promise<string> {
    const res = await fetch(UPDATE_SECRET_QUESTIONS_DATA_FE, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    if (!res.ok) {
      throw new Error("Failed to update secret questions");
    }

    const data: ApiResponse<{ message: string }> = await res.json();
    return data.data.message;
  }

  // Username password validation
  static async validateUsernamePassword(
    username: string,
    password: string,
  ): Promise<boolean> {
    const res = await fetch(USERNAME_PASSWORD_VALIDATION_DATA_FE, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      throw new Error("Validation failed");
    }

    const data: ApiResponse<boolean> = await res.json();
    return data.data;
  }

  // Get secret questions by logged-in user
  static async getSecretQuestionsByUser(): Promise<UserSecretQuestion[]> {
    const res = await fetch(GET_SECRET_QUESTIONS_BY_USER_DATA_FE, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to fetch user secret questions");
    }

    const data: ApiResponse<UserSecretQuestion[]> = await res.json();

    return data.data;
  }
}
