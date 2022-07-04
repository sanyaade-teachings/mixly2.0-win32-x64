(() => {

goog.require('Mixly.Config');
goog.require('Mixly.StatusBar');
goog.require('Mixly.Modules');
goog.require('Mixly.LayerExtend');
goog.require('Mixly.Env');
goog.require('Mixly.Boards');
goog.require('Mixly.MFile');
goog.require('Mixly.Electron.Serial');
goog.provide('Mixly.Electron.BU');

const {
    Electron,
    Config,
    StatusBar,
    Modules,
    LayerExtend,
    Env,
    Boards,
    MFile
} = Mixly;

const { BU, Serial } = Electron;
const { BOARD } = Config;

var downloadShell = null;

Modules.iconvLite = require('iconv-lite');

const {
    fs,
    iconvLite,
    os,
    lodash_fp,
    child_process,
    path
} = Modules;

BU.uploading = false;

BU.burning = false;

BU.uploadType = "";

BU.uploadVolumeName = "";

BU.uploadFileType = "";

BU.uploadFilePath = "";

BU.uploadCommand = "";

BU.burnCommand = "";

BU.uploadAndCopyLib = false;

function isExitsFunction(funcName) {
    try {
        if (typeof (eval(funcName)) == "function") {
            return true;
        }
    } catch (e) { }
    return false;
}

function replaceWithReg(str, newData, type) {
    if (str) {
        try {
            var re = new RegExp("{[\s]*" + type + "[\s]*}", "gim");
            return str.replace(re, newData);
        } catch (e) {
            return str;
        }
    }
    return str;
}

function copyFileWithName(oldPath, newPath, filesName) {
    for (var i = 0; i < filesName.length; i++) {
        try {
            if (fs.existsSync(oldPath + "/" + filesName[i])) {
                fs.copyFileSync(oldPath + "/" + filesName[i], newPath + "/" + filesName[i]);
            }
        } catch (e) {
            console.log(e);
        }
    }
}

/**
* @function 读取json并获取相关数据
* @description 读取BOARD，从中获取uploadFilePath、uploadFileType、uploadVolumeName、burnCommand、uploadCommand
* @return void
*/
BU.readConfigAndSet = function () {
    const selectedBoardKey = Boards.getSelectedBoardKey();
    let burn, upload;
    if (BOARD.burn[selectedBoardKey])
        burn = { ...BOARD.burn[selectedBoardKey] };
    else
        burn = { ...BOARD.burn };
    if (BOARD.upload[selectedBoardKey])
        upload = { ...BOARD.upload[selectedBoardKey] };
    else
        upload = { ...BOARD.upload };

    if (upload?.filePath) {
        BU.uploadFilePath = upload.filePath;
        try {
            BU.uploadFilePath = BU.uploadFilePath.replace(/\\/g, "/");
        } catch (e) {
            console.log(e);
        }
        BU.uploadFilePath = replaceWithReg(BU.uploadFilePath, Env.clientPath, "path");
        BU.uploadFilePath = replaceWithReg(BU.uploadFilePath, Env.indexPath, "indexPath");
        if (BU.uploadFilePath.toLowerCase().indexOf(".py") != -1) {
            BU.uploadFileType = "py";
        } else {
            BU.uploadFileType = "hex";
        }
    } else {
        BU.uploadFileType = "py";
        BU.uploadFilePath = Env.clientPath + "/" + "mpbuild/main.py";
    }
    if (upload?.type) {
        BU.uploadType = upload.type;
    } else {
        BU.uploadType = "ampy";
    }
    if (BU.uploadType == "volumeLabel") {
        if (Env.currentPlatform == "darwin" || Env.currentPlatform == "linux") {
            if (typeof upload?.volumeName == "string") {
                BU.uploadVolumeName = upload.volumeName;
            } else if (typeof upload?.volumeName == "object") {
                BU.uploadVolumeName = upload.volumeName[0];
                for (var i = 1; i < upload.volumeName.length; i++) {
                    BU.uploadVolumeName += "/" + upload.volumeName[i];
                }
            } else {
                BU.uploadVolumeName = "CIRCUITPY";
            }
        } else {
            if (typeof upload?.volumeName == "string") {
                BU.uploadVolumeName = "VolumeName='" + upload.volumeName + "'";
            } else if (typeof upload?.volumeName == "object") {
                BU.uploadVolumeName = "VolumeName='" + upload.volumeName[0] + "'";
                for (var i = 1; i < upload.volumeName.length; i++) {
                    BU.uploadVolumeName += " or VolumeName='" + upload.volumeName[i] + "'";
                }
            } else {
                BU.uploadVolumeName = "VolumeName='CIRCUITPY'";
            }
        }
    }
    if (burn?.command) {
        BU.burnCommand = burn.command;
        try {
            BU.burnCommand = BU.burnCommand.replace(/\\/g, "/");
        } catch (e) {
            console.log(e);
        }
        var pyToolName = ["esptool", "kflash", "stm32loader", "stm32bl"];
        var pyToolPath = "{path}/mixpyBuild/win_python3/Lib/site-packages/"
        if (Env.currentPlatform == "darwin" || Env.currentPlatform == "linux") {
            pyToolPath = "{path}/pyTools/";
        }
        for (var i = 0; i < pyToolName.length; i++) {
            if (BU.burnCommand.indexOf("\"") != -1) {
                BU.burnCommand = replaceWithReg(BU.burnCommand, Env.python3Path + "\" \"" + pyToolPath + pyToolName[i] + ".py", pyToolName[i]);
            } else {
                BU.burnCommand = replaceWithReg(BU.burnCommand, Env.python3Path + " " + pyToolPath + pyToolName[i] + ".py", pyToolName[i]);
            }
        }
        BU.burnCommand = replaceWithReg(BU.burnCommand, Env.clientPath, "path");
        BU.burnCommand = replaceWithReg(BU.burnCommand, Env.indexPath, "indexPath");
        console.log('烧录指令:', BU.burnCommand);
    }
    if (upload?.command) {
        BU.uploadCommand = upload.command;
        try {
            BU.uploadCommand = BU.uploadCommand.replace(/\\/g, "/");
        } catch (e) {
            console.log(e);
        }
        if (Env.currentPlatform == "darwin" || Env.currentPlatform == "linux") {
            BU.uploadCommand = replaceWithReg(BU.uploadCommand, Env.python3Path + "\" \"{path}/pyTools/ampy/cli.py", "ampy");
        } else {
            BU.uploadCommand = replaceWithReg(BU.uploadCommand, Env.python3Path + "\" \"{path}/mixpyBuild/win_python3/Lib/site-packages/ampy/cli.py", "ampy");
        }
        console.log('上传指令:', BU.uploadCommand);
        BU.uploadCommand = replaceWithReg(BU.uploadCommand, Env.clientPath, "path");
        BU.uploadCommand = replaceWithReg(BU.uploadCommand, Env.indexPath, "indexPath");

        if (BOARD.upload?.reset) {
            let resetStr = '{}';
            try {
                resetStr = JSON.stringify(BOARD.upload.reset);
                resetStr = resetStr.replaceAll('\"', '\\\"')
            } catch (e) {
                console.log(e);
            }
            console.log('复位指令:', resetStr)
            BU.uploadCommand = replaceWithReg(BU.uploadCommand, resetStr, "reset");
        }
    }
    if (upload?.copyLib) {
        BU.uploadAndCopyLib = upload.copyLib;
    }
}

try {
    /*
    if (Env.currentPlatform === "darwin" || Env.currentPlatform === "linux") {
        child_process.exec('which python3', function (error, stdout, stderr) {
            if (error || stdout == null) {
                Env.python3Path = '/usr/local/bin/python3';
            } else {
                Env.python3Path = stdout.replace("\n", "");
            }
            console.log(Env.python3Path);
            BU.readConfigAndSet();
        });
    } else {
        BU.readConfigAndSet();
    }
    */
    if (Env.currentPlatform !== "win32") {
        if (fs.existsSync("/usr/local/bin/python3")) {
            Env.python3Path = '/usr/local/bin/python3';
        }
        console.log(Env.python3Path);
    }
} catch (e) {
    console.log(e);
}

window.addEventListener('DOMContentLoaded', () => {
    BU.readConfigAndSet();
});

/**
* @function 烧录或上传时判断是否有多个设备
* @description 判断是否有多个设备，如果存在，则弹出设备选择框，若不存在，则开始一个烧录或上传过程
* @param burn {Boolean} 烧录或上传，true - 烧录，false - 上传
* @param addAllOption {Boolean} 是否在串口下拉框内添加【全部】选项，true - 添加，false - 不添加
* @return void
*/
BU.checkNumOfSerialPort = function (ports, burn, addAllOption, command) {
    var form = layui.form;
    const $devNames = $('#mixly-selector-type');
    var old_Device = $('#mixly-selector-type option:selected').val();
    $devNames.empty();
    lodash_fp.map(v => {
        if (v.name != undefined && v.name != '') {
            if (`${v.name}` == old_Device) {
                $devNames.append($(`<option value="${v.name}" selected>${v.name}</option>`));
            } else {
                $devNames.append($(`<option value="${v.name}">${v.name}</option>`));
            }
        }
    }, ports);

    form.render();

    var device_num = document.getElementById("mixly-selector-type").length;

    if (device_num > 1 && addAllOption) {
        if (old_Device == 'all') {
            $devNames.append('<option value="all" selected>' + indexText['全部'] + '</option>');
        } else {
            $devNames.append('<option value="all">' + indexText['全部'] + '</option>');
        }
        device_num++;
    } else {
        addAllOption = false;
    }

    form.render();

    if (device_num > addAllOption) {
        if (burn)
            BU.burning = true;
        else
            BU.uploading = true;
    }
    if (device_num == addAllOption) {
        layer.msg(indexText['无可用设备'] + '!', {
            time: 1000
        });
        BU.burning = false;
        BU.uploading = false;
    } else if (device_num == 1 + addAllOption) {
        const layerNum = layer.open({
            type: 1,
            title: (burn ? indexText['烧录中'] + '...' : indexText['上传中'] + '...'),
            content: $('#mixly-loader-div'),
            shade: Mixly.LayerExtend.shade,
            resize: false,
            closeBtn: 0,
            success: function () {
                $(".layui-layer-page").css("z-index","198910151");
                $("#mixly-loader-btn").off("click").click(() => {
                    layer.close(layerNum);
                    BU.cancel();
                });
            },
            end: function () {
                $('#mixly-loader-div').css('display', 'none');
                $("#layui-layer-shade" + layerNum).remove();
                $("#mixly-loader-btn").off("click");
            }
        });
        var com_data = $('#mixly-selector-type option:selected').val();
        if (burn) {
            BU.burnByCmd(com_data, command);
        } else {
            BU.uploadByCmd(com_data, command);
        }
    } else {
        let initBtnClicked = false;
        layui.use(['layer', 'form'], function () {
            var layer = layui.layer;
            const layerNum = layer.open({
                type: 1,
                id: "serial-select",
                title: indexText['检测到多个串口，请选择：'],
                area: ['350px', '150px'],
                content: $('#mixly-selector-div'),
                shade: Mixly.LayerExtend.shade,
                resize: false,
                closeBtn: 0,
                success: function (layero) {
                    $('#serial-select').css("height","195px");
                    $(".layui-layer-page").css("z-index","198910151");
                    $("#mixly-selector-btn1").off("click").click(() => {
                        layer.close(layerNum);
                        BU.cancel();
                    });
                    $("#mixly-selector-btn2").off("click").click(() => {
                        layer.close(layerNum);
                        initBtnClicked = true;
                    });
                },
                end: function () {
                    $('#mixly-selector-div').css("display","none");
                    $("#layui-layer-shade" + layerNum).remove();
                    if (initBtnClicked) {
                        BU.initWithDropdownBox();
                    }
                }
            });
        });
    }
}

BU.checkNumOfDisks = function (stdout, path, pyCode, portSelect, addAllOption) {
    var wmicResult = stdout;
    wmicResult = wmicResult.replace(/\s+/g, "");
    wmicResult = wmicResult.replace("DeviceID", "");
    // wmicResult = 'G:K:F:';
    let result = wmicResult.split(':');
    console.log(result);
    var pathAdd = (Env.currentPlatform == "win32") ? ':' : '';
    if (stdout.indexOf(":") != stdout.lastIndexOf(":")) {
        var form = layui.form;
        var device_Names = $('#mixly-selector-type');
        var old_Device = $('#mixly-selector-type option:selected').val();
        device_Names.empty();
        for (var i = 0; i < result.length; i++) {
            if (result[i]) {
                if (old_Device == result[i] + pathAdd) {
                    device_Names.append('<option value="' + result[i] + pathAdd + '" selected>' + result[i] + pathAdd + '</option>');
                } else {
                    device_Names.append('<option value="' + result[i] + pathAdd + '">' + result[i] + pathAdd + '</option>');
                }
            }
        }
        if (addAllOption) {
            if (old_Device == 'all') {
                device_Names.append('<option value="all" selected>' + indexText['全部'] + '</option>');
            } else {
                device_Names.append('<option value="all">' + indexText['全部'] + '</option>');
            }
        }
        form.render();
        let initBtnClicked = false;
        const layerNum = layer.open({
            type: 1,
            id: "serial-select",
            title: indexText['检测到多个同类型设备，请选择：'],
            area: ['350px', '150px'],
            content: $('#mixly-selector-div'),
            shade: Mixly.LayerExtend.shade,
            resize: false,
            closeBtn: 0,
            success: function (layero) {
                $('#serial-select').css('height', '195px');
                $(".layui-layer-page").css("z-index","198910151");
                $("#mixly-selector-btn1").off("click").click(() => {
                    layer.close(layerNum);
                    BU.cancel();
                });
                $("#mixly-selector-btn2").off("click").click(() => {
                    layer.close(layerNum);
                    initBtnClicked = true;
                });
            },
            end: function () {
                $('#mixly-selector-div').css('display', 'none');
                $("#layui-layer-shade" + layerNum).remove();
                if (initBtnClicked) {
                    BU.initWithDropdownBox();
                }
                $("#mixly-selector-btn2").off("click");
                $("#mixly-selector-btn1").off("click");
            }
        });
    } else {
        const layerNum = layer.open({
            type: 1,
            title: indexText['上传中'] + '...',
            content: $('#mixly-loader-div'),
            shade: Mixly.LayerExtend.shade,
            resize: false,
            closeBtn: 0,
            success: function () {
                BU.writeAndCopyFile(path, result[0] + pathAdd + "/" + basename(path), pyCode, portSelect);
                $("#mixly-loader-btn").off("click").click(() => {
                    layer.close(layerNum);
                    BU.cancel();
                });
            },
            end: function () {
                $('#mixly-selector-div').css('display', 'none');
                $("#layui-layer-shade" + layerNum).remove();
                $("#mixly-loader-btn").off("click");
            }
        });
    }
    
}

BU.writeAndCopyFile = function (writeFilePath, copyFilePath, pyCode, portSelect) {
    var code = "";
    if (pyCode) {
        code = MFile.getCode('py');
    } else {
        code = MFile.getHex();
    }

    if (BU.uploadAndCopyLib) {
        let oldLibPath = BU.uploadFilePath.substring(0, BU.uploadFilePath.lastIndexOf('/'));
        let newLibPath = copyFilePath.substring(0, copyFilePath.lastIndexOf('/'));
        let pyFileArr = BU.copyLib(code);
        console.log(oldLibPath);
        console.log(newLibPath);
        console.log(pyFileArr);
        copyFileWithName(oldLibPath, newLibPath, pyFileArr);
    }

    BU.writeFile(writeFilePath, code, function (err) {
        //写入文件出错时执行
        BU.writeFile(copyFilePath, code, BU.errFunc, BU.doFunc, portSelect)
    }, function () {
        BU.copyFile(writeFilePath, copyFilePath, function () {
            //写入文件出错时执行
            BU.writeFile(copyFilePath, code, BU.errFunc, BU.doFunc, portSelect)
        }, BU.doFunc, portSelect);
    }, portSelect);
}

BU.writeFile = function (path, data, errFunc, doFunc, portSelect) {
    fs.writeFile(path, data, 'utf8', function (err) {
        //如果err=null，表示文件使用成功，否则，表示希尔文件失败
        if (err) {
            errFunc(err);
        } else if (!BU.uploading) {
            layer.closeAll('page');
            $('#mixly-loader-div').css('display', 'none');
            return;
        } else {
            doFunc(portSelect);
        }
    })
}

BU.copyFile = function (oldPath, newPath, errFunc, doFunc, portSelect) {
    fs.copyFile(oldPath, newPath, (err) => {
        if (err) {
            errFunc(err);
        } else if (!BU.uploading) {
            layer.closeAll('page');
            $('#mixly-loader-div').css('display', 'none');
            return;
        } else {
            doFunc(portSelect);
        }
        BU.uploading = false;
    });
}

BU.errFunc = function (err) {
    //写入文件出错时执行
    layer.closeAll('page');
    $('#mixly-loader-div').css('display', 'none');
    layer.msg(indexText['写文件出错了，错误是：'] + err, {
        time: 1000
    });
    Mixly.StatusBar.setValue(indexText['写文件出错了，错误是：'] + err + '\n', true);
    Mixly.StatusBar.show(1);
    console.log(indexText['写文件出错了，错误是：'] + err);
    BU.uploading = false;
}

BU.doFunc = function (portSelect) {
    //写入文件成功时执行
    layer.closeAll('page');
    $('#mixly-loader-div').css('display', 'none');
    layer.msg(indexText['上传成功'] + '!', {
        time: 1000
    });
    Mixly.StatusBar.show(1);
    Serial.connect(Serial.uploadPorts[0].name, null, (opened) => {
        if (opened)
            Serial.writeCtrlD(Serial.uploadPorts[0].name);
    });
    BU.uploading = false;
}

/**
* @function 上传代码
* @description 通过盘符名称获取盘符号并拷贝某一文件（.hex | .py）到此盘符下
* @param VolumeName {String} 所要查找盘符的名称
* @param path {String} 所要拷贝文件的路径
* @param pyCode {Boolean} 上传文件为hex或py，true - 上传文件为py，false - 上传文件为hex
* @param portSelect {Array | String} 通过串口的VID和PID获取对应串口，当为all时，则获取全部串口
* @param addAllOption {Boolean} 是否在串口下拉框内添加【全部】选项，true - 添加，false - 不添加
* @return void
*/
BU.uploadWithVolumeName = function (VolumeName, path, pyCode, portSelect, addAllOption) {
    let dirPath = path.substring(0, path.lastIndexOf('/'));
    if (!(fs.existsSync(dirPath)
        && fs.statSync(dirPath).isDirectory())) {
        try {
            fs.mkdirSync(path.substring(0, path.lastIndexOf('/')));
        } catch(e) {
            console.log(e);
        }
    }
    if (Env.currentPlatform == "darwin" || Env.currentPlatform == "linux") {
        let diskPath = '/Volumes/';
        let addChar = ' ';
        if (Env.currentPlatform == "linux") {
            diskPath = '/media/';
            addChar = '';
        }
        let stdout = '';
        let result = null;
        result = VolumeName.split('/');
        let deviceNum = 0;
        for (var i = 0; i < result.length; i++) {
            if (result[i] == '') continue;
            for (var j = 0; ; j++) {
                try {
                    if (fs.existsSync(diskPath + result[i] + (j == 0 ? '' : (addChar + j)))
                        && fs.statSync(diskPath + result[i] + (j == 0 ? '' : (addChar + j))).isDirectory()) {
                        stdout += diskPath + result[i] + (j == 0 ? '' : (addChar + j)) + ':';
                        deviceNum++;
                    } else if (fs.existsSync(diskPath + os.userInfo().username + '/' + result[i] + (j == 0 ? '' : (addChar + j)))
                        && fs.statSync(diskPath + os.userInfo().username + '/' + result[i] + (j == 0 ? '' : (addChar + j))).isDirectory()) {
                        stdout += diskPath + os.userInfo().username + '/' + result[i] + (j == 0 ? '' : (addChar + j)) + ':';
                        deviceNum++;
                    }  else {
                        break;
                    }
                } catch (e) {
                    break;
                }
            }
        }
        if (deviceNum == 0) {
            layer.msg(indexText['无可用设备'] + '!', {
                time: 1000
            });
            BU.uploading = false;
            return;
        }
        BU.checkNumOfDisks(stdout, path, pyCode, portSelect, addAllOption);
    } else {
        child_process.exec('wmic logicaldisk where "' + VolumeName + '" get DeviceID', function (err, stdout, stderr) {
            if (err || stderr) {
                layer.closeAll('page');
                $('#mixly-loader-div').css('display', 'none');
                console.log("root path open failed" + err + stderr);
                layer.msg(indexText['无可用设备'] + '!', {
                    time: 1000
                });
                BU.uploading = false;
                return;
            }
            BU.checkNumOfDisks(stdout, path, pyCode, portSelect, addAllOption);
        });
    }
}

/**
* @function 上传代码
* @description 通过下拉列表获取盘符号并拷贝某一文件（.hex | .py）到此盘符下
* @param path {String} 所要拷贝文件的路径
* @param pyCode {Boolean} 上传文件为hex或py，true - 上传文件为py，false - 上传文件为hex
* @param portSelect {Array | String} 通过串口的VID和PID获取对应串口，当为all时，则获取全部串口
* @return void
*/
BU.uploadWithDropdownBox = async function (path, pyCode, portSelect) {
    BU.uploading = true;
    const layerNum = layer.open({
        type: 1,
        title: indexText['上传中'] + '...',
        content: $('#mixly-loader-div'),
        shade: Mixly.LayerExtend.shade,
        resize: false,
        closeBtn: 0,
        success: function () {
            $(".layui-layer-page").css("z-index","198910151");
            $("#mixly-loader-btn").off("click").click(() => {
                layer.close(layerNum);
                BU.cancel();
            });
        },
        end: function () {
            $('#mixly-loader-div').css('display', 'none');
            $("#layui-layer-shade" + layerNum).remove();
            $("#mixly-loader-btn").off("click");
        }
    });

    if (Serial.object && Serial.object.isOpen) {
        await Serial.reset();
    }

    var code = "";
    if (pyCode) {
        code = MFile.getCode('py');
    } else {
        code = MFile.getHex();
    }

    fs.writeFile(path, code, 'utf8', function (err) {
        //如果err=null，表示文件使用成功，否则，表示希尔文件失败
        if (err) {
            layer.closeAll('page');
            $('#mixly-loader-div').css('display', 'none');
            layer.msg(indexText['写文件出错了，错误是：'] + err, {
                time: 1000
            });
            Mixly.StatusBar.setValue(indexText['写文件出错了，错误是：'] + err + '\n', true);
            Mixly.StatusBar.show(1);
            BU.uploading = false;
            return;
        } else if (!BU.uploading) { //如果检测到用户取消上传，则隐藏上传框
            layer.closeAll('page');
            $('#mixly-loader-div').css('display', 'none');
            BU.uploading = false;
            return;
        } else {
            var device_values = $.map($('#mixly-selector-type option'), function (ele) {
                return ele.value;
            });
            var device_num = device_values.length;
            var device_select_name = $('#mixly-selector-type option:selected').val();
            if (device_select_name == "all") {
                var upload_finish_num = 0;
                for (var i = 0; i < device_num; i++) {
                    if (device_values[i] == "all") {
                        continue;
                    }
                    if (BU.uploadAndCopyLib) {
                        let oldLibPath = BU.uploadFilePath.substring(0, BU.uploadFilePath.lastIndexOf('/'));
                        let newLibPath = device_values[i] + "/";
                        let pyFileArr = BU.copyLib(code);
                        copyFileWithName(oldLibPath, newLibPath, pyFileArr);
                    }
                    fs.copyFile(path, device_values[i] + "/" + basename(path), (err) => {
                        upload_finish_num++;
                        if (err) {
                            layer.msg(indexText['写文件出错了，错误是：'] + err, {
                                time: 1000
                            });
                            Mixly.StatusBar.setValue(indexText['写文件出错了，错误是：'] + err + '\n', true);
                            Mixly.StatusBar.show(1);
                        } else if (BU.uploading) {
                            if (upload_finish_num >= device_num - 1) {
                                layer.msg(indexText['上传成功'] + '!', {
                                    time: 1000
                                });
                                Mixly.StatusBar.show(1);
                                BU.uploading = false;
                            }
                        }
                        if (upload_finish_num >= device_num - 1) {
                            layer.closeAll('page');
                            $('#mixly-loader-div').css('display', 'none');
                        }
                    });
                }
            } else {
                if (BU.uploadVolumeName == "") {
                    BU.runCmd(false, device_select_name, Serial.uploadPortType);
                } else {
                    if (BU.uploadAndCopyLib) {
                        let oldLibPath = BU.uploadFilePath.substring(0, BU.uploadFilePath.lastIndexOf('/'));
                        let newLibPath = device_select_name + "/";
                        let pyFileArr = BU.copyLib(code);
                        copyFileWithName(oldLibPath, newLibPath, pyFileArr);
                    }
                    fs.copyFile(path, device_select_name + "/" + basename(path), (err) => {
                        layer.closeAll('page');
                        $('#mixly-loader-div').css('display', 'none');
                        if (err) {
                            layer.msg(indexText['写文件出错了，错误是：'] + err, {
                                time: 1000
                            });
                            Mixly.StatusBar.setValue(indexText['写文件出错了，错误是：'] + err + '\n', true);
                            Mixly.StatusBar.show(1);
                        } else if (BU.uploading) {
                            layer.msg(indexText['上传成功'] + '!', {
                                time: 1000
                            });
                            Mixly.StatusBar.show(1);
                        }
                        BU.uploading = false;
                    });
                }
            }

        }
    })
}

function basename(str) {
    var idx = 0;
    idx = str.lastIndexOf('/')
    idx = idx > -1 ? idx : str.lastIndexOf('/')
    if (idx < 0) {
        return str
    }
    return str.substring(idx + 1);
}

/**
* @function 取消烧录或上传
* @description 取消烧录或上传过程
* @return void
*/
BU.cancel = function () {
    layer.closeAll('page');
    $('#mixly-selector-div').css('display', 'none');
    $('#mixly-loader-div').css('display', 'none');
    if (downloadShell) {
        downloadShell.stdout.end();
        //downloadShell.stdin.end();
        downloadShell.kill("SIGTERM");
        downloadShell = null;
    }
    if (BU.uploading) {
        BU.uploading = false;
        layer.msg(indexText['已取消上传'], {
            time: 1000
        });
    } else if (BU.burning) {
        BU.burning = false;
        layer.msg(indexText['已取消烧录'], {
            time: 1000
        });
    }
}

/**
* @function 开始烧录
* @description 开始一个烧录过程
* @param portSelect {Array | String} 通过串口的VID和PID获取对应串口，当为all时，则获取全部串口
* @return void
*/
BU.burn = function () {
    BU.checkNumOfSerialPort(Serial.burnPorts, true, true, BU.burnCommand);
}

/**
* @function 判断当前环境，以开始一个烧录过程
* @description 判断当前环境(当前界面处在Mixly2.0或浏览器中)，以开始一个烧录过程
* @return void
*/
BU.initBurn = function () {
    if (BU.burning) return;
    Mixly.StatusBar.setValue('', true);
    Mixly.StatusBarPort.tabChange("output");
    BU.burning = true;
    BU.burn();
}

/**
* @function 判断当前环境，以开始一个上传过程
* @description 判断当前环境(当前界面处在Mixly2.0或浏览器中)，以开始一个上传过程
* @return void
*/
BU.initUpload = function () {
    if (BU.uploading) return;
    Mixly.StatusBar.setValue('', true);
    Mixly.StatusBarPort.tabChange("output");
    BU.burning = false;
    if (BU.uploadFileType == "hex") {
        BU.uploading = true;
        BU.uploadWithVolumeName(BU.uploadVolumeName, BU.uploadFilePath, false, Serial.uploadPortType, true);
    } else {
        if (BU.uploadType == "volumeLabel") {
            BU.uploading = true;
            BU.uploadWithVolumeName(BU.uploadVolumeName, BU.uploadFilePath, true, Serial.uploadPortType, true);
        } else {
            const port = Serial.getUploadPortSelectBoxValue();
            BU.uploadWithPort(port, BU.uploadCommand);
        }
    }
}

/**
* @function 判断当前环境，以开始一个上传过程
* @description 判断当前环境(当前界面处在Mixly2.0或浏览器中)，以开始一个上传过程，并从下拉列表中获取所选择的串口
* @return void
*/
BU.initWithDropdownBox = function () {
    if (BU.burning) {
        const layerNum = layer.open({
            type: 1,
            title: indexText['烧录中'] + '...',
            content: $('#mixly-loader-div'),
            shade: Mixly.LayerExtend.shade,
            resize: false,
            closeBtn: 0,
            success: function () {
                $(".layui-layer-page").css("z-index","198910151");
                $("#mixly-loader-btn").off("click").click(() => {
                    layer.close(layerNum);
                    BU.cancel();
                });
            },
            end: function () {
                $('#mixly-loader-div').css('display', 'none');
                $("#layui-layer-shade" + layerNum).remove();
            }
        });
        var portData = $('#mixly-selector-type option:selected').val();
        if (portData == 'all') {
            var device_values = $.map($('#mixly-selector-type option'), function (ele) {
                return ele.value;
            });
            BU.burnByCmd(device_values[0], BU.burnCommand, 0, device_values.length - 1);
        } else {
            //BU.esptoolBurn(com_data, BU.ESPTOOL_COMMAND[boardType]);
            BU.burnByCmd(portData, BU.burnCommand);
        }
    } else {
        if (BU.uploadFileType == "hex") {
            BU.uploadWithDropdownBox(BU.uploadFilePath, false, Serial.uploadPortType);
        } else {
            if (BU.uploadVolumeName == "") {
                const layerNum = layer.open({
                    type: 1,
                    title: indexText['上传中'] + '...',
                    content: $('#mixly-loader-div'),
                    shade: Mixly.LayerExtend.shade,
                    resize: false,
                    closeBtn: 0,
                    success: function () {
                        $(".layui-layer-page").css("z-index","198910151");
                        $("#mixly-loader-btn").off("click").click(() => {
                            layer.close(layerNum);
                            BU.cancel();
                        });
                    },
                    end: function () {
                        $('#mixly-loader-div').css('display', 'none');
                        $("#layui-layer-shade" + layerNum).remove();
                    }
                });
                var portData = $('#mixly-selector-type option:selected').val();
                if (portData == 'all') {
                    var device_values = $.map($('#mixly-selector-type option'), function (ele) {
                        return ele.value;
                    });
                    BU.uploadByCmd(device_values[0], BU.uploadCommand, 0, device_values.length - 1);
                } else {
                    BU.uploadByCmd(portData, BU.uploadCommand);
                }
            } else {
                BU.uploadWithDropdownBox(BU.uploadFilePath, true, Serial.uploadPortType);
            }
        }
    }
}

/**
* @function 运行cmd
* @description 通过所给串口运行用户提供的esptool的cmd指令
* @param com {Array | String} 所选择的串口
* @return void
*/
BU.burnByCmd = function (com, command, currentTimes = 0, totalTimes = 1) {
    Mixly.StatusBar.show(1);
    BU.burning = true;
    if (Serial.object && Serial.object.isOpen) {
        Serial.object.close();
    }
    BU.runCmd(true, com, Serial.burnPortType, command, currentTimes, totalTimes);
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

BU.copyLib = function (code) {
    var uploadLibPath = BU.uploadFilePath.substring(0, BU.uploadFilePath.lastIndexOf('/'));
    var uploadFileName = BU.uploadFilePath.substring(BU.uploadFilePath.lastIndexOf('/') + 1, BU.uploadFilePath.length);

    try {
        if (!fs.existsSync(uploadLibPath)) {
            fs.mkdirSync(uploadLibPath);
        }
        var libFiles = fs.readdirSync(uploadLibPath);
        for (var i = 0; i < libFiles.length; i++) {
            if (libFiles[i] != uploadFileName) {
                try {
                    fs.unlinkSync(uploadLibPath + '/' + libFiles[i]);
                } catch (e) {
                    console.log(e);
                }
            }
        }
    } catch (e) {
        console.log(e);
    }
    var pyFileArr = [];
    pyFileArr = BU.searchLibs(code, pyFileArr);
    return pyFileArr;
}

BU.searchLibs = function (code, libArr) {
    var uploadLibPath = BU.uploadFilePath.substring(0, BU.uploadFilePath.lastIndexOf('/'));
    var arrayObj = new Array();
    code.trim().split("\n").forEach(function (v, i) {
        arrayObj.push(v);
    });
    var moduleName = "";
    var pyFileArr = [];
    for (var i = 0; i < arrayObj.length; i++) {
        if (arrayObj[i].indexOf("from") === 0) {
            moduleName = arrayObj[i].substring(4, arrayObj[i].indexOf("import"));
            moduleName = moduleName.replace(/(^\s*)|(\s*$)/g, "");
        } else if (arrayObj[i].indexOf("from") === 4) {
            moduleName = arrayObj[i].substring(8, arrayObj[i].indexOf("import"));
            moduleName = moduleName.replace(/(^\s*)|(\s*$)/g, "");
        } else if (arrayObj[i].indexOf("import") === 0) {
            moduleName = arrayObj[i].substring(6);
            moduleName = moduleName.replace(/(^\s*)|(\s*$)/g, "");
        } else if (arrayObj[i].indexOf("import") === 4) {
            moduleName = arrayObj[i].substring(10);
            moduleName = moduleName.replace(/(^\s*)|(\s*$)/g, "");
        } else {
            continue;
        }
        var moduleArr = moduleName.split(",");
        for (var j = 0; j < moduleArr.length; j++) {
            moduleArr[j] = moduleArr[j].replace(/(^\s*)|(\s*$)/g, "");
            if (!libArr.includes(moduleArr[j] + '.py') && !libArr.includes(moduleArr[j] + '.mpy')) {
                try {
                    let pyPath = Env.indexPath + '/build/lib/' + moduleArr[j] + '.py',
                        mpyPath = Env.indexPath + '/build/lib/' + moduleArr[j] + '.mpy',
                        commonPyPath = Env.indexPath + '/build/lib/common/' + moduleArr[j] + '.py',
                        commonMpyPath = Env.indexPath + '/build/lib/common/' + moduleArr[j] + '.mpy',
                        oldLibPath = null;
                    if (fs.existsSync(mpyPath))
                        oldLibPath = mpyPath;
                    else if (fs.existsSync(pyPath))
                        oldLibPath = pyPath;
                    else if (fs.existsSync(commonMpyPath))
                        oldLibPath = commonMpyPath;
                    else if (fs.existsSync(commonPyPath))
                        oldLibPath = commonPyPath;
                    if (oldLibPath) {
                        var stat = fs.statSync(oldLibPath);
                        if (stat.isFile()) {
                            const extname = path.extname(oldLibPath);
                            var newLibPath = uploadLibPath + '/' + moduleArr[j] + extname;
                            Mixly.StatusBar.addValue(indexText['拷贝库'] + ' ' + moduleArr[j] + '\n', true);
                            fs.copyFileSync(oldLibPath, newLibPath);
                            if (extname === '.py')
                                pyFileArr.push(moduleArr[j] + extname);
                            libArr.push(moduleArr[j] + extname);
                        }
                    }
                } catch (e) {
                    console.log(e);
                }
            }
        }
    }
    for (var i = 0; i < pyFileArr.length; i++) {
        try {
            code = String(fs.readFileSync(Env.indexPath + '/build/lib/' + pyFileArr[i]));
            libArr = BU.searchLibs(code, libArr);
        } catch (e) {
            console.log(e);
        }
    }
    return libArr;
}

/**
* @function 运行cmd
* @description 通过所给串口运行用户提供的ampy的cmd指令
* @param com {Array | String} 所选择的串口
* @return void
*/
BU.uploadByCmd = async function (com, command, currentTimes = 0, totalTimes = 1) {
    var code = MFile.getCode('py');
    Mixly.StatusBar.show(1);
    BU.uploading = true;

    if (Serial.object && Serial.object.isOpen) {
        await Serial.reset();
    }

    if (BU.uploadAndCopyLib) {
        BU.copyLib(code);
    }

    if (Serial.object && Serial.object.isOpen) {
        Serial.object.close();
    }
    await sleep(100);

    fs.writeFile(BU.uploadFilePath, code, 'utf8', function (err) {
        //如果err=null，表示文件使用成功，否则，表示希尔文件失败
        if (err) {
            layer.closeAll('page');
            $('#mixly-loader-div').css('display', 'none');
            layer.msg(indexText['写文件出错了，错误是：'] + err, {
                time: 1000
            });
            Mixly.StatusBar.setValue(indexText['写文件出错了，错误是：'] + err + '\n', true);
            Mixly.StatusBar.show(1);
            console.log(indexText['写文件出错了，错误是：'] + err);
            BU.uploading = false;
            return;
        } else {
            Mixly.StatusBar.addValue(indexText['上传中'] + '...\n', true);
            BU.runCmd(false, com, Serial.uploadPortType, command, currentTimes, totalTimes);
        }
    })
}

/**
* @function 运行cmd
* @description 通过所给信息运行用户提供的cmd指令
* @param burn {Boolean} 烧录或上传，true - 烧录，false - 上传
* @param com {Array | String} 所选择的串口
* @param portSelect {Array | String} 通过串口的VID和PID获取对应串口，当为all时，则获取全部串口
* @return void
*/
BU.runCmd = function (burn, com, portSelect, command, currentTimes = 0, totalTimes = 1) {
    var now_command = "";
    try {
        if (burn)
            now_command = replaceWithReg(command, com, "com");
        else
            now_command = replaceWithReg(command, com, "com");
    } catch (e) {
        console.log(e);
    }
    console.log(now_command);
    downloadShell = child_process.exec(now_command, function (error, stdout, stderr) {
        currentTimes++;
        if (error !== null) {
            try {
                error = decode(iconvLite.decode(iconvLite.encode(error, "iso-8859-1"), 'gbk'));
            } catch (e) {
                console.log(e);
            }
            console.log("exec error" + error);
            Mixly.StatusBar.addValue(error + "\n", true);
            layer.closeAll('page');
            $('#mixly-loader-div').css('display', 'none');
            BU.burning = false;
            BU.uploading = false;
            return;
        } else {
            if (currentTimes >= totalTimes) {
                BU.burning = false;
                BU.uploading = false;
                layer.msg((burn ? indexText['烧录成功'] + '！' : indexText['上传成功'] + '！'), {
                    time: 1000
                });
                if (!burn) {
                    Mixly.StatusBar.show(1);
                    Serial.connect(com, null, (opened) => {
                        if (opened)
                            Serial.writeCtrlD(com);
                    });
                }
            }
        }
        Mixly.StatusBar.scrollToTheBottom();
        if (currentTimes >= totalTimes) {
            layer.closeAll('page');
            $('#mixly-loader-div').css('display', 'none');
        } else {
            if (BU.uploading || BU.burning) {
                var device_values = $.map($('#mixly-selector-type option'), function (ele) {
                    return ele.value;
                });
                BU.runCmd(burn, device_values[currentTimes], portSelect, command, currentTimes, totalTimes);
            }
        }
    })

    downloadShell.stdout.on('data', function (data) {
        if (BU.uploading || BU.burning) {
            try {
                data = decode(iconvLite.decode(iconvLite.encode(data, "iso-8859-1"), 'gbk'));
            } catch (e) {
                console.log(e);
            }
            Mixly.StatusBar.addValue(data, true);
        }
    });
}


BU.burnWithSpecialBin = () => {

    layui.use(['layer', 'form'], function () {
        let layer = layui.layer;
        let form = layui.form;
        const devNames = $('#mixly-selector-type');
        let oldDevice = $('#mixly-selector-type option:selected').val();
        devNames.empty();
        let firmwareList = BOARD.burn.special;
        let firmwareObj = {};
        for (let i = 0; i < firmwareList.length; i++)
            firmwareObj[firmwareList[i].name] = firmwareList[i].command;
        firmwareList.map(firmware => {
            if (!firmware?.name && !firmware?.command) return;

            if (`${firmware.name}` == oldDevice) {
                devNames.append($(`<option value="${firmware.name}" selected>${firmware.name}</option>`));
            } else {
                devNames.append($(`<option value="${firmware.name}">${firmware.name}</option>`));
            }
        });
        form.render();

        let initBtnClicked = false;

        const layerNum = layer.open({
            type: 1,
            id: "serial-select",
            title: "请选择固件：",
            area: ['350px', '150px'],
            content: $('#mixly-selector-div'),
            shade: Mixly.LayerExtend.shade,
            resize: false,
            closeBtn: 0,
            success: function (layero) {
                $('#serial-select').css('height', '180px');
                $('#serial-select').css('overflow', 'inherit');
                $(".layui-layer-page").css("z-index", "198910151");
                $("#mixly-selector-btn1").off("click").click(() => {
                    layer.close(layerNum);
                });
                $("#mixly-selector-btn2").click(() => {
                    layer.close(layerNum);
                    initBtnClicked = true;
                });
            },
            end: function () {
                $("#mixly-selector-btn1").off("click");
                $("#mixly-selector-btn2").off("click");
                $('#mixly-selector-div').css('display', 'none');
                $(".layui-layer-shade").remove();
                if (initBtnClicked) {
                    let selectedFirmwareName = $('#mixly-selector-type option:selected').val();
                    try {
                        firmwareObj[selectedFirmwareName] = firmwareObj[selectedFirmwareName].replace(/\\/g, "/");
                    } catch (e) {
                        console.log(e);
                    }
                    let pyToolName = ["esptool", "kflash", "stm32loader", "stm32bl"];
                    let pyToolPath = "{path}/mixpyBuild/win_python3/Lib/site-packages/"
                    if (Env.currentPlatform == "darwin" || Env.currentPlatform == "linux") {
                        pyToolPath = "{path}/pyTools/";
                    }
                    for (let i = 0; i < pyToolName.length; i++) {
                        if (firmwareObj[selectedFirmwareName].indexOf("\"") != -1) {
                            firmwareObj[selectedFirmwareName] = replaceWithReg(firmwareObj[selectedFirmwareName], Env.python3Path + "\" \"" + pyToolPath + pyToolName[i] + ".py", pyToolName[i]);
                        } else {
                            firmwareObj[selectedFirmwareName] = replaceWithReg(firmwareObj[selectedFirmwareName], Env.python3Path + " " + pyToolPath + pyToolName[i] + ".py", pyToolName[i]);
                        }
                    }
                    firmwareObj[selectedFirmwareName] = replaceWithReg(firmwareObj[selectedFirmwareName], Env.clientPath, "path");
                    firmwareObj[selectedFirmwareName] = replaceWithReg(firmwareObj[selectedFirmwareName], Env.indexPath, "indexPath");
                    BU.checkNumOfSerialPort(Serial.burnPorts, true, true, firmwareObj[selectedFirmwareName]);
                } else {
                    layer.msg(indexText['已取消烧录'], { time: 1000 });
                }
            }
        });
    });
}

BU.uploadWithPort = (port, command) => {
    if (!port) {
        layer.msg(indexText['无可用设备'] + '!', {
            time: 1000
        });
        return;
    }
    this.upload = () => {
        BU.uploading = true;
        BU.burning = false;
        const layerNum = layer.open({
            type: 1,
            title: indexText['上传中'] + '...',
            content: $('#mixly-loader-div'),
            shade: Mixly.LayerExtend.shade,
            resize: false,
            closeBtn: 0,
            success: function () {
                $(".layui-layer-page").css("z-index","198910151");
                BU.uploadByCmd(port, command);
                $("#mixly-loader-btn").off("click").click(() => {
                    layer.close(layerNum);
                    BU.cancel();
                });
            },
            end: function () {
                $('#mixly-loader-div').css('display', 'none');
                $("layui-layer-shade" + layerNum).remove();
                $("#mixly-loader-btn").off("click");
            }
        });
    }
    Serial.portClose(port, this.upload);
}

})();