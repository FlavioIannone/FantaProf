import AmazonAdFooterRow from "@/components/client/Ads/AmazonAdFooterRow";
import { advertisementsList } from "@/lib/types";

export default function AmazonAdsFooter() {
  // Funzione per ottenere n elementi casuali da un array
  const getRandomAds = (arr: typeof advertisementsList, n: number) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
  };

  const randomAds = getRandomAds(advertisementsList, 3);

  return (
    <div className="w-full border-t border-base-300 p-4 flex justify-center items-center gap-4 bg-base-100">
      {randomAds.map((ad, index) => (
        <AmazonAdFooterRow key={index} />
      ))}
    </div>
  );
}
