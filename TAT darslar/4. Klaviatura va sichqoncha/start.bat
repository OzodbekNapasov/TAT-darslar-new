@echo off
chcp 65001 > nul
title Tibbiyotda axborot texnologiyalari - Shahrisabz Tibbiyot Texnikumi

echo ======================================================================
echo   Shahrisabz Tibbiyot Texnikumi
echo   4-Dars: Klaviatura va sichqoncha asoslari
echo ======================================================================
echo.
echo Dars brauzeringizda ochilmoqda...
echo Internet talab qilinmaydi.
echo.

if exist "%~dp0offline\4-dars.html" (
    start "" "%~dp0offline\4-dars.html"
) else if exist "%~dp0offline\index.html" (
    start "" "%~dp0offline\index.html"
) else (
    echo Xatolik: Dars fayli topilmadi!
    pause
    exit /b 1
)

timeout /t 2 > nul
exit
