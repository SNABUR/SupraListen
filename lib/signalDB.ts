// D:\Crystara\lib\signalDB.ts
import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'signal.db');

class SignalDB {
    private db: Database.Database;

    constructor() {
        try {
            this.db = new Database(dbPath);
            this.init();
        } catch (error) {
            console.error("Failed to initialize the signal database:", error);
            throw error;
        }
    }

    private init(): void {
        const createTableStmt = `
            CREATE TABLE IF NOT EXISTS activity_signals (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                network TEXT NOT NULL,
                signal_minute TEXT NOT NULL,
                UNIQUE(network, signal_minute)
            );
        `;
        this.db.exec(createTableStmt);
    }

    /**
     * Registra una señal de actividad para una red y minuto específicos.
     * @param {string} network - La red para la que se añade la señal (ej. 'supra-mainnet').
     */
    public addSignal(network: string): void {
        if (!network) return;
        const now = new Date();
        now.setSeconds(0, 0);
        const minuteTimestamp = now.toISOString();
        const stmt = this.db.prepare('INSERT OR IGNORE INTO activity_signals (network, signal_minute) VALUES (?, ?)');
        stmt.run(network, minuteTimestamp);
    }

    /**
     * Verifica si hay alguna señal de actividad para una red específica.
     * @param {string} network - La red a comprobar.
     * @returns {boolean} True si hay al menos una señal, false en caso contrario.
     */
    public hasSignal(network: string): boolean {
        if (!network) return false;
        try {
            const stmt = this.db.prepare('SELECT 1 FROM activity_signals WHERE network = ? LIMIT 1');
            const result = stmt.get(network);
            return !!result;
        } catch (error) {
            console.error(`Error in hasSignal for network ${network}:`, error);
            return false;
        }
    }

    /**
     * Borra todas las señales de actividad para una red específica.
     * @param {string} network - La red para la que se borrarán las señales.
     */
    public clear(network: string): void {
        if (!network) return;
        try {
            const stmt = this.db.prepare('DELETE FROM activity_signals WHERE network = ?');
            stmt.run(network);
        } catch (error) {
            console.error(`Error in clear signals for network ${network}:`, error);
        }
    }

    public close(): void {
        if (this.db) {
            this.db.close();
        }
    }
}

export const signalDB = new SignalDB();