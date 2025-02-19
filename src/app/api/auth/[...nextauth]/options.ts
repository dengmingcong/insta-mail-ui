import AzureADProvider from "next-auth/providers/azure-ad";
import GoogleProvider from "next-auth/providers/google";

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
  callbacks: {
    // This callback is called whenever a JSON Web Token is created (i.e. at sign in) or updated (i.e whenever a session is accessed in the client).
    // Requests to `/api/auth/signin`, `/api/auth/session` and calls to `getSession()`, `getServerSession()`, `useSession()` will invoke this function.
    // The arguments `user`, `account`, `profile` and `isNewUser` are only passed the first time this callback is called on a new session, after the user signs in. 
    // In subsequent calls, only `token` will be available.
    async jwt({ token, account, profile }) {
      // Persist the OAuth access_token and or the user id to the token right after signin.
      // If `account` exists, it means that the callback is being invoked for the first time (i.e. the user is signing in).
      if (account) {
        token.accessToken = account.access_token
        token.id = profile.id
      }

      return token
    },
    // The `session` callback is called whenever a session is checked. 
    // By default, only a subset of the token is returned for increased security.
    // To make `accessToken` and `id` added to the `token` available via the `jwt()` callback, we have to explicitly forward it here to make it available to the client.
    async session({ session, token }) {
      // Send properties to the client, like an access_token and user id from a provider.
      session.accessToken = token.accessToken
      session.user.id = token.id

      return session
    }
  },
  secret: `UItTuD1HcGXIj8ZfHUswhYdNd40Lc325R8VlxQPUoR0=`,
};

export default authOptions;
