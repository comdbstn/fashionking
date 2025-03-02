/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module 'google-spreadsheet' {
  export class GoogleSpreadsheet {
    constructor(sheetId: string);
    useServiceAccountAuth(credentials: {
      client_email: string;
      private_key: string;
    }): Promise<void>;
    loadInfo(): Promise<void>;
    sheetsByIndex: GoogleSpreadsheet.GoogleSpreadsheetWorksheet[];
  }

  namespace GoogleSpreadsheet {
    interface GoogleSpreadsheetWorksheet {
      headerValues: string[];
      setHeaderRow(headers: string[]): Promise<void>;
      addRow(row: Record<string, any>): Promise<void>;
    }
  }
} 