"use client";

import React, { useEffect, useMemo, useRef } from "react";
import Select from "react-select";

import wilayas from "@/data/algeria-wilayas.json";
import communesFr from "@/data/algeria-communes-fr.json";
import communesAr from "@/data/algeria-communes-ar.json";

type Wilaya = {
  code: string;
  nameFr: string;
  nameAr: string;
  center: number[];
  bounds: number[][];
};

type CountryLikeLocation = {
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
};

const DZ_LOCATION_BASE = {
  value: "DZ",
  label: "Algeria",
  flag: "🇩🇿",
} as const;

const AlgeriaLocationSelect = ({
  wilayaCode,
  municipality,
  onChange,
  language = "fr",
}: {
  wilayaCode?: string | null;
  municipality?: string | null;
  onChange: (name: string, val: any) => void;
  language?: "fr" | "ar";
}) => {
  const wilayaRef = useRef<any>(null);

  useEffect(() => {
    const timer = setTimeout(() => wilayaRef.current?.focus(), 250);
    return () => clearTimeout(timer);
  }, []);

  const wilayaOptions = useMemo(() => wilayas as unknown as Wilaya[], []);

  const selectedWilaya = useMemo(() => {
    if (!wilayaCode) return null;
    return wilayaOptions.find((w) => w.code === wilayaCode) ?? null;
  }, [wilayaCode, wilayaOptions]);

  const communeOptions = useMemo(() => {
    if (!selectedWilaya) return [];
    const map = (
      language === "ar"
        ? (communesAr as Record<string, string[]>)
        : (communesFr as Record<string, string[]>)
    ) as Record<string, string[]>;

    const items = map[selectedWilaya.code] ?? [];
    return items.map((name) => ({ value: name, label: name }));
  }, [selectedWilaya, language]);

  const selectedCommune = useMemo(() => {
    if (!municipality) return null;
    return { value: municipality, label: municipality };
  }, [municipality]);

  const formatWilayaLabel = (w: Wilaya) => {
    const primary = language === "ar" ? w.nameAr : w.nameFr;
    const secondary = language === "ar" ? w.nameFr : w.nameAr;
    return (
      <div className="flex flex-col">
        <span className="text-[14px]">{primary}</span>
        <span className="text-[12px] text-neutral-500">{secondary}</span>
      </div>
    );
  };

  const wilayaSelectOptions = useMemo(
    () =>
      wilayaOptions.map((w) => ({
        value: w.code,
        label: language === "ar" ? w.nameAr : w.nameFr,
        wilaya: w,
      })),
    [wilayaOptions, language],
  );

  const selectedWilayaOption = useMemo(() => {
    if (!selectedWilaya) return null;
    return {
      value: selectedWilaya.code,
      label: language === "ar" ? selectedWilaya.nameAr : selectedWilaya.nameFr,
      wilaya: selectedWilaya,
    };
  }, [selectedWilaya, language]);

  const handleWilayaChange = (opt: any) => {
    if (!opt?.wilaya) {
      onChange("wilayaCode", "");
      onChange("municipality", "");
      onChange("location", null);
      return;
    }

    const w: Wilaya = opt.wilaya;
    onChange("wilayaCode", w.code);
    onChange("municipality", "");

    const location: CountryLikeLocation = {
      ...DZ_LOCATION_BASE,
      region: language === "ar" ? w.nameAr : w.nameFr,
      latlng: w.center,
    };
    onChange("location", location);
  };

  const handleCommuneChange = (opt: any) => {
    onChange("municipality", opt?.value ?? "");
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className="text-[14px] font-medium text-neutral-700">
          Wilaya
        </label>
        <Select
          ref={wilayaRef}
          placeholder="Select a wilaya"
          isClearable
          options={wilayaSelectOptions}
          value={selectedWilayaOption}
          onChange={handleWilayaChange}
          formatOptionLabel={(opt: any) => formatWilayaLabel(opt.wilaya)}
          classNames={{
            control: () => "p-[6px] text-[14px] border-1",
            input: () => "text-[14px]",
            option: () => "text-[14px]",
          }}
          theme={(theme) => ({
            ...theme,
            borderRadius: 6,
            colors: {
              ...theme.colors,
              primary: "black",
              primary25: "#ffe4e6",
            },
          })}
        />
      </div>

      <div>
        <label className="text-[14px] font-medium text-neutral-700">
          Municipality (Commune)
        </label>
        <Select
          placeholder={
            selectedWilaya ? "Select a commune" : "Select wilaya first"
          }
          isDisabled={!selectedWilaya}
          isClearable
          options={communeOptions}
          value={selectedCommune}
          onChange={handleCommuneChange}
          classNames={{
            control: () => "p-[6px] text-[14px] border-1",
            input: () => "text-[14px]",
            option: () => "text-[14px]",
          }}
          theme={(theme) => ({
            ...theme,
            borderRadius: 6,
            colors: {
              ...theme.colors,
              primary: "black",
              primary25: "#ffe4e6",
            },
          })}
        />
      </div>
    </div>
  );
};

export default AlgeriaLocationSelect;
