import { Component } from "vue-property-decorator";
import { VueComponent } from "@/shims-vue";
import {VNode} from "vue";

import styles from './VPlate.scss?module';

@Component({
    name: 'VPlate',
})
export default class VCheckbox extends VueComponent{
    render(): VNode {
        return <div class={styles.VPlate}>{this.$slots.default}</div>
    }
}
