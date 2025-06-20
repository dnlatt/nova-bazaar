import MarketplaceContent from '@/components/marketplace/MarketplaceContent';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

const MarketplacePage = () => {
  return (
    <main className='max-container'>
        <Header />
            <MarketplaceContent />
        <Footer />
    </main>
  );
};

export default MarketplacePage;