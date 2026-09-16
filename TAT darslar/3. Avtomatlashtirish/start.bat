@echo off
chcp 65001 > nul
title Tibbiyotda axborot texnologiyalari - Shahrisabz Tibbiyot Texnikumi

echo ======================================================================
echo   Shahrisabz Tibbiyot Texnikumi
echo   3-Dars: Tibbiyotda avtomatlashtirilgan ishchi o'rinlar
echo ======================================================================
echo.

if exist "%~dp0offline\index.html" (
    echo Mundarija brauzeringizda ochilmoqda... Internet talab qilinmaydi.
    start "" "%~dp0offline\index.html"
    timeout /t 2 > nul
    exit /b 0
)

echo Offline nusxa hali yigilmagan.
echo.
echo Uni yigish uchun shu papkada quyidagilarni bajaring:
echo     npm install
echo     npm run build:offline
echo.
echo Shundan song "offline" papkasi paydo boladi va bu fayl ishlaydi.
echo Talabalarga tarqatish uchun "offline" papkasini butun holda koching.
echo.
pause
exit /b 1
