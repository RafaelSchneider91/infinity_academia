/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
import { Host, h, forceUpdate } from "@stencil/core";
import { safeCall } from "../../utils/overlays";
import { getClassMap } from "../../utils/theme";
import { getIonMode } from "../../global/ionic-global";
/**
 * @internal
 */
export class SelectPopover {
    constructor() {
        this.header = undefined;
        this.subHeader = undefined;
        this.message = undefined;
        this.multiple = undefined;
        this.options = [];
    }
    findOptionFromEvent(ev) {
        const { options } = this;
        return options.find((o) => o.value === ev.target.value);
    }
    /**
     * When an option is selected we need to get the value(s)
     * of the selected option(s) and return it in the option
     * handler
     */
    callOptionHandler(ev) {
        const option = this.findOptionFromEvent(ev);
        const values = this.getValues(ev);
        if (option === null || option === void 0 ? void 0 : option.handler) {
            safeCall(option.handler, values);
        }
    }
    /**
     * Dismisses the host popover that the `ion-select-popover`
     * is rendered within.
     */
    dismissParentPopover() {
        const popover = this.el.closest('ion-popover');
        if (popover) {
            popover.dismiss();
        }
    }
    setChecked(ev) {
        const { multiple } = this;
        const option = this.findOptionFromEvent(ev);
        // this is a popover with checkboxes (multiple value select)
        // we need to set the checked value for this option
        if (multiple && option) {
            option.checked = ev.detail.checked;
        }
    }
    getValues(ev) {
        const { multiple, options } = this;
        if (multiple) {
            // this is a popover with checkboxes (multiple value select)
            // return an array of all the checked values
            return options.filter((o) => o.checked).map((o) => o.value);
        }
        // this is a popover with radio buttons (single value select)
        // return the value that was clicked, otherwise undefined
        const option = this.findOptionFromEvent(ev);
        return option ? option.value : undefined;
    }
    renderOptions(options) {
        const { multiple } = this;
        switch (multiple) {
            case true:
                return this.renderCheckboxOptions(options);
            default:
                return this.renderRadioOptions(options);
        }
    }
    renderCheckboxOptions(options) {
        return options.map((option) => (h("ion-item", { class: Object.assign({
                // TODO FW-4784
                'item-checkbox-checked': option.checked
            }, getClassMap(option.cssClass)) }, h("ion-checkbox", { value: option.value, disabled: option.disabled, checked: option.checked, justify: "start", labelPlacement: "end", onIonChange: (ev) => {
                this.setChecked(ev);
                this.callOptionHandler(ev);
                // TODO FW-4784
                forceUpdate(this);
            } }, option.text))));
    }
    renderRadioOptions(options) {
        const checked = options.filter((o) => o.checked).map((o) => o.value)[0];
        return (h("ion-radio-group", { value: checked, onIonChange: (ev) => this.callOptionHandler(ev) }, options.map((option) => (h("ion-item", { class: Object.assign({
                // TODO FW-4784
                'item-radio-checked': option.value === checked
            }, getClassMap(option.cssClass)) }, h("ion-radio", { value: option.value, disabled: option.disabled, onClick: () => this.dismissParentPopover(), onKeyUp: (ev) => {
                if (ev.key === ' ') {
                    /**
                     * Selecting a radio option with keyboard navigation,
                     * either through the Enter or Space keys, should
                     * dismiss the popover.
                     */
                    this.dismissParentPopover();
                }
            } }, option.text))))));
    }
    render() {
        const { header, message, options, subHeader } = this;
        const hasSubHeaderOrMessage = subHeader !== undefined || message !== undefined;
        return (h(Host, { key: '302553a2eec4d1442751b8af28b7c9bd3487fd5d', class: getIonMode(this) }, h("ion-list", { key: '39ae8579e6fe3bae2c7504147268ad5c82fd27e6' }, header !== undefined && h("ion-list-header", { key: 'e0e6686380d188f46c593e1bb25287dcf08c75c2' }, header), hasSubHeaderOrMessage && (h("ion-item", { key: '8a2d8652db269593c0ba7d767277e12c2b06144d' }, h("ion-label", { key: 'a30cc0ecf95d5bdd6421ee1683922c1b853e98ea', class: "ion-text-wrap" }, subHeader !== undefined && h("h3", { key: 'c298459ca450123808a08d65660825b2c26d00e5' }, subHeader), message !== undefined && h("p", { key: 'ed895fbaec020e809021138401341b6fd7675035' }, message)))), this.renderOptions(options))));
    }
    static get is() { return "ion-select-popover"; }
    static get encapsulation() { return "scoped"; }
    static get originalStyleUrls() {
        return {
            "ios": ["select-popover.ios.scss"],
            "md": ["select-popover.md.scss"]
        };
    }
    static get styleUrls() {
        return {
            "ios": ["select-popover.ios.css"],
            "md": ["select-popover.md.css"]
        };
    }
    static get properties() {
        return {
            "header": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string | undefined",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "The header text of the popover"
                },
                "attribute": "header",
                "reflect": false
            },
            "subHeader": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string | undefined",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "The subheader text of the popover"
                },
                "attribute": "sub-header",
                "reflect": false
            },
            "message": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string | undefined",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "The text content of the popover body"
                },
                "attribute": "message",
                "reflect": false
            },
            "multiple": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean | undefined",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "If true, the select accepts multiple values"
                },
                "attribute": "multiple",
                "reflect": false
            },
            "options": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "SelectPopoverOption[]",
                    "resolved": "SelectPopoverOption[]",
                    "references": {
                        "SelectPopoverOption": {
                            "location": "import",
                            "path": "./select-popover-interface",
                            "id": "src/components/select-popover/select-popover-interface.ts::SelectPopoverOption"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "An array of options for the popover"
                },
                "defaultValue": "[]"
            }
        };
    }
    static get elementRef() { return "el"; }
}
