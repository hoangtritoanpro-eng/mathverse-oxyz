@echo off
chcp 65001 >nul
cd /d "%~dp0\MATHVERSE_OXYZ_MINIGAMES"
echo ===============================================================
echo   MATHVERSE OXYZ - HANH TRINH GIAI CUU LUC DIA OXYZ (TOAN 12)
echo   Truong THPT so 1 Phan Chu Trinh - GV: Dinh Thi Thao Nguyen
echo ===============================================================
echo.
echo [1/2] Dang mo trinh duyet tai http://localhost:3000 ...
start "" "http://localhost:3000"
echo [2/2] Dang khoi dong may chu lop hoc (Cong 3000 - Mang LAN/Wi-Fi)...
echo KHONG DONG CUA SO NAY TRONG KHI HOC SINH DANG CHOI.
echo.
node server.js
pause
