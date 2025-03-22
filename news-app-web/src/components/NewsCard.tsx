import { IArticle } from "@/types/News";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

type Props = {
  data: IArticle;
};

const NewsCard = ({ data }: Props) => {
  return (
    <Card className="w-full max-w-lg mx-auto bg-white shadow-xl rounded-lg overflow-hidden flex flex-col min-h-[350px] p-0">
      {/* Image Section */}
      <div className="relative w-full h-48 md:h-64 ">
        {data.urlToImage ? (
          <Image
            src={data.urlToImage}
            alt={data.title}
            width={500}
            height={300}
            sizes="(max-width: 768px) 100vw, 500px"
            className="rounded-t-lg object-cover"
          />
        ) : (
          <div className="bg-amber-400 h-full text-center">
            {data.source.name}{" "}
          </div>
        )}
      </div>

      {/* Card Header (Title) */}
      <CardHeader className="p-4 border-b">
        <CardTitle className="text-xl font-semibold text-gray-900 line-clamp-2">
          {data.title}
        </CardTitle>
      </CardHeader>

      {/* Card Content (Description) */}
      <CardContent className="p-4 space-y-3 flex-grow">
        <p className="text-sm text-gray-600 line-clamp-3">{data.description}</p>
      </CardContent>

      {/* Card Footer */}
      <CardFooter className="p-4 border-t text-right">
        <a
          href={data.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
        >
          Read more
        </a>
      </CardFooter>
    </Card>
  );
};

export default NewsCard;
