import Image from "next/image";

const ArticleCard = () => {
  return (
    <article className="overflow-hidden rounded-lg bg-white shadow-md">
      <Image
        src="/placeholder.svg?height=200&width=400"
        alt="Article image"
        className="h-48 w-full object-cover"
        width={200}
        height={200}
      />
      <div className="p-4">
        <span className="text-sm font-semibold text-blue-600">Technology</span>
        <h4 className="my-2 text-lg font-semibold">
          Latest Advancements in AI Technology
        </h4>
        <p className="mb-4 text-sm text-gray-600">
          Artificial Intelligence continues to evolve, promising groundbreaking
          applications across various industries.
        </p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">TechNews</span>
          <a href="#" className="text-sm text-blue-500 hover:underline">
            Read More
          </a>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;
