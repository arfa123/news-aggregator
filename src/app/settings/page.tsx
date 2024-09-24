import PersonalizedNewsFeedForm from "@/components/forms/PersonalizedNewsFeedForm";

export default function SettingsPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h2 className="mb-8 text-2xl font-bold">
        Personalized News Feed Settings
      </h2>
      <PersonalizedNewsFeedForm />
    </main>
  );
}
