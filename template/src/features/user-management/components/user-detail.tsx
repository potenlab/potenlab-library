"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/common/page-header";
import { UserDetailForm } from "@/components/user-management/user-detail-form";
import { mockUsers } from "@/lib/mock-data";

export interface UserDetailProps {
  userId: string;
}

export function UserDetail({ userId }: UserDetailProps) {
  const user = mockUsers.find((u) => u.id === userId) || mockUsers[0];

  const [formValues, setFormValues] = useState<Record<string, string>>({
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
  });

  const [toggleStates, setToggleStates] = useState({
    profilePublic: user.settings.profilePublic,
    matchChatNotification: user.settings.matchChatNotification,
    marketingNotification: user.settings.marketingNotification,
  });

  const handleInputChange = (key: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleToggleChange = (key: string, checked: boolean) => {
    setToggleStates((prev) => ({ ...prev, [key]: checked }));
  };

  const handleSave = () => {
    // TODO: implement save logic
    console.log("Save:", { formValues, toggleStates });
  };

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
          formValues={formValues}
          toggleStates={toggleStates}
          onInputChange={handleInputChange}
          onToggleChange={handleToggleChange}
        />
      </CardContent>
    </Card>
  );
}
