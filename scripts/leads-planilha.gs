/**
 * Salva os pedidos de orçamento do site numa planilha Google.
 * Este arquivo não roda no site: ele é colado no Google Apps Script.
 *
 * PASSO A PASSO (uma vez só)
 *  1. Crie uma planilha em sheets.google.com (ex.: "Pedidos do site").
 *  2. Na planilha: Extensões → Apps Script.
 *  3. Apague o código que aparece e cole este arquivo inteiro. Salve (Ctrl+S).
 *  4. Implantar → Nova implantação → engrenagem → "App da Web".
 *       Executar como: Eu
 *       Quem pode acessar: Qualquer pessoa
 *     Clique em Implantar e autorize com a sua conta Google.
 *  5. Copie a "URL do app da Web" (termina em /exec) e cole em
 *     data/content.ts → leadForm.endpoint.
 *
 * Se editar este código depois: Implantar → Gerenciar implantações → lápis →
 * Versão: "Nova versão" → Implantar. Assim a URL continua a mesma.
 */

const ABA = 'Pedidos';
/** Manda um e-mail para você a cada pedido novo. Troque para false se não quiser. */
const AVISAR_POR_EMAIL = true;

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000); // dois pedidos ao mesmo tempo não sobrescrevem a mesma linha
  try {
    const lead = JSON.parse(e.postData.contents);
    const planilha = SpreadsheetApp.getActiveSpreadsheet();
    const aba = planilha.getSheetByName(ABA) || planilha.insertSheet(ABA);
    if (aba.getLastRow() === 0) {
      aba.appendRow(['Data', 'Nome', 'WhatsApp', 'Tipo de site', 'Página']);
      aba.setFrozenRows(1);
    }
    const linha = [lead.nome, lead.whatsapp, lead.tipo, lead.pagina].map(limpar);
    aba.appendRow([new Date()].concat(linha));

    if (AVISAR_POR_EMAIL) {
      MailApp.sendEmail(
        Session.getEffectiveUser().getEmail(),
        'Novo pedido de orçamento: ' + linha[0],
        'Nome: ' + linha[0] + '\nWhatsApp: ' + linha[1] + '\nTipo de site: ' + linha[2] +
          '\n\nPlanilha: ' + planilha.getUrl(),
      );
    }
    return ContentService.createTextOutput('ok');
  } finally {
    lock.releaseLock();
  }
}

/** Corta textos longos e impede que algo começando com = + - @ vire fórmula na planilha. */
function limpar(valor) {
  const texto = String(valor || '').slice(0, 300);
  return /^[=+\-@]/.test(texto) ? "'" + texto : texto;
}
