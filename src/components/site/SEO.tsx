import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { productCategories } from "@/components/site/data";

const SITE_URL = "https://chemfix.org";
const SITE_NAME = "CHEMfix Construction Chemicals";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.svg`;

const pages: Record<string, { title: string; description: string; type?: string }> = {
  "/": {
    title: "CHEMfix Construction Chemicals | Waterproofing, Flooring & Concrete Repair",
    description:
      "CHEMfix supplies high-performance construction chemicals for waterproofing, concrete repair, industrial flooring, sealants, grouts, coatings and road safety systems.",
    type: "website",
  },
  "/about": {
    title: "About CHEMfix | Construction Chemical Specialists",
    description:
      "Learn about CHEMfix, a UK-owned construction chemicals company supporting projects in Pakistan, Nigeria and international markets since 2005.",
  },
  "/services": {
    title: "Technical Services | CHEMfix Construction Chemicals",
    description:
      "Get specification support, waterproofing consultation, concrete repair guidance, flooring system design, coating support and technical site assistance.",
  },
  "/contact": {
    title: "Contact CHEMfix | Construction Chemical Product Support",
    description:
      "Contact CHEMfix for product datasheets, project specifications, technical consultation and construction chemical support in Pakistan, UK and Nigeria.",
  },
};

function upsertMeta(selector: string, attrs: Record<string, string>) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }

  Object.entries(attrs).forEach(([key, value]) => element?.setAttribute(key, value));
}

function upsertLink(rel: string, href: string) {
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement("link");
    element.rel = rel;
    document.head.appendChild(element);
  }
  element.href = href;
}

function upsertJsonLd(id: string, data: unknown) {
  let element = document.getElementById(id) as HTMLScriptElement | null;
  if (!element) {
    element = document.createElement("script");
    element.id = id;
    element.type = "application/ld+json";
    document.head.appendChild(element);
  }
  element.textContent = JSON.stringify(data);
}

export function SEO() {
  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname === "/products" ? "/" : location.pathname;
    const page = pages[pathname] || pages["/"];
    const canonical = `${SITE_URL}${pathname === "/" ? "" : pathname}`;

    document.title = page.title;
    upsertLink("canonical", canonical);

    upsertMeta('meta[name="description"]', { name: "description", content: page.description });
    upsertMeta('meta[name="robots"]', { name: "robots", content: "index, follow, max-image-preview:large" });
    upsertMeta('meta[property="og:site_name"]', { property: "og:site_name", content: SITE_NAME });
    upsertMeta('meta[property="og:title"]', { property: "og:title", content: page.title });
    upsertMeta('meta[property="og:description"]', { property: "og:description", content: page.description });
    upsertMeta('meta[property="og:type"]', { property: "og:type", content: page.type || "article" });
    upsertMeta('meta[property="og:url"]', { property: "og:url", content: canonical });
    upsertMeta('meta[property="og:image"]', { property: "og:image", content: DEFAULT_IMAGE });
    upsertMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: page.title });
    upsertMeta('meta[name="twitter:description"]', { name: "twitter:description", content: page.description });
    upsertMeta('meta[name="twitter:image"]', { name: "twitter:image", content: DEFAULT_IMAGE });

    upsertJsonLd("chemfix-organization-schema", {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: DEFAULT_IMAGE,
      email: ["info@chemfix.org", "chemfix@outlook.com"],
      address: [
        { "@type": "PostalAddress", addressLocality: "Karachi", addressCountry: "PK" },
        { "@type": "PostalAddress", streetAddress: "82 Great Eastern Street", addressLocality: "London", postalCode: "EC2A 3JF", addressCountry: "GB" },
        { "@type": "PostalAddress", streetAddress: "3 Adegbola Street", addressLocality: "Ikeja Lagos", addressCountry: "NG" },
      ],
      sameAs: [
        "https://www.instagram.com/chemfixconstruction",
        "https://whatsapp.com/channel/0029VbArZ1l9Gv7Pz6PiOr1V",
      ],
    });

    upsertJsonLd("chemfix-website-schema", {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    });

    upsertJsonLd("chemfix-products-schema", {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "CHEMfix product categories",
      itemListElement: productCategories.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Product",
          name: product.title,
          description: product.description,
          brand: { "@type": "Brand", name: "CHEMfix" },
          category: "Construction Chemicals",
          url: `${SITE_URL}/#${product.slug}`,
        },
      })),
    });
  }, [location.pathname]);

  return null;
}
