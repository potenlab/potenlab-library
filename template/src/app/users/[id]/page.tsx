"use client";

import { use } from "react";
import { Pencil } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/common/page-header";
import { UserDetailForm } from "@/components/user-management/user-detail-form";
import { mockUsers } from "@/lib/mock-data";

export default function UserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const user = mockUsers.find((u) => u.id === id) || mockUsers[0];

  return (
    <Card>
      <CardContent className="p-8">
        <PageHeader
          title="사용자관리"
          subtitle="사용자 정보를 수정할 수 있습니다."
          actionLabel="변경사항 저장"
          actionIcon={Pencil}
        />

        <UserDetailForm user={user} />
      </CardContent>
    </Card>
  );
}
