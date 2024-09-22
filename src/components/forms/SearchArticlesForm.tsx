"use client";

import { FormProvider, useForm } from "react-hook-form";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import Button from "@/components/ui/Button";
import Dropdown from "@/components/ui/Dropdown";
import Input from "@/components/ui/Input";
import { CATEGORIES, NEWS_SOURCES } from "@/lib/constants";
import { SearchArticlesFormFields } from "@/lib/enums/news.enums";
import { SearchArticlesFormSchema } from "@/lib/schemas/article.schemas";
import { zodResolver } from "@hookform/resolvers/zod";

const SearchArticlesForm = () => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const searchArticlesForm = useForm({
    resolver: zodResolver(SearchArticlesFormSchema),
    defaultValues: {
      [SearchArticlesFormFields.keyword]: searchParams.get("keyword") || "",
      [SearchArticlesFormFields.fromDate]: searchParams.get("fromDate") || "",
      [SearchArticlesFormFields.toDate]: searchParams.get("toDate") || "",
      [SearchArticlesFormFields.newsSource]:
        searchParams.get("newsSource") || "",
      [SearchArticlesFormFields.category]: searchParams.get("category") || "",
    },
  });

  const { register, handleSubmit } = searchArticlesForm;

  const onSubmit = handleSubmit((formData) => {
    const params = new URLSearchParams(searchParams);

    const keyword = formData[SearchArticlesFormFields.keyword];
    const fromDate = formData[SearchArticlesFormFields.fromDate];
    const toDate = formData[SearchArticlesFormFields.toDate];
    const newsSource = formData[SearchArticlesFormFields.newsSource];
    const category = formData[SearchArticlesFormFields.category];

    if (keyword) {
      params.set("keyword", keyword);
    } else params.delete("keyword");

    if (fromDate) {
      params.set("fromDate", fromDate);
    } else params.delete("fromDate");

    if (toDate) {
      params.set("toDate", toDate);
    } else params.delete("toDate");

    if (newsSource) {
      params.set("newsSource", newsSource);
    } else params.delete("newsSource");

    if (category) {
      params.set("category", category);
    } else params.delete("category");

    params.set("page", "1");

    replace(`${pathname}?${params.toString()}`);
  });

  return (
    <FormProvider {...searchArticlesForm}>
      <div className="rounded-lg bg-white p-6 shadow-md">
        <form
          onSubmit={onSubmit}
          className="space-y-4 md:flex md:flex-wrap md:items-end md:gap-4 md:space-y-0"
        >
          <div className="w-full md:w-64">
            <Input
              {...register(SearchArticlesFormFields.keyword)}
              type="text"
              label="Search"
              placeholder="Enter keywords"
            />
          </div>

          <div className="flex w-full space-x-4 md:w-auto">
            <div>
              <Input
                {...register(SearchArticlesFormFields.fromDate)}
                type="date"
                label="From"
              />
            </div>
            <div>
              <Input
                {...register(SearchArticlesFormFields.toDate)}
                type="date"
                label="To"
              />
            </div>
          </div>

          <div className="w-full md:w-48">
            <Dropdown
              {...register(SearchArticlesFormFields.newsSource)}
              label="Sources"
              options={NEWS_SOURCES}
            />
          </div>

          <div className="w-full md:w-48">
            <Dropdown
              {...register(SearchArticlesFormFields.category)}
              label="Category"
              options={CATEGORIES}
            />
          </div>

          <div className="w-full md:w-max">
            <Button type="submit">Search</Button>
          </div>
        </form>
      </div>
    </FormProvider>
  );
};

export default SearchArticlesForm;
