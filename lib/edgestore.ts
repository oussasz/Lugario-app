"use client";

import React from "react";

// EdgeStore was removed in favor of local uploads handled by POST /api/upload.
// This file remains only to avoid breaking older imports.

export const EdgeStoreProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => children;

export const useEdgeStore = () => {
  throw new Error(
    "EdgeStore has been removed. Use local uploads via /api/upload.",
  );
};
