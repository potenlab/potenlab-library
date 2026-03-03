"use client";

import type { User, FormField } from "@/features/user-management/types";
import {
  BASIC_INFO_ROW_1,
  BASIC_INFO_ROW_2,
  BASIC_INFO_ROW_3,
} from "@/features/user-management/types";
import { ProfileImages } from "@/components/user-management/profile-images";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

export interface UserDetailFormProps {
  user: User;
  formValues: Record<string, string>;
  toggleStates: {
    profilePublic: boolean;
    matchChatNotification: boolean;
    marketingNotification: boolean;
  };
  onInputChange: (key: string, value: string) => void;
  onToggleChange: (key: string, checked: boolean) => void;
}

export function UserDetailForm({
  user,
  formValues,
  toggleStates,
  onInputChange,
  onToggleChange,
}: UserDetailFormProps) {
  const renderField = (field: FormField) => {
    const fieldId = `field-${field.key}`;

    if (field.type === "select") {
      return (
        <div key={field.key} className="flex flex-col">
          <Label htmlFor={fieldId}>{field.label}</Label>
          <Select
            value={formValues[field.key] ?? ""}
            onValueChange={(value) => onInputChange(field.key, value)}
          >
            <SelectTrigger id={fieldId} className="h-[52px]">
              <SelectValue placeholder={field.label} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      );
    }

    return (
      <div key={field.key} className="flex flex-col">
        <Label htmlFor={fieldId}>{field.label}</Label>
        <Input
          id={fieldId}
          className="h-[52px]"
          value={formValues[field.key] ?? ""}
          onChange={(e) => onInputChange(field.key, e.target.value)}
        />
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Basic Info Section */}
      <div className="flex flex-col gap-6">
        <h2 className="font-pretendard text-[20px] font-bold text-placeholder">
          기본 정보
        </h2>

        {/* Profile Images */}
        <div className="mb-[24px]">
          <ProfileImages images={user.profileImages} />
        </div>

        {/* One-Line Intro */}
        <div className="flex flex-col">
          <Label htmlFor="field-intro">한줄 소개</Label>
          <Input
            id="field-intro"
            className="h-[52px]"
            value={formValues.intro}
            onChange={(e) => onInputChange("intro", e.target.value)}
          />
        </div>

        {/* Row 1: Role, Nickname, Phone, Age */}
        <div className="grid grid-cols-4 gap-6">
          {BASIC_INFO_ROW_1.map((field) => renderField(field))}
        </div>

        {/* Row 2: Gender, Exercise Style, Gym Relocation, Region */}
        <div className="grid grid-cols-4 gap-6">
          {BASIC_INFO_ROW_2.map((field) => renderField(field))}
        </div>

        {/* Row 3: Bench, Deadlift, Squat */}
        <div className="grid grid-cols-3 gap-6">
          {BASIC_INFO_ROW_3.map((field) => renderField(field))}
        </div>
      </div>

      {/* Separator */}
      <Separator />

      {/* Other Settings Section */}
      <div className="flex flex-col gap-6">
        <h2 className="font-pretendard text-[20px] font-bold text-placeholder">
          기타 설정
        </h2>

        <div className="flex flex-row gap-[100px]">
          {/* Profile Public */}
          <div className="flex items-center gap-3">
            <label
              htmlFor="toggle-profilePublic"
              className="font-pretendard text-[16px] font-medium text-black select-none cursor-pointer"
            >
              프로필 공개
            </label>
            <Switch
              id="toggle-profilePublic"
              checked={toggleStates.profilePublic}
              onCheckedChange={(checked) =>
                onToggleChange("profilePublic", checked)
              }
            />
          </div>

          {/* Match & Chat Notification */}
          <div className="flex items-center gap-3">
            <label
              htmlFor="toggle-matchChatNotification"
              className="font-pretendard text-[16px] font-medium text-black select-none cursor-pointer"
            >
              매치 & 채팅 알림
            </label>
            <Switch
              id="toggle-matchChatNotification"
              checked={toggleStates.matchChatNotification}
              onCheckedChange={(checked) =>
                onToggleChange("matchChatNotification", checked)
              }
            />
          </div>

          {/* Marketing Notification */}
          <div className="flex items-center gap-3">
            <label
              htmlFor="toggle-marketingNotification"
              className="font-pretendard text-[16px] font-medium text-black select-none cursor-pointer"
            >
              마케팅 알림
            </label>
            <Switch
              id="toggle-marketingNotification"
              checked={toggleStates.marketingNotification}
              onCheckedChange={(checked) =>
                onToggleChange("marketingNotification", checked)
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
