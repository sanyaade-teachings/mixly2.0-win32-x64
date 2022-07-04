(() => {

Mixly.require({
    "common": [
        "layui",
        "Mixly.LayerExtend",
        "Mixly.Config",
        "Mixly.XML",
        "Mixly.Env",
        "Mixly.ToolboxSearcher"
    ]
});

goog.provide('Mixly.Boards');

const {
    Config,
    LayerExtend,
    XML,
    Env,
    ToolboxSearcher,
    Electron = {},
    Boards
} = Mixly;

const { form, element } = layui;

const { BOARD } = Config;

/**
 *  "board": {
 *      "key": string | null,
 *      "config": object | null,
 *      "default": object | null
 *  }
 * 
 **/
Boards.INFO = {};

Boards.NAME = [];

Boards.HAS_CONFIG_SETTING = false;

Boards.init = () => {
    if (BOARD.board) {
        let num = 0;
        for (let i in BOARD.board) {
            Boards.NAME.push(i);
            const boardInfo = BOARD.board[i];
            if (typeof boardInfo === 'string') {
                Boards.INFO[i] = {
                    key: boardInfo,
                    config: null,
                    default: null,
                    ignore: []
                };
                num++;
            } else if (typeof boardInfo === 'object') {
                const { key = null, config = null, ignore = [] } = BOARD.board[i];
                let defaultConfig = null;
                if (typeof config === 'object') {
                    defaultConfig = {};
                    for (let j in config) {
                        if (typeof config[j] === 'object' && typeof config[j][0] === 'object') {
                            //defaultConfig[j] = { ...config[j][0] };
                            defaultConfig[j] = config[j][0].key;
                        }
                    }
                } else {
                    num++;
                }
                Boards.INFO[i] = { key, config, ignore, default: defaultConfig };
            }
        }
        if (num === Boards.NAME.length)
            Boards.HAS_CONFIG_SETTING = false;
        else
            Boards.HAS_CONFIG_SETTING = true;
    } else {
        Boards.NAME.push(BOARD.boardName);
        Boards.INFO[BOARD.boardName] = {
            key: null,
            config: null,
            default: null,
            ignore: []
        };
        Boards.HAS_CONFIG_SETTING = false;
    }

    const boardNames = $('#boards-type');

    const selectedBoardName = (window?.localStorage[BOARD.boardName] ?? '').match(/(?<=board[\s]*=[\s]*\")[^\n\"]+(?=\")/g);
    if (boardNames) {
        boardNames.empty();
        for (let board of Boards.NAME)
            boardNames.append(`<option value="${Boards.INFO[board]?.key ?? board}" ${(selectedBoardName && selectedBoardName[0] === board)? ' selected' : ''}>${board}</option>`);
        form.render();
    }
    Boards.onclickBoardSelector();
}

Boards.getConfigInfo = (boardName) => {
    if (!Boards.INFO[boardName]) return '';
    const { config } = Boards.INFO[boardName];
    const defaultConfig = Boards.INFO[boardName].default;
    let info = '';
    for (let i in defaultConfig)
        if (typeof config[i] === 'object')
            for (let j of config[i])
                if (j.key === defaultConfig[i]) {
                    info += i + ': ' + j.label + '<br/>';
                    break;
                }
    return info;
}

Boards.updateBoardDefaultConfig = (boardName) => {
    const { config = null } = Boards.INFO[boardName];
    let defaultConfig = null;
    if (typeof config === 'object') {
        defaultConfig = {};
        for (let j in config) {
            if (typeof config[j] === 'object' && typeof config[j][0] === 'object') {
                defaultConfig[j] = config[j][0].key;
            }
        }
    }
    Boards.INFO[boardName].default = defaultConfig;
}

Boards.onclickBoardSelector = () => {
    //板卡选择事件
    $("#boardSelector").on("click", function () {
        if (Boards.HAS_CONFIG_SETTING) {
            const ddObj = $("#boardSelector").find('dd');
            for (let i = 0; i < ddObj.length; i++) {
                const boardSettingBtnDom = $(`<button type="button" class="layui-btn layui-btn-normal layui-btn-xs board-config-btn" style="margin-right: 5px;width: 23px;height: 22px;line-height: 21px;padding: 0px 1px 0px 1px;"><i class="layui-icon layui-icon-set-fill"></i></button>`);
                const ddDom = $(ddObj[i]);
                ddDom.find('button').remove();
                const boardName = ddDom.html();
                boardSettingBtnDom.attr('board', boardName);
                if (Boards.INFO[boardName].config) {
                    let tipStr = Boards.getConfigInfo(boardName);
                    if (!tipStr) {
                        Boards.updateBoardDefaultConfig(boardName);
                        tipStr = Boards.getConfigInfo(boardName);
                    };
                    ddDom.html(boardSettingBtnDom[0].outerHTML + boardName);
                    let settingObj = $(ddObj[i]).find('i');
                    let tips;
                    const defaultConfig = Boards.INFO[boardName].default;
                    settingObj[0].onmouseenter = function() {
                        layer.closeAll();
                        tips = layer.tips(tipStr, ddObj[i], {
                            tips:[4, 'auto'],
                            time: 0,
                            area: 'auto',
                            maxWidth: 500,
                            tipsMore: true,
                            anim: 5,
                            isOutAnim: true
                        });
                    }
                    settingObj[0].onmouseout = function() {
                        layer.close(tips);
                    }
                } else {
                    boardSettingBtnDom.addClass('layui-btn-disabled');
                    ddDom.html(boardSettingBtnDom[0].outerHTML + boardName);
                }
            }
        }
        Boards.onclickChangeConfig();
    });
}

Boards.showConfigDialog = (boardName) => {
    const { config } = Boards.INFO[boardName];
    const menuList = Object.keys(config);
    const boardConfigDom = XML.getDom(XML.TEMPLATE_STR.BOARD_CONFIGURATOR, {
        apply: indexText['应用'],
        reset: indexText['复位'],
        menuList
    });
    const boardConfigFormDom = boardConfigDom.find('#board-config-form');
    const boardConfigFormBtnStr = boardConfigFormDom.html();
    boardConfigFormDom.empty();
    for (let i in config) {
        const boardConfigElementDom = $(XML.render(XML.TEMPLATE_STR.BOARD_CONFIG_ELEMENT, {
            key: i
        }));
        const selectDom = boardConfigElementDom.find('#' + i + '-key-type');
        selectDom.empty();
        let num = 0;
        for (let j of config[i]) {
            selectDom.append('<div class="layui-col-md12"><input type="radio" name="'+i+'" value="'+j.key+'" title="'+j.label+'" '+(!num?'checked':'')+'></div>');
            num++;
        }
        boardConfigFormDom.append(boardConfigElementDom);
    }
    boardConfigFormDom.append(boardConfigFormBtnStr);
    layer.closeAll('tips');
    const layerNum = LayerExtend.open({
        title: boardName,
        id: 'board-config-layer',
        content: boardConfigDom[0].outerHTML,
        shade: LayerExtend.shade,
        area: ['60%', '80%'],
        success: (layero) => {
            $('#board-config-layer').css('overflow', 'hidden');
            form.render();
            form.val('board-config-form-filter', Boards.INFO[boardName].default);
            form.on('submit(board-config-submit)', function(data) {
                Boards.INFO[boardName].default = data.field;
                //layer.close(layerNum);
                layer.msg(indexText['板卡配置已更新'], { time: 1000 });
                return false;
            });
            const $configForm = $('#board-config-form');
            // 跟随右侧form变化实时更新左侧菜单栏选中项
            /*
            let disabled = false;
            let selectedKey = menuList[0];
            $configForm.scroll(function() {
                if (disabled) {
                    disabled = false;
                    return
                };
                const $options = $configForm.find('.m-anchor');
                const $menu = $('#board-config-menu-options');
                let i = 0;
                let $option;
                for (; i < $options.length; i++) {
                    $option = $($options[i]);
                    if ($option.position().top - 20 > 0) {
                        $option = $($options[i - 1]);
                        break;
                    }
                }
                if (i === $options.length)
                    $option = $($options[--i]);
                const optionKey = $option.attr('key');
                if (selectedKey === optionKey) return;
                selectedKey = optionKey;
                const $li = $menu.children('li');
                $li.removeClass('layui-this');
                const $selected = $menu.children('li[m-key="' + optionKey + '"]');
                $selected.addClass('layui-this');
                $menu.parent().scrollTop($selected.position().top + $menu.scrollTop());
            });
            */
            element.render('nav', 'board-config-menu-filter');
            element.on('nav(board-config-menu-filter)', function(elem) {
                /*
                if (selectedKey === elem.text()) return;
                selectedKey = elem.text();
                disabled = true;
                */
                $selected = $configForm.find('.m-anchor[key="' + elem.text() + '"]');
                $configForm.scrollTop($selected.position().top + $configForm.scrollTop() - 10);
                elem.parent().removeClass('layui-this');
            });
        }, end: () => {
            layui.off('board-config-menu-filter', 'nav');
        }
    });
}

Boards.onclickChangeConfig = () => {
    $(".board-config-btn").off("click").click((event) => {
        const boardName = $(event.currentTarget).attr('board');
        if (Boards.INFO[boardName].config)
            Boards.showConfigDialog(boardName);
    });
}

Boards.getType = () => {
    str = BOARD.boardIndex ?? '';
    if (BOARD.thirdPartyBoard) {
        return str.match(/(?<=\/board\/ThirdParty\/)[^?\/\\、*\"><|]+/g)[0];
    } else {
        return str.match(/(?<=\/board\/)[^?\/\\、*\"><|]+/g)[0];
    }
}

Boards.getSelectedBoardName = () => {
    const boardKey = Boards.getSelectedBoardKey();
    const { INFO } = Boards;
    for (let i in INFO) {
        if (INFO[i].key === boardKey)
            return i;
    }
    return boardKey;
}

Boards.getSelectedBoardKey = () => {
    return $('#boards-type').val();
}

Boards.setSelectedBoard = (name, userConfig) => {
    const charIndex = name.indexOf('@');
    if (charIndex !== -1) {
        name = name.substring(charIndex + 1, name.length);
    }
    if (!Boards.NAME.includes(name))
        return;
    const boardInfo = Boards.INFO[name];
    if (boardInfo && boardInfo.key) {
        $("#boards-type").children('option').attr('selected', false);
        $("#boards-type").children('*[value="'+boardInfo.key+'"]').attr('selected', true);
        if (typeof userConfig === 'object') {
            const { config } = boardInfo;
            for (let key in userConfig) {
                if (!config[key] || typeof config[key] !== 'object') {
                    delete userConfig[key];
                    continue;
                }
                let needDel = true;
                for (let option of config[key]) {
                    if (option.key === userConfig[key]) {
                        needDel = false;
                        break;
                    }
                }
                if (needDel)
                    delete userConfig[key];
            }
            boardInfo.default = { ...userConfig };
        }
        form.render('select', 'boards-type-filter');
    }
    Boards.updateCategories(name);
    if (typeof profile === 'object' && profile[name])
        profile['default'] = profile[name];
}

Boards.getSelectedBoardConfig = (defaultConfig = true) => {
    const boardName = Boards.getSelectedBoardName();
    if (defaultConfig)
        return Boards.INFO[boardName]?.default ?? null;
    else
        return Boards.INFO[boardName]?.config ?? null;
}

Boards.getBoardCommandParam = (boardName) => {
    if (!Boards.INFO[boardName]) return null;
    const info = Boards.INFO[boardName];
    let { key, ignore = [] } = info;
    const defaultConfig = info.default;
    if (!key) return null;
    const index = key.indexOf('@');
    if (index !== -1)
        key = key.substring(0, index);
    let commandStr = key;
    if (typeof defaultConfig === 'object') {
        commandStr += ':';
        for (let i in defaultConfig) {
            if (!ignore.includes(i))
                commandStr += i + '=' + defaultConfig[i] + ',';
        }
        commandStr = commandStr.substring(0, commandStr.length - 1);
    }
    return commandStr;
}

Boards.getSelectedBoardCommandParam = () => {
    const boardName = Boards.getSelectedBoardName();
    return Boards.getBoardCommandParam(boardName);
}

Boards.getSelectedBoardConfigParam = (param) => {
    const defaultConfig = Boards.getSelectedBoardConfig();
    if (defaultConfig && typeof defaultConfig === 'object')
        return defaultConfig[param] ?? '';
    return '';
}

Boards.updateCategories = (boardName, enforce = false) => {
    if (Boards.selected === boardName && !enforce) return;
    Boards.selected = boardName;
    $('#mixly-footer-boardname').html(boardName);
    let thirdPartyStr = '';
    if (Env.isElectron) {
        thirdPartyStr = Env.thirdPartyXML.join('');
    }
    thirdPartyStr = Boards.selectCategories(boardName, thirdPartyStr);
    const toolboxDom = $('#toolbox');
    toolboxDom.html(XML.CATEGORIES_STR[boardName] ?? Boards.selectCategories(boardName, Env.defaultXML));
    toolboxDom.append(thirdPartyStr);
    const categoriesDom = toolboxDom.find('category');
    for (let i = 0; categoriesDom[i]; i++) {
        if (categoriesDom[i].hasAttribute('toolboxitemid')) continue;
        categoriesDom[i].setAttribute('toolboxitemid', categoriesDom[i].id);
    }
    Code.initLanguage(false);
    if (Blockly.mainWorkspace) {
        Blockly.mainWorkspace.updateToolbox(toolboxDom[0]);
        ToolboxSearcher.restart();
        Blockly.mainWorkspace.scrollCenter();
        Blockly.hideChaff();
    }
}

Boards.selectCategories = (boardName, categoriesStr) => {
    const boardKeyList = (Boards.INFO[boardName].key ?? '').split(':');
    if (!boardKeyList.length) return categoriesStr;
    const xmlDom = $('<xml></xml>');
    xmlDom.html(categoriesStr);
    const categories = xmlDom.find('category');
    for (let i = 0; categories[i]; i++) {
        const removed = Boards.removeBlocks($(categories[i]), boardKeyList);
        if (!removed) {
            const blocks = $(categories[i]).children('block');
            for (let j = 0; blocks[j]; j++) {
                Boards.removeBlocks($(blocks[j]), boardKeyList);
            }
        }
    }
    return xmlDom.html();
}

Boards.removeBlocks = (blocksdom, boardKeyList) => {
    const mShow = blocksdom.attr('m-show');
    const mHide = blocksdom.attr('m-hide');
    if (mShow || mHide) {
        const select = mShow ? mShow : mHide;
        let needRemove = mShow ? true : false;
        const selectList = select.split(' ');
        for (let key of selectList) {
            const keyList = key.split(':');
            if (keyList.length < 3) continue;
            const param3 = String(keyList[2]).split(',');
            if (keyList[0] === boardKeyList[0]
             && keyList[1] === boardKeyList[1]) {
                for (let value of param3) {
                    if (value === boardKeyList[2]) {
                        needRemove = mShow ? false : true;
                        break;
                    }
                }
            }
            if ((!needRemove && mShow) || (needRemove && !mShow))
                break;
        }
        if (needRemove) {
            blocksdom.remove();
            return true;
        }
    }
    return false;
}

})();