/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { c as createColorClasses } from './theme.js';
import { b as getIonMode } from './ionic-global.js';

const textCss = ":host(.ion-color){color:var(--ion-color-base)}";
const IonTextStyle0 = textCss;

const Text = /*@__PURE__*/ proxyCustomElement(class Text extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.color = undefined;
    }
    render() {
        const mode = getIonMode(this);
        return (h(Host, { key: '4b76333b1ea5cab134b9dc1f5670c0d5a253fc32', class: createColorClasses(this.color, {
                [mode]: true,
            }) }, h("slot", { key: '3dee5f16bc58b3d92547d910bd4f441a00ce2039' })));
    }
    static get style() { return IonTextStyle0; }
}, [1, "ion-text", {
        "color": [513]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["ion-text"];
    components.forEach(tagName => { switch (tagName) {
        case "ion-text":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, Text);
            }
            break;
    } });
}

const IonText = Text;
const defineCustomElement = defineCustomElement$1;

export { IonText, defineCustomElement };
