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

rem ɾ��.git_win_stm32�ļ���
if exist "%~dp0\.git_win_stm32" (
	attrib -h "%~dp0\.git_win_stm32"
	del /f /s /q "%~dp0\.git_win_stm32" > nul
	rd /q /s "%~dp0\.git_win_stm32" > nul
)

rem �жϵ�ǰĿ¼���Ƿ���.gitĿ¼������������Ƚ�.gitĿ¼ֻ������ȥ����������������
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

rem ɾ��.gitĿ¼��index.lock
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

echo ��ǰ·��Ϊ"%~dp0"

@echo off
title Mixly2.0 ��װ^&��������
@echo off
echo. 
echo ***************************Mixly2.0 ��װ^&��������****************************
echo ��л��ѡ��ʹ��Mixly2.0�����������ǵ�һ��ʹ�ñ����������ϸ�Ķ���˵����
echo.
echo.
echo ĿǰMixly2.0���֧�ֶԶ���Ӳ���ı�̣���Ϊ֧������Ӳ�������Ҫռ����Ӳ�̽ϴ�Ŀռ䣬������ѡ��ֻ��װ����Ҫ�õ��Ĳ��ֹ��ܼ��ɡ�
echo.
echo Mixly2.0���֧�ֵ�Ӳ��������˵�����£�
echo ��MicroPython/CircuitPython ESP32ϵ�п�����(MicroPython[ESP32_MixGo]��CircuitPython[ESP32S2_MixGoCE]��)ΪĬ��֧�֣�����ѡ��
echo ��Python(��Python,����Ӳ����֧��ͼ�λ��ʹ��뻥��ת��)ΪĬ��֧�֣�����ѡ��
echo ��Arduino AVRϵ�п����壨����Arduino UNO,Nano,Mega 2560,Pro Mini �ȣ�
echo ��Arduino ESP8266ϵ�п����壨����WeMos D1,NodeMCU �ȣ�
echo ��Arduino ESP32ϵ�п����壨����MixGo,��ͨESP32������ȣ�
echo.
echo.
echo ��װ^&����������ʼ��������ѡ��װ���ֹ��ܣ�����y��ʾ��װ�ù��ܣ�����n��ʾ����װ�ù��ܡ�
@echo off

rem ѯ���û��Ƿ�װArduino AVR
echo.
set avr_select=
set /p avr_select=��װ Arduino AVR(y/n):
IF "%avr_select%"=="n" (
	echo No
) ELSE (
	echo Yes
)

rem ѯ���û��Ƿ�װArduino ESP8266
echo.
set esp8266_select=
set /p esp8266_select=��װ Arduino ESP8266(y/n):
IF "%esp8266_select%"=="n" (
	echo No
) ELSE (
	echo Yes
)

rem ѯ���û��Ƿ�װArduino ESP32
echo.
set esp32_select=
set /p esp32_select=��װ Arduino ESP32(y/n):
IF "%esp32_select%"=="n" (
	echo No
) ELSE (
	echo Yes
)

rem ѯ���û����º��Ƿ�����Mixly
echo.
set start_mixly=
set /p start_mixly=���½��������� Mixly2.0(y/n):
IF "%start_mixly%"=="y" (
	echo Yes
) ELSE (
	echo No
)

rem ����Mixly2.0
attrib -h "%~dp0\.git_mixly"
ren "%~dp0\.git_mixly\" .git

@echo on
echo Mixly2.0 ���������У���ȴ�...
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
echo Mixly2.0�������
@echo off

ren "%~dp0\.git\" .git_mixly
attrib +h "%~dp0\.git_mixly"

echo.
echo.

IF "%avr_select%"=="n" (
	rem ɾ��Arduino AVR��
	IF EXIST "%~dp0\arduino-cli\Arduino15\packages\arduino\hardware" (
		del /f /s /q "%~dp0\arduino-cli\Arduino15\packages\arduino\hardware" > nul
		rd /q /s "%~dp0\arduino-cli\Arduino15\packages\arduino\hardware" > nul
	)
	IF EXIST "%~dp0\arduino-cli\Arduino15\packages\arduino\tools\avr-gcc" (
		del /f /s /q "%~dp0\arduino-cli\Arduino15\packages\arduino\tools\avr-gcc" > nul
		rd /q /s "%~dp0\arduino-cli\Arduino15\packages\arduino\tools\avr-gcc" > nul
	)
	rem ɾ��Arduino AVR�忨ҳ��
	IF EXIST "%~dp0\resources\app\board\arduino_avr\index.html" (
		del "%~dp0\resources\app\board\arduino_avr\index.html" > nul
	)
	attrib -h "%~dp0\.git_win_avr"
	rem ɾ��Arduino AVR .git\objects
	IF EXIST "%~dp0\.git_win_avr\objects" (
		del /f /s /q "%~dp0\.git_win_avr\objects" > nul
		rd /q /s "%~dp0\.git_win_avr\objects" > nul
	)
	rem ɾ��Arduino AVR .git\refs
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
	rem ����Arduino AVR ��
	attrib -h "%~dp0\.git_win_avr"
	ren "%~dp0\.git_win_avr\" .git

	@echo on
	echo Arduino AVR �����������У���ȴ�...
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
	echo Arduino AVR ���������
	@echo off

	ren "%~dp0\.git\" .git_win_avr
	attrib +h "%~dp0\.git_win_avr"

	echo.
	echo.
)

IF not exist "%~dp0\.git_arduino_libs" (
	@echo on
	echo ��¡ Arduino Libs ���У���ȴ�...
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
	echo Arduino Libs ��¡���
	@echo off
	echo.
	echo.
)

IF EXIST "%~dp0\.git_arduino_libs" (
	rem ����Arduino-libs
	attrib -h "%~dp0\.git_arduino_libs"
	ren "%~dp0\.git_arduino_libs\" .git

	@echo on
	echo Arduino Libs �����������У���ȴ�...
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
	echo Arduino Libs ���������
	@echo off

	ren "%~dp0\.git\" .git_arduino_libs
	attrib +h "%~dp0\.git_arduino_libs"

	echo.
	echo.
)

IF "%esp8266_select%"=="n" (
	rem ɾ��Arduino ESP8266��
	IF EXIST "%~dp0\arduino-cli\Arduino15\packages\esp8266" (
		del /f /s /q "%~dp0\arduino-cli\Arduino15\packages\esp8266" > nul
		rd /q /s "%~dp0\arduino-cli\Arduino15\packages\esp8266" > nul
	)
	rem ɾ��Arduino ESP8266�忨ҳ��
	IF EXIST "%~dp0\resources\app\board\arduino_esp8266" (
		del /f /s /q "%~dp0\resources\app\board\arduino_esp8266" > nul
		rd /q /s "%~dp0\resources\app\board\arduino_esp8266" > nul
	)
	attrib -h "%~dp0\.git_win_esp8266"
	rem ɾ��Arduino ESP8266 .git\objects
	IF EXIST "%~dp0\.git_win_esp8266\objects" (
		del /f /s /q "%~dp0\.git_win_esp8266\objects" > nul
		rd /q /s "%~dp0\.git_win_esp8266\objects" > nul
	)
	rem ɾ��Arduino ESP8266 .git\refs
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
	rem ����Arduino ESP8266 ��
	attrib -h "%~dp0\.git_win_esp8266"
	ren "%~dp0\.git_win_esp8266\" .git

	@echo on
	echo Arduino ESP8266 �����������У���ȴ�...
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
	echo Arduino ESP8266 ���������
	@echo off

	ren "%~dp0\.git\" .git_win_esp8266
	attrib +h "%~dp0\.git_win_esp8266"
	
	echo.
	echo.
)

IF "%esp32_select%"=="n" (
	rem ɾ��Arduino ESP32��
	IF EXIST "%~dp0\arduino-cli\Arduino15\packages\esp32" (
		del /f /s /q "%~dp0\arduino-cli\Arduino15\packages\esp32" > nul
		rd /q /s "%~dp0\arduino-cli\Arduino15\packages\esp32" > nul
	)
	rem ɾ��Arduino ESP32�忨ҳ��
	IF EXIST "%~dp0\resources\app\board\arduino_esp32" (
		del /f /s /q "%~dp0\resources\app\board\arduino_esp32" > nul
		rd /q /s "%~dp0\resources\app\board\arduino_esp32" > nul
	)
	rem ɾ��Arduino ESP32C3�忨ҳ��
	IF EXIST "%~dp0\resources\app\board\arduino_esp32c3" (
		del /f /s /q "%~dp0\resources\app\board\arduino_esp32c3" > nul
		rd /q /s "%~dp0\resources\app\board\arduino_esp32c3" > nul
	)
	rem ɾ��Arduino ESP32S2�忨ҳ��
	IF EXIST "%~dp0\resources\app\board\arduino_esp32s2" (
		del /f /s /q "%~dp0\resources\app\board\arduino_esp32s2" > nul
		rd /q /s "%~dp0\resources\app\board\arduino_esp32s2" > nul
	)
	rem ɾ��Arduino ESP32S3�忨ҳ��
	IF EXIST "%~dp0\resources\app\board\arduino_esp32s3" (
		del /f /s /q "%~dp0\resources\app\board\arduino_esp32s3" > nul
		rd /q /s "%~dp0\resources\app\board\arduino_esp32s3" > nul
	)
	attrib -h "%~dp0\.git_win_esp32"
	rem ɾ��Arduino ESP32 .git\objects
	IF EXIST "%~dp0\.git_win_esp32\objects" (
		del /f /s /q "%~dp0\.git_win_esp32\objects" > nul
		rd /q /s "%~dp0\.git_win_esp32\objects" > nul
	)
	rem ɾ��Arduino ESP32 .git\refs
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
	rem ����Arduino ESP32 ��
	attrib -h "%~dp0\.git_win_esp32"
	ren "%~dp0\.git_win_esp32\" .git

	@echo on
	echo Arduino ESP32 �����������У���ȴ�...
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
	echo Arduino ESP32 ���������
	@echo off

	ren "%~dp0\.git\" .git_win_esp32
	attrib +h "%~dp0\.git_win_esp32"
	
	echo.
	echo.
)

@echo on
echo Mixly2.0 �� Arduino ��������ɣ�Enjoy it!
@echo off
pause

IF "%start_mixly%"=="y" (
	cd "%~dp0\"
	start "dummyclient" "%~dp0\Mixly.exe"
)
