"use client";

import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatNumber } from "@/lib/utils";

export interface PageHeaderProps {
  title: string;
  subtitle: string;
  badgeCount?: number;
  actionLabel: string;
  actionIcon?: LucideIcon;
  onAction?: () => void;
}

export function PageHeader({
  title,
  subtitle,
  badgeCount,
  actionLabel,
  actionIcon: ActionIcon,
  onAction,
}: PageHeaderProps) {
  return (
    <div>
      <div className="flex flex-row justify-between items-start">
        {/* Left side */}
        <div>
          {/* Title row with badge */}
          <div className="flex items-center gap-3">
            <h1 className="font-pretendard text-[32px] font-semibold text-black">
              {title}
            </h1>
            {badgeCount !== undefined && (
              <Badge
                variant="green"
                aria-label={`총 사용자: ${formatNumber(badgeCount)}건`}
              >
                {formatNumber(badgeCount)}건
              </Badge>
            )}
          </div>
          {/* Subtitle */}
          <p className="font-pretendard text-[18px] font-medium text-subtitle mt-1">
            {subtitle}
          </p>
        </div>

        {/* Right side */}
        <Button variant="primary" onClick={onAction}>
          {ActionIcon && <ActionIcon className="size-5" />}
          {actionLabel}
        </Button>
      </div>

      {/* Separator below header */}
      <Separator className="my-6" />
    </div>
  );
}
