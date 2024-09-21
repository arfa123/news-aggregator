import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import Input from "@/components/ui/Input";

const PersonalizationSettingsForm = () => {
  return (
    <form className="rounded-lg bg-white p-6 shadow-md md:p-8">
      <div className="mb-8">
        <h3 className="mb-4 text-xl font-semibold">Preferred Sources</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          <Checkbox>NewsAPI</Checkbox>
          <Checkbox>The Guardian</Checkbox>
          <Checkbox>New York Times</Checkbox>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="mb-4 text-xl font-semibold">Preferred Categories</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          <Checkbox>Politics</Checkbox>
          <Checkbox>Technology</Checkbox>
          <Checkbox>Sports</Checkbox>
          <Checkbox>Entertainment</Checkbox>
          <Checkbox>Science</Checkbox>
          <Checkbox>Health</Checkbox>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="mb-4 text-xl font-semibold">Preferred Authors</h3>
        <div className="grid grid-cols-1 gap-4">
          <Input
            type="text"
            placeholder="Enter author names (comma-separated)"
            className="w-full"
          />
        </div>
      </div>

      <Button>Save Preferences</Button>
    </form>
  );
};

export default PersonalizationSettingsForm;
