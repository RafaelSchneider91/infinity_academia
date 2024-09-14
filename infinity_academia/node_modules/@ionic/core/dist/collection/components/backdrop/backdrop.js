/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
import { Host, h } from "@stencil/core";
import { getIonMode } from "../../global/ionic-global";
export class Backdrop {
    constructor() {
        this.visible = true;
        this.tappable = true;
        this.stopPropagation = true;
    }
    onMouseDown(ev) {
        this.emitTap(ev);
    }
    emitTap(ev) {
        if (this.stopPropagation) {
            ev.preventDefault();
            ev.stopPropagation();
        }
        if (this.tappable) {
            this.ionBackdropTap.emit();
        }
    }
    render() {
        const mode = getIonMode(this);
        return (h(Host, { key: 'c803b4302c8e722064feb03dafe3cb6e190b4f2b', tabindex: "-1", "aria-hidden": "true", class: {
                [mode]: true,
                'backdrop-hide': !this.visible,
                'backdrop-no-tappable': !this.tappable,
            } }));
    }
    static get is() { return "ion-backdrop"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "ios": ["backdrop.ios.scss"],
            "md": ["backdrop.md.scss"]
        };
    }
    static get styleUrls() {
        return {
            "ios": ["backdrop.ios.css"],
            "md": ["backdrop.md.css"]
        };
    }
    static get properties() {
        return {
            "visible": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "If `true`, the backdrop will be visible."
                },
                "attribute": "visible",
                "reflect": false,
                "defaultValue": "true"
            },
            "tappable": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "If `true`, the backdrop will can be clicked and will emit the `ionBackdropTap` event."
                },
                "attribute": "tappable",
                "reflect": false,
                "defaultValue": "true"
            },
            "stopPropagation": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "If `true`, the backdrop will stop propagation on tap."
                },
                "attribute": "stop-propagation",
                "reflect": false,
                "defaultValue": "true"
            }
        };
    }
    static get events() {
        return [{
                "method": "ionBackdropTap",
                "name": "ionBackdropTap",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted when the backdrop is tapped."
                },
                "complexType": {
                    "original": "void",
                    "resolved": "void",
                    "references": {}
                }
            }];
    }
    static get listeners() {
        return [{
                "name": "click",
                "method": "onMouseDown",
                "target": undefined,
                "capture": true,
                "passive": false
            }];
    }
}
