/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { E as ENABLE_HTML_CONTENT_DEFAULT, a as sanitizeDOMString } from './config.js';
import { p as caretBackSharp, q as arrowDown } from './index7.js';
import { c as config, b as getIonMode } from './ionic-global.js';
import { e as supportsRubberBandScrolling } from './refresher.utils.js';
import { d as defineCustomElement$2, S as SPINNERS } from './spinner.js';
import { d as defineCustomElement$3 } from './icon.js';

const RefresherContent = /*@__PURE__*/ proxyCustomElement(class RefresherContent extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.customHTMLEnabled = config.get('innerHTMLTemplatesEnabled', ENABLE_HTML_CONTENT_DEFAULT);
        this.pullingIcon = undefined;
        this.pullingText = undefined;
        this.refreshingSpinner = undefined;
        this.refreshingText = undefined;
    }
    componentWillLoad() {
        if (this.pullingIcon === undefined) {
            /**
             * The native iOS refresher uses a spinner instead of
             * an icon, so we need to see if this device supports
             * the native iOS refresher.
             */
            const hasRubberBandScrolling = supportsRubberBandScrolling();
            const mode = getIonMode(this);
            const overflowRefresher = hasRubberBandScrolling ? 'lines' : arrowDown;
            this.pullingIcon = config.get('refreshingIcon', mode === 'ios' && hasRubberBandScrolling ? config.get('spinner', overflowRefresher) : 'circular');
        }
        if (this.refreshingSpinner === undefined) {
            const mode = getIonMode(this);
            this.refreshingSpinner = config.get('refreshingSpinner', config.get('spinner', mode === 'ios' ? 'lines' : 'circular'));
        }
    }
    renderPullingText() {
        const { customHTMLEnabled, pullingText } = this;
        if (customHTMLEnabled) {
            return h("div", { class: "refresher-pulling-text", innerHTML: sanitizeDOMString(pullingText) });
        }
        return h("div", { class: "refresher-pulling-text" }, pullingText);
    }
    renderRefreshingText() {
        const { customHTMLEnabled, refreshingText } = this;
        if (customHTMLEnabled) {
            return h("div", { class: "refresher-refreshing-text", innerHTML: sanitizeDOMString(refreshingText) });
        }
        return h("div", { class: "refresher-refreshing-text" }, refreshingText);
    }
    render() {
        const pullingIcon = this.pullingIcon;
        const hasSpinner = pullingIcon != null && SPINNERS[pullingIcon] !== undefined;
        const mode = getIonMode(this);
        return (h(Host, { key: '1bec5b4da221c69d856f3f5ddf40f2e03ebf2a4c', class: mode }, h("div", { key: '4fcc526c4f1881e9368d9cd16bd7030919bd3841', class: "refresher-pulling" }, this.pullingIcon && hasSpinner && (h("div", { key: 'a4e9e2e12c2d7faefc8303ec8c021f999ddf308e', class: "refresher-pulling-icon" }, h("div", { key: '5a2d215feb7fb4b64d540d3a65c0f24b415a2433', class: "spinner-arrow-container" }, h("ion-spinner", { key: 'abef2621d671ac6ff0abac43a702cbd825b7f127', name: this.pullingIcon, paused: true }), mode === 'md' && this.pullingIcon === 'circular' && (h("div", { key: '30087d672c3780672a05874cd93cd099b2855462', class: "arrow-container" }, h("ion-icon", { key: '5e30333dee469aec0d8efc8c4e6dabb619c6f363', icon: caretBackSharp, "aria-hidden": "true" })))))), this.pullingIcon && !hasSpinner && (h("div", { key: '48fe72b5ce8ded633c6ee799cebb520b9c8be528', class: "refresher-pulling-icon" }, h("ion-icon", { key: 'd8dfd5d42056b1c0a436c5006affb255407816c0', icon: this.pullingIcon, lazy: false, "aria-hidden": "true" }))), this.pullingText !== undefined && this.renderPullingText()), h("div", { key: 'c2cbfb94f157c82601ffe7bb815ff82ebc7c0a49', class: "refresher-refreshing" }, this.refreshingSpinner && (h("div", { key: '17f3ebe6a31768d5e389f45a2c12f68600185db9', class: "refresher-refreshing-icon" }, h("ion-spinner", { key: 'e8e61f8d7189c9939bba184201c9509d1d5b0fad', name: this.refreshingSpinner }))), this.refreshingText !== undefined && this.renderRefreshingText())));
    }
    get el() { return this; }
}, [0, "ion-refresher-content", {
        "pullingIcon": [1025, "pulling-icon"],
        "pullingText": [1, "pulling-text"],
        "refreshingSpinner": [1025, "refreshing-spinner"],
        "refreshingText": [1, "refreshing-text"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["ion-refresher-content", "ion-icon", "ion-spinner"];
    components.forEach(tagName => { switch (tagName) {
        case "ion-refresher-content":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, RefresherContent);
            }
            break;
        case "ion-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "ion-spinner":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
    } });
}

const IonRefresherContent = RefresherContent;
const defineCustomElement = defineCustomElement$1;

export { IonRefresherContent, defineCustomElement };
