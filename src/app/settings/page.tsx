import PersonalizationSettingsForm from "@/components/forms/PersonalizationSettingsForm";

export default function SettingsPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h2 className="mb-8 text-2xl font-bold">Personalization Settings</h2>
      <PersonalizationSettingsForm />
    </main>
  );
}
