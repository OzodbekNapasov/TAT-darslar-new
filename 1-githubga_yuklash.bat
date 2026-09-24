@echo off
chcp 65001 > nul
setlocal
title [1] GitHub'ga Yuklash (Push) — TAT Darslari
color 0B

echo ============================================================================
echo        SHAHRISABZ TIBBIYOT TEXNIKUMI — TAT DARSLARI PLATFORMASI
echo                 [1] LOYIHANI GITHUB'GA YUKLASH (GIT PUSH)
echo ============================================================================
echo.

cd /d "%~dp0"

:: 0. Git o'rnatilganmi?
where git > nul 2>&1
if errorlevel 1 (
    set "REASON=Git dasturi topilmadi. Git for Windows o'rnatilganini tekshiring."
    goto :fail
)

:: 1. GitHub bilan aloqa (internet va login shu yerda tekshiriladi)
echo   [███░░░░░░░░░░░░░░░░░] 15%%  — GitHub bilan aloqa tekshirilmoqda...
git ls-remote --heads origin main > nul 2>&1
if errorlevel 1 (
    set "REASON=GitHub'ga ulanib bo'lmadi. Internet aloqasini yoki GitHub login ma'lumotlarini tekshiring."
    goto :fail
)

:: 2. Barcha o'zgarishlarni tayyorlash
echo   [███████░░░░░░░░░░░░░] 35%%  — Barcha fayllar tayyorlanmoqda: git add -A
git add -A
if errorlevel 1 (
    set "REASON=Fayllarni tayyorlab bo'lmadi. Yuqoridagi git xabarini o'qing."
    goto :fail
)

:: 3. O'zgarish bo'lsa — commit
for /f "tokens=1-3 delims=/.- " %%a in ('date /t') do set "TODAY=%%a-%%b-%%c"
for /f "tokens=1-2 delims=: " %%a in ('time /t') do set "NOW=%%a:%%b"

git diff --cached --quiet
if errorlevel 1 (
    echo   [███████████░░░░░░░░░] 55%%  — O'zgarishlar saqlanmoqda: git commit
    git commit -q -m "Yangilash: TAT darslari %TODAY% %NOW%"
    if errorlevel 1 (
        set "REASON=Commit qilib bo'lmadi. Yuqoridagi git xabarini o'qing."
        goto :fail
    )
) else (
    echo   [███████████░░░░░░░░░] 55%%  — Yangi o'zgarish yo'q, faqat GitHub bilan tenglashtiriladi
)

:: 4. GitHub'da boshqa kompyuterdan yuklangan yangiliklar bo'lsa, avval ularni olamiz
echo   [██████████████░░░░░░] 70%%  — GitHub'dagi yangiliklar olinmoqda: git pull --rebase
git pull --rebase --autostash origin main
if errorlevel 1 (
    git rebase --abort > nul 2>&1
    set "REASON=GitHub'dagi va shu kompyuterdagi o'zgarishlar bir xil faylda to'qnashdi. Hech narsa yo'qolmadi, lekin buni qo'lda hal qilish kerak."
    goto :fail
)

:: 5. Yuklash
echo   [██████████████████░░] 90%%  — GitHub serveriga yuklanmoqda: git push origin main
echo.
git push origin main
if errorlevel 1 (
    set "REASON=GitHub yuklashni qabul qilmadi. Yuqoridagi git xabarini o'qing."
    goto :fail
)

color 0A
echo.
echo   [████████████████████] 100%% — MUVAFFAQIYATLI YUKLANDI!
echo ============================================================================
echo   Barcha fayllar GitHub'ga yuklandi. Vercel saytni 1-2 daqiqada yangilaydi.
echo ============================================================================
echo.
pause
exit /b 0

:fail
color 0C
echo.
echo   [████████████████████] XATOLIK YUZ BERDI!
echo ============================================================================
echo   %REASON%
echo ============================================================================
echo.
pause
exit /b 1
