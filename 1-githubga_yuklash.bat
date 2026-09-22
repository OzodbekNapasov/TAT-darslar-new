@echo off
chcp 65001 > nul
setlocal enabledelayedexpansion
title [1] GitHub'ga Yuklash (Push) — TAT Darslari
color 0B

echo ============================================================================
echo        SHAHRISABZ TIBBIYOT TEXNIKUMI — TAT DARSLARI PLATFORMASI
echo                 [1] LOYIHANI GITHUB'GA YUKLASH (GIT PUSH)
echo ============================================================================
echo.

cd /d "%~dp0"

:: Step 1: Checking Git status (20%)
echo   [███░░░░░░░░░░░░░░░░░] 15%%  — Loyiha fayllari tekshirilmoqda...
timeout /t 1 /nobreak > nul

:: Step 2: Staging all files (45%)
echo   [█████████░░░░░░░░░░░] 45%%  — Barcha fayllar tayyorlanmoqda (git add -A)...
git add -A
timeout /t 1 /nobreak > nul

:: Step 3: Creating commit (70%)
for /f "tokens=1-3 delims=/.- " %%a in ('date /t') do set TODAY=%%a-%%b-%%c
for /f "tokens=1-2 delims=: " %%a in ('time /t') do set NOW=%%a:%%b
echo   [██████████████░░░░░░] 70%%  — O'zgarishlar saqlanmoqda (git commit)...
git commit -m "Yangilash: TAT darslari va 6-dars Windows OT (%TODAY% %NOW%)" > nul 2>&1
timeout /t 1 /nobreak > nul

:: Step 4: Pushing to GitHub (90%)
echo   [██████████████████░░] 90%%  — GitHub serveriga yuklanmoqda (git push origin main)...
echo.
git push origin main

if %ERRORLEVEL% EQU 0 (
    color 0A
    echo.
    echo   [████████████████████] 100%% — MUVAFFAQIYATLI YUKLANDI!
    echo ============================================================================
    echo   Barcha fayllar GitHub'ga to'liq yuklandi va Vercel orqali yangilandi!
    echo ============================================================================
) else (
    color 0C
    echo.
    echo   [████████████████████] XATOLIK YUZ BERDI!
    echo ============================================================================
    echo   Internet aloqasini tekshiring yoki avval "2-githubdan_yangilash.bat" ni ishga tushiring.
    echo ============================================================================
)

echo.
pause
