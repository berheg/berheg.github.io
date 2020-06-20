function generatePdf() {   
   
    const button = document.querySelector('button.btn');
    button.addEventListener('click', clickEventHandler) 
}
generatePdf();
async function clickEventHandler() {
    const pdfSection = document.querySelector('div.pdf-section');
    const doc = new jsPDF('p','pt','a4'); 
    
        await doc.addHTML(pdfSection[1],function() {
            setTimeout(() => {
                doc.save('generatedPdf.pdf')
            }, 500);
           });
             
}