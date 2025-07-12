import CustomerReviews from "./pages/CustomerReviews";
import FAQHelpCenter from "./pages/FAQHelpCenter";
import FeatureSection from "./pages/FeatureSection";
import Hero from "./pages/Hero";
import LatestCollection from "./pages/LatestCollection";
import ProductsHighlight from "./pages/ProductsHighlight";
import TrendingFurniture from "./pages/TrendingFurniture";

export default function Home() {
  return (
    <>
    <Hero />
    <FeatureSection />
    <ProductsHighlight />
    <LatestCollection />
    <TrendingFurniture />
    <CustomerReviews />
    <FAQHelpCenter />
    </>
  );
}
