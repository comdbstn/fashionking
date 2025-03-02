import { GoogleSpreadsheet } from 'google-spreadsheet';
import * as dotenv from 'dotenv';

dotenv.config();

interface PreRegistrationData {
  name: string;
  phone: string;
  email: string;
  timestamp: string;
}

export async function addPreRegistration(data: Omit<PreRegistrationData, 'timestamp'>) {
  try {
    if (!process.env.GOOGLE_SHEET_ID || !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
      throw new Error('Missing required environment variables');
    }

    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);

    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    });

    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];

    // 헤더가 없으면 추가
    const headers = await sheet.headerValues;
    if (!headers || headers.length === 0) {
      await sheet.setHeaderRow(['이름', '전화번호', '이메일', '신청일시']);
    }

    const row = {
      '이름': data.name,
      '전화번호': data.phone,
      '이메일': data.email,
      '신청일시': new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })
    };

    await sheet.addRow(row);
    return { success: true };
  } catch (error) {
    console.error('Failed to add pre-registration:', error);
    return { success: false, error };
  }
} 