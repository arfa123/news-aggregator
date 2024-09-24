"use client";

import { useCallback } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { useRouter } from "next/navigation";

import Button from "@/components/ui/Button";
import Dropdown from "@/components/ui/Dropdown";
import Input from "@/components/ui/Input";
import { CATEGORIES_OPTIONS, NEWS_SOURCES_OPTIONS } from "@/lib/constants";
import { LocalStorageKeys, PersonalizedNewsFeedFormFields } from "@/lib/enums";
import { PersonalizedNewsFeedFormSchema } from "@/lib/schemas";
import { PersonalizedNewsFeed } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";

const PersonalizedNewsFeedForm = () => {
  const { replace } = useRouter();

  const getFormDefaultValues = useCallback(() => {
    const personalizedNewsFeedPreferences = localStorage.getItem(
      LocalStorageKeys.personalizedNewsFeedPreferences
    );
    let personalizedNewsFeed: PersonalizedNewsFeed =
      personalizedNewsFeedPreferences
        ? JSON.parse(personalizedNewsFeedPreferences)
        : {
            [PersonalizedNewsFeedFormFields.preferredNewsSources]: [],
            [PersonalizedNewsFeedFormFields.preferredCategories]: [],
            [PersonalizedNewsFeedFormFields.preferredAuthors]: "",
          };

    return {
      [PersonalizedNewsFeedFormFields.preferredNewsSources]:
        personalizedNewsFeed[
          PersonalizedNewsFeedFormFields.preferredNewsSources
        ] || [],
      [PersonalizedNewsFeedFormFields.preferredCategories]:
        personalizedNewsFeed[
          PersonalizedNewsFeedFormFields.preferredCategories
        ] || [],
      [PersonalizedNewsFeedFormFields.preferredAuthors]:
        personalizedNewsFeed[PersonalizedNewsFeedFormFields.preferredAuthors] ||
        "",
    };
  }, []);

  const personalizedNewsFeedForm = useForm({
    resolver: zodResolver(PersonalizedNewsFeedFormSchema),
    defaultValues: getFormDefaultValues(),
  });

  const { register, handleSubmit } = personalizedNewsFeedForm;

  const onSubmit = handleSubmit(
    (formData) => {
      localStorage.setItem(
        LocalStorageKeys.personalizedNewsFeedPreferences,
        JSON.stringify(formData)
      );
      replace("/feed");
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

        <Button type="submit">Save Preferences</Button>
      </form>
    </FormProvider>
  );
};

export default PersonalizedNewsFeedForm;
