"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/common/page-header";
import { TabNavigation } from "@/components/common/tab-navigation";
import { SearchBar } from "@/components/common/search-bar";
import { PaginationControls } from "@/components/common/pagination-controls";
import { DataTable } from "@/components/common/data-table/data-table";
import { getUserColumns } from "@/features/user-management/components/user-columns";
import { mockUsers, totalUserCount } from "@/lib/mock-data";

export function UserList() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const columns = useMemo(
    () =>
      getUserColumns({
        onDelete: (user) => {
          // TODO: implement delete confirmation dialog
          console.log("Delete user:", user.id);
        },
      }),
    []
  );

  return (
    <Card>
      <CardContent className="p-8">
        <div className="flex flex-col gap-6">
          <PageHeader
            title="사용자관리"
            subtitle="사용자 리스트 관리 페이지"
            badgeCount={totalUserCount}
            actionLabel="작성"
            actionIcon={Pencil}
          />

          <TabNavigation
            tabs={[
              { value: "all", label: "전체" },
              { value: "tab2", label: "Tab" },
              { value: "tab3", label: "Tab" },
            ]}
            defaultValue={activeTab}
            onTabChange={setActiveTab}
          />

          <SearchBar
            value={searchValue}
            onChange={setSearchValue}
          />

          <PaginationControls
            currentPage={currentPage}
            totalPages={1}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={setItemsPerPage}
          />

          <DataTable
            columns={columns}
            data={mockUsers}
            enableSorting
            onRowClick={(user) => router.push(`/users/${user.id}`)}
          />
        </div>
      </CardContent>
    </Card>
  );
}
