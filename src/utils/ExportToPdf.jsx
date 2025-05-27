import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const exportToPDF = (data, title) => {
  const doc = new jsPDF();

  // Título
  doc.setFontSize(16);
  doc.setTextColor(91, 33, 182);
  doc.text(` Lista de ${title}`, 14, 15);

  // Definimos las columnas y armamos las filas
  const columns = ['Nombre', 'Color', 'Edad', 'Poder'];
  const tableRows = data.map(unicornio => [
    unicornio.name,
    unicornio.data.color,
    unicornio.data.age,
    unicornio.data.power
  ]);

  autoTable(doc, {
    head: [columns],
    body: tableRows,
    startY: 25,
    styles: {
      fontSize: 11,
      textColor: [40, 40, 40],
      halign: 'center',
      valign: 'middle',
      lineColor: [220, 220, 220],
      lineWidth: 0.1,
    },
    headStyles: {
      fillColor: [244, 143, 177], // rosa claro
      textColor: 255,
      fontStyle: 'bold',
    },
    alternateRowStyles: {
      fillColor: [255, 245, 248]
    },
    margin: { top: 25 }
  });

  // Pie de página
  const fecha = new Date().toLocaleDateString();
  doc.setFontSize(10);
  doc.setTextColor(150);
  doc.text(`Generado el ${fecha}`, 14, doc.internal.pageSize.height - 10);

  doc.save(`${title}.pdf`);
};
