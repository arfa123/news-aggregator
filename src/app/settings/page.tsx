import { Metadata } from "next";
import { cookies } from "next/headers";

import PersonalizedNewsFeedForm from "@/components/forms/PersonalizedNewsFeedForm";
import { CookiesKeys } from "@/types/enums";

export const metadata: Metadata = {
  title: "Settings",
};

export default async function SettingsPage() {
  const personalizedNewsFeedPreferences = (await cookies()).get(
    CookiesKeys.personalizedNewsFeedPreferences
  )?.value;

  return (
    <main className="container mx-auto px-4 py-8">
      <h2 className="mb-8 text-2xl font-bold">
        Personalized News Feed Settings
      </h2>
      <PersonalizedNewsFeedForm
        personalizedNewsFeedPreferences={personalizedNewsFeedPreferences}
      />
    </main>
  );
}
