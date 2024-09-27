"use client";

import { FormProvider, useForm } from "react-hook-form";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import Button from "@/components/ui/Button";
import Dropdown from "@/components/ui/Dropdown";
import Input from "@/components/ui/Input";
import { CATEGORIES, DEFAULT_PAGE, NEWS_SOURCES } from "@/config/constants";
import { SearchArticlesFormSchema } from "@/lib/schemas";
import { PageSearchParams, SearchArticlesFormFields } from "@/types/enums";
import { zodResolver } from "@hookform/resolvers/zod";

const SearchArticlesForm = () => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const searchArticlesForm = useForm({
    resolver: zodResolver(SearchArticlesFormSchema),
    defaultValues: {
      [SearchArticlesFormFields.keyword]:
        searchParams.get(PageSearchParams.keyword) || "",
      [SearchArticlesFormFields.fromDate]:
        searchParams.get(PageSearchParams.fromDate) || "",
      [SearchArticlesFormFields.toDate]:
        searchParams.get(PageSearchParams.toDate) || "",
      [SearchArticlesFormFields.newsSource]:
        searchParams.get(PageSearchParams.newsSource) || "",
      [SearchArticlesFormFields.category]:
        searchParams.get(PageSearchParams.category) || "",
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
      params.set(PageSearchParams.keyword, keyword);
    } else params.delete(PageSearchParams.keyword);

    if (fromDate) {
      params.set(PageSearchParams.fromDate, fromDate);
    } else params.delete(PageSearchParams.fromDate);

    if (toDate) {
      params.set(PageSearchParams.toDate, toDate);
    } else params.delete(PageSearchParams.toDate);

    if (newsSource) {
      params.set(PageSearchParams.newsSource, newsSource);
    } else params.delete(PageSearchParams.newsSource);

    if (category) {
      params.set(PageSearchParams.category, category);
    } else params.delete(PageSearchParams.category);

    params.set(PageSearchParams.page, `${DEFAULT_PAGE}`);

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
