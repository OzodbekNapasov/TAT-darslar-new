@echo off
chcp 65001 > nul
title Tibbiyotda Axborot Texnologiyalari — Bosh Mundarija
color 0B

echo ============================================================================
echo        SHAHRISABZ TIBBIYOT TEXNIKUMI — TAT DARSLARI PLATFORMASI
echo ============================================================================
echo.
echo   [██████░░░░░░░░░░░░░░] 30%%  — Tizim tayyorlanmoqda...
timeout /t 1 /nobreak > nul
echo   [██████████████░░░░░░] 70%%  — Darslar mundarijasi yuklanmoqda...
timeout /t 1 /nobreak > nul
echo   [████████████████████] 100%% — Brauzerda ochilmoqda!
echo.

if exist "%~dp0TAT darslar\index.html" (
    start "" "%~dp0TAT darslar\index.html"
) else (
    echo Xatolik: "TAT darslar\index.html" topilmadi!
    pause
    exit /b 1
)

timeout /t 2 > nul
exit
