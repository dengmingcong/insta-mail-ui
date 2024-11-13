"use client";

import dataProviderSimpleRest from "@refinedev/simple-rest";

const API_URL = "http://localhost:3001";

export const dataProvider = dataProviderSimpleRest(API_URL);
