@echo off
chcp 65001 > nul
title Tibbiyotda axborot texnologiyalari - Shahrisabz Tibbiyot Texnikumi

echo ======================================================================
echo   Shahrisabz Tibbiyot Texnikumi
echo   2-Dars: Axborot turlari. Sanoq sistemalari. Texnika xavfsizligi
echo ======================================================================
echo.
echo Mundarija brauzeringizda ochilmoqda...
echo Internet talab qilinmaydi.
echo.

if exist "%~dp0index.html" (
    start "" "%~dp0index.html"
) else (
    echo Xatolik: index.html topilmadi!
    echo Loyiha papkasida "npm run build:offline" buyrugini bajaring.
    pause
    exit /b 1
)

timeout /t 2 > nul
exit
