import {Component, Emit, Prop} from "vue-property-decorator";
import { VueComponent } from "@/shims-vue";
import {VNode} from "vue";

import styles from './VButton.scss?module';


interface IEvents {
    onClick?: (event: MouseEvent) => void;
}

interface IProps extends IEvents {
    type?: 'default'|'success',
    block?: boolean,
}

@Component
export default class VButton extends VueComponent<IProps>{
    @Prop()
    private type!: 'default'|'success';

    @Prop()
    private block!: boolean;

    @Emit('click')
    onClick(event: MouseEvent): MouseEvent {
        return event;
    }
    render(): VNode {
        const classList = [
            styles.VButton,
            {
                [styles.block]: this.block,
            }
        ];
        return <button onClick={this.onClick} class={classList}>{ this.$slots.default }</button>
    }
}
