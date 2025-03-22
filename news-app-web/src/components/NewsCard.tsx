import { IArticle } from "@/types/News";
import {
  Card,
  CardContent,
  CardDescription,
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
    <Card className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="p-2 border-b">
        <CardTitle className="text-xl font-semibold text-gray-900">
          {data.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        {data.urlToImage && (
          <div className="relative w-full h-64 rounded-lg overflow-hidden">
            <Image
              src={data.urlToImage}
              alt={data.title}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        )}
        <p className="text-sm text-gray-600 mt-1">{data.description}</p>
      </CardContent>
      <CardFooter className="p-4 border-t"></CardFooter>
    </Card>
  );
};

export default NewsCard;
