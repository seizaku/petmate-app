import { env } from "~/env";

const GoogleMapEmbed = ({ address }: { address: string }) => {
  return (
    <iframe
      className="h-64 rounded-xl"
      width="100%"
      height="400"
      src={`https://www.google.com/maps/embed/v1/place?q=${encodeURIComponent(address)}&key=${env.NEXT_PUBLIC_GOOGLE_API}`}
      allowFullScreen
      loading="lazy"
    ></iframe>
  );
};

export { GoogleMapEmbed };
