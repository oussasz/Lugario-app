"use client";
import React, { useMemo, useState, useTransition } from "react";
import dynamic from "next/dynamic";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { BiDollar } from "react-icons/bi";

import Modal from "./Modal";
import Button from "../Button";
import SpinnerMini from "../Loader";
import Heading from "../Heading";
import Counter from "../inputs/Counter";
import Input from "../inputs/Input";
import CategoryButton from "../inputs/CategoryButton";
import AlgeriaLocationSelect from "../inputs/AlgeriaLocationSelect";
import ImageUpload from "../ImageUpload";
import FeatureSelect from "../inputs/FeatureSelect";

import {
  durationCategories,
  purposeCategories,
  featureCategories,
} from "@/utils/constants";
import { createListing } from "@/services/listing";

const steps: { [key: string]: string } = {
  "0": "duration",
  "1": "category",
  "2": "features",
  "3": "location",
  "4": "guestCount",
  "5": "image",
  "6": "title",
  "7": "price",
};

enum STEPS {
  DURATION = 0,
  PURPOSE = 1,
  FEATURES = 2,
  LOCATION = 3,
  INFO = 4,
  IMAGES = 5,
  DESCRIPTION = 6,
  PRICE = 7,
}

const RentModal = ({ onCloseModal }: { onCloseModal?: () => void }) => {
  const [step, setStep] = useState(STEPS.DURATION);
  const [isLoading, startTransition] = useTransition();
  const queryClient = useQueryClient();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
    getValues,
  } = useForm<FieldValues>({
    defaultValues: {
      duration: "",
      category: "",
      features: [] as string[],
      location: null,
      wilayaCode: "",
      municipality: "",
      address: "",
      guestCount: 1,
      bathroomCount: 1,
      roomCount: 1,
      image: "",
      price: "",
      title: "",
      description: "",
    },
  });

  const location = watch("location");
  const features = watch("features") || [];
  const wilayaCode = watch("wilayaCode");
  const municipality = watch("municipality");

  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    [],
  );

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const toggleFeature = (feature: string) => {
    const currentFeatures = getValues("features") || [];
    const newFeatures = currentFeatures.includes(feature)
      ? currentFeatures.filter((f: string) => f !== feature)
      : [...currentFeatures, feature];
    setCustomValue("features", newFeatures);
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) return onNext();

    startTransition(async () => {
      try {
        const newListing = await createListing(data);
        toast.success(`${data.title} added successfully!`);
        queryClient.invalidateQueries({
          queryKey: ["listings"],
        });
        reset();
        setStep(STEPS.DURATION);
        onCloseModal?.();
        router.refresh();
        router.push(`/listings/${newListing.id}`);
      } catch (error: any) {
        toast.error("Failed to create listing!");
        console.log(error?.message);
      }
    });
  };

  const body = () => {
    switch (step) {
      case STEPS.DURATION:
        return (
          <div className="flex flex-col gap-2">
            <Heading
              title="Rental Duration"
              subtitle="How long can guests rent your place?"
            />
            <div className="flex-1 grid grid-cols-2 gap-3 max-h-[60vh] lg:max-h-[260px] overflow-y-scroll scroll-smooth">
              {durationCategories.map((item) => (
                <CategoryButton
                  onClick={setCustomValue}
                  watch={watch}
                  label={item.label}
                  icon={item.icon}
                  key={item.label}
                  name="duration"
                />
              ))}
            </div>
          </div>
        );

      case STEPS.PURPOSE:
        return (
          <div className="flex flex-col gap-2">
            <Heading
              title="Who is your place for?"
              subtitle="Choose the main target audience"
            />
            <div className="flex-1 grid grid-cols-2 gap-3 max-h-[60vh] lg:max-h-[260px] overflow-y-scroll scroll-smooth">
              {purposeCategories.map((item) => (
                <CategoryButton
                  onClick={setCustomValue}
                  watch={watch}
                  label={item.label}
                  icon={item.icon}
                  key={item.label}
                  name="category"
                />
              ))}
            </div>
          </div>
        );

      case STEPS.FEATURES:
        return (
          <div className="flex flex-col gap-2">
            <Heading
              title="Property Features"
              subtitle="Select all features that apply (optional)"
            />
            <div className="flex-1 grid grid-cols-2 gap-2 max-h-[60vh] lg:max-h-[300px] overflow-y-scroll scroll-smooth">
              {featureCategories.map((item) => (
                <FeatureSelect
                  key={item.label}
                  label={item.label}
                  icon={item.icon}
                  selected={features.includes(item.label)}
                  onClick={toggleFeature}
                />
              ))}
            </div>
          </div>
        );

      case STEPS.LOCATION:
        return (
          <div className="flex flex-col gap-6">
            <Heading
              title="Where is your place located?"
              subtitle="Help guests find you!"
            />
            <AlgeriaLocationSelect
              wilayaCode={wilayaCode}
              municipality={municipality}
              onChange={setCustomValue}
            />

            <Input
              id="address"
              label="Address"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
              watch={watch}
            />
            <div className="h-[240px]">
              <Map center={location?.latlng} />
            </div>
          </div>
        );

      case STEPS.INFO:
        return (
          <div className="flex flex-col gap-6">
            <Heading
              title="Share some basics about your place"
              subtitle="What amenitis do you have?"
            />
            <Counter
              title="Guests"
              subtitle="How many guests do you allow?"
              watch={watch}
              onChange={setCustomValue}
              name="guestCount"
            />
            <hr />
            <Counter
              onChange={setCustomValue}
              watch={watch}
              title="Rooms"
              subtitle="How many rooms do you have?"
              name="roomCount"
            />
            <hr />
            <Counter
              onChange={setCustomValue}
              watch={watch}
              title="Bathrooms"
              subtitle="How many bathrooms do you have?"
              name="bathroomCount"
            />
          </div>
        );

      case STEPS.IMAGES:
        return (
          <div className="flex flex-col gap-6">
            <Heading
              title="Add a photo of your place"
              subtitle="Show guests what your place looks like!"
            />
            <ImageUpload
              onChange={setCustomValue}
              initialImage={getValues("image")}
            />
          </div>
        );

      case STEPS.DESCRIPTION:
        return (
          <div className="flex flex-col gap-6">
            <Heading
              title="How would you describe your place?"
              subtitle="Short and sweet works best!"
            />
            <Input
              id="title"
              label="Title"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
              watch={watch}
              autoFocus
            />
            <hr />
            <Input
              id="description"
              label="Description"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
              watch={watch}
            />
          </div>
        );

      case STEPS.PRICE:
        return (
          <div className="flex flex-col gap-6">
            <Heading
              title="Now, set your price"
              subtitle="How much do you charge?"
            />
            <Input
              key="price"
              id="price"
              label="Price (DZD)"
              icon={BiDollar}
              type="number"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
              watch={watch}
              autoFocus
            />
          </div>
        );

      default:
        return null;
    }
  };

  // Check if current step field is filled
  const isFieldFilled = () => {
    const stepField = steps[step];
    if (stepField === "features") return true; // Features are optional
    if (stepField === "guestCount") return true; // Has default value
    return !!getValues(stepField);
  };

  return (
    <div className="w-full h-full flex flex-col">
      <Modal.WindowHeader title="Share your home!" />
      <form
        className="flex-1 md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="relative p-6">{body()}</div>
        <div className="flex flex-col gap-2 px-6 pb-6 pt-3">
          {/* Step indicator */}
          <div className="flex justify-center gap-1 mb-2">
            {Object.keys(steps).map((_, index) => (
              <div
                key={index}
                className={`h-1 w-8 rounded-full transition ${
                  index <= step ? "bg-rose-500" : "bg-neutral-200"
                }`}
              />
            ))}
          </div>
          <div className="flex flex-row items-center gap-4 w-full">
            {step !== STEPS.DURATION ? (
              <Button
                type="button"
                className="flex items-center gap-2 justify-center"
                onClick={onBack}
                outline
              >
                Back
              </Button>
            ) : null}
            <Button
              type="submit"
              className="flex items-center gap-2 justify-center"
              disabled={isLoading || !isFieldFilled()}
            >
              {isLoading ? (
                <SpinnerMini />
              ) : step === STEPS.PRICE ? (
                "Create"
              ) : (
                "Next"
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RentModal;
