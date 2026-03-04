"use client";

import { Controller } from "react-hook-form";
import type { UseFormReturn } from "react-hook-form";
import type { User, FormField as FormFieldType, UserDetailFormValues } from "@/features/user-management/types";
import {
  BASIC_INFO_ROW_1,
  BASIC_INFO_ROW_2,
  BASIC_INFO_ROW_3,
} from "@/features/user-management/types";
import { ProfileImages } from "@/components/user-management/profile-images";
import { FormField, LabeledSwitch, Separator } from "@potenlab/ui";

export interface UserDetailFormProps {
  user: User;
  form: UseFormReturn<UserDetailFormValues>;
  profileImages?: string[];
  onImageUpload?: (index: number, file: File) => void;
}

export function UserDetailForm({
  user,
  form,
  profileImages,
  onImageUpload,
}: UserDetailFormProps) {
  const renderField = (field: FormFieldType) => (
    <Controller
      key={field.key}
      name={field.key as keyof UserDetailFormValues}
      control={form.control}
      render={({ field: controllerField }) => (
        <FormField
          id={`field-${field.key}`}
          label={field.label}
          type={field.type}
          value={controllerField.value as string}
          options={field.options}
          onChange={controllerField.onChange}
        />
      )}
    />
  );

  return (
    <div className="flex flex-col gap-6">
      {/* Basic Info Section */}
      <div className="flex flex-col gap-6">
        <h2 className="font-pretendard text-[20px] font-bold text-placeholder">
          기본 정보
        </h2>

        {/* Profile Images */}
        <div className="mb-[24px]">
          <ProfileImages
            images={profileImages ?? user.profileImages}
            editable={!!onImageUpload}
            onImageUpload={onImageUpload}
          />
        </div>

        {/* One-Line Intro */}
        <Controller
          name="intro"
          control={form.control}
          render={({ field: controllerField }) => (
            <FormField
              id="field-intro"
              label="한줄 소개"
              type="input"
              value={controllerField.value}
              onChange={controllerField.onChange}
            />
          )}
        />

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
          <Controller
            name="profilePublic"
            control={form.control}
            render={({ field: controllerField }) => (
              <LabeledSwitch
                id="toggle-profilePublic"
                label="프로필 공개"
                checked={controllerField.value}
                onCheckedChange={controllerField.onChange}
              />
            )}
          />
          <Controller
            name="matchChatNotification"
            control={form.control}
            render={({ field: controllerField }) => (
              <LabeledSwitch
                id="toggle-matchChatNotification"
                label="매치 & 채팅 알림"
                checked={controllerField.value}
                onCheckedChange={controllerField.onChange}
              />
            )}
          />
          <Controller
            name="marketingNotification"
            control={form.control}
            render={({ field: controllerField }) => (
              <LabeledSwitch
                id="toggle-marketingNotification"
                label="마케팅 알림"
                checked={controllerField.value}
                onCheckedChange={controllerField.onChange}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
}
