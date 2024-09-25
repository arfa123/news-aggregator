import { cookies } from "next/headers";

import PersonalizedNewsFeedForm from "@/components/forms/PersonalizedNewsFeedForm";
import { CookiesKeys } from "@/lib/enums";

export default function SettingsPage() {
  const personalizedNewsFeedPreferences = cookies().get(
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
