const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const generarDiploma = (nombreVoluntario, nombreActividad, nombreOrganizacion) => {

    const doc = new PDFDocument({ size: [842, 595] }); 

    const nombreArchivo = `${nombreVoluntario}_diploma.pdf`;
    const rutaArchivo = path.join(__dirname, 'diplomas', nombreArchivo);

    doc.pipe(fs.createWriteStream(rutaArchivo));

    doc.image('./fondo.jpg', 0, 0, { width: 842, height: 595, align: 'center', valign: 'center' }); 

    doc.moveDown(7); 

    doc.fontSize(25)
       .fillColor('#4a4a4a')
       .text('Certificado de Participación', { align: 'center', underline: true })
       .moveDown(0.5);

    doc.fillColor('#333')
       .fontSize(20)
       .text(`La organización ${nombreOrganizacion} certifica que`, { align: 'center' })
       .moveDown(0.5);

    doc.fontSize(30)
       .text(nombreVoluntario, { align: 'center', italics: true })
       .moveDown(0.5);

    doc.fontSize(20)
       .text(`ha participado activamente en la actividad:`, { align: 'center' })
       .moveDown(0.5);

    doc.fontSize(25)
       .text(nombreActividad, { align: 'center', underline: true })
       .moveDown(0.5);

    doc.fontSize(15)
       .fillColor('#777')
       .text(`Fecha: ${new Date().toLocaleDateString()}`, { align: 'center' });

    doc.end();

    return rutaArchivo;
};

module.exports = { generarDiploma };
