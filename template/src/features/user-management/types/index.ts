// src/features/user-management/types/index.ts

export interface UserSettings {
  profilePublic: boolean;
  matchChatNotification: boolean;
  marketingNotification: boolean;
}

export interface User {
  id: string;
  nickname: string;
  grade: string;
  avatar: string;
  phone: string;
  age: string;
  gender: string;
  region: string;
  joinDate: string;
  withdrawalDate: string;
  role: string;
  exerciseStyle: string;
  gymRelocation: string;
  bench: string;
  deadlift: string;
  squat: string;
  intro: string;
  profileImages: string[];
  settings: UserSettings;
}

/** @deprecated Use ColumnDef<User> from @tanstack/react-table with getUserColumns() instead */
export interface UserTableColumn {
  key: keyof User | "delete";
  label: string;
  width: string; // CSS width: "flex-1", "80px", "57px"
  sortable: boolean;
  alignment: "left" | "center";
}

/** @deprecated Use getUserColumns() from @/features/user-management/components/user-columns instead */
export const USER_TABLE_COLUMNS: UserTableColumn[] = [
  { key: "nickname",       label: "닉네임",       width: "flex-1", sortable: false, alignment: "left" },
  { key: "grade",          label: "등급",         width: "flex-1", sortable: false, alignment: "left" },
  { key: "avatar",         label: "아바타",       width: "80px",   sortable: false, alignment: "center" },
  { key: "phone",          label: "휴대폰 번호",  width: "flex-1", sortable: false, alignment: "left" },
  { key: "age",            label: "나이",         width: "flex-1", sortable: false, alignment: "left" },
  { key: "gender",         label: "성별",         width: "flex-1", sortable: false, alignment: "left" },
  { key: "region",         label: "지역",         width: "flex-1", sortable: false, alignment: "left" },
  { key: "joinDate",       label: "가입일",       width: "flex-1", sortable: true,  alignment: "left" },
  { key: "withdrawalDate", label: "탈퇴일",       width: "flex-1", sortable: true,  alignment: "left" },
  { key: "delete",         label: "삭제",         width: "57px",   sortable: false, alignment: "left" },
];

export interface PaginationState {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  pageJumpInput: string;
}

export const DEFAULT_PAGINATION: PaginationState = {
  currentPage: 1,
  totalPages: 1,
  itemsPerPage: 10,
  pageJumpInput: "",
};

export type FormFieldType = "input" | "select";

export interface FormField {
  key: keyof User;
  label: string;
  type: FormFieldType;
  options?: string[]; // Only for type "select"
}

export const BASIC_INFO_ROW_1: FormField[] = [
  { key: "role",     label: "역할",     type: "select", options: ["사용자", "관리자"] },
  { key: "nickname", label: "닉네임",   type: "input" },
  { key: "phone",    label: "휴대폰",   type: "input" },
  { key: "age",      label: "나이",     type: "input" },
];

export const BASIC_INFO_ROW_2: FormField[] = [
  { key: "gender",         label: "성별",          type: "select", options: ["남자", "여자"] },
  { key: "exerciseStyle",  label: "운동 스타일",    type: "select", options: ["보디빌딩", "크로스핏", "유산소"] },
  { key: "gymRelocation",  label: "헬스장 이전",    type: "select", options: ["가능", "불가능"] },
  { key: "region",         label: "지역",          type: "select", options: ["서울 마포구", "강남구", "송파구"] },
];

export const BASIC_INFO_ROW_3: FormField[] = [
  { key: "bench",    label: "벤치프레스",  type: "input" },
  { key: "deadlift", label: "데드리프트",  type: "input" },
  { key: "squat",    label: "스쿼트",     type: "input" },
];
