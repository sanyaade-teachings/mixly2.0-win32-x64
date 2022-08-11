@echo off

set "a=%~dp0"
rem echo %a%
set a=%a:\=\\%
rem echo %a%
set b="%a%Mixly.exe"
rem echo %b%
wmic process where 'executablepath=%b%' call Terminate > nul

"%~dp0\Git\cmd\git" config --global --add safe.directory "%~dp0"
"%~dp0\Git\cmd\git" config --system core.longpaths true

rem 删除.git_win_stm32文件夹
if exist "%~dp0\.git_win_stm32" (
	attrib -h "%~dp0\.git_win_stm32"
	del /f /s /q "%~dp0\.git_win_stm32" > nul
	rd /q /s "%~dp0\.git_win_stm32" > nul
)

rem 判断当前目录下是否有.git目录，如果有则首先将.git目录只读属性去除，并将其重命名
if exist "%~dp0"\.git (
	attrib -h "%~dp0\.git"
	attrib -h "%~dp0\.git_mixly"
	attrib -h "%~dp0\.git_win_avr"
	attrib -h "%~dp0\.git_win_esp8266"
	attrib -h "%~dp0\.git_win_esp32"
	attrib -h "%~dp0\.git_arduino_libs"
	if not exist "%~dp0\.git_mixly" (
		ren "%~dp0\.git\" .git_mixly
		attrib +h "%~dp0\.git_mixly"
	) ELSE IF not exist "%~dp0\.git_win_avr" (
		ren "%~dp0\.git\" .git_win_avr
		attrib +h "%~dp0\.git_win_avr"
	) ELSE IF not exist "%~dp0\.git_win_esp8266" (
		ren "%~dp0\.git\" .git_win_esp8266
		attrib +h "%~dp0\.git_win_esp8266"
	) ELSE IF not exist "%~dp0\.git_win_esp32" (
		ren "%~dp0\.git\" .git_win_esp32
		attrib +h "%~dp0\.git_win_esp32"
	) ELSE IF not exist "%~dp0\.git_arduino_libs" (
		ren "%~dp0\.git\" .git_arduino_libs
		attrib +h "%~dp0\.git_arduino_libs"
	) ELSE (
		del /f /s /q "%~dp0"\.git > nul
		rd /q /s "%~dp0"\.git > nul
	)
)

rem 删除.git目录下index.lock
IF EXIST "%~dp0\.git_mixly\index.lock" ( 
	del /f /s /q "%~dp0\.git_mixly\index.lock" > nul
	rd /q /s "%~dp0\.git_mixly\index.lock" > nul
)

IF EXIST "%~dp0\.git_win_avr\index.lock" ( 
	del /f /s /q "%~dp0\.git_win_avr\index.lock" > nul
	rd /q /s "%~dp0\.git_win_avr\index.lock" > nul
)

IF EXIST "%~dp0\.git_win_esp8266\index.lock" ( 
	del /f /s /q "%~dp0\.git_win_esp8266\index.lock" > nul
	rd /q /s "%~dp0\.git_win_esp8266\index.lock" > nul
)

IF EXIST "%~dp0\.git_win_esp32\index.lock" ( 
	del /f /s /q "%~dp0\.git_win_esp32\index.lock" > nul
	rd /q /s "%~dp0\.git_win_esp32\index.lock" > nul
)

echo 当前路径为"%~dp0"

@echo off
title Mixly2.0 安装^&升级助手
@echo off
echo. 
echo ***************************Mixly2.0 安装^&升级助手****************************
echo 感谢您选择使用Mixly2.0软件，如果您是第一次使用本软件，请仔细阅读本说明。
echo.
echo.
echo 目前Mixly2.0软件支持对多种硬件的编程，因为支持所有硬件编程需要占用您硬盘较大的空间，您可以选择只安装您需要用到的部分功能即可。
echo.
echo Mixly2.0软件支持的硬件，具体说明如下：
echo ·MicroPython/CircuitPython ESP32系列开发板(MicroPython[ESP32_MixGo]、CircuitPython[ESP32S2_MixGoCE]等)为默认支持，无需选择。
echo ·Python(纯Python,无需硬件，支持图形化和代码互相转换)为默认支持，无需选择。
echo ·Arduino AVR系列开发板（包括Arduino UNO,Nano,Mega 2560,Pro Mini 等）
echo ·Arduino ESP8266系列开发板（包括WeMos D1,NodeMCU 等）
echo ·Arduino ESP32系列开发板（包括MixGo,普通ESP32开发板等）
echo.
echo.
echo 安装^&升级即将开始，您可以选择安装部分功能，输入y表示安装该功能，输入n表示不安装该功能。
@echo off

rem 询问用户是否安装Arduino AVR
echo.
set avr_select=
set /p avr_select=安装 Arduino AVR(y/n):
IF "%avr_select%"=="n" (
	echo No
) ELSE (
	echo Yes
)

rem 询问用户是否安装Arduino ESP8266
echo.
set esp8266_select=
set /p esp8266_select=安装 Arduino ESP8266(y/n):
IF "%esp8266_select%"=="n" (
	echo No
) ELSE (
	echo Yes
)

rem 询问用户是否安装Arduino ESP32
echo.
set esp32_select=
set /p esp32_select=安装 Arduino ESP32(y/n):
IF "%esp32_select%"=="n" (
	echo No
) ELSE (
	echo Yes
)

rem 询问用户更新后是否启动Mixly
echo.
set start_mixly=
set /p start_mixly=更新结束后启动 Mixly2.0(y/n):
IF "%start_mixly%"=="y" (
	echo Yes
) ELSE (
	echo No
)

rem 更新Mixly2.0
attrib -h "%~dp0\.git_mixly"
ren "%~dp0\.git_mixly\" .git

@echo on
echo Mixly2.0 正在升级中，请等待...
@echo off
cd "%~dp0\Git\cmd\"
git fetch --all
git reset --hard origin/master
git pull origin master
git submodule init
git submodule update
git submodule foreach "git pull origin master"
@echo off
rd/s/q "%~dp0\.git\logs\"
git gc
git prune
git clean -f .git/index.lock
@echo on
echo Mixly2.0更新完成
@echo off

ren "%~dp0\.git\" .git_mixly
attrib +h "%~dp0\.git_mixly"

echo.
echo.

IF "%avr_select%"=="n" (
	rem 删除Arduino AVR包
	IF EXIST "%~dp0\arduino-cli\Arduino15\packages\arduino\hardware" (
		del /f /s /q "%~dp0\arduino-cli\Arduino15\packages\arduino\hardware" > nul
		rd /q /s "%~dp0\arduino-cli\Arduino15\packages\arduino\hardware" > nul
	)
	IF EXIST "%~dp0\arduino-cli\Arduino15\packages\arduino\tools\avr-gcc" (
		del /f /s /q "%~dp0\arduino-cli\Arduino15\packages\arduino\tools\avr-gcc" > nul
		rd /q /s "%~dp0\arduino-cli\Arduino15\packages\arduino\tools\avr-gcc" > nul
	)
	rem 删除Arduino AVR板卡页面
	IF EXIST "%~dp0\resources\app\board\arduino_avr\index.html" (
		del "%~dp0\resources\app\board\arduino_avr\index.html" > nul
	)
	attrib -h "%~dp0\.git_win_avr"
	rem 删除Arduino AVR .git\objects
	IF EXIST "%~dp0\.git_win_avr\objects" (
		del /f /s /q "%~dp0\.git_win_avr\objects" > nul
		rd /q /s "%~dp0\.git_win_avr\objects" > nul
	)
	rem 删除Arduino AVR .git\refs
	IF EXIST "%~dp0\.git_win_avr\refs" (
		del /f /s /q "%~dp0\.git_win_avr\refs" > nul
		rd /q /s "%~dp0\.git_win_avr\refs" > nul
	)
	md "%~dp0\.git_win_avr\objects" > nul
	md "%~dp0\.git_win_avr\objects\info" > nul
	md "%~dp0\.git_win_avr\objects\pack" > nul
	md "%~dp0\.git_win_avr\refs" > nul
	md "%~dp0\.git_win_avr\refs\heads" > nul
	md "%~dp0\.git_win_avr\refs\tags" > nul
	IF EXIST "%~dp0\.git_win_avr\index" (
		del "%~dp0\.git_win_avr\index" > nul
	)
	IF EXIST "%~dp0\.git_win_avr\ORIG_HEAD" (
		del "%~dp0\.git_win_avr\ORIG_HEAD" > nul
	)
	IF EXIST "%~dp0\.git_win_avr\packed-refs" (
		del "%~dp0\.git_win_avr\packed-refs" > nul
	)
	attrib +h "%~dp0\.git_win_avr"
) ELSE (
	rem 更新Arduino AVR 包
	attrib -h "%~dp0\.git_win_avr"
	ren "%~dp0\.git_win_avr\" .git

	@echo on
	echo Arduino AVR 包正在升级中，请等待...
	@echo off
	cd "%~dp0\Git\cmd\"
	git fetch --all
	git reset --hard origin/master
	git pull origin master

	@echo off
	rd/s/q "%~dp0\.git\logs\"
	git gc
	git prune
	git clean -f .git/index.lock
	@echo on
	echo Arduino AVR 包更新完成
	@echo off

	ren "%~dp0\.git\" .git_win_avr
	attrib +h "%~dp0\.git_win_avr"

	echo.
	echo.
)

IF not exist "%~dp0\.git_arduino_libs" (
	@echo on
	echo 克隆 Arduino Libs 包中，请等待...
	@echo off
	IF EXIST "%~dp0\arduino-cli\libraries" (
		del /f /s /q "%~dp0\arduino-cli\libraries" > nul
		rd /q /s "%~dp0\arduino-cli\libraries" > nul
	)
	IF EXIST "%~dp0\gitDir" (
		del /f /s /q "%~dp0\gitDir" > nul
		rd /q /s "%~dp0\gitDir" > nul
	)
	mkdir "%~dp0\gitDir"
	git clone https://gitee.com/mixly2/arduino-libs.git "%~dp0\gitDir"
	attrib -h "%~dp0\gitDir\.git"
	ren "%~dp0\gitDir\.git" .git_arduino_libs
	echo A|xcopy "%~dp0\gitDir\.git_arduino_libs" "%~dp0\.git_arduino_libs\" /s /c /h > nul
	
	attrib +h "%~dp0\.git_arduino_libs"
	
	IF EXIST "%~dp0\gitDir" (
		del /f /s /q "%~dp0\gitDir" > nul
		rd /q /s "%~dp0\gitDir" > nul
	)
	@echo on
	echo Arduino Libs 克隆完成
	@echo off
	echo.
	echo.
)

IF EXIST "%~dp0\.git_arduino_libs" (
	rem 更新Arduino-libs
	attrib -h "%~dp0\.git_arduino_libs"
	ren "%~dp0\.git_arduino_libs\" .git

	@echo on
	echo Arduino Libs 包正在升级中，请等待...
	@echo off
	cd "%~dp0\Git\cmd\"
	git fetch --all
	git reset --hard origin/master
	git pull origin master

	@echo off
	rd/s/q "%~dp0\.git\logs\"
	git gc
	git prune
	git clean -f .git/index.lock
	@echo on
	echo Arduino Libs 包更新完成
	@echo off

	ren "%~dp0\.git\" .git_arduino_libs
	attrib +h "%~dp0\.git_arduino_libs"

	echo.
	echo.
)

IF "%esp8266_select%"=="n" (
	rem 删除Arduino ESP8266包
	IF EXIST "%~dp0\arduino-cli\Arduino15\packages\esp8266" (
		del /f /s /q "%~dp0\arduino-cli\Arduino15\packages\esp8266" > nul
		rd /q /s "%~dp0\arduino-cli\Arduino15\packages\esp8266" > nul
	)
	rem 删除Arduino ESP8266板卡页面
	IF EXIST "%~dp0\resources\app\board\arduino_esp8266" (
		del /f /s /q "%~dp0\resources\app\board\arduino_esp8266" > nul
		rd /q /s "%~dp0\resources\app\board\arduino_esp8266" > nul
	)
	attrib -h "%~dp0\.git_win_esp8266"
	rem 删除Arduino ESP8266 .git\objects
	IF EXIST "%~dp0\.git_win_esp8266\objects" (
		del /f /s /q "%~dp0\.git_win_esp8266\objects" > nul
		rd /q /s "%~dp0\.git_win_esp8266\objects" > nul
	)
	rem 删除Arduino ESP8266 .git\refs
	IF EXIST "%~dp0\.git_win_esp8266\refs" (
		del /f /s /q "%~dp0\.git_win_esp8266\refs" > nul
		rd /q /s "%~dp0\.git_win_esp8266\refs" > nul
	)
	md "%~dp0\.git_win_esp8266\objects" > nul
	md "%~dp0\.git_win_esp8266\objects\info" > nul
	md "%~dp0\.git_win_esp8266\objects\pack" > nul
	md "%~dp0\.git_win_esp8266\refs" > nul
	md "%~dp0\.git_win_esp8266\refs\heads" > nul
	md "%~dp0\.git_win_esp8266\refs\tags" > nul
	IF EXIST "%~dp0\.git_win_esp8266\index" (
		del "%~dp0\.git_win_esp8266\index" > nul
	)
	IF EXIST "%~dp0\.git_win_esp8266\ORIG_HEAD" (
		del "%~dp0\.git_win_esp8266\ORIG_HEAD" > nul
	)
	IF EXIST "%~dp0\.git_win_esp8266\packed-refs" (
		del "%~dp0\.git_win_esp8266\packed-refs" > nul
	)
	attrib +h "%~dp0\.git_win_esp8266"
) ELSE (
	rem 更新Arduino ESP8266 包
	attrib -h "%~dp0\.git_win_esp8266"
	ren "%~dp0\.git_win_esp8266\" .git

	@echo on
	echo Arduino ESP8266 包正在升级中，请等待...
	@echo off
	cd "%~dp0\Git\cmd\"
	git fetch --all
	git reset --hard origin/master
	git pull origin master

	@echo off
	rd/s/q "%~dp0\.git\logs\"
	git gc
	git prune
	git clean -f .git/index.lock
	@echo on
	echo Arduino ESP8266 包更新完成
	@echo off

	ren "%~dp0\.git\" .git_win_esp8266
	attrib +h "%~dp0\.git_win_esp8266"
	
	echo.
	echo.
)

IF "%esp32_select%"=="n" (
	rem 删除Arduino ESP32包
	IF EXIST "%~dp0\arduino-cli\Arduino15\packages\esp32" (
		del /f /s /q "%~dp0\arduino-cli\Arduino15\packages\esp32" > nul
		rd /q /s "%~dp0\arduino-cli\Arduino15\packages\esp32" > nul
	)
	rem 删除Arduino ESP32板卡页面
	IF EXIST "%~dp0\resources\app\board\arduino_esp32" (
		del /f /s /q "%~dp0\resources\app\board\arduino_esp32" > nul
		rd /q /s "%~dp0\resources\app\board\arduino_esp32" > nul
	)
	rem 删除Arduino ESP32C3板卡页面
	IF EXIST "%~dp0\resources\app\board\arduino_esp32c3" (
		del /f /s /q "%~dp0\resources\app\board\arduino_esp32c3" > nul
		rd /q /s "%~dp0\resources\app\board\arduino_esp32c3" > nul
	)
	rem 删除Arduino ESP32S2板卡页面
	IF EXIST "%~dp0\resources\app\board\arduino_esp32s2" (
		del /f /s /q "%~dp0\resources\app\board\arduino_esp32s2" > nul
		rd /q /s "%~dp0\resources\app\board\arduino_esp32s2" > nul
	)
	rem 删除Arduino ESP32S3板卡页面
	IF EXIST "%~dp0\resources\app\board\arduino_esp32s3" (
		del /f /s /q "%~dp0\resources\app\board\arduino_esp32s3" > nul
		rd /q /s "%~dp0\resources\app\board\arduino_esp32s3" > nul
	)
	attrib -h "%~dp0\.git_win_esp32"
	rem 删除Arduino ESP32 .git\objects
	IF EXIST "%~dp0\.git_win_esp32\objects" (
		del /f /s /q "%~dp0\.git_win_esp32\objects" > nul
		rd /q /s "%~dp0\.git_win_esp32\objects" > nul
	)
	rem 删除Arduino ESP32 .git\refs
	IF EXIST "%~dp0\.git_win_esp32\refs" (
		del /f /s /q "%~dp0\.git_win_esp32\refs" > nul
		rd /q /s "%~dp0\.git_win_esp32\refs" > nul
	)
	md "%~dp0\.git_win_esp32\objects" > nul
	md "%~dp0\.git_win_esp32\objects\info" > nul
	md "%~dp0\.git_win_esp32\objects\pack" > nul
	md "%~dp0\.git_win_esp32\refs" > nul
	md "%~dp0\.git_win_esp32\refs\heads" > nul
	md "%~dp0\.git_win_esp32\refs\tags" > nul
	IF EXIST "%~dp0\.git_win_esp32\index" (
		del "%~dp0\.git_win_esp32\index" > nul
	)
	IF EXIST "%~dp0\.git_win_esp32\ORIG_HEAD" (
		del "%~dp0\.git_win_esp32\ORIG_HEAD" > nul
	)
	IF EXIST "%~dp0\.git_win_esp32\packed-refs" (
		del "%~dp0\.git_win_esp32\packed-refs" > nul
	)
	attrib +h "%~dp0\.git_win_esp32"
) ELSE (
	rem 更新Arduino ESP32 包
	attrib -h "%~dp0\.git_win_esp32"
	ren "%~dp0\.git_win_esp32\" .git

	@echo on
	echo Arduino ESP32 包正在升级中，请等待...
	@echo off
	cd "%~dp0\Git\cmd\"
	git fetch --all
	git reset --hard origin/master
	git pull origin master

	@echo off
	rd/s/q "%~dp0\.git\logs\"
	git gc
	git prune
	git clean -f .git/index.lock
	@echo on
	echo Arduino ESP32 包更新完成
	@echo off

	ren "%~dp0\.git\" .git_win_esp32
	attrib +h "%~dp0\.git_win_esp32"
	
	echo.
	echo.
)

@echo on
echo Mixly2.0 和 Arduino 包更新完成，Enjoy it!
@echo off
pause

IF "%start_mixly%"=="y" (
	cd "%~dp0\"
	start "dummyclient" "%~dp0\Mixly.exe"
)
