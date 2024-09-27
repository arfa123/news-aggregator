"use client";

import { useCallback, useTransition } from "react";
import { FormProvider, useForm } from "react-hook-form";

import Button from "@/components/ui/Button";
import Dropdown from "@/components/ui/Dropdown";
import Input from "@/components/ui/Input";
import { CATEGORIES_OPTIONS, NEWS_SOURCES_OPTIONS } from "@/config/constants";
import { PersonalizedNewsFeedFormSchema } from "@/lib/schemas";
import { setPersonalizedFeedPrefrences } from "@/services/feedService";
import {
  PageSearchParams,
  PersonalizedNewsFeedFormFields,
} from "@/types/enums";
import { zodResolver } from "@hookform/resolvers/zod";

const PersonalizedNewsFeedForm = ({
  personalizedNewsFeedPreferences,
}: {
  personalizedNewsFeedPreferences?: string;
}) => {
  const [isPending, startTransition] = useTransition();

  const getFormDefaultValues = useCallback(() => {
    const params = new URLSearchParams(personalizedNewsFeedPreferences || "");

    const preferredNewsSources = params.get(PageSearchParams.newsSource);
    const preferredCategories = params.get(PageSearchParams.category);
    const preferredAuthors = params.get(PageSearchParams.authors);

    return {
      [PersonalizedNewsFeedFormFields.preferredNewsSources]:
        preferredNewsSources ? preferredNewsSources.split(",") : [],
      [PersonalizedNewsFeedFormFields.preferredCategories]: preferredCategories
        ? preferredCategories.split(",")
        : [],
      [PersonalizedNewsFeedFormFields.preferredAuthors]: preferredAuthors || "",
    };
  }, [personalizedNewsFeedPreferences]);

  const personalizedNewsFeedForm = useForm({
    resolver: zodResolver(PersonalizedNewsFeedFormSchema),
    defaultValues: getFormDefaultValues(),
  });

  const { register, handleSubmit } = personalizedNewsFeedForm;

  const onSubmit = handleSubmit(
    (formData) => {
      startTransition(() => {
        const params = new URLSearchParams("");

        const preferredNewsSources =
          formData[PersonalizedNewsFeedFormFields.preferredNewsSources];
        const preferredCategories =
          formData[PersonalizedNewsFeedFormFields.preferredCategories];
        const preferredAuthors =
          formData[PersonalizedNewsFeedFormFields.preferredAuthors];

        if (preferredNewsSources?.length > 0) {
          params.set(
            PageSearchParams.newsSource,
            preferredNewsSources.join(",")
          );
        }

        if (preferredCategories?.length > 0) {
          params.set(PageSearchParams.category, preferredCategories.join(","));
        }

        if (preferredAuthors) {
          params.set(PageSearchParams.authors, preferredAuthors);
        }

        setPersonalizedFeedPrefrences(params.toString());
      });
    },
    (error) => console.error(error)
  );

  return (
    <FormProvider {...personalizedNewsFeedForm}>
      <form
        onSubmit={onSubmit}
        className="rounded-lg bg-white p-6 shadow-md md:p-8"
      >
        <div className="mb-8">
          <h3 className="mb-4 text-xl font-semibold">Preferred Sources</h3>
          <div className="relative">
            <Dropdown
              {...register(PersonalizedNewsFeedFormFields.preferredNewsSources)}
              multiple
              label="Preferred Sources"
              options={NEWS_SOURCES_OPTIONS}
            />
          </div>
          <p className="mt-2 text-sm text-gray-600">
            Hold Ctrl (Windows) or Cmd (Mac) to select multiple options
          </p>
        </div>

        <div className="mb-8">
          <h3 className="mb-4 text-xl font-semibold">Preferred Categories</h3>
          <div className="relative">
            <Dropdown
              {...register(PersonalizedNewsFeedFormFields.preferredCategories)}
              multiple
              label="Preferred Categories"
              options={CATEGORIES_OPTIONS}
            />
          </div>
          <p className="mt-2 text-sm text-gray-600">
            Hold Ctrl (Windows) or Cmd (Mac) to select multiple options
          </p>
        </div>

        <div className="mb-8">
          <h3 className="mb-4 text-xl font-semibold">Preferred Authors</h3>
          <div className="grid grid-cols-1 gap-4">
            <Input
              {...register(PersonalizedNewsFeedFormFields.preferredAuthors)}
              type="text"
              label="Preferred Authors"
              placeholder="Enter author names (comma-separated)"
            />
          </div>
        </div>

        <Button type="submit" loading={isPending}>
          Save Preferences
        </Button>
      </form>
    </FormProvider>
  );
};

export default PersonalizedNewsFeedForm;
