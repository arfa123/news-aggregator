import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

const SearchArticle = () => {
  return (
    <form className="flex flex-col gap-4 sm:flex-row">
      <Input type="text" placeholder="Search articles..." />
      <Button>Search</Button>
    </form>
  );
};

export default SearchArticle;
