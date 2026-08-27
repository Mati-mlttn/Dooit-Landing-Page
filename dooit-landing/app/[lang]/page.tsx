import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LandingPage } from "../page";
import { getDictionary, isLocale, locales } from "@/lib/i18n";

type LocalizedPageProps = {
  params: Promise<{ lang: string }>;
};

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: LocalizedPageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};

  return getDictionary(lang).metadata;
}

export default async function LocalizedHome({ params }: LocalizedPageProps) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return <LandingPage dictionary={getDictionary(lang)} />;
}
