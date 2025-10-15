import jsPDF from 'jspdf';

function generateBrandedPDF(favorites) {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  let yOffset = 80;
  let pageNumber = 1;

  const addHeader = () => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('Primrose House of Custom Lubricants and Fuel Enhancements', 40, 40, { maxWidth: 500 });

    // Black/Red accent bar
    doc.setFillColor(0, 0, 0);
    doc.rect(40, 50, 200, 4, 'F');
    doc.setFillColor(200, 0, 0);
    doc.rect(40, 54, 100, 2, 'F');

    // Page number (top right)
    doc.setFontSize(10);
    doc.text(`Page ${pageNumber}`, 520, 40);

    yOffset = 80;
  };

  addHeader();

  favorites.forEach((item) => {
    if (yOffset > 750) {
      pageNumber++;
      doc.addPage();
      addHeader();
    }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text(`⭐ ${item.name}`, 40, yOffset);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(`Category: ${item.category}`, 40, yOffset + 14);

    doc.setTextColor(0, 102, 204);
    doc.textWithLink('Technical Data', 40, yOffset + 28, { url: item.link });
    doc.setTextColor(0, 0, 0);

    yOffset += 50;
  });

  return doc;
}

export function downloadBrandedPDF(favorites) {
  const doc = generateBrandedPDF(favorites);
  doc.save('Primrose_Favorites.pdf');
}

export function previewBrandedPDF(favorites) {
  const doc = generateBrandedPDF(favorites);
  const blobUrl = doc.output('bloburl');
  window.open(blobUrl, '_blank');
}