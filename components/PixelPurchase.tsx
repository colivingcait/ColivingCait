"use client";

import { useEffect } from "react";

type PixelPurchaseProps = {
  value: number;
  currency?: string;
  contentName: string;
};

export default function PixelPurchase({
  value,
  currency = "USD",
  contentName,
}: PixelPurchaseProps) {
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "Purchase", {
        value,
        currency,
        content_name: contentName,
      });
    }
  }, [value, currency, contentName]);

  return null;
}
