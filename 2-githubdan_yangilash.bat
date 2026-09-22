@echo off
chcp 65001 > nul
setlocal enabledelayedexpansion
title [2] GitHub'dan Yangilash (Pull) — TAT Darslari
color 0B

echo ============================================================================
echo        SHAHRISABZ TIBBIYOT TEXNIKUMI — TAT DARSLARI PLATFORMASI
echo          [2] GITHUB'DAN YUKLAB LOYIHA PAPKASINI YANGILASH (GIT PULL)
echo ============================================================================
echo.

cd /d "%~dp0"

:: Step 1: Connecting to GitHub (20%)
echo   [████░░░░░░░░░░░░░░░░] 20%%  — GitHub serveriga ulanilmoqda...
timeout /t 1 /nobreak > nul

:: Step 2: Fetching remote data (50%)
echo   [██████████░░░░░░░░░░] 50%%  — Yangi o'zgarishlar tekshirilmoqda (git fetch)...
git fetch origin main
timeout /t 1 /nobreak > nul

:: Step 3: Pulling & Updating local files (80%)
echo   [████████████████░░░░] 80%%  — Loyiha papkasi yangilanmoqda (git pull)...
echo.
git pull --rebase origin main

if %ERRORLEVEL% EQU 0 (
    color 0A
    echo.
    echo   [████████████████████] 100%% — LOYIHA PAPKASI TO'LIQ YANGILANDI!
    echo ============================================================================
    echo   Kompyuteringizdagi barcha darslar eng so'nggi versiyaga keltirildi!
    echo ============================================================================
) else (
    color 0E
    echo.
    echo   [████████████████░░░░] Mahalliy o'zgarishlar saqlanib yangilanmoqda...
    git stash > nul 2>&1
    git pull origin main
    git stash pop > nul 2>&1
    color 0A
    echo   [████████████████████] 100%% — LOYIHA PAPKASI YANGILANDI!
)

echo.
pause
