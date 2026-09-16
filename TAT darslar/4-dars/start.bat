@echo off
chcp 65001 > nul
title Tibbiyotda axborot texnologiyalari - Shahrisabz Tibbiyot Texnikumi

echo ======================================================================
echo   Shahrisabz Tibbiyot Texnikumi
echo   4-Dars: Klaviatura va sichqoncha asoslari (Next.js)
echo ======================================================================
echo.

if exist "%~dp0offline\4-dars.html" (
    echo Dars brauzeringizda ochilmoqda... Internet talab qilinmaydi.
    start "" "%~dp0offline\4-dars.html"
    timeout /t 2 > nul
    exit /b 0
)

if exist "%~dp0offline\index.html" (
    echo Dars brauzeringizda ochilmoqda... Internet talab qilinmaydi.
    start "" "%~dp0offline\index.html"
    timeout /t 2 > nul
    exit /b 0
)

echo Offline nusxa hali yig'ilmagan.
echo.
echo Uni yig'ish uchun shu papkada quyidagilarni bajaring:
echo     npm run build:offline
echo yoki Next.js dasturini ishga tushirish uchun:
echo     npm run dev
echo.
echo Shundan so'ng "offline" papkasi to'liq yig'iladi va dars internetsiz ishlaydi.
echo.
pause
exit /b 1
