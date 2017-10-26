/**
 * @file bm command plugin script
 * @description 书签记录检索
 * @author tomasy
 * @email solopea@gmail.com
 */

import $ from 'jquery'

const chrome = window.chrome;
const version = 2;
const name = 'topsites';
const key = 'site';
const type = 'keyword';
const icon = chrome.extension.getURL('img/topsites.png');
const title = chrome.i18n.getMessage(name + '_title');
const subtitle = chrome.i18n.getMessage(name + '_subtitle');
const commands = [{
    key,
    type,
    title,
    subtitle,
    icon,
    editable: true
}];

function onInput(key) {
    let that = this;

    chrome.topSites.get(function (sites) {
        let arr = [];
        for (let i in sites) {
            let item = sites[i];
            arr.push({
                key: key,
                id: item.id,
                icon: icon,
                url: item.url,
                title: item.title,
                desc: item.url,
                isWarn: false
            });
        }
        that.showItemList(arr);
    });
}

function onEnter({ url }) {
    chrome.tabs.create({
        url
    });
}

export default {
    version,
    name: 'Top Sites',
    icon,
    title,
    commands,
    onInput,
    onEnter
};