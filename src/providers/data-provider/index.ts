"use client";

import dataProviderSimpleRest from "@refinedev/simple-rest";

const BACKEND_API_ORIGIN =
  process.env.BACKEND_API_ORIGIN || "http://localhost:8000";

export const dataProvider = dataProviderSimpleRest(BACKEND_API_ORIGIN);
