import { Button } from './ui/button';
import Spinner from './ui/Spinner';
import useLoading from '../hooks/useLoading';
import { downloadBrandedPDF, previewBrandedPDF } from '../utils/downloadBrandedPDF';
import { downloadAllProductsPDF } from '../utils/downloadAllProductsPDF';
import useFavorites from '../hooks/useFavorites';
import { Card, CardContent } from './ui/card';

export default function FavoritesPage() {
  const { favorites, toggleFavorite } = useFavorites();

  const previewLoading = useLoading();
  const downloadLoading = useLoading();
  const exportAllLoading = useLoading();

  const handlePreview = async () => {
    if (favorites.length === 0) return alert('No favorites to preview');
    previewLoading.startLoading();
    previewBrandedPDF(favorites);
    setTimeout(previewLoading.stopLoading, 300); // slight delay for UX
  };

  const handleDownload = async () => {
    if (favorites.length === 0) return alert('No favorites to export');
    downloadLoading.startLoading();
    downloadBrandedPDF(favorites);
    setTimeout(downloadLoading.stopLoading, 300);
  };

  const handleExportAll = async () => {
    exportAllLoading.startLoading();
    downloadAllProductsPDF();
    setTimeout(exportAllLoading.stopLoading, 500);
  };

  return (
    <div className="p-6">
      <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
        <h1 className="text-2xl font-bold">Favorites</h1>
        <div className="flex gap-4 flex-wrap items-center">
          <div className="flex items-center gap-2">
            <Button onClick={handlePreview} disabled={previewLoading.isLoading} className="bg-gray-600 hover:bg-gray-700">
              Preview PDF
            </Button>
            {previewLoading.isLoading && (
              <div className="flex items-center gap-2 text-[#C00000] animate-fade-in">
                <Spinner /> <span>Generating…</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button onClick={handleDownload} disabled={downloadLoading.isLoading} className="bg-red-600 hover:bg-red-700">
              Download PDF
            </Button>
            {downloadLoading.isLoading && (
              <div className="flex items-center gap-2 text-[#C00000] animate-fade-in">
                <Spinner /> <span>Generating…</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button onClick={handleExportAll} disabled={exportAllLoading.isLoading} className="bg-black hover:bg-gray-900">
              Export All Categories
            </Button>
            {exportAllLoading.isLoading && (
              <div className="flex items-center gap-2 text-[#C00000] animate-fade-in">
                <Spinner /> <span>Generating…</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {favorites.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">No favorites yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.map((item, idx) => (
            <Card key={idx} className="p-4 shadow-sm dark:bg-gray-800 relative">
              <CardContent>
                <button
                  onClick={() => toggleFavorite(item)}
                  className="absolute top-2 right-2 text-yellow-400 hover:text-yellow-500 text-xl"
                >
                  ★
                </button>
                <h2 className="font-semibold mb-2">{item.name}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-300">{item.category}</p>
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                  View Technical Data
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}