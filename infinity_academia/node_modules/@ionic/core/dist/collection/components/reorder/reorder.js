/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
import { Host, h } from "@stencil/core";
import { reorderThreeOutline, reorderTwoSharp } from "ionicons/icons";
import { getIonMode } from "../../global/ionic-global";
/**
 * @part icon - The icon of the reorder handle (uses ion-icon).
 */
export class Reorder {
    onClick(ev) {
        const reorderGroup = this.el.closest('ion-reorder-group');
        ev.preventDefault();
        // Only stop event propagation if the reorder is inside of an enabled
        // reorder group. This allows interaction with clickable children components.
        if (!reorderGroup || !reorderGroup.disabled) {
            ev.stopImmediatePropagation();
        }
    }
    render() {
        const mode = getIonMode(this);
        const reorderIcon = mode === 'ios' ? reorderThreeOutline : reorderTwoSharp;
        return (h(Host, { key: '663d74e231e3af56b6298ee2539fdac9c8465839', class: mode }, h("slot", { key: 'c7c384ab8c9ca8abdc89cd984a39dfde70e342ca' }, h("ion-icon", { key: 'c8b6052db03d4b9e33a90e600c20861c73ee73ce', icon: reorderIcon, lazy: false, class: "reorder-icon", part: "icon", "aria-hidden": "true" }))));
    }
    static get is() { return "ion-reorder"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "ios": ["reorder.ios.scss"],
            "md": ["reorder.md.scss"]
        };
    }
    static get styleUrls() {
        return {
            "ios": ["reorder.ios.css"],
            "md": ["reorder.md.css"]
        };
    }
    static get elementRef() { return "el"; }
    static get listeners() {
        return [{
                "name": "click",
                "method": "onClick",
                "target": undefined,
                "capture": true,
                "passive": false
            }];
    }
}
