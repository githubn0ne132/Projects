@echo off
setlocal

echo Checking for Node.js...
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo Node.js is not installed. Please install it from https://nodejs.org/
    pause
    exit /b 1
)

echo.
echo ==========================================
echo Setting up Server...
echo ==========================================
cd server
if not exist node_modules (
    echo Installing server dependencies...
    call npm install
) else (
    echo Server dependencies already installed.
)

if not exist .env (
    echo Creating .env file for server...
    (
        echo DATABASE_URL=postgresql://user:password@localhost:5432/pern_db
        echo JWT_SECRET=your_jwt_secret_key_change_me
        echo PORT=5000
        echo UPLOAD_PATH=uploads/
        echo MAX_FILE_SIZE=5242880
    ) > .env
    echo .env created.
) else (
    echo .env file already exists.
)

if not exist uploads (
    echo Creating uploads directory...
    mkdir uploads
)
cd ..

echo.
echo ==========================================
echo Setting up Client...
echo ==========================================
cd client
if not exist node_modules (
    echo Installing client dependencies...
    call npm install
) else (
    echo Client dependencies already installed.
)
cd ..

echo.
echo ==========================================
echo Starting Applications...
echo ==========================================

echo Starting Server...
start "PERN Server" cmd /k "cd server && npm start"

echo Starting Client...
start "PERN Client" cmd /k "cd client && npm run dev"

echo.
echo Both applications are starting in separate windows.
echo Server running on http://localhost:5000
echo Client usually running on http://localhost:5173 (check client window)
echo.
pause
