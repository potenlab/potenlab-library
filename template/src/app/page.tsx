"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/common/page-header";
import { TabNavigation } from "@/components/user-management/tab-navigation";
import { SearchBar } from "@/components/user-management/search-bar";
import { PaginationControls } from "@/components/user-management/pagination-controls";
import { UserTable } from "@/components/user-management/user-table";
import { mockUsers, totalUserCount } from "@/lib/mock-data";

export default function Dashboard() {
  const [searchValue, setSearchValue] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

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

          <UserTable users={mockUsers} />
        </div>
      </CardContent>
    </Card>
  );
}
