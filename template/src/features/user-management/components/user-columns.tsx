"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "@/components/common/data-table/data-table-column-header";
import type { User } from "@/features/user-management/types";

interface GetUserColumnsOptions {
  onDelete?: (user: User) => void;
}

export function getUserColumns(
  options?: GetUserColumnsOptions
): ColumnDef<User>[] {
  return [
    {
      accessorKey: "nickname",
      header: "닉네임",
      meta: { className: "flex-1" },
    },
    {
      accessorKey: "grade",
      header: "등급",
      meta: { className: "flex-1" },
    },
    {
      accessorKey: "avatar",
      header: "아바타",
      meta: { className: "w-[80px] text-center", headerClassName: "w-[80px] text-center" },
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          <Avatar>
            <AvatarImage
              src={row.original.avatar}
              alt={`${row.original.nickname} avatar`}
            />
            <AvatarFallback>{row.original.nickname.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
      ),
    },
    {
      accessorKey: "phone",
      header: "휴대폰 번호",
      meta: { className: "flex-1" },
    },
    {
      accessorKey: "age",
      header: "나이",
      meta: { className: "flex-1" },
    },
    {
      accessorKey: "gender",
      header: "성별",
      meta: { className: "flex-1" },
    },
    {
      accessorKey: "region",
      header: "지역",
      meta: { className: "flex-1" },
    },
    {
      accessorKey: "joinDate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="가입일" />
      ),
      meta: { className: "flex-1" },
      enableSorting: true,
    },
    {
      accessorKey: "withdrawalDate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="탈퇴일" />
      ),
      meta: { className: "flex-1" },
      enableSorting: true,
    },
    {
      id: "delete",
      header: "삭제",
      meta: { className: "w-[57px]" },
      cell: ({ row }) => (
        <Button
          variant="ghost"
          size="ghost"
          onClick={(e) => {
            e.stopPropagation();
            options?.onDelete?.(row.original);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.stopPropagation();
            }
          }}
          aria-label={`Delete user ${row.original.nickname}`}
        >
          삭제
        </Button>
      ),
    },
  ];
}
