import { Skeleton } from "~/components/ui/skeleton";
import { env } from "~/env";

const GoogleMapEmbed = ({ address }: { address: string }) => {
  if (!address) {
    return <Skeleton className="h-64 rounded-xl" />;
  }

  return (
    <iframe
      className="h-64 rounded-xl"
      width="100%"
      height="400"
      src={`https://www.google.com/maps/embed/v1/place?q=${encodeURIComponent(address)}&key=${env.NEXT_PUBLIC_GOOGLE_MAP_API}`}
      allowFullScreen
      loading="lazy"
    ></iframe>
  );
};

export { GoogleMapEmbed };
