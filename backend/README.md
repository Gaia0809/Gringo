# Gringo - Backend (Laravel) 🐘

Questa è l'API REST che gestisce i dati e la logica di business del sistema Gringo.

## 📋 Prerequisiti
- PHP >= 8.2
- Composer
- MySQL

## ⚙️ Installazione
Segui questi passaggi per configurare il server:

1. **Installa le dipendenze:**
   ```bash
   composer install
   ```

2. **Configura l'ambiente:**
   - Copia il file `.env.example` in un nuovo file chiamato `.env`.
   - Nel file `.env`, imposta i dati del tuo database MySQL (DB_DATABASE, DB_USERNAME, DB_PASSWORD).

3. **Genera la chiave dell'applicazione:**
   ```bash
   php artisan key:generate
   ```

4. **Prepara il database:**
   Esegui le migrazioni e popola il database con i dati di prova:
   ```bash
   php artisan migrate:fresh --seed
   ```

5. **Avvia il server:**
   ```bash
   php artisan serve
   ```
   L'API sarà disponibile su: `http://127.0.0.1:8000`
