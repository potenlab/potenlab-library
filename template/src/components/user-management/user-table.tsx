"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowUpDown } from "lucide-react";

import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { User } from "@/features/user-management/types";
import { USER_TABLE_COLUMNS } from "@/features/user-management/types";

export interface UserTableProps {
  users: User[];
}

const UserTableRow = React.memo(function UserTableRow({
  user,
}: {
  user: User;
}) {
  const router = useRouter();

  const handleRowClick = () => {
    router.push(`/users/${user.id}`);
  };

  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
  };

  const handleDeleteKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.stopPropagation();
    }
  };

  return (
    <TableRow
      onClick={handleRowClick}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleRowClick();
        }
      }}
      tabIndex={0}
      role="link"
    >
      <TableCell className="flex-1">{user.nickname}</TableCell>
      <TableCell className="flex-1">{user.grade}</TableCell>
      <TableCell className="w-[80px] text-center">
        <div className="flex items-center justify-center">
          <Avatar>
            <AvatarImage src={user.avatar} alt={`${user.nickname} avatar`} />
            <AvatarFallback>{user.nickname.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
      </TableCell>
      <TableCell className="flex-1">{user.phone}</TableCell>
      <TableCell className="flex-1">{user.age}</TableCell>
      <TableCell className="flex-1">{user.gender}</TableCell>
      <TableCell className="flex-1">{user.region}</TableCell>
      <TableCell className="flex-1">{user.joinDate}</TableCell>
      <TableCell className="flex-1">{user.withdrawalDate}</TableCell>
      <TableCell className="w-[57px]">
        <Button
          variant="ghost"
          size="ghost"
          onClick={handleDeleteClick}
          onKeyDown={handleDeleteKeyDown}
          aria-label={`Delete user ${user.nickname}`}
        >
          삭제
        </Button>
      </TableCell>
    </TableRow>
  );
});

export function UserTable({ users }: UserTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-table-header cursor-default">
          {USER_TABLE_COLUMNS.map((column) => (
            <TableHead
              key={column.key}
              className={
                column.width === "flex-1"
                  ? "flex-1"
                  : column.width === "80px"
                    ? "w-[80px] text-center"
                    : "w-[57px]"
              }
              aria-label={
                column.sortable
                  ? `${column.label}, sortable column`
                  : undefined
              }
            >
              <div className="flex items-center gap-1">
                {column.label}
                {column.sortable && (
                  <ArrowUpDown className="size-4 text-table-cell" />
                )}
              </div>
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <UserTableRow key={user.id} user={user} />
        ))}
      </TableBody>
    </Table>
  );
}
