import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeading } from "@/components/site/SectionHeading";
import { productCategories } from "@/components/site/data";

import heroImg from "@/assessts/products.png";
import gPlant from "@/assessts/g-plant.png";
import gDrum from "@/assessts/g-drum.png";
import gApp from "@/assessts/g-application.png";
import gWaterproof from "@/assessts/waterproofing.png";
import gCoating from "@/assessts/p-coating.png";
import gFlooring from "@/assessts/p-floaring.png";

type ProductCardData = {
  id?: string;
  slug?: string;
  title: string;
  description: string;
  image?: string;
  imageUrl?: string;
};

const API_URL = (import.meta.env.VITE_API_URL || "https://api.chemfix.org/api").replace(/\/$/, "");

const gallery = [
  { src: gDrum, alt: "Industrial chemical drum", span: "sm:row-span-2" },
  { src: gPlant, alt: "Manufacturing plant", span: "" },
  { src: gCoating, alt: "Industrial coatings", span: "" },
  { src: gApp, alt: "Construction application", span: "sm:row-span-2" },
  { src: gWaterproof, alt: "Waterproofing systems", span: "md:row-span-2" },
  { src: gFlooring, alt: "Industrial flooring", span: "" },
];

export default function HomePage() {
  const [uploadedProducts, setUploadedProducts] = useState<ProductCardData[]>([]);

  useEffect(() => {
    const controller = new AbortController();

    fetch(`${API_URL}/products`, { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : []))
      .then((products) => {
        if (Array.isArray(products)) {
          setUploadedProducts(products);
        }
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          setUploadedProducts([]);
        }
      });

    return () => controller.abort();
  }, []);

  const products = useMemo<ProductCardData[]>(
    () => [...uploadedProducts, ...productCategories],
    [uploadedProducts],
  );

  return (
    <>
      <PageHero
        image={heroImg}
        eyebrow="Product Range"
        title={<>High Performance<br/>Construction Products</>}
        subtitle="Explore CHEMfix's comprehensive line of construction chemicals — engineered for durability, safety and long-term protection."
      />

      {/* Product Categories — white */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-px">
          <SectionHeading
            eyebrow="Categories"
            title="Engineered systems for every application"
            description="Each product family is formulated for specific performance demands — from heavy industrial floors to high-rise waterproofing envelopes."
          />

          <div className="mt-10 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
            {products.map((p, i) => (
              <motion.article
                key={p.id || p.slug || p.title}
                id={p.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: (i % 3) * 0.08 }}
                className="group relative overflow-hidden rounded-2xl border border-[#D9D9D9] bg-white hover:border-[#7B2C91]/50 transition-all card-shadow hover:card-shadow-hover"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={p.imageUrl || p.image}
                    alt={p.title}
                    loading={i < 4 ? "eager" : "lazy"}
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-[900ms] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#5B0E6E]/0 to-[#5B0E6E]/0 group-hover:from-[#5B0E6E]/20 group-hover:to-transparent transition-all duration-500" />
                  <div className="absolute top-4 left-4 text-[10px] tracking-[0.25em] uppercase text-white/90 font-semibold bg-[#5B0E6E]/70 backdrop-blur-sm rounded-full px-2.5 py-1">
                    0{i + 1}
                  </div>
                </div>
                <div className="p-7">
                  <h3 className="font-display text-xl font-semibold mb-3 text-[#2F2F33] group-hover:text-[#5B0E6E] transition">{p.title}</h3>
                  <p className="text-sm text-[#6B6B72] leading-relaxed mb-5">{p.description}</p>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-[#7B2C91] hover:gap-2.5 transition-all"
                  >
                    Request Datasheet <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery — light grey */}
      <section className="py-16 md:py-24 bg-[#F5F5F7]">
        <div className="container-px">
          <SectionHeading
            eyebrow="Gallery"
            title="Inside CHEMfix"
            description="Manufacturing, formulation and field application — a glimpse into the work behind every CHEMfix system."
            align="center"
          />

          <div className="mt-10 md:mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 xl:gap-6 auto-rows-[200px] md:auto-rows-[240px] xl:auto-rows-[300px]">
            {gallery.map((g, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.06 }}
                className={`group relative overflow-hidden rounded-2xl border border-[#D9D9D9] card-shadow ${g.span}`}
              >
                <img
                  src={g.src}
                  alt={g.alt}
                  loading={i < 2 ? "eager" : "lazy"}
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[900ms] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-[#5B0E6E]/0 group-hover:bg-[#5B0E6E]/20 mix-blend-multiply transition-all duration-500" />
                <div className="absolute bottom-4 left-4 text-xs tracking-[0.2em] uppercase text-white font-medium opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all">
                  {g.alt}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
