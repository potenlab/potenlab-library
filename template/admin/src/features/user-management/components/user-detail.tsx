"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";

import { Card, CardContent, PageHeader } from "@potenlab/ui";
import { UserDetailForm } from "@/components/user-management/user-detail-form";
import { mockUsers } from "@/lib/mock-data";
import type { UserDetailFormValues } from "@/features/user-management/types";

export interface UserDetailProps {
  userId: string;
}

export function UserDetail({ userId }: UserDetailProps) {
  const user = mockUsers.find((u) => u.id === userId) || mockUsers[0];

  const [profileImages, setProfileImages] = useState<string[]>(user.profileImages);

  const form = useForm<UserDetailFormValues>({
    defaultValues: {
      role: user.role,
      nickname: user.nickname,
      phone: user.phone,
      age: user.age,
      gender: user.gender,
      exerciseStyle: user.exerciseStyle,
      gymRelocation: user.gymRelocation,
      region: user.region,
      bench: user.bench,
      deadlift: user.deadlift,
      squat: user.squat,
      intro: user.intro,
      profilePublic: user.settings.profilePublic,
      matchChatNotification: user.settings.matchChatNotification,
      marketingNotification: user.settings.marketingNotification,
    },
  });

  const handleImageUpload = (index: number, file: File) => {
    const previewUrl = URL.createObjectURL(file);
    setProfileImages((prev) => {
      const updated = [...prev];
      if (index < updated.length) {
        updated[index] = previewUrl;
      } else {
        updated.push(previewUrl);
      }
      return updated;
    });
  };

  const handleSave = form.handleSubmit((data) => {
    // TODO: implement save logic
    console.log("Save:", data);
  });

  return (
    <Card>
      <CardContent className="p-8">
        <PageHeader
          title="사용자관리"
          subtitle="사용자 정보를 수정할 수 있습니다."
          actionLabel="변경사항 저장"
          actionIcon={Pencil}
          onAction={handleSave}
        />

        <UserDetailForm
          user={user}
          form={form}
          profileImages={profileImages}
          onImageUpload={handleImageUpload}
        />
      </CardContent>
    </Card>
  );
}
