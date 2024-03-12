// Home.tsx
import { Card, CardContent } from "@/components/ui/card";
import { simpleBlogCard } from "./lib/interface";
import { client, urlFor } from "./lib/sanity";
import Image from "next/image";
import { MdStars } from "react-icons/md";
import { formattedDate } from '@/app/components/dateUtils';
import Link from "next/link";

export const revalidate = 30;

async function getData() {
  const query = `
    *[_type == 'blog'] | order(_createdAt desc) {
      title,
      smallDescription,
      "currentSlug": slug.current,
      titleImage,
      publishedAt,
    }`;

  const data = await client.fetch(query);
  return data;
}

export default async function Home() {
  const data: simpleBlogCard[] = await getData();

  return (
    <div className="grid grid-cols-1 mx-auto sm:grid-cols-2 sm:max-w-2xl lg:grid-cols-3 mt-5 lg:max-w-5xl gap-5">
      {data.map((post, idx) => (
        <Card key={idx}>
          <Link href={`/blog/${post.currentSlug}`}>
            <Image
              src={urlFor(post.titleImage).url()}
              alt="image"
              width={500}
              height={500}
              className="rounded-t-lg h-[200px] object-cover"
            />
          </Link>

          <CardContent className="mt-4">
            <small className="text-primary font-semibold flex items-center mb-2"><MdStars className="mr-2"/> {formattedDate(post.publishedAt)} </small>
            <Link href={`/blog/${post.currentSlug}`} className="text-lg line-clamp-2 hover:text-green-700 font-bold">{post.title}</Link>
            <p className="line-clamp-3 text-sm mt-2 text-gray-600 dark:text-gray-300 mb-3">
              {post.smallDescription}
            </p>
            <Link className="font-semibold text-primary hover:text-green-700" href={`/blog/${post.currentSlug}`}>Read More</Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
