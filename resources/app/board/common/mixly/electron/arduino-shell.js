(() => {

goog.require('layui');
goog.require('Mixly.Modules');
goog.require('Mixly.Env');
goog.require('Mixly.LayerExtend');
goog.require('Mixly.Config');
goog.require('Mixly.StatusBar');
goog.require('Mixly.StatusBarPort');
goog.require('Mixly.Title');
goog.require('Mixly.Boards');
goog.require('Mixly.MFile');
goog.require('Mixly.MArray');
goog.require('Mixly.Electron.Serial');
goog.provide('Mixly.Electron.ArduShell');

const {
    Modules,
    Env,
    Electron,
    LayerExtend,
    StatusBar,
    StatusBarPort,
    Title,
    Boards,
    MFile,
    MArray,
    Config
} = Mixly;

const { BOARD, SOFTWARE } = Config;

const {
    fs,
    fs_extend,
    fs_extra,
    path,
    lodash_fp,
    child_process
} = Modules;

const { 
    ArduShell,
    Serial
} = Electron;

ArduShell.DEFAULT_CONFIG = {
    "board_manager": {
        "additional_urls": []
    },
    "daemon": {
        "port": "50051"
    },
    "directories": {
        "data": "",
        "downloads": "",
        "user": ""
    },
    "library": {
        "enable_unsafe_install": false
    },
    "logging": {
        "file": "",
        "format": "text",
        "level": "info"
    },
    "metrics": {
        "addr": "9090",
        "enabled": true
    },
    "sketch": {
       "always_export_binaries": false 
    }
};

ArduShell.binFilePath = '';

ArduShell.shellPath = null;

ArduShell.shell = null;

ArduShell.updateShellPath = () => {
    let shellPath = path.resolve(Env.clientPath, './arduino-cli');
    if (Env.currentPlatform === 'win32')
        shellPath = path.resolve(shellPath, './arduino-cli.exe');
    else
        shellPath = path.resolve(shellPath, './arduino-cli');
    if (!fs_extend.isfile(shellPath)) {
        const { defaultPath = {} } = SOFTWARE;
        if (typeof defaultPath[Env.currentPlatform] === 'object') {
            let defaultShellPath = defaultPath[Env.currentPlatform].arduinoCli ?? '';
            defaultShellPath = path.resolve(Env.clientPath, defaultShellPath);
            if (fs_extend.isfile(defaultShellPath))
                shellPath = defaultShellPath;
            else
                shellPath = null;
        }
    }
    ArduShell.shellPath = shellPath;
}

ArduShell.updateConfig = (config) => {
    if (!ArduShell.shellPath) return;
    const configPath = path.resolve(ArduShell.shellPath, '../arduino-cli.json');
    let nowConfig = fs_extra.readJsonSync(configPath, { throws: false }) ?? { ...ArduShell.DEFAULT_CONFIG };
    if (typeof config === 'object') {
        if (MArray.equals(nowConfig.directories, config.directories))
            return;
        nowConfig = {
            ...nowConfig,
            ...config
        };
        fs_extra.outputJson(configPath, nowConfig, {
            spaces: '\t'
        })
        .then(() => {
            console.log('arduino-cli.json已更新');
        })
        .catch((error) => {
            console.log(error);
        });
    }
}

ArduShell.init = () => {
    ArduShell.updateShellPath();
    if (!ArduShell.shellPath) return;
    ArduShell.updateConfig({
        directories: {
            data: path.resolve(ArduShell.shellPath, '../Arduino15'),
            downloads: path.resolve(ArduShell.shellPath, '../staging'),
            user: path.resolve(ArduShell.shellPath, '../Arduino')
        }
    });
}

ArduShell.init();

ArduShell.burn = () => {
    Mixly.Electron.BU.initBurn();
}

/**
* @function 编译
* @description 开始一个编译过程
* @return void
*/
ArduShell.initCompile = () => {
    ArduShell.compile(() => {});
}

/**
* @function 编译
* @description 开始一个编译过程
* @return void
*/
ArduShell.compile = (doFunc = () => {}) => {
    StatusBarPort.tabChange("output");
    ArduShell.compiling = true;
    ArduShell.uploading = false;
    const boardType = Boards.getSelectedBoardCommandParam();
    StatusBar.show(1);
    const layerNum = layer.open({
        type: 1,
        title: indexText["编译中"] + "...",
        content: $('#mixly-loader-div'),
        shade: LayerExtend.shadeWithHeight,
        resize: false,
        closeBtn: 0,
        success: () => {
            $(".layui-layer-page").css("z-index", "198910151");
            $("#mixly-loader-btn").off("click").click(() => {
                $("#mixly-loader-btn").css('display', 'none');
                layer.title(indexText['编译终止中'] + '...', layerNum);
                ArduShell.cancel();
            });
        },
        end: () => {
            $('#mixly-loader-div').css('display', 'none');
            $("layui-layer-shade" + layerNum).remove();
            $("#mixly-loader-btn").off("click");
            $("#mixly-loader-btn").css('display', 'inline-block');
        }
    });
    setTimeout(() => {
        StatusBar.setValue(indexText["编译中"] + "...\n", true);

        let myLibPath = Env.indexPath + "/libraries/myLib/";
        if (fs_extend.isdir(myLibPath))
            myLibPath += '\",\"';
        else
            myLibPath = '';
        const thirdPartyPath = path.resolve(Env.indexPath, 'libraries/ThirdParty');
        if (fs_extend.isdir(thirdPartyPath)) {
            const libList = fs.readdirSync(thirdPartyPath);
            for (let libName of libList) {
                const libPath = path.resolve(thirdPartyPath, libName, 'libraries');
                if (!fs_extend.isdir(libPath)) continue;
                myLibPath += libPath + ',';
            }
        }
        const configPath = path.resolve(ArduShell.shellPath, '../arduino-cli.json'),
        defaultLibPath = path.resolve(ArduShell.shellPath, '../libraries'),
        buildPath = path.resolve(Env.clientPath, './mixlyBuild'),
        buildCachePath = path.resolve(Env.clientPath, './mixlyBuildCache'),
        codePath = path.resolve(Env.clientPath, './testArduino/testArduino.ino');
        const cmdStr = '\"'
                     + ArduShell.shellPath
                     + '\" compile -b '
                     + boardType
                     + ' --config-file \"'
                     + configPath
                     + '\" --build-cache-path \"' + buildCachePath + '\" --verbose --libraries \"'
                     + myLibPath
                     + defaultLibPath
                     + '\" --build-path \"'
                     + buildPath
                     + '\" \"'
                     + codePath
                     + '\"';
        ArduShell.runCmd(layerNum, 'compile', cmdStr,
            function () {
                doFunc();
            }
        );
    }, 100);
}

/**
* @function 初始化上传
* @description 关闭已打开的串口，获取当前所连接的设备数，然后开始上传程序
* @return void
*/
ArduShell.initUpload = () => {
    ArduShell.compiling = false;
    ArduShell.uploading = true;
    const boardType = Boards.getSelectedBoardCommandParam();
    const uploadType = Boards.getSelectedBoardConfigParam('upload_method');
    let port = Serial.getUploadPortSelectBoxValue();
    switch (uploadType) {
        case 'STLinkMethod':
        case 'jlinkMethod':
            port = 'None';
            break;
    }
    if (port) {
        Serial.portClose(port, () => {
            ArduShell.upload(boardType, port);
        });
    } else {
        layer.msg(indexText["无可用设备"] + "!", {
            time: 1000
        });
    }
}

/**
* @function 上传程序
* @description 通过所选择串口号开始一个上传过程
* @return void
*/
ArduShell.upload = (boardType, port) => {
    StatusBarPort.tabChange("output");
    const layerNum = layer.open({
        type: 1,
        title: indexText["上传中"] + "...",
        content: $('#mixly-loader-div'),
        shade: LayerExtend.shadeWithHeight,
        resize: false,
        closeBtn: 0,
        success: function () {
            $(".layui-layer-page").css("z-index", "198910151");
            $("#mixly-loader-btn").off("click").click(() => {
                $("#mixly-loader-btn").css('display', 'none');
                layer.title(indexText['上传终止中'] + '...', layerNum);
                ArduShell.cancel();
            });
        },
        end: function () {
            $('#mixly-loader-div').css('display', 'none');
            $("layui-layer-shade" + layerNum).remove();
            $("#mixly-loader-btn").off("click");
            $("#mixly-loader-btn").css('display', 'inline-block');
        }
    });
    StatusBar.show(1);
    StatusBar.setValue(indexText["上传中"] + "...\n", true);
    let myLibPath = Env.indexPath + "/libraries/myLib/";
    if (fs_extend.isdir(myLibPath))
        myLibPath += '\",\"';
    else
        myLibPath = '';
    const thirdPartyPath = path.resolve(Env.indexPath, 'libraries/ThirdParty');
    if (fs_extend.isdir(thirdPartyPath)) {
        const libList = fs.readdirSync(thirdPartyPath);
        for (let libName of libList) {
            const libPath = path.resolve(thirdPartyPath, libName, 'libraries');
            if (!fs_extend.isdir(libPath)) continue;
            myLibPath += libPath + ',';
        }
    }
    const configPath = path.resolve(ArduShell.shellPath, '../arduino-cli.json'),
    defaultLibPath = path.resolve(ArduShell.shellPath, '../libraries'),
    buildPath = path.resolve(Env.clientPath, './mixlyBuild'),
    buildCachePath = path.resolve(Env.clientPath, './mixlyBuildCache'),
    codePath = path.resolve(Env.clientPath, './testArduino/testArduino.ino');
    let cmdStr = '';
    if (ArduShell.binFilePath !== '') {
        cmdStr = '\"'
            + ArduShell.shellPath
            + '\" -b '
            + boardType
            + ' upload -p '
            + port
            + ' --config-file \"'
            + '\" --build-cache-path \"' + buildCachePath + '\" --verbose --libraries \"'
            + myLibPath
            + '\" --verbose '
            + '-i \"' + ArduShell.binFilePath + '\"';
        ArduShell.binFilePath = '';
    } else {
        cmdStr = '\"'
            + ArduShell.shellPath
            + '\" compile -b '
            + boardType
            + ' --upload -p '
            + port
            + ' --config-file \"'
            + configPath
            + '\" --build-cache-path \"' + buildCachePath + '\" --verbose --libraries \"'
            + myLibPath
            + defaultLibPath
            + '\" --build-path \"'
            + buildPath
            + '\" \"'
            + codePath
            + '\"';
    }
    ArduShell.runCmd(layerNum, 'upload', cmdStr,
        function () {
            const code = MFile.getCode();
            StatusBar.show(1);
            const portObj = Serial.portsOperator[port];
            if (!portObj) return;
            const { toolConfig } = portObj;
            const baudRateList = code.match(/(?<=Serial.begin[\s]*\([\s]*)[0-9]*(?=[\s]*\))/g);
            if (baudRateList && Serial.BAUDRATES.includes(baudRateList[0]-0)) {
                toolConfig.baudRates = baudRateList[0]-0;
            }
            Serial.connect(port, toolConfig.baudRates);
        }
    );
}

/**
* @function 取消编译或上传
* @description 取消正在执行的编译或上传过程
* @return void
*/
ArduShell.cancel = function () {
    if (ArduShell.shell) {
        try {
            ArduShell.shell.stdout.end();
            //download_shell.stdin.end();
            //var kill = spawn('kill', [arduinoShell.pid]);
            process.kill(ArduShell.shell.pid, 'SIGKILL');
            ArduShell.shell = null;
        } catch (e) {
            ArduShell.shell = null;
        }
    }
}

/**
* @function 检测文件扩展名
* @description 检测文件扩展名是否在扩展名列表内
* @param fileName {String} 文件名
* @param extensionList {Array} 扩展名列表
* @return Boolean
*/
ArduShell.checkFileNameExtension = (fileName, extensionList) => {
    if (!fileName) return false;
    let fileNameToLowerCase = fileName;
    let fileNameLen = fileNameToLowerCase.length;
    let fileType = fileNameToLowerCase.substring(fileNameToLowerCase.lastIndexOf("."), fileNameLen);
    if (extensionList.includes(fileType)) {
        return true;
    } else {
        return false;
    }
}

/**
* @function 检测文件扩展名
* @description 检测文件扩展名是否为.c/.cpp或.h/.hpp
* @param fileName {String} 文件名
* @return Boolean
*/
ArduShell.isCppOrHpp = (fileName) => {
    return ArduShell.checkFileNameExtension(fileName, [".c", ".cpp", ".h", ".hpp"])
}

/**
* @function 检测文件扩展名
* @description 检测文件扩展名是否为.mix/.xml或.ino
* @param fileName {String} 文件名
* @return Boolean
*/
ArduShell.isMixOrIno = (fileName) => {
    return ArduShell.checkFileNameExtension(fileName, [".mix", ".xml", ".ino"]);
}

/**
* @function 删除给定文件夹下文件
* @description 删除给定文件夹下.c/.cpp和.h/.hpp文件
* @param dir {String} 文件夹路径
* @return void
*/
ArduShell.clearDirCppAndHppFiles = (dir) => {
    if (fs.existsSync(dir)) {
        let libDir = fs.readdirSync(dir);
        for (let i = 0; i < libDir.length; i++) {
            if (ArduShell.isCppOrHpp(libDir[i])) {
                fs.unlinkSync(dir + libDir[i]);
            }
        }
    }
}

/**
* @function 拷贝文件
* @description 拷贝给定文件夹下.c/.cpp和.h/.hpp文件到目标目录
* @param oldDir {String} 起始文件夹路径
* @param newDir {String} 目标文件夹路径
* @return void
*/
ArduShell.copyHppAndCppFiles = (oldDir, newDir) => {
    if (fs.existsSync(oldDir) && fs.existsSync(newDir)) {
        let oldLibDir = fs.readdirSync(oldDir);
        for (let i = 0; i < oldLibDir.length; i++) {
            if (ArduShell.isCppOrHpp(oldLibDir[i])) {
                try {
                    fs.copyFileSync(oldDir + oldLibDir[i], newDir + oldLibDir[i]);
                } catch (e) {
                    console.log(e);
                }
            }
        }
    }
}

/**
* @function 运行一个cmd命令
* @description 输入编译或上传的cmd命令
* @param cmd {String} 输入的cmd命令
* @return void
*/
ArduShell.runCmd = (layerNum, type, cmd, sucFunc) => {
    const code = MFile.getCode();
    const codePath = path.resolve(Env.clientPath, './testArduino/testArduino.ino');
    fs_extra.outputFile(codePath, code)
    .then(() => {
        const testArduinoDirPath = path.resolve(Env.clientPath, './testArduino');
        ArduShell.clearDirCppAndHppFiles(testArduinoDirPath);
        const nowFilePath = Title.getFilePath();
        if (fs_extend.isfile(nowFilePath) && ArduShell.isMixOrIno(nowFilePath)) {
            const nowDirPath = path.dirname(nowFilePath);
            ArduShell.copyHppAndCppFiles(nowDirPath, testArduinoDirPath);
        }

        let startTime = Number(new Date());
        ArduShell.shell = child_process.exec(cmd, { maxBuffer: 4096 * 1000000 }, (error, stdout, stderr) => {
            if (error !== null) {
                console.log("exec error" + error);
            }
        })

        ArduShell.shell.stdout.on('data', (data) => {
            if (data.length < 1000) {
                StatusBar.addValue(data, true);
            }
        });

        ArduShell.shell.stderr.on('data', (data) => {
            try {
                data = data.replace(/(_[0-9A-F]{2}_[0-9A-F]{2}_[0-9A-F]{2})+/g, function (s) { return decodeURIComponent(s.replace(/_/g, '%')); });
            } catch (error) {
                console.log(error);
            }
            StatusBar.addValue(data, true);
        });

        ArduShell.shell.on('close', (code) => {
            layer.close(layerNum);
            let timeCost = parseInt((Number(new Date()) - startTime) / 1000),
            timeCostSecond = timeCost % 60,
            timeCostMinute = parseInt(timeCost / 60),
            timeCostStr = (timeCostMinute ? timeCostMinute + "m" : "") + timeCostSecond + "s";
            if (code === 0) {
                const message = (type === 'compile' ? indexText["编译成功"] : indexText["上传成功"]);
                StatusBar.addValue("==" + message + "(" + indexText["用时"] + " " + timeCostStr + ")==\n", true);
                layer.msg(message + '！', {
                        time: 1000
                    });
                sucFunc();
            } else {
                // code = 1 用户终止运行
                const message = (type === 'compile' ? indexText["编译失败"] : indexText["上传失败"]);
                StatusBar.addValue("==" + message + "==\n", true);
            }
            StatusBar.scrollToTheBottom();
        });
    })
    .catch((error) => {
        console.log(error);
        layer.close(layerNum);
    });
}

ArduShell.saveBinOrHex = function (writePath) {
    ArduShell.writeFile(Env.clientPath + "/mixlyBuild", writePath);
}

ArduShell.writeFile = function (readPath, writePath) {
    ArduShell.compile(function () {
        window.setTimeout(function () {
            const layerNum = layer.open({
                type: 1,
                title: indexText['保存中'] + '...',
                content: $('#mixly-loader-div'),
                shade: LayerExtend.shade,
                resize: false,
                closeBtn: 0,
                success: function () {
                    $(".layui-layer-page").css("z-index", "198910151");
                    $("#mixly-loader-btn").off("click").click(() => {
                        layer.close(layerNum);
                        ArduShell.cancel();
                    });
                    window.setTimeout(function () {
                        try {
                            readPath = readPath.replace(/\\/g, "/");
                            writePath = writePath.replace(/\\/g, "/");
                        } catch (e) {
                            console.log(e);
                        }
                        try {
                            let writeDirPath = writePath.substring(0, writePath.lastIndexOf("."));
                            let writeFileName = writePath.substring(writePath.lastIndexOf("/") + 1, writePath.lastIndexOf("."));
                            let writeFileType = writePath.substring(writePath.lastIndexOf(".") + 1);
                            if (!fs.existsSync(writeDirPath)) {
                                fs.mkdirSync(writeDirPath);
                            }
                            if (fs.existsSync(writePath)) {
                                fs.unlinkSync(writePath);
                            }
                            let readBinFilePath = readPath + "/testArduino.ino." + writeFileType;
                            let binFileData = fs.readFileSync(readBinFilePath);
                            fs.writeFileSync(writePath, binFileData);
                            let binFileType = [
                                ".eep",
                                ".hex",
                                ".with_bootloader.bin",
                                ".with_bootloader.hex",
                                ".bin",
                                ".elf",
                                ".map",
                                ".partitions.bin",
                                ".bootloader.bin"
                            ]
                            for (let i = 0; i < binFileType.length; i++) {
                                let readFilePath = readPath + "/testArduino.ino" + binFileType[i];
                                let writeFilePath = writeDirPath + "/" + writeFileName + binFileType[i];
                                if (fs.existsSync(readFilePath)) {
                                    let binData = fs.readFileSync(readFilePath);
                                    fs.writeFileSync(writeFilePath, binData);
                                }
                            }
                            layer.msg(indexText['保存成功'] + '！', {
                                time: 1000
                            });
                        } catch (e) {
                            console.log(e);
                            StatusBar.addValue(e + "\n", true);
                        }
                        layer.close(layerNum);
                    }, 500);
                },
                end: function () {
                    $('#mixly-loader-div').css('display', 'none');
                    $("layui-layer-shade" + layerNum).remove();
                    $("#mixly-loader-btn").off("click");
                }
            });
        }, 1000);
    });
}

ArduShell.showUploadBox = function (filePath) {
    const dirPath = path.dirname(filePath);
    if (fs_extend.isdir(dirPath)) {
        filePath = path.resolve(dirPath, './' + path.basename(filePath, path.extname(filePath)));
    }
    const layerNum = layer.msg(indexText['所打开文件可直接上传'], {
        time: -1,
        btn: [indexText['取消'], indexText['上传']],
        shade: LayerExtend.shade,
        btnAlign: 'c',
        yes: function () {
            layer.close(layerNum);
            ArduShell.binFilePath = '';
            layer.msg(indexText['已取消上传'], {
                time: 1000
            });
        },
        btn2: function () {
            layer.close(layerNum);
            ArduShell.uploadWithBinOrHex(filePath);
        },
        end: function () {
            ArduShell.binFilePath = '';
        }
    });
}

ArduShell.uploadWithBinOrHex = function (path) {
    layer.closeAll();
    ArduShell.binFilePath = path;
    ArduShell.initUpload();
}
})();