declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_FIREBASE_API_KEY: string;
      NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: string;
      NEXT_PUBLIC_FIREBASE_PROJECT_ID: string;
      NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: string;
      NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: string;
      NEXT_PUBLIC_FIREBASE_APP_ID: string;

      GOOGLE_ID: string;
      GOOGLE_SECRET: string;
      NEXTAUTH_URL: string;
      stripe_public_key: string;
      STRIPE_PRIVATE_KEY: string;
      STRIPE_SIGNING_SECRET: string;
      HOST: string;

      FIREBASE_PRIVATE_KEY: string;
      FIREBASE_CLIENT_EMAIL: string;
    }
  }
}

export {};
