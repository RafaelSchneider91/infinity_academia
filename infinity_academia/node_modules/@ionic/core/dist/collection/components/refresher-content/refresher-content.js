/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
import { Host, h } from "@stencil/core";
import { ENABLE_HTML_CONTENT_DEFAULT } from "../../utils/config";
import { sanitizeDOMString } from "../../utils/sanitization/index";
import { arrowDown, caretBackSharp } from "ionicons/icons";
import { config } from "../../global/config";
import { getIonMode } from "../../global/ionic-global";
import { supportsRubberBandScrolling } from "../refresher/refresher.utils";
import { SPINNERS } from "../spinner/spinner-configs";
export class RefresherContent {
    constructor() {
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
    static get is() { return "ion-refresher-content"; }
    static get properties() {
        return {
            "pullingIcon": {
                "type": "string",
                "mutable": true,
                "complexType": {
                    "original": "SpinnerTypes | string | null",
                    "resolved": "null | string | undefined",
                    "references": {
                        "SpinnerTypes": {
                            "location": "import",
                            "path": "../spinner/spinner-configs",
                            "id": "src/components/spinner/spinner-configs.ts::SpinnerTypes"
                        }
                    }
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "A static icon or a spinner to display when you begin to pull down.\nA spinner name can be provided to gradually show tick marks\nwhen pulling down on iOS devices."
                },
                "attribute": "pulling-icon",
                "reflect": false
            },
            "pullingText": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string | IonicSafeString",
                    "resolved": "IonicSafeString | string | undefined",
                    "references": {
                        "IonicSafeString": {
                            "location": "import",
                            "path": "../../utils/sanitization",
                            "id": "src/utils/sanitization/index.ts::IonicSafeString"
                        }
                    }
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "The text you want to display when you begin to pull down.\n`pullingText` can accept either plaintext or HTML as a string.\nTo display characters normally reserved for HTML, they\nmust be escaped. For example `<Ionic>` would become\n`&lt;Ionic&gt;`\n\nFor more information: [Security Documentation](https://ionicframework.com/docs/faq/security)\n\nContent is parsed as plaintext by default.\n`innerHTMLTemplatesEnabled` must be set to `true` in the Ionic config\nbefore custom HTML can be used."
                },
                "attribute": "pulling-text",
                "reflect": false
            },
            "refreshingSpinner": {
                "type": "string",
                "mutable": true,
                "complexType": {
                    "original": "SpinnerTypes | null",
                    "resolved": "\"bubbles\" | \"circles\" | \"circular\" | \"crescent\" | \"dots\" | \"lines\" | \"lines-sharp\" | \"lines-sharp-small\" | \"lines-small\" | null | undefined",
                    "references": {
                        "SpinnerTypes": {
                            "location": "import",
                            "path": "../spinner/spinner-configs",
                            "id": "src/components/spinner/spinner-configs.ts::SpinnerTypes"
                        }
                    }
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "An animated SVG spinner that shows when refreshing begins"
                },
                "attribute": "refreshing-spinner",
                "reflect": false
            },
            "refreshingText": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string | IonicSafeString",
                    "resolved": "IonicSafeString | string | undefined",
                    "references": {
                        "IonicSafeString": {
                            "location": "import",
                            "path": "../../utils/sanitization",
                            "id": "src/utils/sanitization/index.ts::IonicSafeString"
                        }
                    }
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "The text you want to display when performing a refresh.\n`refreshingText` can accept either plaintext or HTML as a string.\nTo display characters normally reserved for HTML, they\nmust be escaped. For example `<Ionic>` would become\n`&lt;Ionic&gt;`\n\nFor more information: [Security Documentation](https://ionicframework.com/docs/faq/security)\n\nContent is parsed as plaintext by default.\n`innerHTMLTemplatesEnabled` must be set to `true` in the Ionic config\nbefore custom HTML can be used."
                },
                "attribute": "refreshing-text",
                "reflect": false
            }
        };
    }
    static get elementRef() { return "el"; }
}
