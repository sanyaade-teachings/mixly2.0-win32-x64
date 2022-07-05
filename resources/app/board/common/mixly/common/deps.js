(() => {

goog.require('Mixly');
goog.require('Mixly.Env');
goog.require('Mixly.Url');
goog.require('Mixly.Config');
goog.require('Mixly.Modules');

goog.provide('Mixly.Deps');

let { Env, Url, Modules, Config, Deps } = Mixly;
let { BOARD, SOFTWARE } = Config;

let { fs } = Modules;

if (Env.isElectron && BOARD?.filePath && BOARD?.filePath !== "None") {
    let mixStr = fs.readFileSync(BOARD.filePath, "utf8");
    if ('localStorage' in window && window['localStorage'] != null) {
        window.localStorage.setItem(BOARD.boardName, mixStr);
        window.localStorage.setItem(BOARD.boardName + ".filePath", BOARD.filePath);
    }
    history.replaceState({}, "", Url.changeURLArg(window.location.href, "filePath", "None"));
}

Env = {
    ...Env,
    hasSocketServer: SOFTWARE?.socketServer?.enabled ?? false,
    hasCompiler: SOFTWARE?.webCompiler?.enabled ?? false
};

Deps.DEPENDENCY = {
    "electron": [],
    "web": [
        {
            "path": '/web/highcharts.js',
            "provide": ['Highcharts'],
            "require": []
        },{
            "path": '/web/dap.umd.js',
            "provide": ['DAPjs'],
            "require": []
        },{
            "path": '/web/serialport.js',
            "provide": ['WebSerialPort'],
            "require": []
        }
    ],
    "web-socket": {
        "electron": [],
        "web": [
            {
                "path": '/web/highcharts.js',
                "provide": ['Highcharts'],
                "require": []
            }
        ],
        "common": []
    },
    "web-compiler": {
        "electron": [],
        "web": [],
        "common": [
            {
                "path": '/web-compiler/avr-uploader.js',
                "provide": ['AvrUploader'],
                "require": []
            }
        ]
    },
    "node-modules": [],
    "common": [
        {
            "path": '/../ui/layui/layui.js',
            "provide": ['layui'],
            "require": []
        },{
            "path": '/../blockly-core/blockly_compressed.js',
            "provide": ['Blockly'],
            "require": []
        },{
            "path": '/../blockly-core/field_grid_dropdown.js',
            "provide": ['FieldGridDropdown'],
            "require": ['Blockly']
        },{
            "path": '/../blockly-core/field_slider.js',
            "provide": ['FieldSlider'],
            "require": ['Blockly']
        }/*,{
            "path": '/../blockly-core/continuous_toolbox.js',
            "provide": ['ContinuousToolbox', 'ContinuousFlyout', 'ContinuousMetrics'],
            "require": ['Blockly']
        }*/,{
            "path": '/../blockly-core/workspace_search.js',
            "provide": ['WorkspaceSearch'],
            "require": ['Blockly']
        },{
            "path": '/../blockly-core/workspace_backpack.js',
            "provide": ['Backpack'],
            "require": ['Blockly']
        },{
            "path": '/common/lazyload.js',
            "provide": ['LazyLoad'],
            "require": []
        },{
            "path": '/common/microbit-fs.umd.min.js',
            "provide": ['microbitFs'],
            "require": []
        },{
            "path": '/common/base64.min.js',
            "provide": ['Base64'],
            "require": []
        },{
            "path": '/common/sortable.min.js',
            "provide": ['Sortable'],
            "require": []
        },{
            "path": '/common/store.modern.min.js',
            "provide": ['store'],
            "require": []
        },{
            "path": '/common/xscrollbar.js',
            "provide": ['XScrollbar'],
            "require": []
        }
    ]
};

let depsJson = Mixly.Config.get(goog.normalizePath_(goog.basePath + '../mixly/deps.json'), {});

Deps.DEPENDENCY["electron"] = [
    ...Deps.DEPENDENCY["electron"],
    ...depsJson["electron"]
];

Deps.DEPENDENCY["web"] = [
    ...Deps.DEPENDENCY["web"],
    ...depsJson["web"]
];

Deps.DEPENDENCY["common"] = [
    ...Deps.DEPENDENCY["common"],
    ...depsJson["common"]
];

Deps.DEPENDENCY["web-socket"]["common"] = [
    ...Deps.DEPENDENCY["web-socket"]["common"],
    ...depsJson["web-socket"]["common"]
];

Deps.DEPENDENCY["web-compiler"]["common"] = [
    ...Deps.DEPENDENCY["web-compiler"]["common"],
    ...depsJson["web-compiler"]["common"]
];

Deps.addDependency = (dependencyList) => {
    if (typeof dependencyList !== 'object') return;
    for (let i = 0; i < dependencyList.length; i++) {
        const googPath = dependencyList[i].path ?? null;
        const googProvide = dependencyList[i].provide ?? [];
        const googRequire = dependencyList[i].require ?? [];
        if (googPath && googProvide && googRequire)
            goog.addDependency(Mixly.MIXLY_DIR_PATH + googPath, googProvide, googRequire);
    }
}

Deps.initDependency = (dependency) => {
    if (typeof dependency !== 'object') return;
    let defaultDependency = {
        "electron": [],
        "web": [],
        "web-socket": {
            "electron": [],
            "web": [],
            "common": []
        },
        "web-compiler": {
            "electron": [],
            "web": [],
            "common": []
        },
        "common": []
    };

    let config = Object.assign(defaultDependency, dependency);

    //引入公共js文件
    Deps.addDependency(config["common"]);
    //判断当前是否在electron环境下
    if (Env.isElectron) {
        if (Env.hasSocketServer) {
            Deps.addDependency(config["web-socket"]["common"]);
            Deps.addDependency(config["web-socket"]["electron"]);
        } else if (Mixly.Env.hasCompiler) {
            Deps.addDependency(config["web-compiler"]["common"]);
            Deps.addDependency(config["web-compiler"]["electron"]);
        } else {
            Deps.addDependency(config["electron"]);
        }
    } else {
        if (Env.hasSocketServer) {
            Deps.addDependency(config["web-socket"]["common"]);
            Deps.addDependency(config["web-socket"]["web"]);
        } else if (Env.hasCompiler) {
            Deps.addDependency(config["web"]);
            Deps.addDependency(config["web-compiler"]["common"]);
            Deps.addDependency(config["web-compiler"]["web"]);
        } else {
            Deps.addDependency(config["web"]);
        }
    }
}

Deps.initDependency(Deps.DEPENDENCY);

goog.require('Mixly.Loading');
goog.require('Mixly.JSFuncs');
goog.require('Mixly.Interface');
goog.require('Blockly');
goog.require('FieldGridDropdown');
goog.require('FieldSlider');

if (Env.isElectron) {
    goog.require('Mixly.Electron.Loader');
    goog.require('Mixly.Electron.File');
    if (Env.hasSocketServer) {
        goog.require('Mixly.WebSocket.Socket');
    } else if (Env.hasCompiler) {
        goog.require('Mixly.WebCompiler.Compiler');
        goog.require('AvrUploader');
    } else {
        goog.require('Mixly.Electron.ArduShell');
        goog.require('Mixly.Electron.Serial');
        goog.require('Mixly.Electron.BU');
        goog.require('Mixly.Electron.PythonShell');
        goog.require('Mixly.Electron.Events');
    }
} else {
    if (Env.hasSocketServer) {
        goog.require('Mixly.WebSocket.Socket');
    } else {
        if (Env.hasCompiler) {
            goog.require('Mixly.WebCompiler.Compiler');
            goog.require('AvrUploader');
        }
        goog.require('Highcharts');
        goog.require('Mixly.Web.Serial');
        if (BOARD?.nav?.upload) {
            goog.require('Mixly.Web.Utilities');
            goog.require('Mixly.Web.Esptool');
            goog.require('Mixly.Web.Ampy');
            goog.require('Mixly.Web.BU');
            goog.require('DAPjs');
        }
    }
    goog.require('Mixly.Web.File');
}

})();