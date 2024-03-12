import { fullBlog } from "@/app/lib/interface";
import { client, urlFor } from "@/app/lib/sanity";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';


export const revalidate = 30; 


async function getData(slug: string) {
  const query = `
    *[_type == "blog" && slug.current == '${slug}'] {
        "currentSlug": slug.current,
          title,
          content,
          titleImage,
          publishedAt,
      }[0]`;

  const data = await client.fetch(query);
  return data;
}

export default async function BlogArticle({
  params,
}: {
  params: { slug: string };
}) {
  
  const data: fullBlog = await getData(params.slug);

  // Format the date using local time
 const formattedDate = new Date(data.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });




  return (
    <div className="mt-8 max-w-3xl mx-auto mb-20">
      <h1>
      <span className="mt-2 block text-3xl text-center leading-10 font-bold tracking-tight sm:text-4xl ">
          {data.title}
        </span>
        <p className="block text-base text-center text-gray-600 font-semibold tracking-wide mt-7">
          By: Tahmid Safiq - <span className="text-primary">{formattedDate}</span>
        </p>
        <span className="flex items-center justify-center mt-5 gap-3">
        <Link legacyBehavior href="https://twitter.com/tahmidsafiq">
    <a target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-green-500">
      <FaTwitter className="w-6 h-6" />
    </a>
  </Link>
  <Link legacyBehavior href="https://facebook.com/tahmidsafiq">
    <a target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-green-500">
      <FaFacebook className="w-6 h-6" />
    </a>
  </Link>
  <Link legacyBehavior href="https://instagram.com/tahmidsafiq">
    <a target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-green-500">
      <FaInstagram className="w-6 h-6" />
    </a>
  </Link>
        </span>
      </h1>

      <Image
        src={urlFor(data.titleImage).url()}
        width={800}
        height={800}
        alt="Title Image"
        priority
        className="rounded-lg mt-8 border"
      />

      <div className="mt-8 prose prose-green prose-lg dark:prose-invert prose-li:marker:text-primary prose-a:text-primary">
        <PortableText value={data.content} />
      </div>
    </div>
  );
}
