import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const exportToPDF = (data, title, columns) => {
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.setTextColor(40, 40, 40);
  doc.text(`Lista de ${title}`, 14, 15);

  const tableRows = data.map(item => columns.map(col => item[col]));

  autoTable(doc, {
    head: [columns],
    body: tableRows,
    startY: 25,
    styles: { fontSize: 10, textColor: 33 },
    headStyles: { fillColor: [51, 134, 255], textColor: 255 },
    alternateRowStyles: { fillColor: [245, 245, 245] },
    margin: { left: 14, right: 14 }
  });

  const pageHeight = doc.internal.pageSize.height;
  const footerY = pageHeight - 15;

  doc.setFontSize(9);
  doc.setTextColor(150);

  doc.text(`Generado el ${new Date().toLocaleDateString()}`, 14, footerY);
  doc.text("Santiago Baez", 14, footerY + 5);

  doc.save(`${title}.pdf`);
};
