import GoogleProvider from "next-auth/providers/google";
import AzureADProvider from "next-auth/providers/azure-ad";

const authOptions = {
  // Configure one or more authentication providers
  providers: [
    // !!! Should be stored in .env file.
    GoogleProvider({
      clientId: `1041339102270-e1fpe2b6v6u1didfndh7jkjmpcashs4f.apps.googleusercontent.com`,
      clientSecret: `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`,
    }),
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID || '',
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET || '',
      tenantId: process.env.AZURE_AD_TENANT_ID,
    }),
  ],
  secret: `UItTuD1HcGXIj8ZfHUswhYdNd40Lc325R8VlxQPUoR0=`,
};

export default authOptions;
