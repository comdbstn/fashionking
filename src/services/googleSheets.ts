import { GoogleSpreadsheet } from 'google-spreadsheet';

interface PreRegistrationData {
  name: string;
  phone: string;
  email: string;
  timestamp: string;
}

export async function addPreRegistration(data: Omit<PreRegistrationData, 'timestamp'>) {
  try {
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);

    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!,
      private_key: process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
    });

    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];

    const row = {
      ...data,
      timestamp: new Date().toISOString(),
    };

    await sheet.addRow(row);
    return { success: true };
  } catch (error) {
    console.error('Failed to add pre-registration:', error);
    return { success: false, error };
  }
} 